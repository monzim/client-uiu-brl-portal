import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import { invalidateGallery } from '#/lib/redis'
import {
  getAuthPayload,
  jsonResponse,
  errorResponse,
} from '#/lib/serverHelpers'
import { UpdateGallerySettingsSchema } from '#/lib/schemas'
import { auditLog } from '#/lib/audit'
import { readGallerySettings } from '#/lib/gallery'
import { GALLERY_SETTINGS_ID } from '#/types/cms'

export const Route = createFileRoute('/api/gallery/settings')({
  server: {
    handlers: {
      GET: async () => jsonResponse(await readGallerySettings()),
      // Upsert: the single settings row is created on first save.
      PUT: async ({ request }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const raw = await request.json().catch(() => null)
        if (!raw) return errorResponse('Invalid body', 400)

        const result = UpdateGallerySettingsSchema.safeParse(raw)
        if (!result.success)
          return errorResponse(
            result.error.issues[0]?.message ?? 'Validation failed',
            400,
          )

        const settings = await db.gallerySettings.upsert({
          where: { id: GALLERY_SETTINGS_ID },
          update: result.data,
          create: { id: GALLERY_SETTINGS_ID, ...result.data },
        })
        await invalidateGallery()
        auditLog('gallery.settings.update', payload.adminId, payload.email, {})
        return jsonResponse(settings)
      },
    },
  },
})
