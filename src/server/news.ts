'use server'
import { createServerFn } from '@tanstack/react-start'
import { db } from '#/lib/db'
import { cached, CACHE_KEYS, CACHE_TTL } from '#/lib/redis'
import type { DbNewsListItem, DbNews } from '#/types/cms'

export const getAdminNewsList = createServerFn({ method: 'GET' }).handler(
  (): Promise<DbNews[]> =>
    db.news.findMany({ orderBy: { createdAt: 'desc' } }),
)

export const getAdminNewsItem = createServerFn({ method: 'GET' }).handler(
  // @ts-expect-error - createServerFn doesn't type parameterized input in this version
  (ctx: { data: string }): Promise<DbNews | null> =>
    db.news.findUnique({ where: { slug: ctx.data } as any }),
)

export const getNewsList = createServerFn({ method: 'GET' }).handler(
  (): Promise<DbNewsListItem[]> =>
    cached(CACHE_KEYS.newsList(), CACHE_TTL.newsList, () =>
      db.news.findMany({
        where: { published: true },
        orderBy: { date: 'desc' },
        select: {
          id: true,
          slug: true,
          title: true,
          date: true,
          description: true,
          image: true,
        },
      }),
    ) as Promise<DbNewsListItem[]>,
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNewsItem = createServerFn({ method: 'GET' }).handler(
  // @ts-expect-error - createServerFn doesn't type parameterized input in this version
  (ctx: { data: string }): Promise<DbNews | null> => {
    const slug = ctx.data
    return cached(CACHE_KEYS.newsItem(slug), CACHE_TTL.newsItem, async () => {
      return db.news.findUnique({ where: { slug, published: true } as any })
    }) as Promise<DbNews | null>
  },
)
