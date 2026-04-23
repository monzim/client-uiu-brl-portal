import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Trophy, Award as AwardIcon } from 'lucide-react'
import { awardsData } from '../data/data'

export const Route = createFileRoute('/awards')({
  head: () => ({
    meta: [
      { title: 'Awards & Achievements | UIU Biomedical Research Lab' },
      {
        name: 'description',
        content: 'Celebrating the awards, achievements, and recognition received by the researchers and students of UIU BME Lab.',
      },
      { property: 'og:title', content: 'Awards | UIU BME Lab' },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: AwardsPage,
})

function AwardsPage() {
  const owsd = awardsData.find(a => a.name.includes("OWSD"));
  const joy = awardsData.find(a => a.recipient.includes("Joy"));
  const sathi = awardsData.find(a => a.recipient.includes("Sathi"));
  const das = awardsData.find(a => a.recipient.includes("Das"));
  const rakhi = awardsData.find(a => a.recipient.includes("Rakhi"));
  const sabiha = awardsData.find(a => a.recipient.includes("Sabiha"));

  return (
    <main className="min-h-screen bg-brand-bg pb-32">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg" 
          alt="Awards Banner" 
          className="w-full h-full object-cover grayscale brightness-[0.5] object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full px-6 pb-16 md:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white mb-6 transition-colors group">
               <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium leading-[1.05] tracking-tight text-white max-w-4xl uppercase">
              Awards & <br className="hidden md:block"/>Achievements.
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 mt-20">
        
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8">
          
          {/* Row 1: 3 Small Cards */}
          {[das, rakhi, sabiha].map((award, index) => award && (
            <div key={`small-${index}`} className="md:col-span-2 group bg-brand-bg border border-brand-border p-8 rounded-[32px] transition-all duration-500 hover:border-brand-text/20 hover:-translate-y-1 flex flex-col h-full">
               <div className="flex justify-between items-start mb-8">
                 <div className="w-12 h-12 rounded-2xl bg-brand-text/5 flex items-center justify-center text-brand-text group-hover:scale-110 group-hover:bg-brand-text group-hover:text-brand-bg transition-all duration-500">
                   <AwardIcon className="w-6 h-6" />
                 </div>
                 {award.amount && (
                   <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-text/5 text-brand-text/60 text-xs font-bold tracking-widest uppercase border border-brand-border/50">
                     {award.amount}
                   </span>
                 )}
               </div>

               <div className="space-y-4 flex-grow flex flex-col justify-between">
                 <div>
                   <h3 className="text-xl font-medium tracking-tight text-brand-text leading-[1.3] mb-2 line-clamp-3">
                     {award.name}
                   </h3>
                   <div className="flex items-center gap-2 text-brand-text/80">
                      <span className="w-4 h-[1px] bg-brand-text/20"></span>
                      <p className="text-sm font-bold tracking-wide uppercase">{award.recipient}</p>
                   </div>
                 </div>
                 
                 {award.projectTitle && (
                   <div className="pt-4 border-t border-brand-border/30 mt-4">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text/40 mb-1">Project</p>
                     <p className="text-brand-text/70 text-sm font-medium leading-relaxed italic line-clamp-4">
                       "{award.projectTitle}"
                     </p>
                   </div>
                 )}
               </div>
            </div>
          ))}

          {/* Row 2: 2 Larger Cards */}
          {[joy, sathi].map((award, index) => award && (
            <div key={`large-${index}`} className="md:col-span-3 group bg-brand-bg border border-brand-border p-10 rounded-[32px] transition-all duration-500 hover:border-brand-text/20 hover:-translate-y-1 flex flex-col h-full">
               <div className="flex justify-between items-start mb-10">
                 <div className="w-16 h-16 rounded-3xl bg-brand-text/5 flex items-center justify-center text-brand-text group-hover:scale-110 group-hover:bg-brand-text group-hover:text-brand-bg transition-all duration-500">
                   <AwardIcon className="w-8 h-8" />
                 </div>
                 {award.amount && (
                   <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-text/5 text-brand-text/60 text-sm font-bold tracking-widest uppercase border border-brand-border/50">
                     {award.amount}
                   </span>
                 )}
               </div>

               <div className="space-y-6 flex-grow flex flex-col justify-between">
                 <div>
                   <h3 className="text-xl md:text-3xl font-medium tracking-tight text-brand-text leading-[1.3] mb-4">
                     {award.name}
                   </h3>
                   <div className="flex items-center gap-3 text-brand-text/80">
                      <span className="w-6 h-[1px] bg-brand-text/20"></span>
                      <p className="text-base font-bold tracking-wide uppercase">{award.recipient}</p>
                   </div>
                 </div>
                 
                 {award.projectTitle && (
                   <div className="p-6 rounded-2xl bg-brand-text/5 border border-brand-border/50 mt-auto">
                     <p className="text-xs font-bold uppercase tracking-widest text-brand-text/40 mb-2">Project Title</p>
                     <p className="text-brand-text/80 font-medium leading-relaxed italic">
                       "{award.projectTitle}"
                     </p>
                   </div>
                 )}
               </div>
            </div>
          ))}

          {/* Row 3: 1 Biggest Card (OWSD) */}
          {owsd && (
            <div className="md:col-span-6 group bg-brand-bg border border-brand-border p-10 md:p-16 rounded-[40px] transition-all duration-500 hover:border-brand-text/20 hover:-translate-y-2 flex flex-col md:flex-row gap-12 items-center">
               <div className="flex-1 space-y-8">
                 <div className="flex items-start gap-6 mb-2">
                   <div className="w-20 h-20 shrink-0 rounded-[32px] bg-brand-text flex items-center justify-center text-brand-bg group-hover:scale-110 transition-all duration-500">
                     <Trophy className="w-10 h-10" />
                   </div>
                   <div>
                     <h3 className="text-2xl md:text-5xl font-medium tracking-tight text-brand-text leading-[1.1] mb-4">
                       {owsd.name}
                     </h3>
                     <div className="flex items-center gap-4 text-brand-text/80">
                        <span className="w-12 h-[2px] hidden md:block bg-brand-text"></span>
                        <p className="text-base md:text-lg font-bold tracking-widest uppercase">{owsd.recipient}</p>
                     </div>
                   </div>
                 </div>
                 
                 {owsd.description && (
                   <div className="text-brand-text/70 text-base md:text-xl font-medium leading-relaxed space-y-4">
                     {owsd.description.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
                   </div>
                 )}
               </div>
               
               <div className="w-full md:w-[400px] shrink-0 space-y-6">
                 {owsd.amount && (
                   <div className="p-8 rounded-3xl bg-brand-text/5 border border-brand-border/50 text-center group-hover:bg-brand-text/10 transition-colors duration-500">
                     <p className="text-sm font-bold tracking-widest uppercase text-brand-text/40 mb-2">Grant Amount</p>
                     <p className="text-3xl font-medium text-brand-text">{owsd.amount}</p>
                   </div>
                 )}
                 {owsd.projectTitle && (
                   <div className="p-8 rounded-3xl bg-brand-text border border-brand-text text-brand-bg group-hover:bg-brand-text/90 transition-colors duration-500">
                     <p className="text-xs font-bold uppercase tracking-widest text-brand-bg/60 mb-3">Funded Project</p>
                     <p className="font-medium leading-relaxed italic text-base">
                       "{owsd.projectTitle}"
                     </p>
                   </div>
                 )}
               </div>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}
