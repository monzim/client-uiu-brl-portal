import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import {
  getAuthPayload,
  jsonResponse,
  errorResponse,
} from '#/lib/serverHelpers'
import { GALLERY_CATEGORY_ORDER, GALLERY_IMAGE_ORDER } from '#/lib/gallery'

/** Uncached admin view: every image and category, drafts included. */
export const Route = createFileRoute('/api/gallery/admin')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const [images, categories] = await Promise.all([
          db.galleryImage.findMany({ orderBy: GALLERY_IMAGE_ORDER }),
          db.galleryCategory.findMany({ orderBy: GALLERY_CATEGORY_ORDER }),
        ])
        return jsonResponse({ images, categories })
      },
    },
  },
})
