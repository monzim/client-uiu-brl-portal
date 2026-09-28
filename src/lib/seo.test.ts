import { describe, expect, it } from 'vitest'
import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, pageMeta } from './seo'

const find = (meta: ReturnType<typeof pageMeta>, key: string) =>
  meta.find(
    (m) =>
      ('name' in m && m.name === key) ||
      ('property' in m && m.property === key),
  )

describe('pageMeta', () => {
  it('suffixes the site name and fills defaults', () => {
    const meta = pageMeta({ title: 'Gallery' })
    expect(meta[0]).toEqual({ title: `Gallery | ${SITE_NAME}` })
    expect(find(meta, 'description')).toMatchObject({
      content: SITE_DESCRIPTION,
    })
    expect(find(meta, 'og:image')).toMatchObject({ content: DEFAULT_OG_IMAGE })
    expect(find(meta, 'og:type')).toMatchObject({ content: 'website' })
  })

  it('does not double the site name on the home page', () => {
    expect(pageMeta({ title: SITE_NAME })[0]).toEqual({ title: SITE_NAME })
  })

  it('falls back when description or image are null (e.g. CMS rows)', () => {
    const meta = pageMeta({
      title: 'News',
      description: null,
      image: null,
      type: 'article',
    })
    expect(find(meta, 'description')).toMatchObject({
      content: SITE_DESCRIPTION,
    })
    expect(find(meta, 'og:image')).toMatchObject({ content: DEFAULT_OG_IMAGE })
    expect(find(meta, 'og:type')).toMatchObject({ content: 'article' })
  })
})
