import React from 'react';
import { Microscope } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export function Footer() {
  return (
    <footer className="relative pt-32 pb-20 px-6 bg-brand-bg border-t border-brand-border overflow-hidden">
      {/* Subtle DNA Helix Decoration for Footer */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] opacity-[0.03] pointer-events-none select-none rotate-[-45deg]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M20,0 C40,20 10,40 30,60 C50,80 20,100 20,100" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M40,0 C20,20 50,40 30,60 C10,80 40,100 40,100" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {[...Array(15)].map((_, i) => (
             <circle key={i} cx={30 + Math.sin(i) * 10} cy={i * 7} r="0.5" fill="currentColor" opacity="0.5" />
          ))}
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-brand-text text-brand-bg p-1.5 rounded-full">
                <Microscope className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-brand-text uppercase">
                Biomedical Research Lab <span className="opacity-40">UIU</span>
              </span>
            </div>
            <p className="text-brand-text/50 max-w-sm text-lg leading-relaxed font-medium">
              Pushing the boundaries of biomedical research at United International University.
            </p>
          </div>
          
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text/30">Connect</h3>
            <ul className="flex flex-col gap-4 font-medium">
              <li><Link to="/" className="hover:opacity-50 transition-opacity">Research</Link></li>
              <li><Link to="/about" className="hover:opacity-50 transition-opacity">About</Link></li>
              <li><a href="#" className="hover:opacity-50 transition-opacity">Facilities</a></li>
              <li><a href="#" className="hover:opacity-50 transition-opacity">LinkedIn</a></li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text/30">Contact</h3>
            <div className="flex flex-col gap-4 font-medium text-brand-text/70">
              <p>United City, Madani Ave,<br />Dhaka 1212, Bangladesh</p>
              <a href="mailto:tahmina@pharmacy.uiu.ac.bd" className="text-brand-text hover:underline underline-offset-4">
                tahmina@pharmacy.uiu.ac.bd
              </a>
            </div>
            
            {/* Map Integration */}
            <div className="mt-4 rounded-3xl overflow-hidden aspect-video border border-brand-border grayscale brightness-[0.9] hover:grayscale-0 transition-all duration-700">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.098092040954!2d90.4770250753361!3d23.79194277864353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a1fec2576b%3A0x64e29fc66657904e!2sUnited%20International%20University!5e0!3m2!1sen!2sbd!4v1712741548000!5m2!1sen!2sbd" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-32 pt-12 border-t border-brand-border flex flex-col md:flex-row justify-between gap-6 text-xs font-bold uppercase tracking-widest text-brand-text/30">
          <p>&copy; {new Date().getFullYear()} UIU BME Lab</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-text">Privacy Policy</a>
            <a href="#" className="hover:text-brand-text">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
