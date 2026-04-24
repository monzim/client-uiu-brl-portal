import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { getAuthPayload, jsonResponse, errorResponse } from '#/lib/serverHelpers'

export const Route = createFileRoute('/api/faculty/admin')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const data = await db.faculty.findMany({
          orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
        })
        return jsonResponse(data)
      },
    },
  },
})
