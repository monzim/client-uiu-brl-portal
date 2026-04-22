import React from 'react';

const areas = [
  { title: 'Cell Culture', desc: 'Studying cellular behavior, drug responses, toxicity, and disease mechanisms under controlled conditions.' },
  { title: 'Wound Healing', desc: 'Developing hydrogel-based systems and antimicrobial dressings that accelerate tissue recovery.' },
  { title: 'Gene Polymorphism', desc: 'Examining variations in DNA sequences and their impact on disease susceptibility and treatment.' },
  { title: 'Antimicrobial Resistance', desc: 'Identifying resistant microbial strains and evaluating new formulations to combat infections.' }
];

export function ResearchAreasSection() {
  return (
    <section className="py-32 px-6 bg-brand-bg">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-brand-text/40 uppercase mb-4">Focus Areas</h2>
          <h3 className="text-4xl md:text-[56px] font-medium tracking-tight text-brand-text leading-[1.1]">
            Specialized research domains.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {areas.map((area) => {
            const isSpecial = area.title === 'Gene Polymorphism';
            return (
              <div 
                key={area.title} 
                className={`p-10 rounded-[40px] border transition-all duration-700 cursor-pointer group flex flex-col h-full ${
                  isSpecial 
                    ? 'bg-brand-text text-brand-bg border-transparent scale-[1.05] shadow-2xl hover:bg-brand-bg hover:text-brand-text hover:border-brand-border hover:scale-100' 
                    : 'bg-brand-bg text-brand-text border-brand-border hover:bg-[#e6ebe6] hover:-translate-y-2'
                }`}
              >
                <div className={`w-12 h-12 rounded-full border mb-8 flex items-center justify-center transition-colors duration-500 ${
                  isSpecial ? 'border-brand-bg/20 group-hover:border-brand-text/20 group-hover:bg-brand-text group-hover:text-brand-bg' : 'border-brand-text/20 group-hover:bg-brand-text group-hover:text-brand-bg'
                }`}>
                   <span className="text-xs font-bold">+</span>
                </div>
                <h4 className="text-xl font-bold uppercase tracking-widest mb-4 leading-tight">{area.title}</h4>
                <p className={`text-sm font-medium leading-relaxed transition-opacity duration-500 ${
                  isSpecial ? 'text-brand-bg/60 group-hover:text-brand-text/50' : 'text-brand-text/50'
                }`}>
                  {area.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
