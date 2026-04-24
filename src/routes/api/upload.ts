import { createFileRoute } from '@tanstack/react-router'
import { getAuthPayload, jsonResponse, errorResponse } from '#/lib/serverHelpers'
import { checkRateLimit, getClientIp } from '#/lib/rateLimit'
import { uploadFile, ensureBucket } from '#/lib/storage'

const MAX_SIZE = 5 * 1024 * 1024

type DetectedMime = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif'

function detectMimeFromBytes(buf: Buffer): DetectedMime | null {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg'
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'image/png'
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) return 'image/gif'
  if (
    buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
    buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50
  ) return 'image/webp'
  return null
}

export const Route = createFileRoute('/api/upload')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)

        const ip = getClientIp(request)
        const rl = checkRateLimit(`upload:${ip}`, 30, 60 * 1000)
        if (!rl.allowed) {
          return new Response(JSON.stringify({ message: 'Upload rate limit exceeded' }), {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': String(rl.retryAfterSeconds),
            },
          })
        }

        let formData: FormData
        try {
          formData = await request.formData()
        } catch {
          return errorResponse('Invalid form data', 400)
        }

        const file = formData.get('file') as File | null
        if (!file) return errorResponse('No file provided', 400)
        if (file.size > MAX_SIZE) return errorResponse('File too large (max 5 MB)', 400)

        const buffer = Buffer.from(await file.arrayBuffer())
        const detectedMime = detectMimeFromBytes(buffer)
        if (!detectedMime) return errorResponse('Only JPEG, PNG, WebP, GIF allowed', 400)

        await ensureBucket()
        const url = await uploadFile(buffer, file.name, detectedMime)
        return jsonResponse({ url })
      },
    },
  },
})
