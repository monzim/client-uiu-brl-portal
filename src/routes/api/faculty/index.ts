import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { cached, redis, CACHE_KEYS, CACHE_TTL } from '#/lib/redis'
import { getAuthPayload, jsonResponse, errorResponse } from '#/lib/serverHelpers'
import { CreateFacultySchema } from '#/lib/schemas'
import { auditLog } from '#/lib/audit'

export const Route = createFileRoute('/api/faculty/')({
  server: {
    handlers: {
      GET: async () => {
        const data = await cached(CACHE_KEYS.facultyList(), CACHE_TTL.facultyList, () =>
          db.faculty.findMany({
            where: { published: true },
            orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
          }),
        )
        return jsonResponse(data)
      },
      POST: async ({ request }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const raw = await request.json().catch(() => null)
        if (!raw) return errorResponse('Invalid body', 400)
        const result = CreateFacultySchema.safeParse(raw)
        if (!result.success) return errorResponse(result.error.issues[0]?.message ?? 'Validation failed', 400)
        const faculty = await db.faculty.create({ data: result.data })
        await redis.del(CACHE_KEYS.facultyList())
        auditLog('faculty.create', payload.email, { facultyId: faculty.id, slug: faculty.slug })
        return jsonResponse(faculty, { status: 201 })
      },
    },
  },
})
