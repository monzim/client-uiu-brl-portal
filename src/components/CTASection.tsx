import React from 'react';
import { Mail, Linkedin, ArrowUpRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden flex flex-col items-center justify-center">
       {/* Background Image with Mask */}
       <div className="absolute inset-0 z-0">
         <img 
           src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg" 
           alt="Laboratory Background" 
           className="w-full h-full object-cover grayscale brightness-50"
         />
         <div className="absolute inset-0 bg-brand-accent/90 mix-blend-multiply" />
       </div>

       {/* Decorative microscopic circles */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none z-1" />
       
       <div className="relative z-10 bg-brand-bg text-brand-text w-full max-w-[900px] py-12 md:py-20 px-6 md:px-12 text-center flex flex-col items-center gap-6" 
            style={{ 
              borderRadius: '25px',
              backgroundColor: '#f2f5f2'
            }}>
          <h2 className="text-[32px] md:text-[48px] font-medium leading-tight tracking-tight uppercase">Get in touch</h2>
          <p className="max-w-[400px] text-brand-text/60 font-medium text-sm md:text-base leading-relaxed">
             Interested in collaboration or learning more about our research projects? Reach out to us.
          </p>
          
          <div className="flex flex-col md:flex-row items-center gap-6 mt-2">
             <a href="mailto:tahmina@pharmacy.uiu.ac.bd" className="bg-brand-text text-brand-bg px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all hover:bg-brand-accent flex items-center gap-2 group">
                Send Email <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" />
             </a>
             
             <div className="flex items-center gap-3">
               <span className="text-[10px] font-bold uppercase tracking-widest text-brand-text/20 mr-2">Follow us</span>
               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-text/40 hover:text-brand-text hover:border-brand-text transition-all">
                 <Linkedin className="w-4 h-4" />
               </a>
               <a href="mailto:tahmina@pharmacy.uiu.ac.bd" className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-text/40 hover:text-brand-text hover:border-brand-text transition-all">
                 <Mail className="w-4 h-4" />
               </a>
             </div>
          </div>
       </div>
    </section>
  );
}
