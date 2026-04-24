import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { cached, redis, CACHE_KEYS, CACHE_TTL } from '#/lib/redis'
import { getAuthPayload, jsonResponse, errorResponse } from '#/lib/serverHelpers'
import { UpdateFacultySchema } from '#/lib/schemas'
import { auditLog } from '#/lib/audit'

export const Route = createFileRoute('/api/faculty/$id')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const identifier = params.id
        const payload = await getAuthPayload(request)
        if (payload) {
          const faculty = await db.faculty.findFirst({
            where: { OR: [{ slug: identifier }, { id: identifier }] },
          })
          if (!faculty) return errorResponse('Not found', 404)
          return jsonResponse(faculty)
        }
        const data = await cached(CACHE_KEYS.facultyItem(identifier), CACHE_TTL.facultyItem, async () => {
          return db.faculty.findFirst({
            where: { OR: [{ slug: identifier }, { id: identifier }], published: true },
          })
        })
        if (!data) return errorResponse('Not found', 404)
        return jsonResponse(data)
      },
      PUT: async ({ request, params }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const identifier = params.id
        const raw = await request.json().catch(() => null)
        if (!raw) return errorResponse('Invalid body', 400)
        const result = UpdateFacultySchema.safeParse(raw)
        if (!result.success) return errorResponse(result.error.issues[0]?.message ?? 'Validation failed', 400)

        const existing = await db.faculty.findFirst({
          where: { OR: [{ slug: identifier }, { id: identifier }] },
          select: { id: true, slug: true },
        })
        if (!existing) return errorResponse('Not found', 404)

        const faculty = await db.faculty.update({
          where: { id: existing.id },
          data: result.data,
        })
        await Promise.allSettled([
          redis.del(CACHE_KEYS.facultyItem(existing.slug)),
          redis.del(CACHE_KEYS.facultyList()),
        ])
        auditLog('faculty.update', payload.email, { facultyId: existing.id })
        return jsonResponse(faculty)
      },
      DELETE: async ({ request, params }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const identifier = params.id
        const existing = await db.faculty.findFirst({
          where: { OR: [{ slug: identifier }, { id: identifier }] },
          select: { id: true, slug: true },
        })
        if (!existing) return errorResponse('Not found', 404)
        await db.faculty.delete({ where: { id: existing.id } })
        await Promise.allSettled([
          redis.del(CACHE_KEYS.facultyItem(existing.slug)),
          redis.del(CACHE_KEYS.facultyList()),
        ])
        auditLog('faculty.delete', payload.email, { facultyId: existing.id, slug: existing.slug })
        return jsonResponse({ ok: true })
      },
    },
  },
})
