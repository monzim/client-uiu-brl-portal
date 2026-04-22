import { createFileRoute } from '@tanstack/react-router'
import { MapPin, Eye, Target } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="min-h-screen pt-[200px] pb-40 bg-brand-bg px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 mb-40">
          <div className="space-y-12">
            <div className="space-y-6">
               <h2 className="text-sm font-bold uppercase tracking-widest text-brand-text/30">About</h2>
               <h1 className="text-[40px] md:text-[64px] font-medium leading-[1.1] tracking-tight text-brand-text">
                  Scientific discovery for humanity.
               </h1>
            </div>
            
            <p className="text-xl md:text-2xl font-medium text-brand-text/60 leading-relaxed max-w-xl">
               The Biomedical Research Laboratory of the Department of Pharmacy at United International University (UIU) is dedicated to advancing scientific knowledge in the field of pharmaceutical and biomedical sciences.
            </p>
          </div>

          <div className="space-y-16">
             <div className="aspect-[4/5] rounded-[48px] overflow-hidden bg-brand-border shadow-xl ring-1 ring-brand-border">
                <img 
                  src="https://images.pexels.com/photos/8533016/pexels-photo-8533016.jpeg" 
                  alt="Laboratory" 
                  className="w-full h-full object-cover grayscale brightness-[0.9] hover:scale-105 transition-transform duration-1000"
                />
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 py-32 border-t border-brand-border">
           <div className="group space-y-8 p-10 rounded-[40px] bg-brand-text/5 hover:bg-brand-text/10 transition-all duration-500 border border-transparent hover:border-brand-border/50">
              <div className="w-14 h-14 rounded-2xl bg-brand-text text-brand-bg flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                 <Eye className="w-7 h-7" />
              </div>
              <div className="space-y-4">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text/30">Our Vision</h3>
                 <p className="text-2xl font-medium text-brand-text leading-[1.3] tracking-tight">
                    To become a leading biomedical research center in Bangladesh and internationally recognized for innovation, quality research, and scientific contribution.
                 </p>
              </div>
           </div>

           <div className="group space-y-8 p-10 rounded-[40px] bg-brand-text/5 hover:bg-brand-text/10 transition-all duration-500 border border-transparent hover:border-brand-border/50">
              <div className="w-14 h-14 rounded-2xl bg-brand-text text-brand-bg flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                 <Target className="w-7 h-7" />
              </div>
              <div className="space-y-6">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text/30">Our Mission</h3>
                 <ul className="space-y-4 text-brand-text/70 font-medium">
                    {[
                      'Generate impactful research addressing real-world health problems',
                      'Develop skilled researchers and future scientists',
                      'Contribute to the advancement of pharmaceutical sciences'
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-start leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-text mt-2.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                        {item}
                      </li>
                    ))}
                 </ul>
              </div>
           </div>

           <div className="group space-y-8 p-10 rounded-[40px] bg-brand-text/5 hover:bg-brand-text/10 transition-all duration-500 border border-transparent hover:border-brand-border/50">
              <div className="w-14 h-14 rounded-2xl bg-brand-text text-brand-bg flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                 <MapPin className="w-7 h-7" />
              </div>
              <div className="space-y-4">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text/30">Location & Dept</h3>
                 <div className="text-brand-text/70 font-medium leading-relaxed space-y-2">
                    <p className="text-xl text-brand-text">United City, Madani Ave, Dhaka 1212, Bangladesh.</p>
                    <p>Department of Pharmacy, UIU. <br/>Lab Room 907.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </main>
  )
}
