import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Beaker } from 'lucide-react'
import { researchAreasData } from '../data/data'

export const Route = createFileRoute('/area')({
  head: () => ({
    meta: [
      { title: 'Research Areas | UIU Biomedical Research Lab' },
      {
        name: 'description',
        content: 'Explore the key research areas at UIU BME Lab including Gene Polymorphism, Antimicrobial Resistance, and Molecular Biology.',
      },
      { property: 'og:title', content: 'Research Areas | UIU BME Lab' },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: AreaPage,
})

function AreaPage() {
  return (
    <main className="min-h-screen bg-brand-bg pb-32">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/3825368/pexels-photo-3825368.jpeg" 
          alt="Research Areas Banner" 
          className="w-full h-full object-cover grayscale brightness-[0.5] object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full px-6 pb-16 md:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white mb-6 transition-colors group">
               <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium leading-[1.05] tracking-tight text-white max-w-4xl uppercase">
              Research <br className="hidden md:block"/>Areas.
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {researchAreasData.map((area, index) => {
             const isSpecial = area.title === 'Gene Polymorphism';
             return (
              <div key={index} className={`group border p-10 md:p-14 rounded-[40px] transition-all duration-500 hover:border-brand-text/20 hover:-translate-y-2 flex flex-col h-full ${
                isSpecial ? 'bg-brand-text text-brand-bg border-transparent' : 'bg-brand-bg text-brand-text border-brand-border hover:border-brand-text/20'
              }`}>
                 {/* <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-10 transition-all duration-500 group-hover:scale-110 ${
                   isSpecial ? 'bg-brand-bg/10 text-brand-bg' : 'bg-brand-text/5 text-brand-text group-hover:bg-brand-text group-hover:text-brand-bg'
                 }`}>
                   <Beaker className="w-8 h-8" />
                 </div> */}

                 <div className="space-y-6 flex-grow">
                   <h3 className="text-2xl md:text-4xl font-medium tracking-tight leading-[1.2]">
                     {area.title}
                   </h3>
                   <p className={`text-base md:text-xl font-medium leading-relaxed ${
                     isSpecial ? 'text-brand-bg/80' : 'text-brand-text/70'
                   }`}>
                     {area.description}
                   </p>
                 </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  )
}
