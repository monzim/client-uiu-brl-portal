import { createFileRoute, Link } from '@tanstack/react-router'
import { Microscope, FlaskConical, Beaker, Dna, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/gallery')({
  head: () => ({
    meta: [
      { title: 'Laboratory Gallery | UIU Biomedical Research Lab' },
      {
        name: 'description',
        content: 'Take a virtual tour of the UIU Biomedical Research Lab and see our state-of-the-art equipment and research facilities.',
      },
      { property: 'og:title', content: 'Lab Gallery | UIU BME Lab' },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: Gallery,
})

const images = [
  { url: 'https://images.pexels.com/photos/8442458/pexels-photo-8442458.jpeg', caption: 'Cell Culture Analysis' },
  { url: 'https://images.pexels.com/photos/8442036/pexels-photo-8442036.jpeg', caption: 'HPLC Setup' },
  { url: 'https://images.pexels.com/photos/7108344/pexels-photo-7108344.jpeg', caption: 'Molecular Visualization' },
  { url: 'https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg', caption: 'Compound Evaluation' },
  { url: 'https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg', caption: 'Student Training' },
  { url: 'https://images.pexels.com/photos/5439141/pexels-photo-5439141.jpeg', caption: 'Lab Safety Procedures' },
  { url: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg', caption: 'Equipment Testing' },
  { url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg', caption: 'Team Collaboration' },
]

function Gallery() {
  return (
    <main className="min-h-screen bg-brand-bg pb-40">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/442579/pexels-photo-442579.jpeg" 
          alt="Gallery Banner" 
          className="w-full h-full object-cover grayscale brightness-[0.5] object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full px-6 pb-12 md:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white mb-6 transition-colors group">
               <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium leading-[1.05] tracking-tight text-white max-w-4xl uppercase">
              Inside the <br className="hidden md:block"/>Laboratory.
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 mt-16 md:mt-24">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {images.map((img, i) => (
              <div key={i} className="group relative aspect-[4/5] rounded-[48px] overflow-hidden bg-brand-border cursor-none">
                 <img 
                    src={img.url} 
                    alt={img.caption} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                 />
                 <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-brand-text/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-lg font-bold tracking-tight">{img.caption}</p>
                 </div>
              </div>
           ))}
        </div>

        <div className="mt-40 grid grid-cols-2 lg:grid-cols-4 gap-12 border-t border-brand-border pt-20">
           <div className="flex flex-col gap-6 items-center text-center">
              <div className="bg-brand-text/5 p-8 rounded-full text-brand-text">
                 <Microscope className="w-8 h-8" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-text/40">Microscopy Suite</p>
           </div>
           <div className="flex flex-col gap-6 items-center text-center">
              <div className="bg-brand-text/5 p-8 rounded-full text-brand-text">
                 <FlaskConical className="w-8 h-8" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-text/40">Organic Synthesis</p>
           </div>
           <div className="flex flex-col gap-6 items-center text-center">
              <div className="bg-brand-text/5 p-8 rounded-full text-brand-text">
                 <Beaker className="w-8 h-8" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-text/40">Pharmacology Lab</p>
           </div>
           <div className="flex flex-col gap-6 items-center text-center">
              <div className="bg-brand-text/5 p-8 rounded-full text-brand-text">
                 <Dna className="w-8 h-8" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-text/40">Molecular Biology</p>
           </div>
        </div>
      </div>
    </main>
  )
}
