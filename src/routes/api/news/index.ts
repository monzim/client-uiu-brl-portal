import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { cached, redis, CACHE_KEYS, CACHE_TTL } from '#/lib/redis'
import { getAuthPayload, jsonResponse, errorResponse } from '#/lib/serverHelpers'

export const Route = createFileRoute('/api/news/')({
  server: {
    handlers: {
      GET: async () => {
        const data = await cached(CACHE_KEYS.newsList(), CACHE_TTL.newsList, () =>
          db.news.findMany({
            where: { published: true },
            orderBy: { date: 'desc' },
            select: { id: true, title: true, date: true, description: true, image: true },
          }),
        )
        return jsonResponse(data)
      },
      POST: async ({ request }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const body = await request.json().catch(() => null)
        if (!body) return errorResponse('Invalid body', 400)
        const news = await db.news.create({ data: body as any })
        await redis.del(CACHE_KEYS.newsList())
        return jsonResponse(news, { status: 201 })
      },
    },
  },
})
