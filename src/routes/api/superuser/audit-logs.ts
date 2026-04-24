import { createFileRoute } from '@tanstack/react-router'
import type { Prisma } from '@prisma/client'
import { db } from '#/lib/db'
import { jsonResponse, errorResponse, requireSuperUser } from '#/lib/serverHelpers'
import { AuditLogQuerySchema } from '#/lib/schemas'

export const Route = createFileRoute('/api/superuser/audit-logs')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const auth = await requireSuperUser(request)
        if (auth instanceof Response) return auth

        const url = new URL(request.url)
        const parsed = AuditLogQuerySchema.safeParse(Object.fromEntries(url.searchParams))
        if (!parsed.success) {
          return errorResponse(parsed.error.issues[0]?.message ?? 'Invalid query', 400)
        }
        const { page, limit, action, adminId } = parsed.data

        const where: Prisma.AuditLogWhereInput = {}
        if (action) where.action = action
        if (adminId) where.adminId = adminId

        const [data, total] = await Promise.all([
          db.auditLog.findMany({
            where,
            include: { admin: { select: { email: true } } },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
          }),
          db.auditLog.count({ where }),
        ])

        return jsonResponse({
          data,
          total,
          page,
          totalPages: Math.max(1, Math.ceil(total / limit)),
        })
      },
    },
  },
})
