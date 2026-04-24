import { z } from 'zod'

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const PublicationSchema = z.object({
  title: z.string().min(1),
  authors: z.string().min(1),
  venue: z.string().min(1),
  year: z.string().min(4).max(4),
  type: z.enum(['journal', 'conference', 'book', 'thesis', 'other']),
  doi: z.string().optional(),
  url: z.string().url().optional(),
  note: z.string().optional(),
})

export const ImportantLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
})

export const CreateNewsSchema = z.object({
  slug: z.string().regex(slugRegex, 'Slug must be lowercase alphanumeric with hyphens'),
  title: z.string().min(1).max(500),
  date: z.string().datetime().optional(),
  description: z.string().min(1).max(2000),
  content: z.string(),
  image: z.string().url().nullable().optional(),
  published: z.boolean().default(false),
})

export const UpdateNewsSchema = CreateNewsSchema.partial()

export const CreateFacultySchema = z.object({
  slug: z.string().regex(slugRegex, 'Slug must be lowercase alphanumeric with hyphens'),
  name: z.string().min(1).max(200),
  designation: z.string().min(1).max(200),
  department: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().nullable().optional(),
  room: z.string().nullable().optional(),
  image: z.string().url().nullable().optional(),
  coverImage: z.string().url().nullable().optional(),
  profileDescription: z.string().min(1),
  fullBio: z.string().nullable().optional(),
  researchGeneral: z.string().nullable().optional(),
  education: z.array(z.string()).default([]),
  positionHeld: z.array(z.string()).default([]),
  honors: z.array(z.string()).default([]),
  researchInterests: z.array(z.string()).default([]),
  researchProjects: z.array(z.string()).default([]),
  publications: z.array(PublicationSchema).default([]),
  importantLinks: z.array(ImportantLinkSchema).default([]),
  published: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
})

export const UpdateFacultySchema = CreateFacultySchema.partial()

export const CreateAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['ADMIN', 'SUPERUSER']).default('ADMIN'),
})

export const PatchAdminSchema = z.object({
  isBlocked: z.boolean(),
})

export const AuditLogQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  action: z.string().optional(),
  adminId: z.string().optional(),
})
