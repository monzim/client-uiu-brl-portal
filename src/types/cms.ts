export interface DbNews {
  id: string
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
  'id' | 'title' | 'date' | 'description' | 'image'
>

export interface DbFaculty {
  id: string
  name: string
  designation: string
  department: string
  email: string
  room: string | null
  image: string | null
  profileDescription: string
  fullBio: string | null
  researchGeneral: string | null
  education: string[]
  positionHeld: string[]
  honors: string[]
  researchInterests: string[]
  researchProjects: string[]
  publications: string[]
  importantLinks: { label: string; url: string }[]
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
