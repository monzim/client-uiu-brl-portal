export type AuditAction =
  | 'news.create'
  | 'news.update'
  | 'news.delete'
  | 'faculty.create'
  | 'faculty.update'
  | 'faculty.delete'
  | 'auth.login'

export function auditLog(
  action: AuditAction,
  adminEmail: string,
  meta: Record<string, unknown> = {},
) {
  console.log(
    JSON.stringify({
      level: 'audit',
      action,
      admin: adminEmail,
      ts: new Date().toISOString(),
      ...meta,
    }),
  )
}
