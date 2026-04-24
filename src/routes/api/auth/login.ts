import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { signToken, AUTH_COOKIE } from '#/lib/auth'
import { jsonResponse, errorResponse, setCookieHeader } from '#/lib/serverHelpers'
import { checkRateLimit, getClientIp } from '#/lib/rateLimit'
import { auditLog } from '#/lib/audit'
import bcrypt from 'bcryptjs'

export const Route = createFileRoute('/api/auth/login')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip = getClientIp(request)
        const rl = checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000)
        if (!rl.allowed) {
          return new Response(JSON.stringify({ message: 'Too many login attempts' }), {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': String(rl.retryAfterSeconds),
            },
          })
        }

        const body = await request.json().catch(() => null) as { email?: string; password?: string } | null
        if (!body || !body.email || !body.password) {
          return errorResponse('Email and password required', 400)
        }
        const admin = await db.admin.findUnique({ where: { email: body.email } })
        if (!admin) return errorResponse('Invalid credentials', 401)
        const valid = await bcrypt.compare(body.password, admin.passwordHash)
        if (!valid) return errorResponse('Invalid credentials', 401)
        if (admin.isBlocked) return errorResponse('Account disabled', 403)
        const token = await signToken({ adminId: admin.id, email: admin.email, role: admin.role })
        auditLog('auth.login', admin.id, admin.email, { ip: getClientIp(request) })
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
