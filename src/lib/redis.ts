import Redis from 'ioredis'

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
  facultyList: () => 'faculty:list',
  facultyItem: (id: string) => `faculty:${id}`,
} as const

export const CACHE_TTL = {
  newsList: 300,
  newsItem: 600,
  facultyList: 600,
  facultyItem: 1800,
} as const
