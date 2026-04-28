import React from 'react'
import { HoverPeek } from './ui/link-preview'

const DevBanner = () => {
  return (
    <div className="w-full bg-[#0a0a0a] flex items-center justify-center gap-4 text-white text-center py-2 md:py-3 text-[5px] md:text-[7px] font-bold uppercase tracking-[0.3em] border-t border-white/5 px-6">
      <div className="opacity-30">Developed & Designed By</div>
      <HoverPeek url="https://o2no.com" className="z-50 ">
        <a 
          href="https://o2no.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-sm md:text-xs tracking-[0.25em] text-white hover:text-brand-accent transition-all duration-500 font-black relative group"
        >
          o2no
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-accent transition-all duration-500 group-hover:w-full" />
        </a>
      </HoverPeek>
    </div>
  )
}

export default DevBanner