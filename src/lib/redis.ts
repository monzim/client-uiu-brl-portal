import Redis from 'ioredis'
import type { MemberType } from '../types/cms'

const globalForRedis = globalThis as unknown as { redis?: Redis }

export const redis =
  globalForRedis.redis ??
  new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
  })

globalForRedis.redis = redis

export async function cached<T>(
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>,
): Promise<T> {
  try {
    const hit = await redis.get(key)
    if (hit) {
      try {
        return JSON.parse(hit) as T
      } catch {
        await redis.del(key).catch(() => {})
      }
    }
  } catch {
    // Redis unavailable — fall through
  }
  const data = await fetcher()
  try {
    await redis.setex(key, ttlSeconds, JSON.stringify(data))
  } catch {
    // non-fatal
  }
  return data
}

export const CACHE_KEYS = {
  newsList: () => 'news:list',
  newsItem: (id: string) => `news:${id}`,
  /** Omit `memberType` for the combined list of every published member. */
  facultyList: (memberType?: MemberType) =>
    memberType ? `faculty:list:${memberType}` : 'faculty:list',
  facultyItem: (id: string) => `faculty:${id}`,
  galleryPage: () => 'gallery:page',
  galleryImages: () => 'gallery:images',
  galleryCategories: () => 'gallery:categories',
  gallerySettings: () => 'gallery:settings',
} as const

/**
 * A member's type can change on edit, so a write invalidates every list variant
 * rather than trying to guess which ones the record used to belong to.
 */
export function invalidateFacultyLists(): Promise<unknown> {
  return Promise.allSettled([
    redis.del(CACHE_KEYS.facultyList()),
    redis.del(CACHE_KEYS.facultyList('FACULTY')),
    redis.del(CACHE_KEYS.facultyList('RESEARCH_ASSISTANT')),
  ])
}

/**
 * Images, categories and settings all feed the same public page, so any gallery
 * write drops every gallery key rather than reasoning about which view changed.
 */
export function invalidateGallery(): Promise<unknown> {
  return Promise.allSettled([
    redis.del(CACHE_KEYS.galleryPage()),
    redis.del(CACHE_KEYS.galleryImages()),
    redis.del(CACHE_KEYS.galleryCategories()),
    redis.del(CACHE_KEYS.gallerySettings()),
  ])
}

export const CACHE_TTL = {
  newsList: 300,
  newsItem: 600,
  facultyList: 600,
  facultyItem: 1800,
  gallery: 600,
} as const
