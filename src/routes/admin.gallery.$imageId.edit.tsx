import { createFileRoute } from '@tanstack/react-router'
import { ErrorFallback } from '../components/ErrorFallback'
import { GalleryImageForm } from '../components/admin/GalleryImageForm'
import {
  getAdminGalleryCategories,
  getAdminGalleryImage,
} from '../server/gallery'

export const Route = createFileRoute('/admin/gallery/$imageId/edit')({
  loader: async ({ params }) => {
    const [image, categories] = await Promise.all([
      // @ts-expect-error - createServerFn doesn't type parameterized input in this version
      getAdminGalleryImage({ data: params.imageId }),
      getAdminGalleryCategories(),
    ])
    if (!image) throw new Error('Gallery image not found')
    return { image, categories }
  },
  errorComponent: ({ error, reset }) => (
    <ErrorFallback error={error} reset={reset} />
  ),
  component: EditGalleryImagePage,
})

function EditGalleryImagePage() {
  const { imageId } = Route.useParams()
  const { image, categories } = Route.useLoaderData()
  return (
    <GalleryImageForm
      categories={categories}
      initial={image}
      imageId={imageId}
    />
  )
}
