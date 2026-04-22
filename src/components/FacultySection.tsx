import React from 'react';
import { facultyData } from '../data/faculty';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';

export function FacultySection() {
  return (
    <section id="faculty" className="py-24 md:py-32 px-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-sm font-bold tracking-widest text-brand-text/40 uppercase mb-4">Our Team</h2>
          <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-brand-text leading-tight">
            Meet the researchers behind the innovation.
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 md:gap-y-20 gap-x-8 md:gap-x-12">
        {facultyData.map((faculty) => (
          <Link 
            key={faculty.id} 
            to="/faculty/$facultyId" 
            params={{ facultyId: faculty.id }} 
            className="group cursor-pointer block bg-brand-bg/50 md:bg-transparent p-6 md:p-0 rounded-[40px] md:rounded-0 border border-brand-border/30 md:border-transparent transition-all duration-500"
          >
            <div className="aspect-[4/5] bg-brand-border rounded-[24px] mb-8 overflow-hidden relative shadow-sm transition-shadow group-hover:shadow-2xl">
               <img src={faculty.image} alt={faculty.name} className="w-full h-full object-cover grayscale brightness-[1.1] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
               <div className="absolute inset-0 bg-brand-text/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="space-y-4">
               <div>
                  <h4 className="text-2xl font-bold text-brand-text mb-1 tracking-tight">{faculty.name}</h4>
                  <p className="text-brand-text/30 font-extrabold text-[10px] uppercase tracking-[0.25em]">{faculty.designation}</p>
               </div>
               
               <p className="text-brand-text/60 text-sm leading-relaxed line-clamp-2 h-10 overflow-hidden font-medium">
                 {faculty.profileDescription}
               </p>
               
               <div className="flex items-center gap-3 text-brand-text group-hover:gap-5 transition-all duration-500 font-bold text-[10px] uppercase tracking-[0.2em] pt-6 border-t border-brand-border/10">
                  <span className="opacity-60 group-hover:opacity-100 transition-opacity">View Profile</span>
                  <div className="w-9 h-9 rounded-full border border-brand-text/10 flex items-center justify-center group-hover:bg-brand-text group-hover:text-brand-bg transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-[45deg]" />
                  </div>
               </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
