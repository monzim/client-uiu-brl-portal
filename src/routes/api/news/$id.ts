import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { cached, redis, CACHE_KEYS, CACHE_TTL } from '#/lib/redis'
import { getAuthPayload, jsonResponse, errorResponse } from '#/lib/serverHelpers'
import { UpdateNewsSchema } from '#/lib/schemas'
import { auditLog } from '#/lib/audit'

export const Route = createFileRoute('/api/news/$id')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const identifier = params.id
        const payload = await getAuthPayload(request)
        if (payload) {
          const news = await db.news.findFirst({
            where: { OR: [{ slug: identifier }, { id: identifier }] },
          })
          if (!news) return errorResponse('Not found', 404)
          return jsonResponse(news)
        }
        const data = await cached(CACHE_KEYS.newsItem(identifier), CACHE_TTL.newsItem, async () => {
          return db.news.findFirst({
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
        const result = UpdateNewsSchema.safeParse(raw)
        if (!result.success) return errorResponse(result.error.issues[0]?.message ?? 'Validation failed', 400)
        const existing = await db.news.findFirst({
          where: { OR: [{ slug: identifier }, { id: identifier }] },
          select: { id: true, slug: true },
        })
        if (!existing) return errorResponse('Not found', 404)
        const news = await db.news.update({ where: { id: existing.id }, data: result.data })
        await Promise.allSettled([
          redis.del(CACHE_KEYS.newsItem(existing.slug)),
          redis.del(CACHE_KEYS.newsList()),
        ])
        auditLog('news.update', payload.adminId, payload.email, { newsId: existing.id })
        return jsonResponse(news)
      },
      DELETE: async ({ request, params }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const identifier = params.id
        const existing = await db.news.findFirst({
          where: { OR: [{ slug: identifier }, { id: identifier }] },
          select: { id: true, slug: true },
        })
        if (!existing) return errorResponse('Not found', 404)
        await db.news.delete({ where: { id: existing.id } })
        await Promise.allSettled([
          redis.del(CACHE_KEYS.newsItem(existing.slug)),
          redis.del(CACHE_KEYS.newsList()),
        ])
        auditLog('news.delete', payload.adminId, payload.email, { newsId: existing.id, slug: existing.slug })
        return jsonResponse({ ok: true })
      },
    },
  },
})
