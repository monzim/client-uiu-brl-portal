import { createFileRoute, Link } from '@tanstack/react-router'
import { FacultyForm } from '../components/admin/FacultyForm'
import { ArrowLeft } from 'lucide-react'
import { getAdminFacultyItem } from '../server/faculty'

export const Route = createFileRoute('/admin/faculty/$facultyId/edit')({
  loader: async ({ params }) => {
    // @ts-expect-error - createServerFn doesn't type parameterized input in this version
    const faculty = await getAdminFacultyItem({ data: params.facultyId })
    if (!faculty) throw new Error('Faculty not found')
    return faculty
  },
  component: EditFacultyPage,
})

function EditFacultyPage() {
  const { facultyId } = Route.useParams()
  const faculty = Route.useLoaderData()

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/admin/faculty"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Link>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          Faculty
        </p>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Edit Faculty Member
        </h1>
      </div>
      <FacultyForm initial={faculty} facultyId={facultyId} />
    </div>
  )
}
