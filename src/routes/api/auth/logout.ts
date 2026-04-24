import { createFileRoute } from '@tanstack/react-router'
import { AUTH_COOKIE } from '#/lib/auth'
import { jsonResponse, clearCookieHeader, getAuthPayload } from '#/lib/serverHelpers'
import { auditLog } from '#/lib/audit'

export const Route = createFileRoute('/api/auth/logout')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const payload = await getAuthPayload(request)
        if (payload) {
          auditLog('auth.logout', payload.adminId, payload.email)
        }
        return jsonResponse({ ok: true }, {
          headers: { 'Set-Cookie': clearCookieHeader(AUTH_COOKIE) },
        })
      },
    },
  },
})
