import { createFileRoute, Link } from '@tanstack/react-router'
import { newsData } from '../data/data'
import { Calendar, ArrowUpRight, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/news/')({
  head: () => ({
    meta: [
      { title: 'News & Updates | UIU Biomedical Research Lab' },
      {
        name: 'description',
        content: 'Stay updated with the latest research findings, achievements, and events from the UIU Biomedical Research Lab.',
      },
      { property: 'og:title', content: 'News & Updates | UIU BME Lab' },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: NewsPage,
})

function NewsPage() {
  return (
    <main className="min-h-screen bg-brand-bg pb-40">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg" 
          alt="News Banner" 
          className="w-full h-full object-cover grayscale brightness-[0.5] object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full px-6 pb-12 md:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white mb-6 transition-colors group">
               <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-6xl lg:text-[80px] font-medium leading-[1.05] tracking-tight text-white max-w-4xl uppercase">
              News & <br className="hidden md:block"/>Discoveries.
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 mt-16 md:mt-24">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 items-stretch">
          
          {/* Card 1 */}
          {newsData.length > 0 && (
            <Link 
              to="/news/$newsId"
              params={{ newsId: newsData[0].id }}
              className="bg-white rounded-[24px] overflow-hidden border border-brand-border hover:border-brand-accent transition-all duration-500 group h-full flex flex-col"
            >
              <div className="relative h-48 md:h-52 overflow-hidden shrink-0">
                <img 
                  src={newsData[0].image || "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg"} 
                  alt={newsData[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-6 flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <Calendar className="w-3.5 h-3.5" />
                   {newsData[0].date}
                </div>
              </div>
              <div className="p-6 md:p-8 space-y-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-4">
                  <h4 className="text-base md:text-lg font-bold text-brand-text leading-tight group-hover:text-brand-accent transition-colors duration-300 uppercase tracking-tight">
                    {newsData[0].title}
                  </h4>
                  <div className="shrink-0 w-8 h-8 rounded-full border border-brand-border flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent group-hover:text-white transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Header (Middle) */}
          <div className="md:col-span-2 flex flex-col justify-center items-center text-center order-first md:order-none py-12 md:py-0">
            <h2 className="text-sm font-bold tracking-widest text-brand-text/40 uppercase mb-4">Laboratory Insights</h2>
            <h3 className="text-3xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-brand-text leading-[1.1] uppercase">
              Recent <br /> Highlights.
            </h3>
          </div>

          {/* Cards 2 to End */}
          {newsData.slice(1).map((news) => (
            <Link 
              key={news.id}
              to="/news/$newsId"
              params={{ newsId: news.id }}
              className="bg-white rounded-[24px] overflow-hidden border border-brand-border hover:border-brand-accent transition-all duration-500 group h-full flex flex-col"
            >
              <div className="relative h-48 md:h-52 overflow-hidden shrink-0">
                <img 
                  src={news.image || "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg"} 
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-6 flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <Calendar className="w-3.5 h-3.5" />
                   {news.date}
                </div>
              </div>
              <div className="p-6 md:p-8 space-y-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-4">
                  <h4 className="text-base md:text-lg font-bold text-brand-text leading-tight group-hover:text-brand-accent transition-colors duration-300 uppercase tracking-tight">
                    {news.title}
                  </h4>
                  <div className="shrink-0 w-8 h-8 rounded-full border border-brand-border flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent group-hover:text-white transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
                  </div>
                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </main>
  )
}
