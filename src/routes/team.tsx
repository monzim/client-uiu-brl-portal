import { createFileRoute } from '@tanstack/react-router'
import { FacultySection } from '../components/FacultySection'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

export const Route = createFileRoute('/team')({
  component: TeamPage,
})

const assistants = [
  { id: '1', name: 'Zarin Tasnim', designation: 'Research Assistant', focus: 'Drug Delivery & Hydrogel', image: 'https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg' },
  { id: '2', name: 'Md. Faisal', designation: 'Research Assistant', focus: 'Molecular Biology & Genetics', image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg' },
  { id: '3', name: 'Nusrat Jahan', designation: 'Research Assistant', focus: 'Pharmacology & Biochemistry', image: 'https://images.pexels.com/photos/3825368/pexels-photo-3825368.jpeg' },
];

function TeamPage() {
  return (
    <main className="min-h-screen bg-brand-bg pt-40 pb-32">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-20 space-y-6">
           <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-text/30 hover:text-brand-text mb-8 transition-colors group">
             <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Home
           </Link>
           <h1 className="text-[56px] md:text-[80px] font-medium leading-[1.05] tracking-tight text-brand-text uppercase">
              Our Research <br /> Team.
           </h1>
        </div>

        {/* Faculty Section Integration */}
        <div id="faculty" className="mb-32">
           <FacultySection />
        </div>

        {/* Research Assistants Section */}
        <div id="assistants" className="py-24 border-t border-brand-border/50">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-sm font-bold tracking-widest text-brand-text/40 uppercase mb-4">Support Team</h2>
                <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-brand-text leading-tight uppercase">
                  Research Assistants.
                </h3>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {assistants.map((member) => (
                <div key={member.id} className="group bg-brand-bg border border-brand-border p-8 rounded-[40px] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                   <div className="aspect-square bg-brand-border rounded-[32px] mb-8 overflow-hidden">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale brightness-[1.05] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                   </div>
                   <div className="space-y-4">
                      <div>
                        <h4 className="text-2xl font-bold text-brand-text mb-1 tracking-tight uppercase">{member.name}</h4>
                        <p className="text-brand-text/30 font-extrabold text-[10px] uppercase tracking-[0.25em]">{member.designation}</p>
                      </div>
                      <p className="text-brand-text/60 text-sm font-medium">Research Focus: {member.focus}</p>
                      <div className="pt-6 border-t border-brand-border/10">
                         <div className="flex items-center justify-between text-brand-text/40">
                            <span className="text-[10px] font-bold uppercase tracking-widest">Active Member</span>
                            <div className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center group-hover:bg-brand-text group-hover:text-brand-bg transition-colors">
                               <ArrowUpRight className="w-4 h-4" />
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </main>
  )
}
