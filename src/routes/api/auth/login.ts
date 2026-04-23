import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { signToken, AUTH_COOKIE } from '#/lib/auth'
import { jsonResponse, errorResponse, setCookieHeader } from '#/lib/serverHelpers'
import bcrypt from 'bcryptjs'

export const Route = createFileRoute('/api/auth/login')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => null) as { email?: string; password?: string } | null
        if (!body?.email || !body?.password) {
          return errorResponse('Email and password required', 400)
        }
        const admin = await db.admin.findUnique({ where: { email: body.email } })
        if (!admin) return errorResponse('Invalid credentials', 401)
        const valid = await bcrypt.compare(body.password, admin.passwordHash)
        if (!valid) return errorResponse('Invalid credentials', 401)
        const token = await signToken({ adminId: admin.id, email: admin.email })
        const secure = process.env.NODE_ENV === 'production'
        return jsonResponse({ ok: true }, {
          headers: {
            'Set-Cookie': setCookieHeader(AUTH_COOKIE, token, 3600, secure),
          },
        })
      },
    },
  },
})
