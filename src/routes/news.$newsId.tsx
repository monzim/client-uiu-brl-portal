import { createFileRoute } from '@tanstack/react-router'
import { newsData } from '../data/data'
import { ArrowLeft, Calendar, Share2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/news/$newsId')({
  head: ({ params }) => {
    const news = newsData.find((n) => n.id === params.newsId)
    const title = news ? `${news.title} | UIU BME Lab News` : 'News Article'
    const description = news?.excerpt || 'Read the latest news from UIU BME Lab.'
    
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: news?.image },
        { property: 'og:type', content: 'article' },
      ],
    }
  },
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
    <main className="min-h-screen bg-brand-bg font-sans">
      {/* Full Width Banner */}
      <div className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
         <img 
           src={news.image || "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"} 
           alt={news.title} 
           className="w-full h-full object-cover grayscale brightness-[0.4]"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-text/90" />
         <div className="absolute inset-0 flex items-end">
            <div className="max-w-[1400px] w-full mx-auto px-6 pb-8 md:pb-12">
               <Link to="/news" className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white mb-6 transition-colors group">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to News
               </Link>
               
               <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12 w-full">
                  <h1 className="text-4xl md:text-6xl lg:text-[80px] font-medium leading-[1.05] tracking-tight text-white max-w-4xl uppercase">
                     {news.title}
                  </h1>
                  
                  <div className="flex items-center gap-3 text-white/80 shrink-0 ml-auto md:ml-0 bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10">
                     <Calendar className="w-4 h-4" />
                     <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                        {news.date}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-20 lg:py-32">
        <div className="space-y-12">
           <p className="text-2xl font-medium text-brand-text/80 leading-relaxed italic border-l-4 border-brand-text/20 pl-8 py-2">
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

           <div className="pt-12 border-t border-brand-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-text/40">
                 Published by BME Lab Communications
              </div>
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-text/60 hover:text-brand-text transition-all">
                 <Share2 className="w-4 h-4" /> Share Story
              </button>
           </div>
        </div>
      </div>
    </main>
  )
}
