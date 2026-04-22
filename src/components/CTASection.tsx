import React from 'react';

export function CTASection() {
  return (
    <section className="py-20 px-6 bg-[#0e1f1a] relative overflow-hidden flex flex-col items-center justify-center">
       {/* Decorative microscopic circles */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-bg/5 rounded-full blur-[100px] pointer-events-none" />
       
       <div className="relative z-10 bg-brand-bg text-brand-text w-full max-w-[900px] py-20 md:py-24 px-12 text-center flex flex-col items-center gap-8 shadow-2xl" 
            style={{ 
              borderRadius: '40px',
              backgroundColor: '#f2f5f2'
            }}>
          <h2 className="text-[40px] md:text-[64px] font-medium leading-tight tracking-tight">Get in touch</h2>
          <p className="max-w-[400px] text-brand-text/60 font-medium text-lg leading-relaxed">
             Interested in collaboration or learning more about our research projects? Reach out to us.
          </p>
          <div className="flex gap-4 mt-2">
             <a href="mailto:tahmina@pharmacy.uiu.ac.bd" className="contact-button hover:bg-brand-text hover:text-brand-bg px-10 py-4">
                Send Email
             </a>
          </div>
       </div>
    </section>
  );
}
