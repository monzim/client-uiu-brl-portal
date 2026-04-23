import { createFileRoute } from '@tanstack/react-router'
import { FacultySection } from '../components/FacultySection'
import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/faculty/')({
  head: () => ({
    meta: [
      { title: 'Faculty Members | UIU Biomedical Research Lab' },
      {
        name: 'description',
        content: 'Meet the expert faculty members at UIU Biomedical Research Lab leading research in BME and Pharmaceutical sciences.',
      },
      { property: 'og:title', content: 'Faculty Members | UIU BME Lab' },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: FacultyPage,
})

function FacultyPage() {
  return (
    <main className="min-h-screen bg-brand-bg pb-32">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/8472900/pexels-photo-8472900.jpeg" 
          alt="Faculty Banner" 
          className="w-full h-full object-cover grayscale brightness-[0.5] object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full px-6 pb-12 md:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white mb-6 transition-colors group">
               <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium leading-[1.05] tracking-tight text-white max-w-4xl uppercase">
              Faculty <br className="hidden md:block"/>Members.
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 mt-16 md:mt-24">
        <div className="mb-32">
           <FacultySection />
        </div>
      </div>
    </main>
  )
}
