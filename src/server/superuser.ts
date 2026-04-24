'use server'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import type { Prisma } from '@prisma/client'
import { db } from '#/lib/db'
import { verifyToken, AUTH_COOKIE, parseCookieHeader } from '#/lib/auth'
import type { AdminJWTPayload } from '#/lib/auth'

async function ensureSuperUser(): Promise<AdminJWTPayload> {
  const request = getRequest()
  const cookieHeader = request.headers.get('cookie') ?? ''
  const token = parseCookieHeader(cookieHeader, AUTH_COOKIE)
  if (!token) throw new Error('Unauthorized')
  const payload = await verifyToken(token)
  if (!payload) throw new Error('Unauthorized')
  if (payload.role !== 'SUPERUSER') throw new Error('Forbidden')
  return payload
}

export const getAdminUsersList = createServerFn({ method: 'GET' }).handler(
  async () => {
    await ensureSuperUser()
    return db.admin.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        isBlocked: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  },
)

export const getAuditLogs = createServerFn({ method: 'GET' }).handler(
  // @ts-expect-error - createServerFn doesn't type parameterized input in this version
  async (ctx: {
    data: { page?: number; limit?: number; action?: string; adminId?: string }
  }) => {
    await ensureSuperUser()
    const page = Math.max(1, ctx.data.page ?? 1)
    const limit = Math.min(100, Math.max(1, ctx.data.limit ?? 50))
    const where: Prisma.AuditLogWhereInput = {}
    if (ctx.data.action) where.action = ctx.data.action
    if (ctx.data.adminId) where.adminId = ctx.data.adminId

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

    return {
      data,
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    }
  },
)
