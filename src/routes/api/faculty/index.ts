import { createFileRoute } from '@tanstack/react-router'
import { db } from '#/lib/db'
import {
  cached,
  CACHE_KEYS,
  CACHE_TTL,
  invalidateFacultyLists,
} from '#/lib/redis'
import {
  getAuthPayload,
  jsonResponse,
  errorResponse,
} from '#/lib/serverHelpers'
import { CreateFacultySchema } from '#/lib/schemas'
import { auditLog } from '#/lib/audit'
import { MEMBER_TYPES } from '#/types/cms'
import type { MemberType } from '#/types/cms'

export const Route = createFileRoute('/api/faculty/')({
  server: {
    handlers: {
      // `?type=FACULTY|RESEARCH_ASSISTANT` narrows the list; omitting it returns
      // every published member, as before.
      GET: async ({ request }) => {
        const requested = new URL(request.url).searchParams.get('type')
        if (requested && !MEMBER_TYPES.includes(requested as MemberType)) {
          return errorResponse('Invalid type', 400)
        }
        const memberType = (requested as MemberType | null) ?? undefined
        const data = await cached(
          CACHE_KEYS.facultyList(memberType),
          CACHE_TTL.facultyList,
          () =>
            db.faculty.findMany({
              where: { published: true, ...(memberType ? { memberType } : {}) },
              orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
            }),
        )
        return jsonResponse(data)
      },
      POST: async ({ request }) => {
        const payload = await getAuthPayload(request)
        if (!payload) return errorResponse('Unauthorized', 401)
        const raw = await request.json().catch(() => null)
        if (!raw) return errorResponse('Invalid body', 400)
        const result = CreateFacultySchema.safeParse(raw)
        if (!result.success)
          return errorResponse(
            result.error.issues[0]?.message ?? 'Validation failed',
            400,
          )
        const faculty = await db.faculty.create({ data: result.data })
        await invalidateFacultyLists()
        auditLog('faculty.create', payload.adminId, payload.email, {
          facultyId: faculty.id,
          slug: faculty.slug,
        })
        return jsonResponse(faculty, { status: 201 })
      },
    },
  },
})
