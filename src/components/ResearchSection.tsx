import React from 'react';
import { projectsData } from '../data/data';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';

export function ResearchSection() {
  return (
    <section id="research" className="py-32 px-6 bg-brand-bg">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24">
          <h2 className="text-sm font-bold tracking-widest text-brand-text/40 uppercase mb-4">Laboratory Endeavors</h2>
          <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-brand-text max-w-xl">
             Our Current Projects.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {projectsData.map((project, index) => {
            const isFirst = index === 0;
            return (
              <Link 
                key={project.id} 
                to="/projects/$projectId"
                params={{ projectId: project.id }}
                className={`p-10 rounded-[40px] border border-brand-border transition-all duration-500 cursor-pointer group flex flex-col h-full overflow-hidden relative ${
                  isFirst 
                    ? 'bg-brand-text text-brand-bg hover:bg-brand-bg hover:text-brand-text' 
                    : 'bg-brand-bg text-brand-text hover:bg-brand-text hover:text-brand-bg'
                } hover:shadow-2xl hover:scale-[1.02]`}
              >
                {/* Background Decorative Number */}
                <span className={`absolute top-8 right-8 text-6xl font-black transition-colors duration-500 ${
                  isFirst ? 'text-brand-bg/[0.05] group-hover:text-brand-text/[0.05]' : 'text-brand-text/[0.03] group-hover:text-brand-bg/[0.05]'
                }`}>
                  0{index + 1}
                </span>

                <div className="flex flex-col h-full relative z-10">
                  <div className="mb-12">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                       isFirst ? 'bg-brand-bg group-hover:bg-brand-text' : 'bg-brand-text group-hover:bg-brand-bg'
                     }`}>
                        <ArrowUpRight className={`w-6 h-6 transition-all duration-500 group-hover:rotate-45 ${
                          isFirst ? 'text-brand-text group-hover:text-brand-bg' : 'text-brand-bg group-hover:text-brand-text'
                        }`} />
                     </div>
                  </div>

                  <div className="space-y-4 flex-1">
                    <h4 className="text-xl md:text-2xl font-bold leading-tight uppercase tracking-tighter">
                      {project.title}
                    </h4>
                    <p className={`text-sm font-medium leading-relaxed transition-opacity duration-300 line-clamp-3 ${
                      isFirst ? 'text-brand-bg/60 group-hover:text-brand-text/50' : 'text-brand-text/50 group-hover:text-brand-bg/60'
                    }`}>
                      {project.description}
                    </p>
                  </div>

                  <div className={`mt-12 pt-8 border-t flex items-center justify-between transition-colors ${
                    isFirst ? 'border-brand-bg/10 group-hover:border-brand-text/10' : 'border-brand-text/10 group-hover:border-brand-bg/10'
                  }`}>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                      Explore Project
                    </span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      isFirst ? 'bg-brand-bg/10 group-hover:bg-brand-text/5' : 'bg-brand-text/5 group-hover:bg-brand-bg/10'
                    }`}>
                       <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

