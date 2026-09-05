import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { invalidateGallery } from '#/lib/redis'
import {
  getAuthPayload,
  jsonResponse,
  errorResponse,
} from '#/lib/serverHelpers'
import { ReorderGallerySchema } from '#/lib/schemas'
import { auditLog } from '#/lib/audit'

/** Bulk `sortOrder` write for drag/move-up-down reordering in the admin grid. */
export const Route = createFileRoute('/api/gallery/reorder')({
  server: {
    handlers: {
      PUT: async ({ request }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const raw = await request.json().catch(() => null)
        if (!raw) return errorResponse('Invalid body', 400)

        const result = ReorderGallerySchema.safeParse(raw)
        if (!result.success)
          return errorResponse(
            result.error.issues[0]?.message ?? 'Validation failed',
            400,
          )

        const { items } = result.data
        const ids = items.map((item) => item.id)
        const known = await db.galleryImage.count({
          where: { id: { in: ids } },
        })
        if (known !== new Set(ids).size)
          return errorResponse('One or more images not found', 400)

        await db.$transaction(
          items.map((item) =>
            db.galleryImage.update({
              where: { id: item.id },
              data: { sortOrder: item.sortOrder },
            }),
          ),
        )
        await invalidateGallery()
        auditLog('gallery.image.reorder', payload.adminId, payload.email, {
          count: items.length,
        })
        return jsonResponse({ ok: true })
      },
    },
  },
})
