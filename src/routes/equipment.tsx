import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { equipmentData } from '../data/data'

export const Route = createFileRoute('/equipment')({
  head: () => ({
    meta: [
      { title: 'Laboratory Equipment | UIU Biomedical Research Lab' },
      {
        name: 'description',
        content: 'View the advanced laboratory equipment and diagnostic tools available at the UIU Biomedical Research Lab.',
      },
      { property: 'og:title', content: 'Laboratory Equipment | UIU BME Lab' },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: EquipmentPage,
})

function EquipmentPage() {
  return (
    <main className="min-h-screen bg-brand-bg pb-32">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg" 
          alt="Equipment Banner" 
          className="w-full h-full object-cover grayscale brightness-[0.5] object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full px-6 pb-16 md:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white mb-6 transition-colors group">
               <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium leading-[1.05] tracking-tight text-white max-w-4xl uppercase">
              Equipment <br className="hidden md:block"/>Facility.
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 mt-20">
        <div className="mb-16 space-y-4">
          <h2 className="text-sm font-bold tracking-widest text-brand-text/40 uppercase">Facility Assets</h2>
          <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-brand-text">
            Advanced instrumentation. <br /> Precise results.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipmentData.map((item) => (
            <div key={item.id} className="group bg-brand-bg rounded-[32px] p-8 border border-brand-border hover:border-brand-text/20 transition-all duration-500 flex flex-col items-start hover:-translate-y-2">
              <div className="mb-8 w-full aspect-[4/3] rounded-2xl overflow-hidden bg-brand-border transition-shadow duration-500">
                 <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale brightness-[1.1] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
              </div>
              <p className="text-[10px] text-brand-text/40 font-bold uppercase tracking-widest mb-2 border-b border-brand-border pb-1 w-full">{item.origin}</p>
              <h4 className="text-xl font-bold text-brand-text mb-4 leading-tight">{item.name}</h4>
              <p className="text-brand-text/60 leading-relaxed text-sm font-medium">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
