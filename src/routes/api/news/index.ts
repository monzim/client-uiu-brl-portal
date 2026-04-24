import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { cached, redis, CACHE_KEYS, CACHE_TTL } from '#/lib/redis'
import { getAuthPayload, jsonResponse, errorResponse } from '#/lib/serverHelpers'
import { CreateNewsSchema } from '#/lib/schemas'
import { auditLog } from '#/lib/audit'

export const Route = createFileRoute('/api/news/')({
  server: {
    handlers: {
      GET: async () => {
        const data = await cached(CACHE_KEYS.newsList(), CACHE_TTL.newsList, () =>
          db.news.findMany({
            where: { published: true },
            orderBy: { date: 'desc' },
            select: { id: true, slug: true, title: true, date: true, description: true, image: true },
          }),
        )
        return jsonResponse(data)
      },
      POST: async ({ request }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const raw = await request.json().catch(() => null)
        if (!raw) return errorResponse('Invalid body', 400)
        const result = CreateNewsSchema.safeParse(raw)
        if (!result.success) return errorResponse(result.error.issues[0]?.message ?? 'Validation failed', 400)
        const news = await db.news.create({ data: result.data })
        await redis.del(CACHE_KEYS.newsList())
        auditLog('news.create', payload.email, { newsId: news.id, slug: news.slug })
        return jsonResponse(news, { status: 201 })
      },
    },
  },
})
