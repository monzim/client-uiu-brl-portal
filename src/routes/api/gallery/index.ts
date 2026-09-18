import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { invalidateGallery } from '#/lib/redis'
import {
  getAuthPayload,
  jsonResponse,
  errorResponse,
} from '#/lib/serverHelpers'
import { CreateGalleryImagesSchema } from '#/lib/schemas'
import { auditLog } from '#/lib/audit'
import { categoryExists, listPublishedGalleryImages } from '#/lib/gallery'

export const Route = createFileRoute('/api/gallery/')({
  server: {
    handlers: {
      // `?category=<slug|id>` narrows the list; omitting it returns every
      // published image. Filtering happens in memory so the cache stays a
      // single key.
      GET: async ({ request }) => {
        const images = await listPublishedGalleryImages()
        const filter = new URL(request.url).searchParams.get('category')
        if (!filter) return jsonResponse(images)

        const category = await db.galleryCategory.findFirst({
          where: { OR: [{ slug: filter }, { id: filter }] },
          select: { id: true },
        })
        if (!category) return errorResponse('Category not found', 404)
        return jsonResponse(
          images.filter((image) => image.categoryId === category.id),
        )
      },
      // Accepts a single image or an array of them, so bulk upload is one call.
      POST: async ({ request }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const raw = await request.json().catch(() => null)
        if (!raw) return errorResponse('Invalid body', 400)

        const result = CreateGalleryImagesSchema.safeParse(raw)
        if (!result.success)
          return errorResponse(
            result.error.issues[0]?.message ?? 'Validation failed',
            400,
          )

        const items = Array.isArray(result.data) ? result.data : [result.data]
        const categoryIds = [
          ...new Set(
            items
              .map((item) => item.categoryId)
              .filter((id): id is string => Boolean(id)),
          ),
        ]
        for (const id of categoryIds) {
          if (!(await categoryExists(id)))
            return errorResponse('Category not found', 400)
        }

        const created = await db.$transaction(
          items.map((item) => db.galleryImage.create({ data: item })),
        )
        await invalidateGallery()
        auditLog('gallery.image.create', payload.adminId, payload.email, {
          count: created.length,
          imageIds: created.map((image) => image.id),
        })
        return jsonResponse(Array.isArray(raw) ? created : created[0], {
          status: 201,
        })
      },
    },
  },
})
