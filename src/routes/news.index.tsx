import { createFileRoute, Link } from '@tanstack/react-router'
import { newsData } from '../data/data'
import { Calendar, ArrowUpRight, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/news/')({
  component: NewsPage,
})

function NewsPage() {
  return (
    <main className="min-h-screen pt-[160px] pb-40 bg-brand-bg px-6">
      <div className="max-w-[1400px] mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-text/30 hover:text-brand-text mb-12 transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Home
        </Link>
        <div className="mb-24 space-y-6">

           <h2 className="text-sm font-bold uppercase tracking-widest text-brand-text/30">Laboratory Insights</h2>
           <h1 className="text-[56px] md:text-[80px] font-medium leading-[1.05] tracking-tight text-brand-text">
              News & Discoveries.
           </h1>
           <p className="text-xl text-brand-text/50 max-w-2xl font-medium leading-relaxed">
             Stay updated with the latest research breakthroughs, laboratory achievements, and scientific activities at UIU Biomedical Research Lab.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {newsData.map((news) => (
              <Link 
                key={news.id}
                to="/news/$newsId"
                params={{ newsId: news.id }}
                className="group bg-brand-bg border border-brand-border p-10 rounded-[48px] hover:border-brand-text transition-all duration-500 flex flex-col justify-between h-[400px] shadow-sm hover:shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-text/30">
                      <Calendar className="w-4 h-4" />
                      {news.date}
                    </div>
                    <div className="w-10 h-10 rounded-full border border-brand-text/5 flex items-center justify-center group-hover:bg-brand-text group-hover:text-brand-bg transition-all duration-500">
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[45deg]" />
                    </div>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-medium text-brand-text leading-tight group-hover:opacity-60 transition-opacity">
                    {news.title}
                  </h4>
                </div>
                <p className="text-brand-text/50 font-medium leading-relaxed line-clamp-3">
                  {news.description}
                </p>
              </Link>
           ))}
        </div>
      </div>
    </main>
  )
}
