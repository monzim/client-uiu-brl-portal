import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowLeft, Maximize2, X } from 'lucide-react'
import { SmoothImage } from '../components/ui/SmoothImage'
import { equipmentData } from '../data/data'
import type { Equipment } from '../data/data'

export const Route = createFileRoute('/equipment')({
  head: () => ({
    meta: [
      { title: 'Laboratory Equipment | UIU Biomedical Research Lab' },
      {
        name: 'description',
        content:
          'View the advanced laboratory equipment and diagnostic tools available at the UIU Biomedical Research Lab.',
      },
      { property: 'og:title', content: 'Laboratory Equipment | UIU BME Lab' },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: EquipmentPage,
})

function EquipmentPage() {
  const [selected, setSelected] = useState<Equipment | null>(null)

  return (
    <main className="min-h-screen bg-brand-bg pb-32">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <SmoothImage
          src="https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg"
          alt="Equipment Banner"
          className="w-full h-full object-cover grayscale brightness-[0.5] object-center"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 w-full px-6 pb-16 md:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white mb-6 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />{' '}
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium leading-[1.05] tracking-tight text-white max-w-4xl uppercase">
              Equipment <br className="hidden md:block" />
              Facility.
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 mt-20">
        <div className="mb-16 space-y-4">
          <h2 className="text-sm font-bold tracking-widest text-brand-text/40 uppercase">
            Facility Assets
          </h2>
          <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-brand-text">
            Advanced instrumentation. <br /> Precise results.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipmentData.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => item.image && setSelected(item)}
              className="group w-full text-left bg-brand-bg rounded-[32px] p-8 border border-brand-border hover:border-brand-text/20 hover:-translate-y-2 transition-all duration-500 flex flex-col items-start cursor-pointer"
            >
              <div className="mb-8 w-full aspect-[4/3] rounded-2xl overflow-hidden bg-brand-border relative">
                {item.image ? (
                  <>
                    <SmoothImage
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover grayscale brightness-[1.1] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      containerClassName="w-full h-full"
                    />
                    <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-brand-bg/90 backdrop-blur-sm flex items-center justify-center text-brand-text opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-text/30 text-xs font-bold uppercase tracking-widest">
                    No image available
                  </div>
                )}
              </div>
              {item.origin && (
                <p className="text-[10px] text-brand-text/40 font-bold uppercase tracking-widest mb-2 border-b border-brand-border pb-1 w-full">
                  {item.origin}
                </p>
              )}
              <h4 className="text-xl font-bold text-brand-text mb-4 leading-tight">
                {item.name}
              </h4>
              {item.description && (
                <p className="text-brand-text/60 leading-relaxed text-sm font-medium">
                  {item.description}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Equipment Lightbox */}
      <Dialog.Root
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-brand-text/70 backdrop-blur-sm animate-in fade-in duration-300" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-8rem)] lg:w-auto lg:max-w-[1000px] max-h-[92dvh] overflow-y-auto lg:overflow-hidden bg-brand-bg rounded-[24px] shadow-2xl border border-brand-border outline-none animate-in zoom-in-95 fade-in duration-300">
            {selected && (
              <div className="lg:grid lg:grid-cols-[55%_45%] lg:h-[80vh]">
                {/* Mobile close (sticky, stays visible while scrolling) */}
                <div className="sticky top-0 z-20 flex justify-end p-3 sm:p-4 lg:hidden">
                  <Dialog.Close asChild>
                    <button
                      aria-label="Close"
                      className="p-2.5 sm:p-3 rounded-full bg-brand-bg/95 text-brand-text shadow-lg hover:bg-brand-accent hover:text-brand-bg transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Desktop close (top right over the description column) */}
                <Dialog.Close asChild>
                  <button
                    aria-label="Close"
                    className="hidden lg:flex absolute top-4 right-4 z-20 p-3 rounded-full bg-brand-bg/95 text-brand-text shadow-lg hover:bg-brand-accent hover:text-brand-bg transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </Dialog.Close>

                {/* Image — left column on desktop, top on mobile */}
                <div className="relative px-4 sm:px-8 -mt-14 sm:-mt-16 lg:mt-0 lg:px-0 lg:h-full">
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="w-full h-[40vh] sm:h-[55vh] lg:h-full lg:max-h-full object-cover rounded-2xl lg:rounded-none"
                  />
                </div>

                {/* Description — right column on desktop, below image on mobile */}
                <div className="p-4 sm:p-8 pt-6 sm:pt-8 lg:h-full lg:overflow-y-auto lg:p-10 lg:pt-10 lg:flex lg:flex-col lg:justify-center">
                  {selected.origin && (
                    <p className="text-[10px] text-brand-text/40 font-bold uppercase tracking-widest mb-2 border-b border-brand-border pb-1 w-full">
                      {selected.origin}
                    </p>
                  )}
                  <Dialog.Title className="text-2xl sm:text-3xl font-bold text-brand-text mb-4 leading-tight">
                    {selected.name}
                  </Dialog.Title>
                  <Dialog.Description className="text-brand-text/70 leading-relaxed text-sm sm:text-base font-medium">
                    {selected.description || 'No description available.'}
                  </Dialog.Description>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </main>
  )
}
