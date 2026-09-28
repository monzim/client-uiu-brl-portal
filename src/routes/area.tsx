import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { SmoothImage } from '../components/ui/SmoothImage'
import { researchAreas } from '../data/data'

export const Route = createFileRoute('/area')({
  head: () => ({
    meta: [
      { title: 'Research Areas | UIU Biomedical Research Lab' },
      {
        name: 'description',
        content:
          'Explore the key research areas at UIU BME Lab including Gene Polymorphism, Antimicrobial Resistance, and Molecular Biology.',
      },
      { property: 'og:title', content: 'Research Areas | UIU BME Lab' },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: AreaPage,
})

function AreaPage() {
  const location = useLocation()

  if (location.pathname !== '/area') {
    return <Outlet />
  }

  return (
    <main className="min-h-screen overflow-hidden bg-brand-bg pb-32">
      <section className="banner-shell relative min-h-[78vh] overflow-hidden bg-brand-text">
        <SmoothImage
          src="/banner_images/banner_image1.webp"
          alt="Research Areas Banner"
          className="h-full w-full object-cover object-center opacity-55"
          containerClassName="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(14,31,26,0.96)_0%,rgba(14,31,26,0.75)_42%,rgba(14,31,26,0.1)_100%)]" />

        <div className="relative mx-auto flex min-h-[78vh] max-w-[1400px] flex-col justify-center px-6 pb-12 pt-32">
          <div className="max-w-3xl">
            <Link
              to="/"
              className="group mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase text-white/55 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
            <p className="mb-5 text-xs font-bold uppercase  text-[#9ed4c0]">
              Biomedical Research Laboratory
            </p>
            <h3 className=" max-w-4xl text-2xl font-medium leading-[0.94] tracking-[-0.04em] text-white md:text-7xl lg:text-[70px]">
              Ideas that move
              <br />
              <span className="text-[#9ed4c0]">science forward.</span>
            </h3>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/70 md:text-lg">
              Four connected research directions, from responsive materials and genetic variation to resistance surveillance and nature-inspired therapeutics.
            </p>
          </div>
          
        </div>
      </section>

      <ResearchDirections />
    </main>
  )
}

// ---------------------------------------------------------------------------
// Research directions — card grid
// ---------------------------------------------------------------------------

function ResearchDirections() {
  return (
    <section id="research-directions" className="relative z-10 mx-auto mt-15 max-w-[1400px] px-6">
      <div className="mb-10 flex items-end justify-between border-b border-brand-border pb-6">
        <div>
          <p className="text-xs font-bold uppercase  text-brand-accent">
            Research directions
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-[-0.03em] text-brand-text md:text-4xl">
            Where the lab is focused
          </h2>
        </div>
        <span className="hidden text-sm font-semibold text-brand-text/40 sm:block">
          {String(researchAreas.length).padStart(2, '0')} areas
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 mt-22">
        {researchAreas.map((area, index) => (
          <AreaCard key={area.id} area={area} index={index} />
        ))}
      </div>
    </section>
  )
}

function AreaCard({ area, index }) {
  const Icon = area.icon
  const [ref, isVisible] = useRevealOnScroll()

  return (
    <Link
      ref={ref}
      to="/area/$areaId"
      params={{ areaId: area.id }}
      aria-label={`Read more about ${area.title}`}
      style={{ transitionDelay: isVisible ? `${index * 90}ms` : '0ms' }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-brand-border bg-white transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-text/10 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#eef2ef]">
        <img
          src={area.image}
          alt=""
          className="h-full w-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />

        <span className="absolute left-3 top-3 rounded-full bg-brand-text/80 px-2.5 py-1 text-[10px] font-bold tabular-nums text-white backdrop-blur-sm">
          {String(index + 1).padStart(2, '0')}
        </span>

        <Icon className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/90 p-1.5 text-brand-accent" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-accent/80">
          {area.eyebrow}
        </p>

        <h3 className="mt-2 text-lg font-bold leading-tight text-brand-text">{area.title}</h3>
        <span className="mt-2 block h-[2px] w-0 bg-brand-accent transition-all duration-300 ease-out group-hover:w-10" />

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-brand-text/60">{area.summary}</p>

        <span className="mt-auto flex items-center gap-1.5 pt-5 text-[10px] font-bold uppercase  text-brand-text/50 transition-colors group-hover:text-brand-accent">
          Read more
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

// ---------------------------------------------------------------------------
// Lightweight scroll-reveal hook — no animation library required
// ---------------------------------------------------------------------------

function useRevealOnScroll() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, isVisible] as const
}