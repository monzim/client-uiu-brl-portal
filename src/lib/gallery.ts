import { db } from '#/lib/db'
import { cached, CACHE_KEYS, CACHE_TTL } from '#/lib/redis'
import { DEFAULT_GALLERY_SETTINGS, GALLERY_SETTINGS_ID } from '#/types/cms'
import type {
  DbGalleryCategory,
  DbGalleryImage,
  DbGallerySettings,
  GalleryPageData,
} from '#/types/cms'

/** Explicit order first, newest next — mirrored by `compareGalleryImages`. */
export const GALLERY_IMAGE_ORDER = [
  { sortOrder: 'asc' as const },
  { createdAt: 'desc' as const },
]

export const GALLERY_CATEGORY_ORDER = [
  { sortOrder: 'asc' as const },
  { name: 'asc' as const },
]

/**
 * An image is public when it is published *and* not filed under a hidden album,
 * so hiding an album takes its photos off the public page too.
 */
async function queryPublishedImages(publishedCategoryIds: string[]) {
  return db.galleryImage.findMany({
    where: {
      published: true,
      OR: [{ categoryId: null }, { categoryId: { in: publishedCategoryIds } }],
    },
    orderBy: GALLERY_IMAGE_ORDER,
  })
}

export function listPublishedGalleryImages(): Promise<DbGalleryImage[]> {
  return cached(CACHE_KEYS.galleryImages(), CACHE_TTL.gallery, async () => {
    const categories = await db.galleryCategory.findMany({
      where: { published: true },
      select: { id: true },
    })
    return queryPublishedImages(categories.map((category) => category.id))
  })
}

export function listPublishedGalleryCategories(): Promise<DbGalleryCategory[]> {
  return cached(CACHE_KEYS.galleryCategories(), CACHE_TTL.gallery, () =>
    db.galleryCategory.findMany({
      where: { published: true },
      orderBy: GALLERY_CATEGORY_ORDER,
    }),
  )
}

/**
 * The settings row is created lazily, so a database that has never been through
 * the settings screen still renders the page with the defaults.
 */
export function readGallerySettings(): Promise<DbGallerySettings> {
  return cached(CACHE_KEYS.gallerySettings(), CACHE_TTL.gallery, async () => {
    const row = await db.gallerySettings.findUnique({
      where: { id: GALLERY_SETTINGS_ID },
    })
    return row ?? DEFAULT_GALLERY_SETTINGS
  })
}

/**
 * One cached payload for the public page: settings, the categories that still
 * have visible images, and every published image.
 *
 * Counts are computed here instead of with a filtered relation count so the
 * numbers always match the exact image list the page renders.
 */
export function getGalleryPageData(): Promise<GalleryPageData> {
  return cached(CACHE_KEYS.galleryPage(), CACHE_TTL.gallery, async () => {
    const [settings, categories] = await Promise.all([
      db.gallerySettings.findUnique({ where: { id: GALLERY_SETTINGS_ID } }),
      db.galleryCategory.findMany({
        where: { published: true },
        orderBy: GALLERY_CATEGORY_ORDER,
      }),
    ])
    const images = await queryPublishedImages(
      categories.map((category) => category.id),
    )

    const counts = new Map<string, number>()
    for (const image of images) {
      if (!image.categoryId) continue
      counts.set(image.categoryId, (counts.get(image.categoryId) ?? 0) + 1)
    }

    return {
      settings: settings ?? DEFAULT_GALLERY_SETTINGS,
      categories: categories
        .map((category) => ({
          ...category,
          imageCount: counts.get(category.id) ?? 0,
        }))
        .filter((category) => category.imageCount > 0),
      images,
    }
  })
}

/**
 * Rejects a `categoryId` that does not exist, so a bad reference fails as a 400
 * instead of a Prisma foreign-key error.
 */
export async function categoryExists(id: string): Promise<boolean> {
  const found = await db.galleryCategory.findUnique({
    where: { id },
    select: { id: true },
  })
  return found !== null
}
