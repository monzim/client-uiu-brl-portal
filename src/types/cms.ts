export interface DbNews {
  id: string
  slug: string
  title: string
  date: string | Date
  description: string
  content: string
  image: string | null
  published: boolean
  createdAt: string | Date
  updatedAt: string | Date
}

export type DbNewsListItem = Pick<
  DbNews,
  'id' | 'slug' | 'title' | 'date' | 'description' | 'image'
>

export type PublicationType =
  'journal' | 'conference' | 'book' | 'thesis' | 'other'

export interface Publication {
  title: string
  authors: string
  venue: string
  year: string
  type: PublicationType
  doi?: string
  url?: string
  note?: string
}

export const MEMBER_TYPES = ['FACULTY', 'RESEARCH_ASSISTANT'] as const

export type MemberType = (typeof MEMBER_TYPES)[number]

export const MEMBER_TYPE_LABELS: Record<MemberType, string> = {
  FACULTY: 'Faculty Member',
  RESEARCH_ASSISTANT: 'Research Assistant',
}

export interface DbFaculty {
  id: string
  slug: string
  name: string
  designation: string
  department: string
  email: string
  phone: string | null
  room: string | null
  image: string | null
  coverImage: string | null
  profileDescription: string
  fullBio: string | null
  researchGeneral: string | null
  education: string[]
  positionHeld: string[]
  honors: string[]
  researchInterests: string[]
  researchProjects: string[]
  publications: Publication[]
  importantLinks: { label: string; url: string }[]
  memberType: MemberType
  published: boolean
  sortOrder: number
  createdAt: string | Date
  updatedAt: string | Date
}

export function formatNewsDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export interface DbGalleryCategory {
  id: string
  slug: string
  name: string
  description: string | null
  published: boolean
  sortOrder: number
  createdAt: string | Date
  updatedAt: string | Date
}

export interface DbGalleryImage {
  id: string
  url: string
  caption: string
  description: string | null
  altText: string | null
  categoryId: string | null
  featured: boolean
  published: boolean
  sortOrder: number
  takenAt: string | Date | null
  createdAt: string | Date
  updatedAt: string | Date
}

export interface DbGallerySettings {
  id: string
  heroTitle: string
  heroSubtitle: string | null
  heroImage: string | null
  introText: string | null
  metaTitle: string
  metaDescription: string
  showCategoryFilter: boolean
  updatedAt: string | Date
}

/** Everything the public `/gallery` route needs, in one payload. */
export interface GalleryPageData {
  settings: DbGallerySettings
  categories: (DbGalleryCategory & { imageCount: number })[]
  images: DbGalleryImage[]
}

/** The single row of `GallerySettings`. */
export const GALLERY_SETTINGS_ID = 'default'

/**
 * Used when the settings row has not been created yet, so the public page still
 * renders with sensible copy on a fresh database.
 */
export const DEFAULT_GALLERY_SETTINGS: DbGallerySettings = {
  id: GALLERY_SETTINGS_ID,
  heroTitle: 'Inside the Laboratory.',
  heroSubtitle: null,
  heroImage: null,
  introText: null,
  metaTitle: 'Laboratory Gallery | UIU Biomedical Research Lab',
  metaDescription:
    'Take a virtual tour of the UIU Biomedical Research Lab and see our state-of-the-art equipment and research facilities.',
  showCategoryFilter: true,
  updatedAt: new Date(0),
}

/** Alt text is optional in the CMS; fall back to the caption when it is unset. */
export function galleryImageAlt(image: DbGalleryImage): string {
  return image.altText?.trim() || image.caption
}

/**
 * Shared ordering for gallery images: explicit `sortOrder` first, then newest.
 * Mirrors the Prisma `orderBy` so client-side lists stay consistent with the DB.
 */
export function compareGalleryImages(
  a: DbGalleryImage,
  b: DbGalleryImage,
): number {
  if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
}
