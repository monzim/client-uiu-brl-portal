import { createFileRoute } from '@tanstack/react-router'
import { currentProjects } from '../data/currentproject'
import { ArrowLeft, Clock, Layout, Microscope, Quote } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/$projectId')({
  head: ({ params }) => {
    const project = currentProjects.find((p) => p.id === params.projectId)
    const title = project ? `${project.title} | UIU BME Lab Research` : 'Research Project'
    const description = project?.summary || 'Detailed view of research projects at UIU BME Lab.'

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: project?.image },
        { property: 'og:type', content: 'website' },
      ],
    }
  },
  component: ProjectDetail,
})

function ProjectDetail() {
  const { projectId } = Route.useParams()
  const project = currentProjects.find((p) => p.id === projectId)
  const otherProjects = currentProjects.filter((p) => p.id !== projectId)

  const detailParagraphs = project
    ? project.details
        .replace(/[ \t]+\n/g, '\n')
        .split(/\n{2,}/)
        .map((s) => s.trim())
        .filter(Boolean)
    : []
  const [introParagraph, ...middleParagraphs] = detailParagraphs
  const closingParagraph =
    middleParagraphs.length > 1
      ? middleParagraphs[middleParagraphs.length - 1]
      : ''
  const highlightParagraphs =
    middleParagraphs.length > 1
      ? middleParagraphs.slice(0, -1)
      : middleParagraphs

  if (!project) {
    return (
      <div className="min-h-screen pt-40 px-6 max-w-[1200px] mx-auto text-center">
        <h1 className="text-4xl font-bold">Project not found</h1>
        <Link to="/" className="mt-8 inline-block text-brand-text/60 hover:text-brand-text underline">Return Home</Link>
      </div>
    )
  }

  const quickFacts = [
    {
      icon: Microscope,
      label: 'Laboratory Focus',
      value: 'Conducted in the Molecular Biology and Clinical Pharmacology division (Lab 907).',
    },
    {
      icon: Layout,
      label: 'Methodology',
      value: 'Integrating in vitro evaluation with computational molecular docking.',
    },
    {
      icon: Clock,
      label: 'Status',
      value: 'Active research phase. Findings expected to be published in Q4 2026.',
    },
  ]

  return (
    <main className="min-h-screen bg-brand-bg">
      {/* Full Width Banner Image */}
      <div className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
         <img 
           src={project.image || "/banner_images/banner_image1.webp"} 
           alt={project.title} 
           className="w-full h-full object-cover grayscale brightness-[0.7]"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent  to-brand-text" />
         
         <div className="absolute inset-0 flex items-end">
            <div className="max-w-[1200px] w-full mx-auto px-6 pb-12 flex flex-col md:flex-row justify-between items-end gap-12">
              <div className="flex-1">
                <Link 
                  to="/" 
                  hash="research"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white mb-8 transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Research
                </Link>
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">
                   <Clock className="w-4 h-4" /> Ongoing Project
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-[80px] font-medium leading-[1.05] tracking-tight text-white max-w-4xl uppercase">
                  {project.title}
                </h1>
              </div>

              {/* Quick Navigation Links */}
              <div className="w-full md:w-72 space-y-6 border-l border-white/10 pl-8 mb-4 hidden lg:block">
                 <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Explore Other Projects</h4>
                 <div className="space-y-4">
                    {otherProjects.map((op) => (
                      <Link 
                        key={op.id}
                        to="/projects/$projectId"
                        params={{ projectId: op.id }}
                        className="block group"
                      >
                        <h5 className="text-xs font-bold text-white/70 group-hover:text-brand-accent transition-colors uppercase tracking-widest line-clamp-1 mb-1">
                          {op.title}
                        </h5>
                        <p className="text-[10px] text-white/30 group-hover:text-white/50 transition-colors line-clamp-1 italic">
                          {op.category}
                        </p>
                      </Link>
                    ))}
                 </div>
              </div>
            </div>
         </div>
      </div>

      {/* ─── Project Description ─── */}
      <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">

          {/* ─── Sticky sidebar: Quick Facts ─── */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <div className="lg:sticky lg:top-32 space-y-6">
              <div className="rounded-[28px] border border-brand-border/70 bg-white p-8 md:p-9 space-y-8">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-text/35">
                  Quick Facts
                </h4>
                <div className="space-y-7">
                  {quickFacts.map((fact, i) => {
                    const Icon = fact.icon
                    return (
                      <div key={i} className="flex gap-4 space-y-2">
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-text flex items-center justify-center text-brand-bg">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold uppercase tracking-widest text-brand-text mb-1.5">
                            {fact.label}
                          </h5>
                          <p className="text-sm text-brand-text/60 font-medium leading-relaxed">
                            {fact.value}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Mobile/tablet: other projects (hidden on lg since banner already shows it there) */}
              {otherProjects.length > 0 && (
                <div className="rounded-[28px] border border-brand-border/70 bg-white p-8 md:p-9 lg:hidden">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-text/35 mb-6">
                    Explore Other Projects
                  </h4>
                  <div className="space-y-5">
                    {otherProjects.map((op) => (
                      <Link
                        key={op.id}
                        to="/projects/$projectId"
                        params={{ projectId: op.id }}
                        className="block group"
                      >
                        <h5 className="text-xs font-bold text-brand-text/80 group-hover:text-brand-accent transition-colors uppercase tracking-widest line-clamp-1 mb-1">
                          {op.title}
                        </h5>
                        <p className="text-[11px] text-brand-text/40 group-hover:text-brand-text/60 transition-colors line-clamp-1 italic">
                          {op.category}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* ─── Main editorial content ─── */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-14 md:space-y-16">

            {/* Lead summary as pull-quote */}
            <div className="relative rise-in">
              
              <p className="text-2xl md:text-3xl text-brand-text leading-tight font-medium tracking-tight border-l-4 border-brand-accent pl-6 md:pl-8">
                {project.summary}
              </p>
            </div>

            {/* Intro paragraph */}
            {introParagraph && (
              <div className="rise-in">
                <p className="text-base md:text-lg text-brand-text/75 font-medium leading-[1.9]">
                  {introParagraph}
                </p>
              </div>
            )}

            {/* Project image */}
            <div className="relative overflow-hidden rounded-[28px] md:rounded-[40px] border-[8px] lg:border-[12px] border-brand-text/5 rise-in">
              <img
                src={project.image || '/banner_images/banner_image1.webp'}
                alt={project.title}
                loading="lazy"
                className="w-full h-[240px] sm:h-[320px] md:h-[420px] lg:h-[480px] object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-text/85 via-brand-text/25 to-transparent p-6 md:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-bg/60 mb-1">
                  Project Visual
                </p>
                <h3 className="text-lg md:text-2xl font-semibold text-white tracking-tight uppercase">
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Highlighted paragraphs — numbered editorial flow */}
            {highlightParagraphs.length > 0 && (
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute left-[27px] top-3 bottom-3 w-px bg-gradient-to-b from-brand-accent/40 via-brand-border to-transparent"
                />
                <div className="space-y-10 md:space-y-12">
                  {highlightParagraphs.map((para, i) => (
                    <div key={i} className="relative flex gap-6 md:gap-8 group">
                      <div className="relative shrink-0 w-14 h-14 rounded-2xl bg-brand-text text-brand-bg flex items-center justify-center font-bold text-sm tabular-nums transition-transform duration-500 group-hover:scale-105 group-hover:bg-brand-accent">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="pt-2.5">
                        <p className="text-base md:text-lg leading-[1.9] font-medium text-brand-text/75">
                          {para}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Closing paragraph */}
            {closingParagraph && (
              <div className="rise-in rounded-[28px] bg-brand-text text-brand-bg p-8 md:p-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-bg/40 mb-4">
                  In Summary
                </p>
                <p className="text-base md:text-lg text-brand-bg/85 font-medium leading-[1.9]">
                  {closingParagraph}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}