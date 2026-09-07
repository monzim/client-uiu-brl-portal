import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { SmoothImage } from '../components/ui/SmoothImage'
import { aboutData } from '../data/data'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About BRL | UIU Biomedical Research Lab' },
      {
        name: 'description',
        content:
          'Learn more about the UIU Biomedical Research Lab, our mission, vision, and the innovative research we conduct in the field of BME.',
      },
      { property: 'og:title', content: 'About BRL | UIU BME Lab' },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: About,
})

function About() {
  return (
    <main className="min-h-screen bg-brand-bg pb-20">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <SmoothImage
          src="/banner_images/3u-3.webp"
          alt="BRL Laboratory"
          className="w-full h-full object-cover grayscale brightness-[0.6] object-center"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 w-full px-6 pb-16 md:pb-24">
          <div className="max-w-[1400px] mx-auto">
            <h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium leading-[1.05] tracking-tight text-white max-w-4xl">
              Scientific discovery <br className="hidden md:block" />
              for humanity.
            </h1>
          </div>
        </div>
      </section>
      <section className="py-16 p-6 mx-auto  md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative bg-brand-text ">
        <div className="lg:col-span-8 xl:col-span-9 space-y-6 lg:pr-12 px-6">
          {aboutData.intro.split('\n\n').map((paragraph, idx) => (
            <p
              key={idx}
              className="text-sm md:text-xl font-medium text-white/80 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="hidden lg:flex lg:col-span-4 xl:col-span-3 justify-center items-center pointer-events-none select-none opacity-[0.9]">
          <SmoothImage
            src="/images/transparent original logo.png"
            alt="BRL Watermark"
            className="w-full max-w-[300px] h-auto object-contain"
            containerClassName="bg-transparent"
          />
        </div>
      </section>

      {/* Our Goal / Ethos Section */}
      <section className="bg-brand-text text-white py-20 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column (Heading + Badges) */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32 h-fit">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
              Our Goals
            </h2>
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-xs font-medium uppercase tracking-wider text-white border border-white/10">
                Innovative Research
              </span>
              <span className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-xs font-medium uppercase tracking-wider text-white border border-white/10">
                Academic Excellence
              </span>
              <span className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-xs font-medium uppercase tracking-wider text-white border border-white/10">
                Healthcare Solutions
              </span>
            </div>
          </div>

          {/* Right Column (Aim Callout) */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 uppercase">
                Our Aim
              </h3>
              <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-snug tracking-tight max-w-2xl">
                {aboutData.aim}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section — Typographic layout, mirroring Goals but right-aligned */}
      <section className="bg-brand-bg py-20 md:py-32 px-6 border-b border-brand-border/20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column (Vision Text) */}
          <div className="lg:col-span-8 flex flex-col justify-center order-2 lg:order-1">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text-soft/40">
                Our Vision
              </h3>
              <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-brand-text leading-snug tracking-tight max-w-2xl">
                {aboutData.vision}
              </p>
            </div>
          </div>

          {/* Right Column (Heading + Badges) */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32 h-fit order-1 lg:order-2 flex flex-col items-start lg:items-end text-left lg:text-right">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-brand-text leading-tight">
              Our Vision
            </h2>
            <div className="flex flex-wrap gap-2.5 pt-2 justify-start lg:justify-end">
              <span className="inline-block px-4 py-2 bg-brand-text/5 hover:bg-brand-text/10 transition-colors rounded-full text-xs font-medium uppercase tracking-wider text-brand-text border border-brand-border/30">
                Global Recognition
              </span>
              <span className="inline-block px-4 py-2 bg-brand-text/5 hover:bg-brand-text/10 transition-colors rounded-full text-xs font-medium uppercase tracking-wider text-brand-text border border-brand-border/30">
                Innovation
              </span>
              <span className="inline-block px-4 py-2 bg-brand-text/5 hover:bg-brand-text/10 transition-colors rounded-full text-xs font-medium uppercase tracking-wider text-brand-text border border-brand-border/30">
                Quality Research
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section — headers + white card together left, three points right */}
      <section className="bg-brand-text text-white py-20 md:py-32 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column — header + white description together, sticky */}
          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-32 h-fit">
            <div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
                Our Mission
              </h2>
              <div className="flex flex-wrap gap-2.5 pt-5">
                <span className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-xs font-medium uppercase tracking-wider text-white border border-white/10">
                  Research Excellence
                </span>
                <span className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-xs font-medium uppercase tracking-wider text-white border border-white/10">
                  Future Scientists
                </span>
                <span className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-xs font-medium uppercase tracking-wider text-white border border-white/10">
                  Pharmaceutical Advancement
                </span>
              </div>
            </div>

            {/* White mission description — shares the sticky column with the header */}
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-white/30 to-white/5 rounded-r-full" />
              <div className="ml-4 px-8 py-10 bg-white rounded-2xl shadow-2xl">
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand-text-soft/50 block mb-2">
                  Mission
                </span>
                <p className="text-xl md:text-2xl font-semibold text-brand-text leading-snug">
                  Fulfilling our scientific mandate for healthcare innovation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column — three mission points, typographic text only */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="space-y-9 md:space-y-11 max-w-2xl">
              {aboutData.mission.map((item, idx) => (
                <div key={idx} className="relative pl-6 md:pl-8">
                  <div className="absolute inset-y-0 left-0 w-1 mr-4 bg-gradient-to-b from-white/30 to-white/5 rounded-r-full" />
                  <p className="text-lg md:text-2xl lg:text-[26px] font-medium text-white/85 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      {/* Objectives Section — Radial Hub-and-Spoke */}
      <section className="relative bg-brand-bg py-20 md:py-32 px-6 overflow-hidden">
        {/* Subtle double-helix background */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          viewBox="0 0 1400 1200"
          preserveAspectRatio="xMidYMid slice"
          opacity="0.14"
        >
          <defs>
            <linearGradient id="helixStrand1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a4d3f" />
              <stop offset="100%" stopColor="#3f6a58" />
            </linearGradient>
            <linearGradient id="helixStrand2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7baa94" />
              <stop offset="100%" stopColor="#2a4d3f" />
            </linearGradient>
          </defs>

          {/* Left helix */}
          <g fill="none" strokeWidth="18" strokeLinecap="round">
            <path
              d="M 60 40
                 C 320 180, 320 320, 60 460
                 C -200 600, -200 740, 60 880
                 C 320 1020, 320 1080, 60 1180"
              stroke="url(#helixStrand1)"
            />
            <path
              d="M -160 40
                 C 100 180, 100 320, -160 460
                 C -420 600, -420 740, -160 880
                 C 100 1020, 100 1080, -160 1180"
              stroke="url(#helixStrand2)"
            />
          </g>

          {/* Right helix */}
          <g fill="none" strokeWidth="14" strokeLinecap="round" opacity="0.7">
            <path
              d="M 1360 -20
                 C 1120 160, 1120 300, 1360 460
                 C 1600 620, 1600 760, 1360 920
                 C 1120 1060, 1120 1140, 1360 1240"
              stroke="url(#helixStrand1)"
            />
            <path
              d="M 1560 -20
                 C 1320 160, 1320 300, 1560 460
                 C 1800 620, 1800 760, 1560 920
                 C 1320 1060, 1320 1140, 1560 1240"
              stroke="url(#helixStrand2)"
            />
          </g>

          {/* Vertical rungs linking the two strands of each helix */}
          <g stroke="#2a4d3f" strokeWidth="3" opacity="0.6">
            <path d="M 60 40 L -160 40" />
            <path d="M 60 460 L -160 460" />
            <path d="M 60 880 L -160 880" />
            <path d="M 1360 -20 L 1560 -20" />
            <path d="M 1360 460 L 1560 460" />
            <path d="M 1360 920 L 1560 920" />
          </g>
        </svg>

        <div className="relative max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="text-center mb-14 md:mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-text-soft/40 block mb-3">
              Objectives
            </span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-brand-text leading-tight">
              Our core objectives in transforming healthcare.
            </h3>
          </div>

          {/* ── DESKTOP radial layout — full width ── */}
          <div
            className="hidden lg:block relative w-full"
            style={{ aspectRatio: '1 / 0.75', maxHeight: '860px' }}
          >
            {/* Center root node — text only, no card */}
            <div
              className="absolute z-10 flex flex-col items-center justify-center text-center pointer-events-none"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '290px',
              }}
            >
              <p className="text-4xl md:text-5xl font-semibold text-brand-text leading-tight">
                Our Objectives
              </p>
            </div>

            {/* Connecting lines — minimal opacity, animate in with nodes */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              preserveAspectRatio="none"
            >
              {aboutData.objectives.map((_, i) => {
                const angle = (i * 360) / 7 - 90
                const rad = (angle * Math.PI) / 180
                const r = 250
                const svgW = 1000
                const svgH = 750
                const shiftX = i === 4 ? -3 : i === 5 || i === 6 ? -8 : 0
                const cxPct = ((500 + r * Math.cos(rad)) / svgW) * 100 + shiftX
                const cyPct = ((375 + r * Math.sin(rad)) / svgH) * 100
                return (
                  <g key={i}>
                    <motion.line
                      x1="50%"
                      y1="50%"
                      x2={`${cxPct}%`}
                      y2={`${cyPct}%`}
                      stroke="#2a4d3f"
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.06 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.12 + 0.7,
                        ease: 'easeOut',
                      }}
                    />
                    <motion.circle
                      cx={`${cxPct}%`}
                      cy={`${cyPct}%`}
                      r="3"
                      fill="#2a4d3f"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: [0, 1.6, 1], opacity: 0.35 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.12 + 1.45,
                        ease: 'easeOut',
                      }}
                      style={{
                        transformBox: 'fill-box',
                        transformOrigin: 'center',
                      }}
                    />
                  </g>
                )
              })}
            </svg>

            {/* 7 spoke nodes — text only, animate from behind center and spread */}
            {aboutData.objectives.map((item, i) => {
              const angle = (i * 360) / 7 - 90
              const rad = (angle * Math.PI) / 180
              const r = 250
              const svgW = 1000
              const svgH = 750
              const nudgeX = -2
              const nudgeY = -3
              const shiftX = i === 4 ? -3 : i === 5 || i === 6 ? -8 : 0
              // Small positional tweak for the first and last objective
              const extraShiftX = i === 0 || i === 6 ? -4 : 0
              const extraShiftY = i === 0 || i === 6 ? -4 : 0
              const cxPct =
                ((500 + r * Math.cos(rad)) / svgW) * 100 +
                shiftX +
                nudgeX +
                extraShiftX
              const cyPct =
                ((375 + r * Math.sin(rad)) / svgH) * 100 + nudgeY + extraShiftY
              // Alternate color: even → white bg + brand text, odd → brand bg + white text
              const bg =
                i % 2 === 0
                  ? 'text-white bg-brand-text border border-brand-text'
                  : 'text-brand-text bg-white border border-brand-border/40'
              return (
                <motion.div
                  key={i}
                  className="absolute w-[260px]"
                  initial={{ left: '50%', top: '50%', scale: 0, opacity: 0 }}
                  whileInView={{
                    left: `${cxPct}%`,
                    top: `${cyPct}%`,
                    scale: 1,
                    opacity: 1,
                  }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.12,
                    ease: 'easeOut',
                  }}
                  style={{ zIndex: i % 2 === 0 ? 8 : 5 }}
                >
                  <div
                    className={`rounded-full px-6 py-4 text-center text-base font-medium leading-snug shadow-sm ${bg}`}
                  >
                    {item}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* ── TABLET: 2-column + center card ── */}
          <div className="hidden md:block lg:hidden">
            {/* Center hub banner */}
            <div className="flex justify-center mb-6">
              <div className="w-full max-w-sm px-8 py-5 bg-brand-text rounded-2xl shadow-xl text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1">
                  Core
                </span>
                <p className="text-base font-bold text-white">Our Objectives</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {aboutData.objectives.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white hover:bg-brand-text hover:text-white transition-all duration-400 rounded-2xl border border-brand-border/40 flex gap-4 items-start group shadow-sm hover:shadow-xl"
                >
                  <span className="w-7 h-7 rounded-full bg-brand-text/5 text-brand-text font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-white/15 group-hover:text-white transition-colors duration-300">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <p className="text-sm font-medium text-brand-text-soft group-hover:text-white/90 leading-relaxed transition-colors duration-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── MOBILE: vertical list ── */}
          <div className="md:hidden space-y-3">
            {/* Hub label */}
            <div className="flex justify-center mb-4">
              <div className="px-6 py-3 bg-brand-text rounded-xl text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">
                  Core
                </span>
                <p className="text-sm font-bold text-white mt-0.5">
                  Our Objectives
                </p>
              </div>
            </div>
            {aboutData.objectives.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-white rounded-2xl border border-brand-border/40 flex gap-4 items-start shadow-sm"
              >
                <span className="w-7 h-7 rounded-full bg-brand-text/5 text-brand-text font-bold text-xs flex items-center justify-center shrink-0">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
                <p className="text-sm font-medium text-brand-text-soft leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Accent Banner (United City built. Global impact.) */}
      <section className="bg-brand-bg px-6 pb-20 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative w-full h-[50vh] md:h-[65vh] rounded-[40px] overflow-hidden group shadow-lg border border-brand-border">
            <SmoothImage
              src="/banner_images/9u-9.webp"
              alt="UIU Campus"
              className="w-full h-full object-cover grayscale brightness-[0.35] group-hover:scale-105 transition-transform duration-1000"
              containerClassName="w-full h-full"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="space-y-8 max-w-4xl">
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-medium text-white tracking-tight leading-tight">
                  United City built. <br />
                  Global impact.
                </h2>

                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <a
                    href={aboutData.location.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center px-8 py-3.5 bg-white text-brand-text hover:bg-brand-text hover:text-white hover:border-brand-text border border-white rounded-full font-semibold text-xs md:text-sm uppercase tracking-wider transition-all duration-300"
                  >
                    View on Maps
                  </a>
                  <a
                    href={`mailto:${aboutData.location.contact.split(',')[0].trim()}`}
                    className="inline-flex items-center px-8 py-3.5 bg-transparent text-white hover:bg-white hover:text-brand-text border border-white/40 hover:border-white rounded-full font-semibold text-xs md:text-sm uppercase tracking-wider transition-all duration-300"
                  >
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Contact / Address (Join the Caladan team inspired layout) */}
    </main>
  )
}
