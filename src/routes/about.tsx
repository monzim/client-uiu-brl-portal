import { createFileRoute } from '@tanstack/react-router'
import { aboutData } from '../data/data'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About BRL | UIU Biomedical Research Lab' },
      {
        name: 'description',
        content: 'Learn more about the UIU Biomedical Research Lab, our mission, vision, and the innovative research we conduct in the field of BME.',
      },
      { property: 'og:title', content: 'About BRL | UIU BME Lab' },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: About,
})

function About() {
  return (
    <main className="min-h-screen bg-brand-bg pb-20">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/8533016/pexels-photo-8533016.jpeg" 
          alt="BRL Laboratory" 
          className="w-full h-full object-cover grayscale brightness-[0.6] object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full px-6 pb-16 md:pb-24">
          <div className="max-w-[1400px] mx-auto">
            <h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium leading-[1.05] tracking-tight text-white max-w-4xl">
              Scientific discovery <br className="hidden md:block"/>for humanity.
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Intro Text & Watermark */}
        <section className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          <div className="lg:col-span-8 xl:col-span-9 space-y-6 lg:pr-12">
            {aboutData.intro.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-base md:text-xl font-medium text-brand-text/80 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="hidden lg:flex lg:col-span-4 xl:col-span-3 justify-center items-center pointer-events-none select-none opacity-[0.09]">
            <img 
              src="/images/transparent black logo.png" 
              alt="BRL Watermark" 
              className="w-full max-w-[300px] h-auto object-contain"
            />
          </div>
        </section>

        {/* Our Goal / Ethos Section */}
        <section className="py-20 md:py-32 border-t border-brand-border/50">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Left Column */}
            <div className="md:col-span-4 lg:col-span-3">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-brand-text sticky top-32">
                Our Ethos
              </h2>
            </div>
            
            {/* Right Column */}
            <div className="md:col-span-8 lg:col-span-9 space-y-24 lg:max-w-4xl">
              
              {/* Aim */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-brand-text/40">Our Aim</h3>
                <p className="text-2xl md:text-4xl lg:text-[42px] font-medium text-brand-text leading-[1.25] tracking-tight">
                  {aboutData.aim}
                </p>
              </div>

              {/* Vision & Mission Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-brand-border/30">
                <div className="space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-brand-text/40">Vision</h3>
                  <p className="text-lg md:text-2xl font-medium text-brand-text/90 leading-relaxed">
                    {aboutData.vision}
                  </p>
                </div>
                <div className="space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-brand-text/40">Mission</h3>
                  <ul className="flex flex-col gap-5">
                    {aboutData.mission.map((item, idx) => (
                      <li key={idx} className="text-base font-medium text-brand-text/80 leading-relaxed flex gap-4 items-start">
                        <span className="opacity-40 select-none mt-1">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Objectives */}
              <div className="space-y-8 pt-8 border-t border-brand-border/30">
                <h3 className="text-sm font-bold uppercase tracking-widest text-brand-text/40">Objectives</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {aboutData.objectives.map((item, idx) => (
                    <li key={idx} className="text-base font-medium text-brand-text/80 leading-relaxed flex gap-4 items-start pb-4 border-b border-brand-border/20">
                      <span className="text-brand-text/30 font-bold text-sm mt-1.5">
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Location CTA Image */}
        <section className="py-20 md:py-32 border-t border-brand-border/50">
          <div className="relative w-full aspect-square md:aspect-[21/9] rounded-[40px] overflow-hidden group">
            <img 
              src="https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg" 
              alt="UIU Campus" 
              className="w-full h-full object-cover grayscale brightness-[0.4] group-hover:scale-105 transition-transform duration-1000"
            />
            
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <div className="space-y-8 max-w-4xl w-full">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight">
                  United City built. <br className="hidden md:block"/>Global impact.
                </h2>
                
                <div className="flex flex-col items-center gap-6">
                  <div className="inline-block px-6 py-4 md:px-10 md:py-6 bg-black/40 backdrop-blur-md rounded-3xl border border-white/20">
                    <p className="text-sm md:text-lg font-medium text-white leading-relaxed">
                      {aboutData.location.address}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-white font-medium text-xs md:text-sm">
                    <a href={aboutData.location.mapUrl} target="_blank" rel="noreferrer" className="hover:bg-white hover:text-black transition-colors bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-sm">
                      View on Google Maps
                    </a>
                    <a href={`mailto:${aboutData.location.contact.split(',')[0]}`} className="hover:bg-white hover:text-black transition-colors bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-sm">
                      Email Us
                    </a>
                    <span className="bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-sm">
                      Call: {aboutData.location.importantContact}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}
