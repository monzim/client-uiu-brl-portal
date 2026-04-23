import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText } from 'lucide-react'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
})

function PrivacyPage() {
  const sections = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Data Collection",
      content: "We collect minimal data necessary to provide our services, primarily through voluntary submissions like contact forms or event registrations. This includes names, emails, and professional affiliations."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Security Measures",
      content: "Our lab utilizes industry-standard security protocols to protect all research data and personal information against unauthorized access, alteration, or disclosure."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Information Sharing",
      content: "BRL does not sell or lease personal data to third parties. Information is only shared with partners when strictly required for collaborative research purposes with explicit consent."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "User Rights",
      content: "Users maintain the right to access, correct, or request the deletion of their personal information stored in our systems at any time by contacting our administrative team."
    }
  ]

  return (
    <main className="min-h-screen bg-brand-bg pb-32">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg" 
          alt="Privacy Banner" 
          className="w-full h-full object-cover grayscale brightness-[0.5] object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full px-6 pb-16 md:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white mb-6 transition-colors group">
               <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl lg:text-[80px] font-medium leading-[1.05] tracking-tight text-white max-w-4xl uppercase">
              Privacy <br className="hidden md:block"/>Policy.
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-white border border-brand-border p-10 rounded-[40px] transition-all duration-500 hover:border-brand-text/20 hover:-translate-y-2">
              <div className="w-12 h-12 rounded-2xl bg-brand-text/5 flex items-center justify-center text-brand-text mb-8">
                {section.icon}
              </div>
              <h2 className="text-2xl font-bold text-brand-text mb-4 uppercase tracking-tight">{section.title}</h2>
              <p className="text-brand-text/60 leading-relaxed font-medium">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-brand-text text-white rounded-[40px] text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">Contact for Privacy Concerns</h3>
          <p className="text-white/60 mb-6 font-medium">
            If you have any questions regarding our privacy practices or your data, please reach out to us.
          </p>
          <a href="mailto:tahmina@pharmacy.uiu.ac.bd" className="text-brand-accent font-bold hover:underline">
            tahmina@pharmacy.uiu.ac.bd
          </a>
        </div>
      </div>
    </main>
  )
}
