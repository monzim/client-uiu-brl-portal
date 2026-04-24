import type { Prisma } from '@prisma/client'
import { db } from '#/lib/db'

export type AuditAction =
  | 'news.create'
  | 'news.update'
  | 'news.delete'
  | 'faculty.create'
  | 'faculty.update'
  | 'faculty.delete'
  | 'auth.login'
  | 'auth.logout'
  | 'user.create'
  | 'user.block'
  | 'user.unblock'

export function auditLog(
  action: AuditAction,
  adminId: string,
  adminEmail: string,
  meta: Record<string, unknown> = {},
): void {
  console.log(
    JSON.stringify({
      level: 'audit',
      action,
      admin: adminEmail,
      ts: new Date().toISOString(),
      ...meta,
    }),
  )
  db.auditLog
    .create({
      data: {
        action,
        adminId,
        meta: meta as Prisma.InputJsonValue,
      },
    })
    .catch((err: unknown) => {
      console.error('[audit] DB write failed', err)
    })
}
