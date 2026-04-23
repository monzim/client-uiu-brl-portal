'use server'
import { createServerFn } from '@tanstack/react-start'
import { db } from '#/lib/db'
import { cached, CACHE_KEYS, CACHE_TTL } from '#/lib/redis'
import type { DbFaculty } from '#/types/cms'

export const getAdminFacultyList = createServerFn({ method: 'GET' }).handler(
  (): Promise<DbFaculty[]> =>
    db.faculty.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] }),
)

export const getAdminFacultyItem = createServerFn({ method: 'GET' }).handler(
  // @ts-expect-error - createServerFn doesn't type parameterized input in this version
  (ctx: { data: string }): Promise<DbFaculty | null> =>
    db.faculty.findUnique({ where: { slug: ctx.data } as any }),
)

export const getFacultyList = createServerFn({ method: 'GET' }).handler(
  (): Promise<DbFaculty[]> =>
    cached(CACHE_KEYS.facultyList(), CACHE_TTL.facultyList, () =>
      db.faculty.findMany({
        where: { published: true },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      }),
    ) as Promise<DbFaculty[]>,
)

export const getFacultyItem = createServerFn({ method: 'GET' }).handler(
  // @ts-expect-error - createServerFn doesn't type parameterized input in this version
  (ctx: { data: string }): Promise<DbFaculty | null> => {
    const slug = ctx.data
    return cached(
      CACHE_KEYS.facultyItem(slug),
      CACHE_TTL.facultyItem,
      async () => {
        return db.faculty.findUnique({ where: { slug, published: true } as any })
      },
    ) as Promise<DbFaculty | null>
  },
)
