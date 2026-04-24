'use server'
import { createServerFn } from '@tanstack/react-start'
import { db } from '#/lib/db'
import { cached, CACHE_KEYS, CACHE_TTL } from '#/lib/redis'
import type { DbFaculty } from '#/types/cms'

export const getAdminFacultyList = createServerFn({ method: 'GET' }).handler(
  async (): Promise<DbFaculty[]> => {
    const rows = await db.faculty.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] })
    return rows as unknown as DbFaculty[]
  },
)

export const getAdminFacultyItem = createServerFn({ method: 'GET' }).handler(
  // @ts-expect-error - createServerFn doesn't type parameterized input in this version
  async (ctx: { data: string }): Promise<DbFaculty | null> => {
    const row = await db.faculty.findUnique({ where: { slug: ctx.data } as any })
    return row as unknown as DbFaculty | null
  },
)

export const getFacultyList = createServerFn({ method: 'GET' }).handler(
  async (): Promise<DbFaculty[]> => {
    const rows = await cached(CACHE_KEYS.facultyList(), CACHE_TTL.facultyList, () =>
      db.faculty.findMany({
        where: { published: true },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      }),
    )
    return rows as unknown as DbFaculty[]
  },
)

export const getFacultyItem = createServerFn({ method: 'GET' }).handler(
  // @ts-expect-error - createServerFn doesn't type parameterized input in this version
  async (ctx: { data: string }): Promise<DbFaculty | null> => {
    const slug = ctx.data
    const row = await cached(
      CACHE_KEYS.facultyItem(slug),
      CACHE_TTL.facultyItem,
      async () => db.faculty.findUnique({ where: { slug, published: true } as any }),
    )
    return row as unknown as DbFaculty | null
  },
)
