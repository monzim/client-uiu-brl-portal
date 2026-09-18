import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { invalidateGallery } from '#/lib/redis'
import {
  getAuthPayload,
  jsonResponse,
  errorResponse,
} from '#/lib/serverHelpers'
import { CreateGalleryCategorySchema } from '#/lib/schemas'
import { auditLog } from '#/lib/audit'
import { listPublishedGalleryCategories } from '#/lib/gallery'

export const Route = createFileRoute('/api/gallery/categories/')({
  server: {
    handlers: {
      GET: async () => jsonResponse(await listPublishedGalleryCategories()),
      POST: async ({ request }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const raw = await request.json().catch(() => null)
        if (!raw) return errorResponse('Invalid body', 400)

        const result = CreateGalleryCategorySchema.safeParse(raw)
        if (!result.success)
          return errorResponse(
            result.error.issues[0]?.message ?? 'Validation failed',
            400,
          )

        const duplicate = await db.galleryCategory.findUnique({
          where: { slug: result.data.slug },
          select: { id: true },
        })
        if (duplicate) return errorResponse('Slug already in use', 409)

        const category = await db.galleryCategory.create({ data: result.data })
        await invalidateGallery()
        auditLog('gallery.category.create', payload.adminId, payload.email, {
          categoryId: category.id,
          slug: category.slug,
        })
        return jsonResponse(category, { status: 201 })
      },
    },
  },
})
