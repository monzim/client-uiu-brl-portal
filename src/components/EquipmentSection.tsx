import React from 'react';
import { equipmentData } from '../data/data';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';

export function EquipmentSection() {
  return (
    <section id="equipment" className="py-28 px-6 bg-[#e6ebe6] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-sm font-bold tracking-widest text-brand-text/40 uppercase">Facility Assets</h2>
            <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-brand-text">
              Advanced instrumentation. <br /> Precise results.
            </h3>
          </div>
          <Link 
            to="/equipment" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-text border border-brand-text/20 hover:bg-brand-text hover:text-brand-bg px-6 py-3 rounded-full transition-all duration-300 group"
          >
            View All
            <ArrowUpRight className="w-3 h-3 group-hover:rotate-[45deg] transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipmentData.slice(0, 8).map((item, index) => (
            <div key={item.id} className={`bg-brand-bg rounded-[32px] p-8 border border-brand-border hover:border-brand-text transition-all duration-500 flex flex-col items-start ${index >= 4 ? 'hidden md:flex' : ''}`}>
              <div className="mb-8 w-full aspect-[4/3] rounded-2xl overflow-hidden bg-brand-border">
                 <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale brightness-[1.1] hover:grayscale-0 hover:scale-110 transition-all duration-700" />
              </div>
              <p className="text-[10px] text-brand-text/40 font-bold uppercase tracking-widest mb-2 border-b border-brand-border pb-1 w-full">{item.origin}</p>
              <h4 className="text-xl font-bold text-brand-text mb-4 leading-tight">{item.name}</h4>
              <p className="text-brand-text/60 leading-relaxed text-sm font-medium">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
