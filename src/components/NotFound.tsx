import { Link } from '@tanstack/react-router'
import { ArrowLeft, Ghost } from 'lucide-react'

export function NotFound() {
  return (
    <main className="min-h-screen bg-white font-sans flex items-center justify-center px-6">
      <div className="max-w-[1400px] w-full mx-auto">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Decorative Element */}
          <div className="relative">
            <div className="text-[12rem] md:text-[20rem] font-black text-brand-text/[0.03] leading-none select-none uppercase tracking-tighter">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Ghost className="w-20 h-20 md:w-32 md:h-32 text-brand-text/10 animate-bounce" />
            </div>
          </div>

          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-brand-text/20" />
              <p className="text-sm md:text-base text-brand-text/40 font-bold uppercase tracking-[0.3em]">
                Protocol Error
              </p>
              <div className="h-px w-12 bg-brand-text/20" />
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-text tracking-tighter uppercase leading-none">
              Lost in <span className="text-brand-accent">Research</span>
            </h1>
            
            <p className="text-lg md:text-xl text-brand-text/60 font-medium leading-relaxed">
              The laboratory module you are looking for has been moved, archived, or never existed in this dimension.
            </p>
          </div>

          <div className="pt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-3 px-10 py-5 bg-brand-text text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-brand-accent transition-all duration-500 group rounded-full shadow-2xl hover:shadow-brand-accent/20"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Return to Base
            </Link>
          </div>
        </div>

        {/* Technical Metadata Footer */}
        <div className="fixed bottom-12 left-0 right-0 px-6 hidden md:block">
          <div className="max-w-[1400px] mx-auto flex justify-between items-center text-[10px] font-black text-brand-text/20 uppercase tracking-[0.2em]">
            <span>Error Code: 0x404_NOT_FOUND</span>
            <span>BRL Systems Protocol v2.0</span>
          </div>
        </div>
      </div>
    </main>
  )
}
