import React from 'react';
import { projectsData } from '../data/data';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { SmoothImage } from './ui/SmoothImage';

export function ObjectivesSection() {
  const [active, setActive] = React.useState(projectsData[0].id);

  return (
    <section className="min-h-screen py-16 lg:py-20 px-4 sm:px-8 lg:px-10 bg-brand-text text-brand-bg overflow-hidden relative flex items-center">
      {/* Subtle Dotted Pattern */}
      <div className="absolute top-10 right-10 w-40 h-40 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
      
      <div className="max-w-[1500px] w-full mx-auto lg:px-6">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16 xl:gap-20">

          {/* Right Side: Project Image — shown FIRST on desktop but placed last in DOM for mobile */}
          <div className="w-full lg:w-[55%] xl:w-[60%] relative h-[260px] sm:h-[340px] lg:h-auto lg:min-h-[60vh] rounded-[32px] lg:rounded-[60px] overflow-hidden border-[8px] lg:border-[16px] border-brand-bg/5 order-first lg:order-last">
            {projectsData.map((project) => (
              <div
                key={project.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  active === project.id ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <SmoothImage 
                  src={project.image || '/images/lab.webp'} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale-[0.2] brightness-[0.9]"
                  containerClassName="absolute inset-0 w-full h-full"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-text/60 via-brand-text/10 to-transparent" />
            
            {/* Project Label Overlay */}
            <div className="absolute bottom-6 lg:bottom-12 left-6 lg:left-12 right-6 lg:right-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-white">
              <div className="space-y-1 lg:space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Currently Viewing</span>
                <h4 className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-tighter uppercase leading-tight">
                  {projectsData.find(p => p.id === active)?.title}
                </h4>
              </div>
              <Link 
                to="/projects/$projectId"
                params={{ projectId: active }}
                className="shrink-0 px-5 lg:px-8 py-3 lg:py-4 bg-white text-brand-text rounded-xl lg:rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-brand-accent hover:text-white transition-all"
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Left Side: Project Cards */}
          <div className="w-full lg:w-[45%] xl:w-[40%] space-y-6 lg:space-y-10 flex flex-col justify-center order-last lg:order-first">
            <div className="space-y-4 lg:space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-bg/30">Laboratory Initiatives</h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter leading-[1.1]">
                Current Projects.
              </h3>
            </div>

            <div className="space-y-3 lg:space-y-4">
              {projectsData.map((project) => (
                <Link
                  key={project.id}
                  to="/projects/$projectId"
                  params={{ projectId: project.id }}
                  onMouseEnter={() => setActive(project.id)}
                  onFocus={() => setActive(project.id)}
                  className={`w-full text-left p-4 lg:p-6 xl:p-8 rounded-[24px] lg:rounded-[32px] transition-all duration-500 ease-out flex items-center justify-between group ${
                    active === project.id 
                      ? 'bg-brand-bg text-brand-text scale-[1.01]' 
                      : 'opacity-30 hover:opacity-80 hover:bg-brand-bg/5'
                  }`}
                >
                  <div className="flex-1 pr-4 min-w-0">
                    <h4 className="text-sm lg:text-base xl:text-xl font-bold tracking-tight leading-tight uppercase truncate">
                      {project.title}
                    </h4>
                    {/* Description — stable height via fixed min-h to avoid layout shift */}
                    <div className={`overflow-hidden transition-all duration-500 ease-out ${active === project.id ? 'max-h-16 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                      <p className="text-xs lg:text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ${
                    active === project.id ? 'border-brand-text/10 bg-brand-text text-brand-bg' : 'border-brand-bg/20'
                  }`}>
                    <ArrowUpRight className={`w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-500 ${active === project.id ? 'rotate-45' : ''}`} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
