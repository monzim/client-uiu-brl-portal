import { createFileRoute } from '@tanstack/react-router'
import { currentProjects } from '../data/currentproject'
import { ArrowLeft, Clock, Layout, Microscope } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/$projectId')({
  component: ProjectDetail,
})

function ProjectDetail() {
  const { projectId } = Route.useParams()
  const project = currentProjects.find((p) => p.id === projectId)
  const otherProjects = currentProjects.filter((p) => p.id !== projectId)

  if (!project) {
    return (
      <div className="min-h-screen pt-40 px-6 max-w-[1200px] mx-auto text-center">
        <h1 className="text-4xl font-bold">Project not found</h1>
        <Link to="/" className="mt-8 inline-block text-brand-text/60 hover:text-brand-text underline">Return Home</Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-brand-bg">
      {/* Full Width Banner Image */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
         <img 
           src={project.image || "https://images.pexels.com/photos/8533016/pexels-photo-8533016.jpeg"} 
           alt={project.title} 
           className="w-full h-full object-cover grayscale brightness-[0.7]"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent  to-brand-text" />
         
         <div className="absolute inset-0 flex items-end">
            <div className="max-w-[1200px] w-full mx-auto px-6 pb-12 flex flex-col md:flex-row justify-between items-end gap-12">
              <div className="flex-1">
                <Link 
                  to="/" 
                  hash="research"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white mb-8 transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Research
                </Link>
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">
                   <Clock className="w-4 h-4" /> Ongoing Project
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tighter text-white max-w-3xl uppercase">
                  {project.title}
                </h1>
              </div>

              {/* Quick Navigation Links */}
              <div className="w-full md:w-72 space-y-6 border-l border-white/10 pl-8 mb-4 hidden lg:block">
                 <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Explore Other Projects</h4>
                 <div className="space-y-4">
                    {otherProjects.map((op) => (
                      <Link 
                        key={op.id}
                        to="/projects/$projectId"
                        params={{ projectId: op.id }}
                        className="block group"
                      >
                        <h5 className="text-xs font-bold text-white/70 group-hover:text-brand-accent transition-colors uppercase tracking-widest line-clamp-1 mb-1">
                          {op.title}
                        </h5>
                        <p className="text-[10px] text-white/30 group-hover:text-white/50 transition-colors line-clamp-1 italic">
                          {op.category}
                        </p>
                      </Link>
                    ))}
                 </div>
              </div>
            </div>
         </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-12 space-y-16">
             <div className="prose prose-xl max-w-none text-brand-text/70 font-medium leading-[1.9] space-y-10 rise-in">
                <p className="text-2xl md:text-3xl text-brand-text leading-tight font-medium tracking-tight border-l-4 border-brand-accent pl-8">
                   {project.summary}
                </p>
                <div className="whitespace-pre-wrap text-lg">
                  {project.details}
                </div>
             </div>

             <div className="pt-16 border-t border-brand-border grid grid-cols-1 md:grid-cols-3 gap-16">
                <div className="space-y-4">
                   <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-text/40">
                      <Microscope className="w-4 h-4" /> Laboratory Focus
                   </h3>
                   <p className="text-brand-text/60 font-medium leading-relaxed">
                      Conducted in the Molecular Biology and Clinical Pharmacology division (Lab 907).
                   </p>
                </div>
                <div className="space-y-4">
                   <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-text/40">
                      <Layout className="w-4 h-4" /> Methodology
                   </h3>
                   <p className="text-brand-text/60 font-medium leading-relaxed">
                      Integrating in vitro evaluation with computational molecular docking.
                   </p>
                </div>
                <div className="space-y-4">
                   <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-text/40">
                      <Clock className="w-4 h-4" /> Status
                   </h3>
                   <p className="text-brand-text/60 font-medium leading-relaxed">
                      Active research phase. Findings expected to be published in Q4 2026.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
