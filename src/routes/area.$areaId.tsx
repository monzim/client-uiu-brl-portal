import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  Lightbulb,
  Maximize2,
  Microscope,
  Network,
  X,
  LayoutGrid,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { researchAreas } from '../data/data'
import { SmoothImage } from '../components/ui/SmoothImage'
import { pageMeta } from '../lib/seo'

export const Route = createFileRoute('/area/$areaId')({
  loader: ({ params }) => {
    const area = researchAreas.find((item) => item.id === params.areaId)
    if (!area) throw notFound()
    return { areaId: area.id }
  },
  head: ({ params }) => {
    const area = researchAreas.find((item) => item.id === params.areaId)
    return {
      meta: pageMeta({
        title: area ? `${area.title} — Research Area` : 'Research Area',
        description: area?.summary,
        image: area?.image,
      }),
    }
  },
  notFoundComponent: AreaNotFound,
  component: ResearchAreaDetail,
})

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

function ResearchAreaDetail() {
  const { areaId } = Route.useLoaderData()
  const areaIndex = researchAreas.findIndex((item) => item.id === areaId)
  const area = researchAreas[areaIndex]
  const nextArea = researchAreas[(areaIndex + 1) % researchAreas.length]
  const [showPreview, setShowPreview] = useState(false)

  return (
    <main className="min-h-screen bg-brand-bg pb-32">
      <AreaHero
        eyebrow={area.eyebrow}
        title={area.title}
        summary={area.summary}
        icon={area.icon}
      />

      <AreaBento
        image={area.image}
        title={area.title}
        summary={area.summary}
        paragraphs={area.paragraphs}
        onExpand={() => setShowPreview(true)}
      />

      <section className="mx-auto grid max-w-[1200px] gap-10 px-6 pt-14 md:pt-20 lg:grid-cols-[1fr_320px] lg:gap-16">
        <AreaBody
          paragraphs={area.paragraphs}
          sectionHeadings={area.sectionHeadings}
        />
        <AreaSidebar
          workflow={area.workflow}
          applications={area.applications}
        />
      </section>

      <AreaFooterNav nextAreaId={nextArea.id} nextAreaTitle={nextArea.title} />

      {showPreview && (
        <ImagePreviewModal
          image={area.image}
          title={area.title}
          onClose={() => setShowPreview(false)}
        />
      )}
    </main>
  )
}

// ---------------------------------------------------------------------------
// Not found state
// ---------------------------------------------------------------------------

function AreaNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-bg px-6">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
          Research area not found
        </p>
        <Link
          to="/area"
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-text"
        >
          <ArrowLeft className="h-4 w-4" /> Back to research areas
        </Link>
      </div>
    </main>
  )
}

// ---------------------------------------------------------------------------
// Hero — same structure/content as before, now on a subtle gradient with an
// amber glow behind the icon instead of a flat fill
// ---------------------------------------------------------------------------

interface AreaHeroProps {
  eyebrow: string
  title: string
  summary: string
  icon: LucideIcon
}

function AreaHero({ eyebrow, title, summary, icon: Icon }: AreaHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-text px-6 pb-16 pt-32 text-white md:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-brand-accent/20 blur-[110px]"
      />

      <div className="relative mx-auto max-w-[1200px] overflow-hidden">
        <Icon
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 hidden h-44 w-44 -translate-y-1/2 stroke-[0.8] text-white/[0.08] md:block"
        />

        <div className="relative z-10">
          <Link
            to="/area"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All research areas
          </Link>

          <div className="mt-14 flex items-center gap-3 text-[#9ed4c0]">
            <Icon className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-[0.25em]">
              {eyebrow}
            </span>
          </div>

          <h1 className="mt-5 max-w-4xl text-5xl font-medium leading-[0.98] tracking-[-0.04em] md:text-7xl">
            {title}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
            {summary}
          </p>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Full-bleed image banner — runs the full width of the viewport (breaks out
// of the 1200px container). Height is capped rather than aspect-locked, and
// the image is object-contain on a neutral fill, since these are not
// guaranteed to be landscape source images — this avoids cropping them.
// ---------------------------------------------------------------------------

interface AreaBentoProps {
  image: string
  title: string
  summary: string
  paragraphs: Array<string>
  onExpand: () => void
}

function AreaBento({
  image,
  title,
  summary,
  paragraphs,
  onExpand,
}: AreaBentoProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pt-8 md:pt-12">
      <div className="grid gap-4 lg:h-[min(680px,calc(100vh-10rem))] lg:grid-cols-3 lg:grid-rows-2">
        <div className="group relative min-h-[360px] overflow-hidden rounded-3xl border border-brand-border bg-[#e8eee9] p-4 shadow-sm md:p-6 lg:col-span-2 lg:row-span-2">
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-white">
            <SmoothImage
              src={image}
              alt={title}
              className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              containerClassName="h-full w-full"
            />
          </div>
          <button
            type="button"
            onClick={onExpand}
            aria-label="Expand image"
            className="absolute right-7 top-7 inline-flex items-center gap-2 rounded-full bg-brand-text/75 px-4 py-2 text-xs font-semibold  tracking-[0.14em] text-white backdrop-blur-sm transition-colors hover:bg-brand-text"
          >
            <Maximize2 aria-hidden="true" className="h-3 w-3" />
          </button>
        </div>

        <div className="rounded-3xl border border-brand-border bg-white p-6  shadow-sm md:p-8">
          <div className="mb-8 flex items-start justify-between">
            <p className="text-[14px] font-bold uppercase text-brand-text">
              At a glance
            </p>
            <Lightbulb
              aria-hidden="true"
              className="h-12 w-12 stroke-[3] text-brand-accent/80"
            />
          </div>
          <p className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-brand-accent">
            {summary}
          </p>
        </div>

        <div className="rounded-3xl border border-brand-border bg-[#e4eee7] p-6 shadow-sm md:p-8">
          <div className="mb-3 flex items-start justify-between">
            <p className="text-[16px] font-bold uppercase text-brand-text">
              Core idea
            </p>
            <Microscope
              aria-hidden="true"
              className="h-12 w-12 stroke-[2] text-brand-accent/80"
            />
          </div>
          <p className="line-clamp-5 text-sm font-semibold leading-7 text-brand-text/75">
            {paragraphs[0]}
          </p>
        </div>
      </div>
    </section>
  )
}

interface ImagePreviewModalProps {
  image: string
  title: string
  onClose: () => void
}

function ImagePreviewModal({ image, title, onClose }: ImagePreviewModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-text/80 p-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} image preview`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        aria-label="Close image preview"
      />

      <div className="relative z-10 max-h-full max-w-5xl rounded-3xl bg-brand-text p-4">
        <img
          src={image}
          alt={title}
          className="max-h-[85vh] max-w-full rounded-2xl object-contain"
        />
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-text"
        >
          <X className="h-3.5 w-3.5" /> Close
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Body — plain readable column, no card wrapper. Lead paragraph is set
// larger to give the article an entry point; the rest reads as body copy.
// ---------------------------------------------------------------------------

function AreaBody({
  paragraphs,
  sectionHeadings = [],
}: {
  paragraphs: Array<string>
  sectionHeadings?: Array<string>
}) {
  const [lead, ...rest] = paragraphs
  const detailIcons = [Network, Microscope, BadgeCheck]

  return (
    <article className="max-w-[640px]">
      {lead && (
        <section>
          <div className="mb-4 flex items-center gap-3">
            {sectionHeadings[0] && (
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-brand-text">
                {sectionHeadings[0]}
              </h2>
            )}
            <Lightbulb
              aria-hidden="true"
              className="h-8 w-8 ml-2 shrink-0 stroke-[2] text-brand-accent"
            />
          </div>
          <p className="text-xl font-medium leading-9 tracking-[-0.01em] text-brand-text/85">
            {lead}
          </p>
        </section>
      )}

      <div className="mt-6 space-y-6 text-[15px] leading-8 text-brand-text/65">
        {rest.map((paragraph, index) => (
          <section
            key={paragraph}
            className="border-t border-brand-border/70 pt-6"
          >
            <div className="mb-3 flex items-center gap-3">
              {sectionHeadings[index + 1] && (
                <h2 className="text-xl font-semibold tracking-[-0.015em] text-brand-text">
                  {sectionHeadings[index + 1]}
                </h2>
              )}
              {(() => {
                const Icon = detailIcons[index] || BadgeCheck
                return (
                  <Icon
                    aria-hidden="true"
                    className="h-7 w-7 ml-2 shrink-0 stroke-[2] text-brand-accent"
                  />
                )
              })()}
            </div>
            <p>{paragraph}</p>
          </section>
        ))}
      </div>
    </article>
  )
}

// ---------------------------------------------------------------------------
// Sidebar — workflow + applications, sticky alongside the article
// ---------------------------------------------------------------------------

interface AreaSidebarProps {
  workflow?: string
  applications: Array<string>
}

function AreaSidebar({ workflow, applications }: AreaSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-28">
      <div className="space-y-5">
        {workflow && <WorkflowCallout workflow={workflow} />}
        <ApplicationsList applications={applications} />
      </div>
    </aside>
  )
}

function WorkflowCallout({ workflow }: { workflow: string }) {
  const steps = workflow.split(' → ')

  return (
    <section className="rounded-3xl border border-brand-border bg-[#e4eee7] p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-[10px] mb-2 font-bold uppercase  text-brand-accent">
            Research workflow
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-brand-text">
            From question to evidence
          </h2>
        </div>
        <div className="relative flex flex-col items-center gap-1">
          <ClipboardList
            aria-hidden="true"
            className="h-16 w-16 stroke-[1] text-brand-accent/80"
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-accent/45">
            {String(steps.length).padStart(2, '0')} steps
          </span>
        </div>
      </div>

      <ol className="space-y-0">
        {steps.map((step, index) => (
          <li key={step} className="relative flex gap-3 pb-5 last:pb-0">
            {index < steps.length - 1 && (
              <span
                className="absolute left-[13px] top-7 h-[calc(100%-12px)] w-px bg-brand-accent/25"
                aria-hidden="true"
              />
            )}
            <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-accent/25 bg-white text-[10px] font-bold text-brand-accent">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="pt-1 text-sm font-semibold leading-5 text-brand-text/80">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}

function ApplicationsList({ applications }: { applications: Array<string> }) {
  if (applications.length === 0) return null

  return (
    <section className="rounded-3xl border border-brand-border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase mb-2  text-brand-accent">
            Research applications
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-brand-text">
            Where it can lead
          </h2>
        </div>
        <LayoutGrid
          aria-hidden="true"
          className="h-12 w-12 shrink-0 stroke-[1] text-brand-accent/30"
        />
      </div>
      <ol>
        {applications.map((application, index) => (
          <li
            key={application}
            className="flex items-baseline gap-3 border-t border-brand-border py-3 first:border-t-0 first:pt-0"
          >
            <span className="text-[16px] font-bold tabular-nums text-brand-text/35">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-sm leading-6 text-brand-text/80">
              {application}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Footer nav
// ---------------------------------------------------------------------------

function AreaFooterNav({
  nextAreaId,
  nextAreaTitle,
}: {
  nextAreaId: string
  nextAreaTitle: string
}) {
  return (
    <nav className="mx-auto mt-16 flex max-w-[1200px] justify-between border-t border-brand-border px-6 pt-6">
      <Link
        to="/area"
        className="inline-flex items-center gap-2 text-sm bg-brand-text p-2 rounded-xl font-semibold  text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Research areas
      </Link>
      <Link
        to="/area/$areaId"
        params={{ areaId: nextAreaId }}
        className="inline-flex items-center gap-2 text-sm font-semibold p-2 bg-brand-text rounded-xl text-white"
      >
        Next: {nextAreaTitle} <ArrowRight className="h-4 w-4" />
      </Link>
    </nav>
  )
}
