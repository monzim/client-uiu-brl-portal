import { describe, expect, it } from 'vitest'
import {
  STATIC_ENTRIES,
  buildRobotsTxt,
  buildSitemapXml,
  getPublicOrigin,
} from './sitemap'

describe('getPublicOrigin', () => {
  it('uses the request URL when no proxy headers are present', () => {
    expect(
      getPublicOrigin(new Request('http://localhost:3000/sitemap.xml')),
    ).toBe('http://localhost:3000')
  })

  it('prefers X-Forwarded-* headers set by the reverse proxy', () => {
    const request = new Request('http://10.0.0.5:3000/sitemap.xml', {
      headers: {
        'x-forwarded-proto': 'https, http',
        'x-forwarded-host': 'brl.example.com',
      },
    })
    expect(getPublicOrigin(request)).toBe('https://brl.example.com')
  })
})

describe('buildSitemapXml', () => {
  it('renders absolute, escaped URLs with optional fields', () => {
    const xml = buildSitemapXml('https://brl.example.com', [
      { path: '/', priority: 1, changefreq: 'weekly' },
      { path: '/news/a&b', lastmod: new Date('2026-09-01T10:00:00Z') },
    ])
    expect(xml).toContain('<loc>https://brl.example.com/</loc>')
    expect(xml).toContain('<priority>1.0</priority>')
    expect(xml).toContain('<changefreq>weekly</changefreq>')
    expect(xml).toContain('<loc>https://brl.example.com/news/a&amp;b</loc>')
    expect(xml).toContain('<lastmod>2026-09-01</lastmod>')
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true)
  })

  it('lists every static page exactly once', () => {
    const paths = STATIC_ENTRIES.map((entry) => entry.path)
    expect(new Set(paths).size).toBe(paths.length)
    expect(paths).toContain('/')
    expect(paths.some((path) => path.startsWith('/area/'))).toBe(true)
    expect(paths.some((path) => path.startsWith('/projects/'))).toBe(true)
  })
})

describe('buildRobotsTxt', () => {
  it('blocks admin/api and points at the sitemap on the same origin', () => {
    const robots = buildRobotsTxt('https://brl.example.com')
    expect(robots).toContain('Disallow: /admin')
    expect(robots).toContain('Disallow: /api/')
    expect(robots).toContain('Sitemap: https://brl.example.com/sitemap.xml')
  })
})
