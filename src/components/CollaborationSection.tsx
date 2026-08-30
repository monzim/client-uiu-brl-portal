import React from 'react';
import { collaborationData } from '../data/data';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';

export function CollaborationSection() {
  return (
    <section className="py-24 bg-brand-bg px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-text/40 mb-4">
            Where our research is making an impact:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center mb-16">
          {collaborationData.map((collab, index) => (
            <div key={collab.id} className="flex flex-col items-center text-center opacity-90 hover:opacity-100 transition-opacity  hover:grayscale-0">
               <span className={`text-2xl md:text-3xl font-bold tracking-tighter mb-2 uppercase ${index === 1 ? 'text-brand-text' : 'text-brand-accent'}`}>{collab.name}</span>
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
