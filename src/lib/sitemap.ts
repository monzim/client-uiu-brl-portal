import { currentProjects } from '../data/currentproject'
import { researchAreas } from '../data/data'

export interface SitemapEntry {
  path: string
  lastmod?: Date
  changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority?: number
}

export const STATIC_ENTRIES: SitemapEntry[] = [
  { path: '/', changefreq: 'weekly', priority: 1 },
  { path: '/about', changefreq: 'monthly', priority: 0.8 },
  { path: '/area', changefreq: 'monthly', priority: 0.8 },
  { path: '/faculty', changefreq: 'weekly', priority: 0.8 },
  { path: '/news', changefreq: 'daily', priority: 0.9 },
  { path: '/assistants', changefreq: 'monthly', priority: 0.6 },
  { path: '/equipment', changefreq: 'monthly', priority: 0.6 },
  { path: '/gallery', changefreq: 'monthly', priority: 0.6 },
  { path: '/awards', changefreq: 'monthly', priority: 0.6 },
  { path: '/partnership', changefreq: 'monthly', priority: 0.6 },
  { path: '/privacy', changefreq: 'yearly', priority: 0.2 },
  ...researchAreas.map((area) => ({
    path: `/area/${area.id}`,
    changefreq: 'monthly' as const,
    priority: 0.7,
  })),
  ...currentProjects.map((project) => ({
    path: `/projects/${project.id}`,
    changefreq: 'monthly' as const,
    priority: 0.7,
  })),
]

/**
 * Public origin of the site as seen by the client. Behind Traefik the request
 * URL is the internal one, so prefer the X-Forwarded-* headers.
 */
export function getPublicOrigin(request: Request): string {
  const url = new URL(request.url)
  const proto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim()
  const host = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim()
  return `${proto || url.protocol.replace(':', '')}://${host || url.host}`
}

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export function buildSitemapXml(
  origin: string,
  entries: SitemapEntry[],
): string {
  const urls = entries.map((entry) => {
    const parts = [
      `    <loc>${escapeXml(origin + encodeURI(entry.path))}</loc>`,
    ]
    if (entry.lastmod)
      parts.push(
        `    <lastmod>${entry.lastmod.toISOString().slice(0, 10)}</lastmod>`,
      )
    if (entry.changefreq)
      parts.push(`    <changefreq>${entry.changefreq}</changefreq>`)
    if (entry.priority !== undefined)
      parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`)
    return `  <url>\n${parts.join('\n')}\n  </url>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}

export function buildRobotsTxt(origin: string): string {
  return `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`
}
