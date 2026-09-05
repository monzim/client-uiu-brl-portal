import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SmoothImage } from '../components/ui/SmoothImage'
import { cn } from '../lib/utils'
import { getGalleryPage } from '../server/gallery'
import { DEFAULT_GALLERY_SETTINGS, galleryImageAlt } from '../types/cms'

const FALLBACK_HERO = '/images/hero1.webp'
const ALL = 'ALL'

export const Route = createFileRoute('/gallery')({
  loader: () => getGalleryPage(),
  head: ({ loaderData }) => {
    const settings = loaderData?.settings ?? DEFAULT_GALLERY_SETTINGS
    return {
      meta: [
        { title: settings.metaTitle },
        { name: 'description', content: settings.metaDescription },
        { property: 'og:title', content: settings.metaTitle },
        { property: 'og:description', content: settings.metaDescription },
        { property: 'og:type', content: 'website' },
        ...(settings.heroImage
          ? [{ property: 'og:image', content: settings.heroImage }]
          : []),
      ],
    }
  },
  component: Gallery,
})

function Gallery() {
  const { settings, categories, images } = Route.useLoaderData()
  const [activeCategory, setActiveCategory] = useState<string>(ALL)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const visibleImages = useMemo(
    () =>
      activeCategory === ALL
        ? images
        : images.filter((image) => image.categoryId === activeCategory),
    [images, activeCategory],
  )

  const showFilter = settings.showCategoryFilter && categories.length > 0

  const closeLightbox = useCallback(() => setSelectedIndex(null), [])

  const step = useCallback(
    (delta: number) =>
      setSelectedIndex((current) =>
        current === null || visibleImages.length === 0
          ? current
          : (current + delta + visibleImages.length) % visibleImages.length,
      ),
    [visibleImages.length],
  )

  // Keyboard control for the lightbox, plus a scroll lock while it is open.
  useEffect(() => {
    if (selectedIndex === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [selectedIndex, closeLightbox, step])

  const selected = selectedIndex === null ? null : visibleImages[selectedIndex]

  return (
    <main className="min-h-screen bg-brand-bg pb-40">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <SmoothImage
          src={settings.heroImage ?? FALLBACK_HERO}
          alt="Gallery Banner"
          className="w-full h-full object-cover grayscale brightness-[0.5] object-center"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 w-full px-6 pb-12 md:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white mb-6 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />{' '}
              Back to Home
            </Link>
            {settings.heroSubtitle && (
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-white/50 mb-4">
                {settings.heroSubtitle}
              </p>
            )}
            <h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium leading-[1.05] tracking-tight text-white max-w-4xl uppercase">
              {settings.heroTitle}
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 mt-16 md:mt-24">
        {settings.introText && (
          <p className="max-w-3xl text-base md:text-lg leading-relaxed text-brand-text/70 mb-12">
            {settings.introText}
          </p>
        )}

        {showFilter && (
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <FilterPill
              active={activeCategory === ALL}
              onClick={() => {
                setActiveCategory(ALL)
                setSelectedIndex(null)
              }}
              label="All"
              count={images.length}
            />
            {categories.map((category) => (
              <FilterPill
                key={category.id}
                active={activeCategory === category.id}
                onClick={() => {
                  setActiveCategory(category.id)
                  setSelectedIndex(null)
                }}
                label={category.name}
                count={category.imageCount}
              />
            ))}
          </div>
        )}

        {visibleImages.length === 0 ? (
          <div className="border border-brand-text/10 rounded-[32px] py-24 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand-text/40">
              No photos published yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleImages.map((image, i) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedIndex(i)}
                aria-label={`Open ${image.caption}`}
                className={cn(
                  'group relative aspect-[4/5] rounded-[48px] overflow-hidden bg-brand-border cursor-pointer text-left',
                  image.featured && 'lg:col-span-2 lg:aspect-[8/5]',
                )}
              >
                <SmoothImage
                  src={image.url}
                  alt={galleryImageAlt(image)}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-brand-text/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-lg font-bold tracking-tight">
                    {image.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {selected && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selected.caption}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 backdrop-blur-sm animate-in fade-in duration-300"
          >
            <button
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors z-[110]"
            >
              <X className="w-8 h-8" />
            </button>

            {visibleImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    step(-1)
                  }}
                  aria-label="Previous image"
                  className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all z-[110]"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    step(1)
                  }}
                  aria-label="Next image"
                  className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all z-[110]"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </>
            )}

            <div
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6"
              onClick={closeLightbox}
            >
              <div
                className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selected.url}
                  alt={galleryImageAlt(selected)}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                />
              </div>
              <div
                className="text-center animate-in slide-in-from-bottom-4 duration-500 delay-150 fill-mode-both px-6"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-white text-xl md:text-2xl font-medium tracking-tight uppercase">
                  {selected.caption}
                </p>
                {selected.description && (
                  <p className="text-white/60 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
                    {selected.description}
                  </p>
                )}
                <p className="text-white/40 text-sm mt-2 font-bold uppercase tracking-widest">
                  {(selectedIndex ?? 0) + 1} / {visibleImages.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

function FilterPill({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean
  onClick: () => void
  label: string
  count: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all',
        active
          ? 'bg-brand-text text-white'
          : 'bg-transparent border border-brand-text/15 text-brand-text/60 hover:border-brand-text/40 hover:text-brand-text',
      )}
    >
      {label}
      <span className="ml-2 opacity-50">{count}</span>
    </button>
  )
}
