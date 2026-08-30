import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Handshake } from 'lucide-react'
import { SmoothImage } from '../components/ui/SmoothImage'
import { partnershipsData, partnershipsIntro } from '../data/data'
import { CollaborationSection } from '#/components/CollaborationSection'

export const Route = createFileRoute('/partnership')({
  head: () => ({
    meta: [
      { title: 'Partnerships & Collaborations | UIU Biomedical Research Lab' },
      {
        name: 'description',
        content: 'Discover our research partners and global collaborations that drive innovation at the UIU Biomedical Research Lab.',
      },
      { property: 'og:title', content: 'Partnerships | UIU BME Lab' },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: PartnershipPage,
})

// Key takeaways distilled from each partner's description
const sectionNotes = [
  {
    lead: 'World-class facilities, robust data, and leading scientific expertise—united to tackle Bangladesh\u2019s most critical health challenges.',
    points: [
      'Leading collaboration in infectious diseases, public health, and clinical investigation',
      'Access to state-of-the-art cell culture facilities and advanced research infrastructure',
      'Partnership with renowned scientists and innovative methodologies',
      'Robust datasets supporting high-quality biomedical research',
      'Joint initiatives addressing critical health challenges in Bangladesh and beyond',
    ],
  },
  {
    lead: 'Bringing oncology laboratory research into real clinical practice—for faster, more reliable cancer care.',
    points: [
      'Focused on drug response analysis, biomarker discovery, and therapeutic evaluation',
      'Bridges laboratory discoveries with clinical practice',
      'Access to clinically relevant cancer patient samples for reliable validation',
      'Drives better diagnostic tools and more effective treatment strategies',
      'Contributing to evidence-based cancer research and improved patient outcomes',
    ],
  },
  {
    lead: 'Turning laboratory findings into clinical answers—broadening our diagnostic and patient-care research.',
    points: [
      'Expands clinical and diagnostic research capabilities',
      'Validates laboratory results within real clinical settings',
      'Studies disease mechanisms, therapeutic outcomes, and patient-centered care',
      'Access to clinical expertise and diagnostic resources',
      'Advancing evidence-based healthcare and patient management',
    ],
  },
]

function PartnershipPage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      {/* Hero Banner — consistent with the rest of the site */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <SmoothImage
          src="/banner_images/1.Inorganic-lab-pic.webp"
          alt="Partnership Banner"
          className="w-full h-full object-cover grayscale brightness-[0.5] object-center"
          containerClassName="w-full h-full"
        />

        {/* Orbital constellation layered over the banner */}
        <svg
          viewBox="0 0 1200 500"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 w-full h-full opacity-10"
        >
          <g stroke="#ffffff">
            <circle cx="980" cy="250" r="120" strokeWidth="1" opacity="0.6" />
            <circle cx="980" cy="250" r="200" strokeWidth="1" opacity="0.4" strokeDasharray="2 10" />
            <circle cx="980" cy="250" r="290" strokeWidth="1" opacity="0.25" />
            <path d="M980 250L1140 250M980 250L1050 380M980 250L980 120M980 250L840 250M980 250L910 150" strokeWidth="1" opacity="0.4" />
          </g>
          <g fill="#ffffff">
            <circle cx="980" cy="120" r="5" />
            <circle cx="1140" cy="250" r="5" />
            <circle cx="1050" cy="380" r="5" />
            <circle cx="840" cy="250" r="5" />
            <circle cx="910" cy="150" r="3" />
            <circle cx="1080" cy="150" r="3" />
            <circle cx="1080" cy="340" r="3" />
            <circle cx="900" cy="330" r="3" />
          </g>
        </svg>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 w-full px-6 pb-16 md:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />{' '}
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium leading-[1.05] tracking-tight text-white max-w-4xl uppercase">
              Our Collaborative <br className="hidden md:block" />
              Network.
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative px-6 pt-16 md:pt-24 pb-24 md:pb-36">
        {/* Subtle dotted grid over content */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(#0e1f1a 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            opacity: '0.04',
          }}
        />

        <div className="relative max-w-[1500px] w-full mx-auto lg:px-6">
          <p className="text-base md:text-2xl font-medium text-brand-text/60 leading-relaxed max-w-4xl mb-16 md:mb-24">
            {partnershipsIntro}
          </p>
          <CollaborationSection/>

          <div className="space-y-8 md:space-y-10">
            {/* ─── 01 · icddr,b — Featured dark panel ─── */}
            {partnershipsData[0] && (
              <div className="group relative overflow-hidden rounded-[32px] md:rounded-[52px] bg-brand-text text-brand-bg p-8 md:p-14 lg:p-20">
                {/* constellation motif */}
                <svg
                  viewBox="0 0 700 700"
                  fill="none"
                  aria-hidden="true"
                  className="pointer-events-none select-none absolute top-0 right-0 w-[55%] min-w-[340px] opacity-[0.06]"
                >
                  <g stroke="#ffffff">
                    <circle cx="350" cy="350" r="180" strokeWidth="1" />
                    <circle cx="350" cy="350" r="280" strokeWidth="1" strokeDasharray="2 10" />
                    <path d="M350 350L530 350M350 350L450 510M350 350L170 350M350 350L250 510" strokeWidth="1" />
                  </g>
                  <g fill="#ffffff">
                    <circle cx="350" cy="350" r="10" />
                    <circle cx="530" cy="350" r="6" />
                    <circle cx="450" cy="510" r="6" />
                    <circle cx="170" cy="350" r="6" />
                    <circle cx="250" cy="510" r="6" />
                  </g>
                </svg>

                <div className="relative">
                  <div className="flex items-center gap-4 mb-10 md:mb-14">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                      01
                    </span>
                    <span className="h-px w-16 bg-white/20" aria-hidden="true" />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    {/* Logo medallion with orbiting ring */}
                    <div className="lg:col-span-4 flex lg:flex-col items-center lg:items-start gap-8 lg:gap-10">
                      <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
                        <motion.div
                          className="absolute inset-0"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
                        >
                          <svg viewBox="0 0 160 160" fill="none" aria-hidden="true" className="w-full h-full">
                            <circle cx="80" cy="80" r="74" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 9" opacity="0.45" />
                            <circle cx="80" cy="6" r="4" fill="#ffffff" opacity="0.7" />
                          </svg>
                        </motion.div>
                        <div className="absolute inset-[18%] rounded-[26px] md:rounded-[30px] bg-white/10 border border-white/15 backdrop-blur-sm flex items-center justify-center p-4 transition-transform duration-700 group-hover:scale-105">
                          <img
                            src={partnershipsData[0].logoUrl}
                            alt={partnershipsData[0].name}
                            className="w-full h-full object-contain brightness-0 invert opacity-95"
                          />
                        </div>
                      </div>
                      <h2 className="text-xl md:text-4xl xl:text-4xl font-medium tracking-tight text-white leading-[1.05] max-w-xs text-center lg:text-left">
                        {partnershipsData[0].name}
                      </h2>
                    </div>

                    {/* Main point + description */}
                    <div className="lg:col-span-8">
                      <p className="text-xl md:text-2xl xl:text-[30px] font-medium leading-snug text-white mb-8 max-w-2xl">
                        {sectionNotes[0].lead}
                      </p>
                      <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl">
                        {partnershipsData[0].description}
                      </p>
                    </div>
                  </div>

                  {/* Highlights grid */}
                  <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
                    {sectionNotes[0].points.map((point, i) => (
                      <div key={i} className="bg-brand-text p-5 md:p-6 flex items-start gap-3">
                        <Check className="w-4 h-4 text-white/60 shrink-0 mt-0.5" />
                        <span className="text-sm md:text-[15px] font-medium text-white/85 leading-snug">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─── 02 · LabAid Cancer Hospital — Light card ─── */}
            {partnershipsData[1] && (
              <div className="group relative overflow-hidden rounded-[32px] md:rounded-[52px] bg-brand-text text-brand-bg border border-white/10 p-8 md:p-14">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 md:w-[380px] md:h-[380px] rounded-full bg-white/10 blur-[100px] opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
                />

                <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 md:mb-12">
                  <div className="flex items-center gap-5">
                    <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-[22px] bg-white/10 border border-white/15 backdrop-blur-sm flex items-center justify-center p-3 transition-transform duration-700 group-hover:scale-105">
                      <img
                        src={partnershipsData[1].logoUrl}
                        alt={partnershipsData[1].name}
                        className="w-full h-full object-contain brightness-0 invert opacity-95"
                      />
                    </div>
                    <h2 className="text-2xl md:text-3xl xl:text-4xl font-medium tracking-tight text-white leading-[1.1]">
                      {partnershipsData[1].name}
                    </h2>
                  </div>
                  <span
                    className="select-none text-6xl md:text-8xl font-medium leading-none text-white/10 md:self-start hidden md:block"
                    aria-hidden="true"
                  >
                    02
                  </span>
                </div>

                <p className="relative text-xl md:text-2xl xl:text-[26px] font-medium text-white leading-snug mb-8 max-w-2xl">
                  {sectionNotes[1].lead}
                </p>

                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    {partnershipsData[1].description}
                  </p>
                  <ul className="space-y-0 divide-y divide-white/10">
                    {sectionNotes[1].points.map((point, i) => (
                      <li key={i} className="py-3.5 flex items-start gap-4 first:pt-0 last:pb-0">
                        <span className="mt-0.5 w-6 h-6 rounded-full bg-white text-brand-text flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-sm md:text-[15px] font-medium text-white/85 leading-snug">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* ─── 03 · Omega Hospital — Soft tinted card ─── */}
            {partnershipsData[2] && (
              <div className="group relative overflow-hidden rounded-[32px] md:rounded-[52px] bg-brand-text text-brand-bg border border-white/10 p-8 md:p-14">
                {/* ECG watermark */}
                <svg
                  viewBox="0 0 240 120"
                  fill="none"
                  aria-hidden="true"
                  className="pointer-events-none select-none absolute -bottom-4 -right-4 w-56 md:w-72 text-white opacity-[0.06] transition-all duration-700 group-hover:opacity-10"
                >
                  <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 60H80L95 20L110 100L125 45L140 60H230" />
                  </g>
                </svg>

                <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 md:mb-12">
                  <div className="flex items-center gap-5">
                    <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-[22px] bg-white/10 border border-white/15 backdrop-blur-sm flex items-center justify-center p-0 transition-transform duration-700 group-hover:scale-105">
                      <Handshake className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl xl:text-4xl font-medium tracking-tight text-white leading-[1.1]">
                      {partnershipsData[2].name}
                    </h2>
                  </div>
                  <span
                    className="select-none text-6xl md:text-8xl font-medium leading-none text-white/10 md:self-start hidden md:block"
                    aria-hidden="true"
                  >
                    03
                  </span>
                </div>

                <p className="relative text-xl md:text-2xl xl:text-[26px] font-medium text-white leading-snug mb-8 max-w-2xl">
                  {sectionNotes[2].lead}
                </p>

                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
                  <p className="text-sm md:text-base text-white/70 leading-relaxed md:pr-10">
                    {partnershipsData[2].description}
                  </p>
                  <div className="flex flex-wrap gap-3 content-start">
                    {sectionNotes[2].points.map((point, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm md:text-[15px] font-medium text-white/85 transition-all duration-500 hover:border-white hover:-translate-y-0.5"
                      >
                        <Check className="w-3.5 h-3.5 text-white/80 shrink-0" />
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}