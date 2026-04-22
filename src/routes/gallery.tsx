import { createFileRoute } from '@tanstack/react-router'
import { Microscope, FlaskConical, Beaker, Dna } from 'lucide-react'

export const Route = createFileRoute('/gallery')({
  component: Gallery,
})

const images = [
  { url: 'https://images.pexels.com/photos/8442448/pexels-photo-8442448.jpeg', caption: 'Cell Culture Analysis' },
  { url: 'https://images.pexels.com/photos/8442036/pexels-photo-8442036.jpeg', caption: 'HPLC Setup' },
  { url: 'https://images.pexels.com/photos/7108344/pexels-photo-7108344.jpeg', caption: 'Molecular Visualization' },
  { url: 'https://images.pexels.com/photos/3912981/pexels-photo-3912981.jpeg', caption: 'Compound Evaluation' },
  { url: 'https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg', caption: 'Student Training' },
  { url: 'https://images.pexels.com/photos/5439141/pexels-photo-5439141.jpeg', caption: 'Lab Safety Procedures' },
]

function Gallery() {
  return (
    <main className="min-h-screen pt-[160px] pb-40 bg-brand-bg px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24 space-y-6">
           <h2 className="text-sm font-bold uppercase tracking-widest text-brand-text/30">Visual Archive</h2>
           <h1 className="text-[56px] md:text-[80px] font-medium leading-[1.05] tracking-tight text-brand-text">
              Inside the laboratory.
           </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
