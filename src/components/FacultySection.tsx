import React from 'react';
import { facultyData } from '../data/faculty';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
// import { Faculty } from '../data/faculty';

interface FacultySectionProps {
  isHomePage?: boolean;
}

const FacultyCard = ({ faculty, isHomePage }: { faculty: Faculty, isHomePage: boolean }) => (
  <Link 
    to="/faculty/$facultyId" 
    params={{ facultyId: faculty.id }} 
    className={`group cursor-pointer block bg-brand-bg/50 md:bg-transparent rounded-[40px] md:rounded-0 border border-brand-border/30 md:border-transparent transition-all duration-500 flex flex-col h-full ${isHomePage ? 'p-4 md:p-0' : 'p-6 md:p-0'}`}
  >
    <div className={`bg-brand-border rounded-[24px] mb-5 overflow-hidden relative transition-shadow ${isHomePage ? 'aspect-square' : 'aspect-[4/5] mb-8'}`}>
       <img src={faculty.image} alt={faculty.name} className="w-full h-full object-cover grayscale brightness-[1.1] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
       <div className="absolute inset-0 bg-brand-text/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className={`flex flex-col flex-grow ${isHomePage ? 'px-2' : 'space-y-4'}`}>
       <div className={`flex justify-between ${isHomePage ? 'items-center' : 'items-start'} gap-2`}>
         <div className="overflow-hidden flex-grow">
            <h4 className={`${isHomePage ? 'text-base md:text-xl' : 'text-xl md:text-2xl'} font-bold text-brand-text mb-1 tracking-tight line-clamp-1`}>{faculty.name}</h4>
            <p className="text-brand-text/30 font-extrabold text-[10px] uppercase tracking-[0.25em] line-clamp-1">{faculty.designation}</p>
         </div>
         {isHomePage && (
           <div className="shrink-0 rounded-full border border-brand-text/10 flex items-center justify-center group-hover:bg-brand-text group-hover:text-brand-bg transition-all duration-500 w-8 h-8 group-hover:-translate-y-1">
             <ArrowUpRight className="w-3 h-3 transition-transform duration-500 group-hover:rotate-[45deg]" />
           </div>
         )}
       </div>
       
       {!isHomePage && (
         <p className="text-brand-text/60 text-sm leading-relaxed line-clamp-2 h-10 overflow-hidden font-medium">
           {faculty.profileDescription}
         </p>
       )}
       
       {!isHomePage && (
         <div className="flex items-center text-brand-text transition-all duration-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-auto border-t border-brand-border/10 pt-6 gap-3 group-hover:gap-5">
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">View Profile</span>
            <div className="rounded-full border border-brand-text/10 flex items-center justify-center group-hover:bg-brand-text group-hover:text-brand-bg transition-all duration-500 w-9 h-9">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-[45deg]" />
            </div>
         </div>
       )}
    </div>
  </Link>
);

export function FacultySection({ isHomePage = false }: FacultySectionProps) {
  return (
    <section id="faculty" className={`py-24 md:py-16 px-6 ${isHomePage ? 'max-w-[1400px] mx-auto' : 'max-w-[1200px] mx-auto'}`}>
      
      {!isHomePage && (
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest text-brand-text/40 uppercase mb-4">Our Team</h2>
            <h3 className="text-2xl md:text-5xl font-medium tracking-tight text-brand-text leading-tight">
              Meet the researchers behind the innovation.
            </h3>
          </div>
        </div>
      )}

      {isHomePage ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 items-center ">
          {/* Card 1 */}
          {facultyData.length > 0 && (
            <FacultyCard faculty={facultyData[0]} isHomePage={true} />
          )}

          {/* Header (Middle) */}
          <div className="md:col-span-2 flex flex-col justify-start items-center text-center order-first md:order-none py-12 md:pb-36">
            <h2 className="text-sm font-bold tracking-widest text-brand-text/40 uppercase mb-4">Leadership</h2>
            <h3 className="text-3xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-brand-text leading-[1.1] uppercase">
              Faculty <br /> Members.
            </h3>
          </div>

          {/* Cards 2 to End */}
          {facultyData.slice(1).map((faculty) => (
            <FacultyCard key={faculty.id} faculty={faculty} isHomePage={true} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 md:gap-y-20 gap-x-8 md:gap-x-12">
          {facultyData.map((faculty) => (
            <FacultyCard key={faculty.id} faculty={faculty} isHomePage={false} />
          ))}
        </div>
      )}

    </section>
  );
}
