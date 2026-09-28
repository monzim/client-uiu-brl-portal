import React from 'react'
import { projectsData } from '../data/data'
import { Link } from '@tanstack/react-router'
import {
  ArrowUpRight,
  Droplets,
  Dna,
  ShieldAlert,
  FlaskConical,
} from 'lucide-react'

const projectIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  'smart-hydrogel': Droplets,
  'gene-polymorphism': Dna,
  'antimicrobial-gene-analysis': ShieldAlert,
  'drug-discovery': FlaskConical,
}

export function ResearchSection() {
  return (
    <section id="research" className="py-32 px-6 bg-brand-bg">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24">
          <h2 className="text-sm font-bold tracking-widest text-brand-text/40 uppercase mb-4">
            Laboratory Endeavors
          </h2>
          <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-brand-text max-w-xl">
            Our Current Projects.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {projectsData.map((project, index) => {
            const Icon = projectIcons[project.id] ?? FlaskConical
            return (
              <Link
                key={project.id}
                to="/projects/$projectId"
                params={{ projectId: project.id }}
                className="p-6 rounded-[32px] border border-brand-border bg-brand-bg text-brand-text hover:bg-brand-text hover:text-brand-bg transition-all duration-500 cursor-pointer group flex flex-col h-full overflow-hidden relative hover:scale-[1.02]"
              >
                {/* Background Decorative Number */}
                <span className="hidden md:block absolute top-6 right-6 text-5xl font-black text-brand-text/[0.03] group-hover:text-brand-bg/[0.05] transition-colors duration-500">
                  0{index + 1}
                </span>

                <div className="flex flex-col h-full relative z-10">
                  {/* Project icon */}
                  <span className="mb-4 w-10 h-10 rounded-2xl flex items-center justify-center bg-brand-text/5 text-brand-accent group-hover:bg-brand-bg/10 group-hover:text-brand-bg transition-colors duration-500">
                    <Icon className="w-5 h-5" />
                  </span>

                  <div className="space-y-2.5 flex-1 md:pr-8">
                    <h4 className="text-lg md:text-xl font-bold leading-tight uppercase tracking-tighter">
                      {project.title}
                    </h4>
                    <p className="text-sm font-medium leading-relaxed text-brand-text/50 group-hover:text-brand-bg/60 transition-opacity duration-300 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-brand-text/10 group-hover:border-brand-bg/10 flex items-center justify-between transition-colors">
                    <span className="hidden md:block text-[10px] font-bold uppercase tracking-[0.2em]">
                      Explore Project
                    </span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 bg-brand-text/5 group-hover:bg-[#1a3a32] group-hover:text-white border border-transparent group-hover:border-[#1a3a32]">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
