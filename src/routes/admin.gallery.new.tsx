import { createFileRoute } from '@tanstack/react-router'
import { GalleryImageForm } from '../components/admin/GalleryImageForm'
import { getAdminGalleryCategories } from '../server/gallery'

export const Route = createFileRoute('/admin/gallery/new')({
  loader: () => getAdminGalleryCategories(),
  component: NewGalleryImagePage,
})

function NewGalleryImagePage() {
  const categories = Route.useLoaderData()
  return <GalleryImageForm categories={categories} />
}
