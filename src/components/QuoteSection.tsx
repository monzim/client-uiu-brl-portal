import React from 'react';
import { Link } from '@tanstack/react-router';
import { Quote, ArrowRight } from 'lucide-react';

export function QuoteSection() {
  return (
    <section className="relative py-24 bg-brand-bg overflow-hidden border-y border-brand-border/50">
      <div className="max-w-[1200px] mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20 w-full relative z-10 text-center lg:text-left justify-center lg:justify-start">
          {/* Decorative Background Element */}
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-brand-accent/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
          
          {/* Image Section */}
          <div className="flex flex-col items-center shrink-0 lg:sticky lg:top-32">
            <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-2 border-brand-border shadow-xl ring-1 ring-brand-text/5 ring-offset-4 ring-offset-brand-bg transition-transform duration-500 hover:scale-105">
              <img 
                src="https://images.pexels.com/photos/5214995/pexels-photo-5214995.jpeg" 
                alt="Prof. Dr Tahmina Foyez" 
                className="w-full h-full object-cover grayscale brightness-[1.05]"
              />
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-xl font-bold tracking-tight text-brand-text">Prof. Dr Tahmina Foyez</h3>
              <div className="mt-2 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text/40">Head, Department of Pharmacy, UIU</p>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-accent">OWSD Early Career Fellow</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-10 py-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                 <div className="h-[1px] w-8 bg-brand-accent" />
                 <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent">Mission & Vision</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-brand-text leading-[1.1] uppercase">
                 EMBARK ON A JOURNEY OF <br className="hidden lg:block" /> SCIENTIFIC DISCOVERY
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-base lg:text-base font-light leading-[1.8] text-brand-text/70 italic">
                The Biomedical Research Laboratory at the Department of Pharmacy, United International University (UIU), is committed to advancing scientific knowledge and innovation in pharmaceutical and biomedical sciences. Established following the prestigious OWSD Early Career Fellowship awarded to Dr. Tahmina Foyez by the Organization for Women in Science for the Developing World (OWSD), in collaboration with UIU, the laboratory marks a significant milestone in strengthening research excellence within the institution.
              </p>
              <p className="text-base lg:text-base font-light leading-[1.8] text-brand-text/70 italic">
                Equipped with state-of-the-art facilities and driven by a dynamic and dedicated research team, our laboratory strives to achieve impactful scientific discoveries aligned with our mission and vision. We are deeply focused on addressing pressing healthcare challenges through rigorous experimental research, advanced analytical methodologies, and interdisciplinary collaboration.
              </p>
            </div>

            <div className="pt-4">
              <Link 
                to="/faculty/$facultyId"
                params={{ facultyId: 'tahmina-foyez' }}
                className="group inline-flex items-center gap-4 px-8 py-4 bg-brand-text text-brand-bg rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all hover:bg-brand-accent hover:scale-[1.02] shadow-xl"
              >
                Discover More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Large Background Quote Icon */}
        <div className="absolute -bottom-30 -right-8 opacity-[0.05] pointer-events-none select-none z-0">
          <Quote className="w-[400px] h-[400px] text-brand-text " />
        </div>
      </div>
    </section>
  );
}
