import { createFileRoute } from '@tanstack/react-router'
import { newsData } from '../data/data'
import { ArrowLeft, Calendar, Share2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/news/$newsId')({
  component: NewsDetail,
})

function NewsDetail() {
  const { newsId } = Route.useParams()
  const news = newsData.find((n) => n.id === newsId)

  if (!news) {
    return (
      <div className="min-h-screen pt-40 px-6 text-center">
        <h1 className="text-4xl font-bold text-brand-text">News not found</h1>
        <Link to="/" className="mt-8 inline-block text-brand-text/60 underline">Return Home</Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen pt-[160px] pb-40 bg-brand-bg px-6">
      <div className="max-w-[800px] mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-text/40 hover:text-brand-text mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to News
        </Link>

        <div className="space-y-12 rise-in">
          <div className="space-y-6">
             <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-brand-text/30">
                <Calendar className="w-4 h-4" />
                {news.date}
             </div>
             <h1 className="text-[48px] md:text-[64px] font-medium leading-[1.1] tracking-tight text-brand-text">
                {news.title}
             </h1>
          </div>

          <div className="aspect-video rounded-[48px] overflow-hidden bg-brand-border ring-1 ring-brand-border/50 shadow-2xl">
             <img 
               src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" 
               alt={news.title} 
               className="w-full h-full object-cover grayscale brightness-[0.95]"
             />
          </div>

          <div className="space-y-8">
             <p className="text-2xl font-medium text-brand-text/60 leading-relaxed italic border-l-4 border-brand-text/10 pl-8 py-2">
                {news.description}
             </p>
             
             <div className="prose prose-lg max-w-none text-brand-text/70 font-medium leading-[1.8]">
                <p>
                  United International University's Biomedical Research Laboratory continues to push the boundaries of scientific inquiry. This event brought together leading minds from across the department to share findings, methodologies, and clinical insights that aim to transform patient outcomes in Bangladesh and abroad.
                </p>
                <p>
                  Participants engaged in deep discussions regarding {news.title.toLowerCase()}, focusing on the translational aspects of drug development and clinical validation. The laboratory's commitment to high-quality research is evident in the caliber of presentations and the interdisciplinary approach taken by our team.
                </p>
             </div>

             <div className="pt-12 border-t border-brand-border flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-text/30">
                   Published by BME Lab Communications
                </div>
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-text/60 hover:text-brand-text transition-all">
                   <Share2 className="w-4 h-4" /> Share Story
                </button>
             </div>
          </div>
        </div>
      </div>
    </main>
  )
}
