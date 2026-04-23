import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Handshake } from 'lucide-react'
import { partnershipsData, partnershipsIntro } from '../data/data'

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

function PartnershipPage() {
  return (
    <main className="min-h-screen bg-brand-bg pb-32">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" 
          alt="Partnership Banner" 
          className="w-full h-full object-cover grayscale brightness-[0.5] object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full px-6 pb-16 md:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white mb-6 transition-colors group">
               <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium leading-[1.05] tracking-tight text-white max-w-4xl uppercase">
              Our Collaborative <br className="hidden md:block"/>Network.
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 mt-20">
        <p className="text-lg md:text-2xl font-medium text-brand-text/60 leading-relaxed max-w-4xl mb-16">
          {partnershipsIntro}
        </p>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {partnershipsData.map((partner, index) => {
            const isFullWidth = index === 0;
            return (
              <div key={index} className={`group bg-brand-bg border border-brand-border p-10 md:p-14 rounded-[40px] transition-all duration-500 hover:border-brand-text/20 hover:-translate-y-2 flex flex-col h-full ${isFullWidth ? 'md:col-span-2 md:flex-row gap-12 items-center' : ''}`}>
                 
                 <div className={`shrink-0 flex items-start gap-6 ${isFullWidth ? 'w-full md:w-1/3 flex-col md:flex-row' : 'mb-8 flex-col'}`}>
                   {partner.logoUrl ? (
                     <div className="w-24 h-24 shrink-0 rounded-[32px] bg-brand-text flex items-center justify-center p-4  group-hover:scale-110 transition-all duration-500">
                       <img src={partner.logoUrl} alt={partner.name} className="w-full h-full object-contain brightness-0 invert opacity-90" />
                     </div>
                   ) : (
                     <div className="w-20 h-20 shrink-0 rounded-[32px] bg-brand-text/5 flex items-center justify-center text-brand-text group-hover:bg-brand-text group-hover:text-brand-bg group-hover:scale-110 transition-all duration-500">
                       <Handshake className="w-10 h-10" />
                     </div>
                   )}
                   <h3 className={`font-medium tracking-tight text-brand-text leading-[1.2] ${isFullWidth ? 'text-2xl md:text-4xl mt-2 md:mt-0' : 'text-xl mt-4'}`}>
                     {partner.name}
                   </h3>
                 </div>

                 <div className={`flex-1 ${isFullWidth ? 'border-t md:border-t-0 md:border-l border-brand-border/50 pt-8 md:pt-0 md:pl-12' : ''}`}>
                   <p className="text-base font-medium text-brand-text/70 leading-relaxed">
                     {partner.description}
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
