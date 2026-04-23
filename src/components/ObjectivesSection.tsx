import React from 'react';
import { projectsData } from '../data/data';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export function ObjectivesSection() {
  const [active, setActive] = React.useState(projectsData[0].id);

  return (
    <section className="min-h-screen py-20 px-10 bg-brand-text text-brand-bg overflow-hidden relative flex items-center">
      {/* Subtle Dotted Pattern */}
      <div className="absolute top-10 right-10 w-40 h-40 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
      
      <div className="max-w-[1500px] w-full mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left Side: Project Cards */}
          <div className="w-full lg:w-[40%] space-y-10">
            <div className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-bg/30">Laboratory Initiatives</h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter leading-[1.1] ">
                Current  Projects.
              </h3>
            </div>

            
            <div className="space-y-4">
              {projectsData.map((project) => (
                <Link
                  key={project.id}
                  to="/projects/$projectId"
                  params={{ projectId: project.id }}
                  onMouseEnter={() => setActive(project.id)}
                  className={`w-full text-left p-6 md:p-8 rounded-[32px] transition-all duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)] flex items-center justify-between group ${
                    active === project.id 
                      ? 'bg-brand-bg text-brand-text scale-[1.02]' 
                      : 'opacity-20 hover:opacity-100 hover:bg-brand-bg/5'
                  }`}
                >
                  <div className="space-y-3 flex-1 pr-4">
                    <h4 className="text-lg md:text-xl font-bold tracking-tight leading-tight uppercase">{project.title}</h4>
                    <p className={`text-xs md:text-sm leading-relaxed opacity-70 transition-all duration-700 ease-in-out line-clamp-2 ${active === project.id ? 'opacity-100 max-h-40 mt-2' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                      {project.description}
                    </p>
                  </div>
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ${
                    active === project.id ? 'border-brand-text/10 bg-brand-text text-brand-bg' : 'border-brand-bg/20'
                  }`}>
                    <ArrowUpRight className={`w-5 h-5 transition-transform duration-500 ${active === project.id ? 'rotate-45' : ''}`} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Right Side: Project Image (Visualizer) */}
          <div className="w-full lg:w-[60%] relative aspect-[16/10] lg:h-[70vh] rounded-[60px] overflow-hidden border-[16px] border-brand-bg/5 transition-all duration-1000 ease-in-out">
            {projectsData.map((project) => (
              <img 
                key={project.id}
                src={project.image || 'https://images.pexels.com/photos/8533016/pexels-photo-8533016.jpeg'} 
                alt={project.title}
                className={`absolute inset-0 w-full h-full object-cover grayscale-[0.2] brightness-[0.9] transition-all duration-1000 ${
                  active === project.id ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-text/40 to-transparent" />
            
            {/* Project Label Overlay */}
            <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-white">
              <div className="space-y-2">
                 <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Currently Viewing</span>
                 <h4 className="text-3xl font-bold tracking-tighter uppercase">{projectsData.find(p => p.id === active)?.title}</h4>
              </div>
              <Link 
                to="/projects/$projectId"
                params={{ projectId: active }}
                className="px-8 py-4 bg-white text-brand-text rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-brand-accent hover:text-white transition-all"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

