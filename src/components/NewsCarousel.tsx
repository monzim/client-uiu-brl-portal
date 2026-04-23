import React, { useRef, useEffect, useState } from 'react';
import { newsData } from '../data/data';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ArrowLeft, Calendar, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

export function NewsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 px-10 overflow-hidden">
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8 max-w-[1400px] mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest text-brand-text/40 uppercase mb-4">Laboratory Insights</h2>
            <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-brand-text leading-tight ">
               Recent News & Activities.
            </h3>
          </div>
          <div className="flex items-center gap-6">
             <Link 
               to="/news"
               className="text-[11px] font-bold uppercase tracking-widest text-brand-text hover:bg-brand-text hover:text-white transition-all px-8 py-3 rounded-full border border-brand-text mr-4 hidden sm:block"
             >
               View All News
             </Link>
             <div className="flex gap-4">
                <button 
                   onClick={() => scroll('left')}
                   className="w-12 h-12 rounded-full border border-brand-border flex items-center justify-center text-brand-text/40 hover:text-brand-text hover:border-brand-text transition-all"
                >
                   <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                   onClick={() => scroll('right')}
                   className="w-12 h-12 rounded-full border border-brand-border flex items-center justify-center text-brand-text/40 hover:text-brand-text hover:border-brand-text transition-all"
                >
                   <ChevronRight className="w-6 h-6" />
                </button>
             </div>
          </div>
        </div>

        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-4 overflow-x-auto pb-12 snap-x no-scrollbar"
        >
          {newsData.map((news) => (
            <Link 
              key={news.id}
              to="/news/$newsId"
              params={{ newsId: news.id }}
              className="min-w-[280px] md:min-w-[320px] bg-white rounded-[24px] snap-center overflow-hidden border border-brand-border hover:border-brand-accent transition-all duration-500 group"
            >
              {/* Card Image */}
              <div className="relative h-48 md:h-52 overflow-hidden">
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

              {/* Card Content */}
              <div className="p-6 md:p-8 space-y-4">
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
        
        <div className="mt-8 flex justify-center sm:hidden">
           <Link 
             to="/news"
             className="text-[11px] font-bold uppercase tracking-widest text-brand-text hover:bg-brand-text hover:text-white transition-all px-8 py-3 rounded-full border border-brand-text"
           >
             View All News
           </Link>
        </div>
      </div>
    </section>

  );
}
