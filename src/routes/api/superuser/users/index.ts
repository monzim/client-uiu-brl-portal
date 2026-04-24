import { createFileRoute } from '@tanstack/react-router'
import bcrypt from 'bcryptjs'
import { db } from '#/lib/db'
import { jsonResponse, errorResponse, requireSuperUser } from '#/lib/serverHelpers'
import { CreateAdminSchema } from '#/lib/schemas'
import { auditLog } from '#/lib/audit'

export const Route = createFileRoute('/api/superuser/users/')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const auth = await requireSuperUser(request)
        if (auth instanceof Response) return auth

        const users = await db.admin.findMany({
          select: {
            id: true,
            email: true,
            role: true,
            isBlocked: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        })
        return jsonResponse(users)
      },
      POST: async ({ request }) => {
        const auth = await requireSuperUser(request)
        if (auth instanceof Response) return auth

        const raw = await request.json().catch(() => null)
        if (!raw) return errorResponse('Invalid body', 400)
        const result = CreateAdminSchema.safeParse(raw)
        if (!result.success) {
          return errorResponse(result.error.issues[0]?.message ?? 'Validation failed', 400)
        }

        const existing = await db.admin.findUnique({
          where: { email: result.data.email },
          select: { id: true },
        })
        if (existing) return errorResponse('Email already in use', 409)

        const passwordHash = await bcrypt.hash(result.data.password, 12)
        const created = await db.admin.create({
          data: {
            email: result.data.email,
            passwordHash,
            role: result.data.role,
          },
          select: {
            id: true,
            email: true,
            role: true,
            isBlocked: true,
            createdAt: true,
          },
        })

        auditLog('user.create', auth.adminId, auth.email, {
          newAdminId: created.id,
          newAdminEmail: created.email,
          role: created.role,
        })

        return jsonResponse(created, { status: 201 })
      },
    },
  },
})
