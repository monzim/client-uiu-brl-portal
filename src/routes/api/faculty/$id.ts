import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { cached, redis, CACHE_KEYS, CACHE_TTL } from '#/lib/redis'
import { getAuthPayload, jsonResponse, errorResponse } from '#/lib/serverHelpers'

export const Route = createFileRoute('/api/faculty/$id')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const { id } = params
        const payload = await getAuthPayload(request)
        if (payload) {
          const faculty = await db.faculty.findUnique({ where: { id } })
          if (!faculty) return errorResponse('Not found', 404)
          return jsonResponse(faculty)
        }
        const data = await cached(CACHE_KEYS.facultyItem(id), CACHE_TTL.facultyItem, async () => {
          return db.faculty.findFirst({
            where: { OR: [{ id }, { email: id }], published: true },
          })
        })
        if (!data) return errorResponse('Not found', 404)
        return jsonResponse(data)
      },
      PUT: async ({ request, params }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const { id } = params
        const body = await request.json().catch(() => null)
        if (!body) return errorResponse('Invalid body', 400)
        const faculty = await db.faculty.update({ where: { id }, data: body as any })
        await redis.del(CACHE_KEYS.facultyItem(id))
        await redis.del(CACHE_KEYS.facultyList())
        return jsonResponse(faculty)
      },
      DELETE: async ({ request, params }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const { id } = params
        await db.faculty.delete({ where: { id } })
        await redis.del(CACHE_KEYS.facultyItem(id))
        await redis.del(CACHE_KEYS.facultyList())
        return jsonResponse({ ok: true })
      },
    },
  },
})
