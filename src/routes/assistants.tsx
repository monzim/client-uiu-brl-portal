import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { assistantData } from '../data/faculty'

export const Route = createFileRoute('/assistants')({
  head: () => ({
    meta: [
      { title: 'Research Assistants | UIU Biomedical Research Lab' },
      {
        name: 'description',
        content: 'Meet the dedicated research assistants at UIU Biomedical Research Lab who contribute to our groundbreaking scientific projects.',
      },
      { property: 'og:title', content: 'Research Assistants | UIU BME Lab' },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: AssistantsPage,
})

function AssistantsPage() {
  return (
    <main className="min-h-screen bg-brand-bg pb-32">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg" 
          alt="Assistants Banner" 
          className="w-full h-full object-cover grayscale brightness-[0.5] object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full px-6 pb-12 md:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white mb-6 transition-colors group">
               <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium leading-[1.05] tracking-tight text-white max-w-4xl uppercase">
              Research <br className="hidden md:block"/>Assistants.
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 mt-16 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {assistantData.map((member) => (
            <div key={member.id} className="group bg-brand-bg border border-brand-border p-8 rounded-[40px] transition-all duration-500 hover:border-brand-text/20 hover:-translate-y-1">
               <div className="aspect-square bg-brand-border rounded-[32px] mb-8 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale brightness-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
               </div>
               <div className="space-y-4">
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-brand-text mb-1 tracking-tight uppercase">{member.name}</h4>
                    <p className="text-brand-text/30 font-extrabold text-[10px] uppercase tracking-[0.25em]">{member.designation}</p>
                  </div>
                  {member.focus && <p className="text-brand-text/60 text-sm font-medium">Research Focus: {member.focus}</p>}
                  <div className="pt-6 border-t border-brand-border/10">
                     <div className="flex items-center justify-between text-brand-text/40">
                        <span className="text-[10px] font-bold uppercase tracking-widest">Active Member</span>
                        <div className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center group-hover:bg-brand-text group-hover:text-brand-bg transition-colors">
                           <ArrowUpRight className="w-4 h-4" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
