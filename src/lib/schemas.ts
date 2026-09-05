import { z } from 'zod'
import { MEMBER_TYPES } from '../types/cms'

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
  slug: z
    .string()
    .regex(slugRegex, 'Slug must be lowercase alphanumeric with hyphens'),
  title: z.string().min(1).max(500),
  date: z.string().datetime().optional(),
  description: z.string().min(1).max(2000),
  content: z.string(),
  image: z.string().url().nullable().optional(),
  published: z.boolean().default(false),
})

export const UpdateNewsSchema = CreateNewsSchema.partial()

export const CreateFacultySchema = z.object({
  slug: z
    .string()
    .regex(slugRegex, 'Slug must be lowercase alphanumeric with hyphens'),
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
  memberType: z.enum(MEMBER_TYPES).default('FACULTY'),
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

/**
 * Gallery assets can be an uploaded object URL or a root-relative path to a
 * file shipped in `public/` (which is how the seeded images are stored).
 */
const galleryAssetPath = z
  .string()
  .min(1)
  .max(2000)
  .refine(
    (value) => value.startsWith('/') || /^https?:\/\//.test(value),
    'Must be an absolute URL or a root-relative path',
  )

export const CreateGalleryCategorySchema = z.object({
  slug: z
    .string()
    .regex(slugRegex, 'Slug must be lowercase alphanumeric with hyphens'),
  name: z.string().min(1).max(200),
  description: z.string().max(2000).nullable().optional(),
  published: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
})

export const UpdateGalleryCategorySchema = CreateGalleryCategorySchema.partial()

export const CreateGalleryImageSchema = z.object({
  url: galleryAssetPath,
  caption: z.string().min(1).max(300),
  description: z.string().max(2000).nullable().optional(),
  altText: z.string().max(300).nullable().optional(),
  categoryId: z.string().nullable().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
  takenAt: z.string().datetime().nullable().optional(),
})

export const UpdateGalleryImageSchema = CreateGalleryImageSchema.partial()

/** `POST /api/gallery` accepts one image or a batch, so bulk upload is one call. */
export const CreateGalleryImagesSchema = z.union([
  CreateGalleryImageSchema,
  z.array(CreateGalleryImageSchema).min(1).max(50),
])

export const ReorderGallerySchema = z.object({
  items: z
    .array(z.object({ id: z.string().min(1), sortOrder: z.number().int() }))
    .min(1)
    .max(500),
})

export const UpdateGallerySettingsSchema = z.object({
  heroTitle: z.string().min(1).max(200),
  heroSubtitle: z.string().max(500).nullable().optional(),
  heroImage: galleryAssetPath.nullable().optional(),
  introText: z.string().max(2000).nullable().optional(),
  metaTitle: z.string().min(1).max(200),
  metaDescription: z.string().min(1).max(500),
  showCategoryFilter: z.boolean().default(true),
})
