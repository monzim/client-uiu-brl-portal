import { createFileRoute } from '@tanstack/react-router'
import { GalleryCategoryForm } from '../components/admin/GalleryCategoryForm'

export const Route = createFileRoute('/admin/gallery/categories/new')({
  component: () => <GalleryCategoryForm />,
})
