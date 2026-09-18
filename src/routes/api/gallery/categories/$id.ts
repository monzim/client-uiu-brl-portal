import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { invalidateGallery } from '#/lib/redis'
import {
  getAuthPayload,
  jsonResponse,
  errorResponse,
} from '#/lib/serverHelpers'
import { UpdateGalleryCategorySchema } from '#/lib/schemas'
import { auditLog } from '#/lib/audit'

export const Route = createFileRoute('/api/gallery/categories/$id')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const payload = await getAuthPayload(request)
        const category = await db.galleryCategory.findFirst({
          where: { OR: [{ slug: params.id }, { id: params.id }] },
        })
        if (!category) return errorResponse('Not found', 404)
        if (!category.published && !payload)
          return errorResponse('Not found', 404)
        return jsonResponse(category)
      },
      PUT: async ({ request, params }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const raw = await request.json().catch(() => null)
        if (!raw) return errorResponse('Invalid body', 400)

        const result = UpdateGalleryCategorySchema.safeParse(raw)
        if (!result.success)
          return errorResponse(
            result.error.issues[0]?.message ?? 'Validation failed',
            400,
          )

        const existing = await db.galleryCategory.findFirst({
          where: { OR: [{ slug: params.id }, { id: params.id }] },
          select: { id: true },
        })
        if (!existing) return errorResponse('Not found', 404)

        if (result.data.slug) {
          const duplicate = await db.galleryCategory.findUnique({
            where: { slug: result.data.slug },
            select: { id: true },
          })
          if (duplicate && duplicate.id !== existing.id)
            return errorResponse('Slug already in use', 409)
        }

        const category = await db.galleryCategory.update({
          where: { id: existing.id },
          data: result.data,
        })
        await invalidateGallery()
        auditLog('gallery.category.update', payload.adminId, payload.email, {
          categoryId: category.id,
        })
        return jsonResponse(category)
      },
      // Images keep existing: the relation is `onDelete: SetNull`, so they fall
      // back to the uncategorised bucket instead of disappearing.
      DELETE: async ({ request, params }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const existing = await db.galleryCategory.findFirst({
          where: { OR: [{ slug: params.id }, { id: params.id }] },
          select: { id: true, slug: true },
        })
        if (!existing) return errorResponse('Not found', 404)

        await db.galleryCategory.delete({ where: { id: existing.id } })
        await invalidateGallery()
        auditLog('gallery.category.delete', payload.adminId, payload.email, {
          categoryId: existing.id,
          slug: existing.slug,
        })
        return jsonResponse({ ok: true })
      },
    },
  },
})
