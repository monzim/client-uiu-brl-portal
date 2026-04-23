import { createFileRoute } from '@tanstack/react-router'
import { AUTH_COOKIE } from '#/lib/auth'
import { jsonResponse, clearCookieHeader } from '#/lib/serverHelpers'

export const Route = createFileRoute('/api/auth/logout')({
  server: {
    handlers: {
      POST: async () => {
        return jsonResponse({ ok: true }, {
          headers: { 'Set-Cookie': clearCookieHeader(AUTH_COOKIE) },
        })
      },
    },
  },
})
