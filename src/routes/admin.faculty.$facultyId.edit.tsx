import { createFileRoute } from '@tanstack/react-router'
import { FacultyForm } from '../components/admin/FacultyForm'
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

  return <FacultyForm initial={faculty} facultyId={facultyId} />
}
