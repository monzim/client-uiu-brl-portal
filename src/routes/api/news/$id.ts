import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { cached, redis, CACHE_KEYS, CACHE_TTL } from '#/lib/redis'
import { getAuthPayload, jsonResponse, errorResponse } from '#/lib/serverHelpers'

export const Route = createFileRoute('/api/news/$id')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const { id } = params
        const payload = await getAuthPayload(request)
        if (payload) {
          const news = await db.news.findUnique({ where: { id } })
          if (!news) return errorResponse('Not found', 404)
          return jsonResponse(news)
        }
        const data = await cached(CACHE_KEYS.newsItem(id), CACHE_TTL.newsItem, async () => {
          return db.news.findUnique({ where: { id, published: true } })
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
        const news = await db.news.update({ where: { id }, data: body as any })
        await redis.del(CACHE_KEYS.newsItem(id))
        await redis.del(CACHE_KEYS.newsList())
        return jsonResponse(news)
      },
      DELETE: async ({ request, params }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const { id } = params
        await db.news.delete({ where: { id } })
        await redis.del(CACHE_KEYS.newsItem(id))
        await redis.del(CACHE_KEYS.newsList())
        return jsonResponse({ ok: true })
      },
    },
  },
})
