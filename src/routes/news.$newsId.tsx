import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Calendar, Share2 } from 'lucide-react'
import { RichContent } from '../components/RichContent'
import { ErrorFallback } from '../components/ErrorFallback'
import { NotFound } from '../components/NotFound'
import { SmoothImage } from '../components/ui/SmoothImage'
import { getNewsItem } from '../server/news'
import { formatNewsDate } from '../types/cms'

export const Route = createFileRoute('/news/$newsId')({
  // @ts-expect-error - parameterized createServerFn call
  loader: ({ params }) => getNewsItem({ data: params.newsId }),
  errorComponent: ({ error, reset }) => (
    <ErrorFallback error={error} reset={reset} />
  ),
  component: NewsDetail,
})

function NewsDetail() {
  const news = Route.useLoaderData()

  if (!news) {
    return <NotFound />
  }

  return (
    <main className="min-h-screen pb-40 bg-brand-bg">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        {news.image ? (
          <SmoothImage
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover grayscale brightness-[0.5] object-center"
            containerClassName="w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-brand-accent" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 w-full px-6 pb-16 md:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white mb-6 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />{' '}
              Back to News
            </Link>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
              <Calendar className="w-4 h-4" />
              {formatNewsDate(news.date)}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-white max-w-5xl">
              {news.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-[800px] mx-auto px-6 mt-16 md:mt-24">
        <div className="space-y-12 rise-in">
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
