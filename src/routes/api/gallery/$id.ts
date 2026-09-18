import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { invalidateGallery } from '#/lib/redis'
import {
  getAuthPayload,
  jsonResponse,
  errorResponse,
} from '#/lib/serverHelpers'
import { UpdateGalleryImageSchema } from '#/lib/schemas'
import { auditLog } from '#/lib/audit'
import { categoryExists } from '#/lib/gallery'
import { deleteFile } from '#/lib/storage'

/**
 * Removes the underlying object from storage, but only when no other gallery
 * image still points at it — the same upload can be reused across records.
 */
async function deleteOrphanedUpload(url: string): Promise<void> {
  const stillUsed = await db.galleryImage.count({ where: { url } })
  if (stillUsed > 0) return
  await deleteFile(url).catch((err: unknown) => {
    console.error('[gallery] storage cleanup failed', err)
  })
}

export const Route = createFileRoute('/api/gallery/$id')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const payload = await getAuthPayload(request)
        const image = await db.galleryImage.findUnique({
          where: { id: params.id },
        })
        if (!image) return errorResponse('Not found', 404)
        if (!image.published && !payload) return errorResponse('Not found', 404)
        return jsonResponse(image)
      },
      PUT: async ({ request, params }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const raw = await request.json().catch(() => null)
        if (!raw) return errorResponse('Invalid body', 400)

        const result = UpdateGalleryImageSchema.safeParse(raw)
        if (!result.success)
          return errorResponse(
            result.error.issues[0]?.message ?? 'Validation failed',
            400,
          )
        if (
          result.data.categoryId &&
          !(await categoryExists(result.data.categoryId))
        )
          return errorResponse('Category not found', 400)

        const existing = await db.galleryImage.findUnique({
          where: { id: params.id },
          select: { id: true, url: true },
        })
        if (!existing) return errorResponse('Not found', 404)

        const image = await db.galleryImage.update({
          where: { id: existing.id },
          data: result.data,
        })
        await invalidateGallery()
        if (result.data.url && result.data.url !== existing.url) {
          await deleteOrphanedUpload(existing.url)
        }
        auditLog('gallery.image.update', payload.adminId, payload.email, {
          imageId: image.id,
        })
        return jsonResponse(image)
      },
      DELETE: async ({ request, params }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const existing = await db.galleryImage.findUnique({
          where: { id: params.id },
          select: { id: true, url: true, caption: true },
        })
        if (!existing) return errorResponse('Not found', 404)

        await db.galleryImage.delete({ where: { id: existing.id } })
        await invalidateGallery()
        await deleteOrphanedUpload(existing.url)
        auditLog('gallery.image.delete', payload.adminId, payload.email, {
          imageId: existing.id,
          caption: existing.caption,
        })
        return jsonResponse({ ok: true })
      },
    },
  },
})
