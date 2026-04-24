import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { FacultySection } from '../components/FacultySection'
import { getFacultyList } from '../server/faculty'

export const Route = createFileRoute('/faculty/')({
  loader: () => getFacultyList(),
  component: FacultyPage,
})

function FacultyPage() {
  const faculty = Route.useLoaderData()

  return (
    <main className="min-h-screen bg-brand-bg pt-40 pb-32">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-2 space-y-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-text/30 hover:text-brand-text mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />{' '}
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-16 md:mt-24">
        <div className="mb-32">
          <FacultySection faculty={faculty as any} />
        </div>
      </div>
    </main>
  )
}
