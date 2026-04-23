import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { cached, redis, CACHE_KEYS, CACHE_TTL } from '#/lib/redis'
import { getAuthPayload, jsonResponse, errorResponse } from '#/lib/serverHelpers'

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
        const body = await request.json().catch(() => null)
        if (!body) return errorResponse('Invalid body', 400)
        
        // Remove non-creatable fields if they exist
        const { id, createdAt, updatedAt, ...createData } = body

        const faculty = await db.faculty.create({ 
          data: {
            ...createData,
            publications: createData.publications ?? undefined,
            importantLinks: createData.importantLinks ?? undefined,
          }
        })
        await redis.del(CACHE_KEYS.facultyList())
        return jsonResponse(faculty, { status: 201 })
      },
    },
  },
})
