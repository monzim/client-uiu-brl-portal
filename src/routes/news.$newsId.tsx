import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Calendar, Share2 } from 'lucide-react'
import { RichContent } from '../components/RichContent'
import { ErrorFallback } from '../components/ErrorFallback'
import { getNewsItem } from '../server/news'
import { formatNewsDate } from '../types/cms'

export const Route = createFileRoute('/news/$newsId')({
  // @ts-expect-error - parameterized createServerFn call
  loader: ({ params }) => getNewsItem({ data: params.newsId }),
  errorComponent: ({ error, reset }) => <ErrorFallback error={error} reset={reset} />,
  component: NewsDetail,
})

function NewsDetail() {
  const news = Route.useLoaderData()

  if (!news) {
    return <NotFound />
  }

  return (
    <main className="min-h-screen pt-[160px] pb-40 bg-brand-bg px-6">
      <div className="max-w-[800px] mx-auto">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-text/40 hover:text-brand-text mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to News
        </Link>

        <div className="space-y-12 rise-in">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-brand-text/30">
              <Calendar className="w-4 h-4" />
              {formatNewsDate(news.date)}
            </div>
            <h1 className="text-[48px] md:text-[64px] font-medium leading-[1.1] tracking-tight text-brand-text">
              {news.title}
            </h1>
          </div>

          {news.image && (
            <div className="aspect-video rounded-[48px] overflow-hidden bg-brand-border ring-1 ring-brand-border/50 shadow-2xl">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover grayscale brightness-[0.95]"
              />
            </div>
          )}

          <div className="space-y-8">
            <p className="text-2xl font-medium text-brand-text/60 leading-relaxed italic border-l-4 border-brand-text/10 pl-8 py-2">
              {news.description}
            </p>

            <RichContent html={news.content} className="text-brand-text/80" />

            <div className="pt-12 border-t border-brand-border flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-text/30">
                Published by BME Lab Communications
              </div>
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-text/60 hover:text-brand-text transition-all">
                <Share2 className="w-4 h-4" /> Share Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
