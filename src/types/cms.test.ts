import { describe, expect, it } from 'vitest'
import { compareGalleryImages, galleryImageAlt } from './cms'
import type { DbGalleryImage } from './cms'

function image(overrides: Partial<DbGalleryImage>): DbGalleryImage {
  return {
    id: 'id',
    url: 'https://cdn.example.com/a.webp',
    caption: 'Caption',
    description: null,
    altText: null,
    categoryId: null,
    featured: false,
    published: true,
    sortOrder: 0,
    takenAt: null,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}

describe('galleryImageAlt', () => {
  it('falls back to the caption when alt text is missing or blank', () => {
    expect(galleryImageAlt(image({ altText: null }))).toBe('Caption')
    expect(galleryImageAlt(image({ altText: '   ' }))).toBe('Caption')
  })

  it('uses alt text when present', () => {
    expect(galleryImageAlt(image({ altText: 'A microscope' }))).toBe(
      'A microscope',
    )
  })
})

describe('compareGalleryImages', () => {
  it('orders by sortOrder first', () => {
    const sorted = [
      image({ id: 'b', sortOrder: 2 }),
      image({ id: 'a', sortOrder: 1 }),
    ].sort(compareGalleryImages)
    expect(sorted.map((i) => i.id)).toEqual(['a', 'b'])
  })

  it('breaks ties with the newest image first', () => {
    const sorted = [
      image({ id: 'old', createdAt: '2026-01-01T00:00:00.000Z' }),
      image({ id: 'new', createdAt: '2026-06-01T00:00:00.000Z' }),
    ].sort(compareGalleryImages)
    expect(sorted.map((i) => i.id)).toEqual(['new', 'old'])
  })
})
