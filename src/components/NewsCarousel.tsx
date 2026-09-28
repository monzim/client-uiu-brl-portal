import React, { useRef, useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, Calendar, ArrowUpRight } from 'lucide-react'
import { SmoothImage } from './ui/SmoothImage'
import type { DbNewsListItem } from '../types/cms'
import { formatNewsDate } from '../types/cms'

interface NewsCarouselProps {
  news: DbNewsListItem[]
}

export function NewsCarousel({ news }: NewsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [featured, ...remainingNews] = news

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' })
        }
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -400 : 400
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-16 md:py-24 px-4 sm:px-8 md:px-10 overflow-hidden">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-12 md:mb-16 lg:mb-20 gap-6 lg:gap-8 max-w-[1400px] mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest text-brand-text/40 uppercase mb-3 md:mb-4">
              Laboratory Insights
            </h2>
            <h3 className="text-2xl sm:text-3xl lg:text-5xl font-medium tracking-tight text-brand-text leading-tight">
              Recent News & Activities.
            </h3>
          </div>
        </div>

        {featured && (
          <Link
            to="/news/$newsId"
            params={{ newsId: featured.slug }}
            className="group mx-auto mb-6 grid max-w-[1400px] overflow-hidden rounded-3xl border border-brand-border bg-white transition-all duration-500 hover:border-brand-accent hover:shadow-xl lg:h-76 lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="relative min-h-[210px] overflow-hidden">
              <SmoothImage
                src={featured.image || '/banner_images/banner_image1.webp'}
                alt={featured.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                containerClassName="h-full w-full"
              />
              <div className="absolute left-5 top-5 rounded-full bg-brand-text/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                Featured event
              </div>
            </div>
            <div className="flex min-h-0 flex-col justify-between overflow-hidden p-4 md:p-5 bg-brand-text text-white">
              <div>
                <div className="mb-6 flex items-center gap-2 text-[10px] font-bold  uppercase tracking-[0.18em] text-white/80">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatNewsDate(featured.date)}
                </div>
                <h4 className="max-w-xl line-clamp-2 mb-14 text-xl font-bold leading-tight  md:text-2xl">
                  {featured.title}
                </h4>
                <p className="mt-3 line-clamp-4 text-sm text-white/80 leading-6 md:text-base">
                  {featured.description}
                </p>
              </div>
              <span className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 ">
                Read the event  <div className="shrink-0 w-8 h-8 rounded-full border border-brand-border flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent group-hover:text-white transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:rotate-45" />
                  </div>
              </span>
            </div>
          </Link>
        )}

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-4 overflow-x-auto pb-12 mt-10 snap-x no-scrollbar"
        >
          {remainingNews.map((item) => (
            <Link
              key={item.id}
              to="/news/$newsId"
              params={{ newsId: item.slug }}
              className="min-w-[280px] md:min-w-[320px] bg-white rounded-[24px] snap-center overflow-hidden border border-brand-border hover:border-brand-accent transition-colors duration-500 group"
            >
              <div className="relative h-48 md:h-52 overflow-hidden">
                <SmoothImage
                  src={
                    item.image ||
                    '/banner_images/banner_image1.webp'
                  }
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatNewsDate(item.date)}
                </div>
                <div className="flex justify-between items-start gap-4">
                  <h4 className="text-base md:text-lg font-bold text-brand-text leading-tight group-hover:text-brand-accent transition-colors duration-300 uppercase tracking-tight">
                    {item.title}
                  </h4>
                  <div className="shrink-0 w-8 h-8 rounded-full border border-brand-border flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent group-hover:text-white transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:rotate-45" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-2 flex flex-col justify-end gap-5 border-t border-brand-border pt-6 sm:flex-row">
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              aria-label="Show previous events"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 hover:border-4 border-brand-text/70 text-brand-text transition-all hover:border-brand-text/90 hover:text-brand-text"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Show more events"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 hover:border-4 border-brand-text/70 text-brand-text transition-all hover:border-brand-text/90 hover:text-brand-text"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <Link
            to="/news"
            className="w-fit rounded-2xl bg-brand-text px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-70"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  )
}
