import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { getAuthPayload, jsonResponse, errorResponse } from '#/lib/serverHelpers'

export const Route = createFileRoute('/api/news/admin')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const data = await db.news.findMany({ orderBy: { createdAt: 'desc' } })
        return jsonResponse(data)
      },
    },
  },
})
