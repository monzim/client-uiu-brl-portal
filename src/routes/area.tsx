import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { SmoothImage } from '../components/ui/SmoothImage'
import { researchAreasData } from '../data/data'

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

const areaImages: Record<string, string> = {
  'Cell Culture': '/work_picture/Cell Culture.webp',
  'Wound Healing': '/work_picture/Smart hydrogel for wound healing.webp',
  'Gene Polymorphism': '/current_project_images/Gene Polymorphism.webp',
  'Antimicrobial Resistance Gene':
    '/current_project_images/Antimicrobial Resistance.webp',
}

function AreaPage() {
  return (
    <main className="min-h-screen bg-brand-bg pb-32">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <SmoothImage
          src="/banner_images/banner_image1.webp"
          alt="Research Areas Banner"
          className="w-full h-full object-cover grayscale brightness-[0.5] object-center"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full px-6 pb-16 md:pb-24">
          <div className="max-w-[1400px] mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white mb-6 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />{' '}
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium leading-[1.05] tracking-tight text-white max-w-4xl">
              Research <br className="hidden md:block" />
              Areas.
            </h1>
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="py-14 md:py-20 px-6 border-b border-brand-border/30">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-text-soft/50 block mb-3">
              Areas of Focus
            </span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-brand-text leading-tight">
              What we explore.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-base md:text-xl font-medium text-brand-text/75 leading-relaxed max-w-2xl">
              Our laboratory pursues four core research directions that bridge
              fundamental biomedical science with clinical application.
            </p>
          </div>
        </div>
      </section>

      {/* Research Areas — one card per row, compact height (two fit per screen) */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
          {researchAreasData.map((area, index) => {
            const isSpecial = area.title === 'Gene Polymorphism'
            const image = areaImages[area.title] || areaImages['Cell Culture']
            return (
              <div
                key={index}
                className={`group relative rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 flex h-[48vh] min-h-[220px] ${
                  isSpecial
                    ? 'bg-brand-text text-brand-bg border-transparent hover:border-brand-text/40'
                    : 'bg-white text-brand-text border-brand-border hover:border-brand-text/40 hover:shadow-xl'
                }`}
              >
                {/* Body — left */}
                <div className="p-7 md:p-12 w-[54%] flex flex-col justify-center">
                  <h3 className="text-xl md:text-4xl font-medium tracking-tight leading-tight mb-4">
                    {area.title}
                  </h3>
                  <p
                    className={`text-sm md:text-lg font-medium leading-relaxed ${
                      isSpecial ? 'text-brand-bg/80' : 'text-brand-text/70'
                    }`}
                  >
                    {area.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span
                      className={`text-xs font-bold uppercase tracking-widest ${
                        isSpecial
                          ? 'text-brand-bg/70'
                          : 'text-brand-text-soft/60'
                      }`}
                    >
                      Explore Area
                    </span>
                    <ArrowUpRight
                      className={`w-4 h-4 ${
                        isSpecial
                          ? 'text-brand-bg/70'
                          : 'text-brand-text-soft/60'
                      }`}
                    />
                  </div>
                </div>

                {/* Image — right */}
                <div className="relative w-[46%] overflow-hidden">
                  <SmoothImage
                    src={image}
                    alt={area.title}
                    className="w-full h-full object-cover object-center brightness-[0.85] group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
                    containerClassName="w-full h-full"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-l ${
                      isSpecial
                        ? 'from-brand-text via-brand-text/30'
                        : 'from-black/40'
                    } to-transparent`}
                  />
                  {/* Index badge */}
                  <span
                    className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold tracking-wide transition-all duration-500 group-hover:scale-110 ${
                      isSpecial
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'bg-brand-text text-white'
                    }`}
                  >
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
