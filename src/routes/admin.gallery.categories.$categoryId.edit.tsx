import { createFileRoute } from '@tanstack/react-router'
import { ErrorFallback } from '../components/ErrorFallback'
import { GalleryCategoryForm } from '../components/admin/GalleryCategoryForm'
import { getAdminGalleryCategory } from '../server/gallery'

export const Route = createFileRoute(
  '/admin/gallery/categories/$categoryId/edit',
)({
  loader: async ({ params }) => {
    // @ts-expect-error - createServerFn doesn't type parameterized input in this version
    const category = await getAdminGalleryCategory({ data: params.categoryId })
    if (!category) throw new Error('Album not found')
    return category
  },
  errorComponent: ({ error, reset }) => (
    <ErrorFallback error={error} reset={reset} />
  ),
  component: EditGalleryCategoryPage,
})

function EditGalleryCategoryPage() {
  const { categoryId } = Route.useParams()
  const category = Route.useLoaderData()
  return <GalleryCategoryForm initial={category} categoryId={categoryId} />
}
