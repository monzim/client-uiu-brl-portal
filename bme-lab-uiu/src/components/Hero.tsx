import React, { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    image: '/images/hero1.png',
    text: 'Welcome to the Biomedical Research Laboratory '
  },
  {
    image: '/images/hero2.png',
    text: 'Advancing scientific knowledge in the field of pharmaceutical and biomedical sciences .'
  }
];

const focusCards = [
  { 
    title: 'Smart Hydrogels in Wound Healing', 
    sub: 'Advanced tissue regeneration and drug delivery.',
    to: '/projects/hydrogel' 
  },
  { 
    title: 'Pharmacogenomics', 
    sub: 'Personalized drug therapy based on genetic profile.',
    to: '/projects/pharmacogenomics' 
  },
  { 
    title: 'Antimicrobial Resistance', 
    sub: 'Combating global pathogens and superbugs.',
    to: '/projects/amr' 
  },
  { 
    title: 'Cell Culture', 
    sub: 'Precision cellular modeling for drug discovery.',
    to: '/projects/cell-culture' 
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col">
      {/* Carousel */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt="Hero" 
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Fading Masks */}
      {/* <div className="absolute top-0 left-0 right-0 h-22 bg-gradient-to-b from-black to-transparent z-[5]" /> */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/20 to-transparent z-[5]" /> */}
{/* //right to left Masks */}
<div className="absolute bottom-0 left-0 top-0 h-full w-full bg-gradient-to-r from-black via-black/10 to-transparent z-[5]" ></div>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 max-w-[1400px] mx-auto px-6 flex flex-col items-start justify-center w-full pt-20 sm:pt-0">
        <div className="max-w-[800px] mb-12 lg:mb-54 relative h-[180px] w-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 absolute inset-0 flex items-center ${
                index === currentSlide 
                  ? 'opacity-100 translate-x-0 pointer-events-auto' 
                  : index < currentSlide 
                    ? 'opacity-0 -translate-x-20 pointer-events-none'
                    : 'opacity-0 translate-x-20 pointer-events-none'
              }`}
            >
              <h1 className="text-white text-[28px] sm:text-[40px] md:text-[44px] font-light leading-[1.1] drop-shadow-2xl">
                {slide.text}
              </h1>
            </div>
          ))}
        </div>

        {/* Focus Area Cards */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 lg:absolute lg:bottom-12 lg:left-6 lg:right-6 max-w-[1400px] lg:mx-auto  lg:pb-0">
          {focusCards.map((card, i) => {
            const isAMR = card.title === 'Cell Culture';
            return (
              <Link
                key={card.title}
                to="/projects/$projectId"
                params={{ projectId: card.to.split('/').pop() || '' }}
                className={`group relative p-4 lg:p-6 rounded-2xl backdrop-blur-xl border border-white/20 transition-all duration-500 flex flex-col justify-between h-[140px] sm:h-[160px] lg:h-[220px] ${
                  isAMR 
                    ? 'bg-brand-text border-transparent lg:hover:bg-white/10 lg:hover:border-white/20' 
                    : 'bg-white/10 lg:hover:bg-brand-text lg:hover:border-transparent'
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div>
                  <h3 className="text-white text-sm sm:text-sm lg:text-2xl font-bold leading-tight mb-2 transition-colors uppercase lg:normal-case">
                    {card.title}
                  </h3>
                  <p className="text-white/60 text-xs font-medium leading-relaxed group-hover:text-white/80 transition-colors line-clamp-2 hidden lg:block">
                    {card.sub}
                  </p>
                </div>
                <div className="flex justify-end mt-auto">
                  <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-white/10 flex items-center justify-center lg:group-hover:bg-white transition-all duration-300">
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-white group-hover:text-brand-text transition-colors duration-300" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}






