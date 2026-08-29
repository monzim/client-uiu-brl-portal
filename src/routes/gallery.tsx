import { createFileRoute } from '@tanstack/react-router'
import { Microscope, FlaskConical, Beaker, Dna, ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { SmoothImage } from '../components/ui/SmoothImage'
import { useState } from 'react';
import { Link } from '@tanstack/react-router';

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
  { url: '/work_picture/Cell Culture.webp', caption: 'Cell Culture Analysis' },
  { url: '/banner_images/1.Inorganic-lab-pic.webp', caption: 'HPLC Setup' },
  { url: '/work_picture/Pharmacogenomics.webp', caption: 'Molecular Visualization' },
  { url: '/current_project_images/Drug discovery.webp', caption: 'Compound Evaluation' },
  { url: '/work_picture/Team.webp', caption: 'Student Training' },
  { url: '/banner_images/9U-9.webp', caption: 'Lab Safety Procedures' },
  { url: '/banner_images/2.Microscope.webp', caption: 'Equipment Testing' },
  { url: '/images/hero2.webp', caption: 'Team Collaboration' },
]

function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <main className="min-h-screen bg-brand-bg pb-40">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <SmoothImage 
          src="/images/hero1.webp" 
          alt="Gallery Banner" 
          className="w-full h-full object-cover grayscale brightness-[0.5] object-center"
          containerClassName="w-full h-full"
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
              <div 
                key={i} 
                onClick={() => setSelectedImage(i)}
                className="group relative aspect-[4/5] rounded-[48px] overflow-hidden bg-brand-border cursor-pointer"
              >
                 <SmoothImage 
                    src={img.url} 
                    alt={img.caption} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                    containerClassName="w-full h-full"
                 />
                 <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-brand-text/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-lg font-bold tracking-tight">{img.caption}</p>
                 </div>
              </div>
           ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 backdrop-blur-sm animate-in fade-in duration-300">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors z-[110]"
            >
              <X className="w-8 h-8" />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all z-[110]"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all z-[110]"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6" onClick={() => setSelectedImage(null)}>
              <div className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <img 
                  src={images[selectedImage].url} 
                  alt={images[selectedImage].caption} 
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                />
              </div>
              <div className="text-center animate-in slide-in-from-bottom-4 duration-500 delay-150 fill-mode-both" onClick={(e) => e.stopPropagation()}>
                <p className="text-white text-xl md:text-2xl font-medium tracking-tight uppercase">
                  {images[selectedImage].caption}
                </p>
                <p className="text-white/40 text-sm mt-2 font-bold uppercase tracking-widest">
                  {selectedImage + 1} / {images.length}
                </p>
              </div>
            </div>
          </div>
        )}

        
      </div>
    </main>
  )
}
