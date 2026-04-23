import { createFileRoute } from '@tanstack/react-router'
import { getAuthPayload, jsonResponse, errorResponse } from '#/lib/serverHelpers'
import { uploadFile, ensureBucket } from '#/lib/storage'

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
const MAX_SIZE = 5 * 1024 * 1024

export const Route = createFileRoute('/api/upload')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)

        let formData: FormData
        try {
          formData = await request.formData()
        } catch {
          return errorResponse('Invalid form data', 400)
        }

        const file = formData.get('file') as File | null
        if (!file) return errorResponse('No file provided', 400)
        if (!ALLOWED_TYPES.has(file.type)) {
          return errorResponse('Only JPEG, PNG, WebP, GIF allowed', 400)
        }
        if (file.size > MAX_SIZE) {
          return errorResponse('File too large (max 5 MB)', 400)
        }

        await ensureBucket()
        const buffer = Buffer.from(await file.arrayBuffer())
        const url = await uploadFile(buffer, file.name, file.type)
        return jsonResponse({ url })
      },
    },
  },
})
