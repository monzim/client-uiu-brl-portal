import { createFileRoute } from '@tanstack/react-router'
import { NewsForm } from '../components/admin/NewsForm'
import { ErrorFallback } from '../components/ErrorFallback'
import { getAdminNewsItem } from '../server/news'

export const Route = createFileRoute('/admin/news/$newsId/edit')({
  loader: async ({ params }) => {
    // @ts-expect-error - createServerFn doesn't type parameterized input in this version
    const news = await getAdminNewsItem({ data: params.newsId })
    if (!news) throw new Error('News not found')
    return news
  },
  errorComponent: ({ error, reset }) => <ErrorFallback error={error} reset={reset} />,
  component: EditNewsPage,
})

function EditNewsPage() {
  const { newsId } = Route.useParams()
  const news = Route.useLoaderData()

  return <NewsForm initial={news} newsId={newsId} />
}
