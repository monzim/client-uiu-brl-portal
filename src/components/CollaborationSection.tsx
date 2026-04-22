import React from 'react';
import { collaborationData } from '../data/data';

export function CollaborationSection() {
  return (
    <section className="py-24 bg-brand-bg px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-text/40 mb-4">
            Where our research is making an impact:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {collaborationData.map((collab) => (
            <div key={collab.id} className="flex flex-col items-center text-center opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
               <span className="text-3xl font-bold tracking-tighter text-brand-text mb-2 uppercase">{collab.name}</span>
               <p className="text-xs font-semibold text-brand-text/50 max-w-[200px] leading-relaxed">
                 {collab.description.split('.')[0]}
               </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
