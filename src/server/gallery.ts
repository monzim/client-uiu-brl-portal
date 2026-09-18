'use server'
import { createServerFn } from '@tanstack/react-start'
import { db } from '#/lib/db'
import {
  GALLERY_CATEGORY_ORDER,
  GALLERY_IMAGE_ORDER,
  getGalleryPageData,
  readGallerySettings,
} from '#/lib/gallery'
import type {
  DbGalleryCategory,
  DbGalleryImage,
  DbGallerySettings,
  GalleryPageData,
} from '#/types/cms'

export interface AdminGalleryData {
  images: DbGalleryImage[]
  categories: DbGalleryCategory[]
}

/** Public page loader — cached settings + categories + published images. */
export const getGalleryPage = createServerFn({ method: 'GET' }).handler(
  async (): Promise<GalleryPageData> => getGalleryPageData(),
)

/** Admin list: drafts included, cache bypassed. */
export const getAdminGallery = createServerFn({ method: 'GET' }).handler(
  async (): Promise<AdminGalleryData> => {
    const [images, categories] = await Promise.all([
      db.galleryImage.findMany({ orderBy: GALLERY_IMAGE_ORDER }),
      db.galleryCategory.findMany({ orderBy: GALLERY_CATEGORY_ORDER }),
    ])
    return { images, categories }
  },
)

export const getAdminGalleryImage = createServerFn({ method: 'GET' }).handler(
  // @ts-expect-error - createServerFn doesn't type parameterized input in this version
  async (ctx: { data: string }): Promise<DbGalleryImage | null> =>
    db.galleryImage.findUnique({ where: { id: ctx.data } }),
)

export const getAdminGalleryCategories = createServerFn({
  method: 'GET',
}).handler(
  async (): Promise<DbGalleryCategory[]> =>
    db.galleryCategory.findMany({ orderBy: GALLERY_CATEGORY_ORDER }),
)

export const getAdminGalleryCategory = createServerFn({
  method: 'GET',
}).handler(
  // @ts-expect-error - createServerFn doesn't type parameterized input in this version
  async (ctx: { data: string }): Promise<DbGalleryCategory | null> =>
    db.galleryCategory.findUnique({ where: { id: ctx.data } }),
)

/**
 * Reads through the same cache as the public page; `readGallerySettings` falls
 * back to the defaults, so the settings form always has something to edit.
 */
export const getGallerySettings = createServerFn({ method: 'GET' }).handler(
  async (): Promise<DbGallerySettings> => readGallerySettings(),
)
