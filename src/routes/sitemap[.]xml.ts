import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { cached } from '#/lib/redis'
import { STATIC_ENTRIES, buildSitemapXml, getPublicOrigin } from '#/lib/sitemap'
import type { SitemapEntry } from '#/lib/sitemap'

async function getDynamicEntries(): Promise<SitemapEntry[]> {
  const [news, faculty] = await cached('sitemap:dynamic', 3600, () =>
    Promise.all([
      db.news.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      db.faculty.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
    ]),
  )
  return [
    ...news.map((n) => ({
      path: `/news/${n.slug}`,
      lastmod: new Date(n.updatedAt),
      changefreq: 'monthly' as const,
      priority: 0.7,
    })),
    ...faculty.map((f) => ({
      path: `/faculty/${f.slug}`,
      lastmod: new Date(f.updatedAt),
      changefreq: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        let dynamic: SitemapEntry[] = []
        try {
          dynamic = await getDynamicEntries()
        } catch (error) {
          // Still serve the static pages if the database is unavailable.
          console.error('[sitemap] failed to load dynamic entries', error)
        }
        const xml = buildSitemapXml(getPublicOrigin(request), [
          ...STATIC_ENTRIES,
          ...dynamic,
        ])
        return new Response(xml, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        })
      },
    },
  },
})
