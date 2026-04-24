import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { jsonResponse, errorResponse, requireSuperUser } from '#/lib/serverHelpers'
import { PatchAdminSchema } from '#/lib/schemas'
import { auditLog } from '#/lib/audit'

export const Route = createFileRoute('/api/superuser/users/$id')({
  server: {
    handlers: {
      PATCH: async ({ request, params }) => {
        const auth = await requireSuperUser(request)
        if (auth instanceof Response) return auth

        if (params.id === auth.adminId) {
          return errorResponse('Cannot modify your own account', 400)
        }

        const raw = await request.json().catch(() => null)
        if (!raw) return errorResponse('Invalid body', 400)
        const result = PatchAdminSchema.safeParse(raw)
        if (!result.success) {
          return errorResponse(result.error.issues[0]?.message ?? 'Validation failed', 400)
        }

        const target = await db.admin.findUnique({
          where: { id: params.id },
          select: { id: true, email: true, role: true },
        })
        if (!target) return errorResponse('User not found', 404)
        if (target.role === 'SUPERUSER') {
          return errorResponse('Cannot modify another superuser', 403)
        }

        const updated = await db.admin.update({
          where: { id: target.id },
          data: { isBlocked: result.data.isBlocked },
          select: {
            id: true,
            email: true,
            role: true,
            isBlocked: true,
            createdAt: true,
          },
        })

        auditLog(
          result.data.isBlocked ? 'user.block' : 'user.unblock',
          auth.adminId,
          auth.email,
          { targetAdminId: target.id, targetAdminEmail: target.email },
        )

        return jsonResponse(updated)
      },
    },
  },
})
