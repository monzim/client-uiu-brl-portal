import { createFileRoute } from '@tanstack/react-router'
import { FacultyForm } from '../components/admin/FacultyForm'

export const Route = createFileRoute('/admin/faculty/new')({
  component: NewFacultyPage,
})

function NewFacultyPage() {
  return <FacultyForm />
}
