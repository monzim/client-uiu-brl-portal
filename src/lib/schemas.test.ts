import { describe, expect, it } from 'vitest'
import {
  CreateGalleryCategorySchema,
  CreateGalleryImageSchema,
  CreateGalleryImagesSchema,
  ReorderGallerySchema,
  UpdateGallerySettingsSchema,
} from './schemas'

describe('CreateGalleryImageSchema', () => {
  it('applies defaults for optional publishing fields', () => {
    const parsed = CreateGalleryImageSchema.parse({
      url: 'https://cdn.example.com/a.webp',
      caption: 'Cell culture bench',
    })
    expect(parsed).toMatchObject({
      featured: false,
      published: true,
      sortOrder: 0,
    })
  })

  it('rejects a caption-less image', () => {
    const result = CreateGalleryImageSchema.safeParse({
      url: 'https://cdn.example.com/a.webp',
      caption: '',
    })
    expect(result.success).toBe(false)
  })

  it('rejects a non-url source', () => {
    const result = CreateGalleryImageSchema.safeParse({
      url: 'not-a-url',
      caption: 'Bench',
    })
    expect(result.success).toBe(false)
  })
})

describe('CreateGalleryImagesSchema', () => {
  it('accepts a single image or a batch', () => {
    const one = { url: 'https://cdn.example.com/a.webp', caption: 'One' }
    expect(CreateGalleryImagesSchema.safeParse(one).success).toBe(true)
    expect(CreateGalleryImagesSchema.safeParse([one, one]).success).toBe(true)
  })

  it('rejects an empty batch', () => {
    expect(CreateGalleryImagesSchema.safeParse([]).success).toBe(false)
  })
})

describe('CreateGalleryCategorySchema', () => {
  it('requires a url-safe slug', () => {
    expect(
      CreateGalleryCategorySchema.safeParse({ slug: 'lab-work', name: 'Lab' })
        .success,
    ).toBe(true)
    expect(
      CreateGalleryCategorySchema.safeParse({ slug: 'Lab Work', name: 'Lab' })
        .success,
    ).toBe(false)
  })
})

describe('ReorderGallerySchema', () => {
  it('requires at least one item', () => {
    expect(ReorderGallerySchema.safeParse({ items: [] }).success).toBe(false)
    expect(
      ReorderGallerySchema.safeParse({ items: [{ id: 'a', sortOrder: 0 }] })
        .success,
    ).toBe(true)
  })
})

describe('UpdateGallerySettingsSchema', () => {
  it('requires the fields the public page always renders', () => {
    const result = UpdateGallerySettingsSchema.safeParse({
      heroTitle: 'Inside the Laboratory.',
      metaTitle: 'Gallery',
      metaDescription: 'Photos of the lab',
    })
    expect(result.success).toBe(true)
    expect(result.success && result.data.showCategoryFilter).toBe(true)
  })

  it('rejects a missing headline', () => {
    expect(
      UpdateGallerySettingsSchema.safeParse({
        heroTitle: '',
        metaTitle: 'Gallery',
        metaDescription: 'Photos',
      }).success,
    ).toBe(false)
  })
})

describe('gallery asset paths', () => {
  it('accepts a root-relative path from public/', () => {
    expect(
      CreateGalleryImageSchema.safeParse({
        url: '/work_picture/Cell Culture.webp',
        caption: 'Cell culture',
      }).success,
    ).toBe(true)
  })
})
