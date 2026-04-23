import { createFileRoute } from '@tanstack/react-router'
import { NewsForm } from '../components/admin/NewsForm'

export const Route = createFileRoute('/admin/news/new')({
  component: NewNewsPage,
})

function NewNewsPage() {
  return <NewsForm />
}
