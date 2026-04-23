import React from 'react'
import { Link } from '@tanstack/react-router'

export function Footer() {
  return (
    <>
      {/* Map Section - Above Footer */}
      <div className="w-full h-[40vh] relative border-t border-brand-borde brightness-[0.9] hover:grayscale-0 transition-all duration-700">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.098!2d90.44971!3d23.7978829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7d8042caf2d%3A0x686fa3e360361ddf!2sUnited%20International%20University!5e0!3m2!1sen!2sbd!4v1712741548000!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <footer className="relative pt-32 pb-20 px-6 bg-brand-text border-t border-white/10 overflow-hidden text-white">
        {/* Subtle DNA Helix Decoration for Footer */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] opacity-[0.07] pointer-events-none select-none rotate-[-45deg] text-white">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M20,0 C40,20 10,40 30,60 C50,80 20,100 20,100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <path
              d="M40,0 C20,20 50,40 30,60 C10,80 40,100 40,100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            {[...Array(15)].map((_, i) => (
              <circle
                key={i}
                cx={30 + Math.sin(i) * 10}
                cy={i * 7}
                r="0.5"
                fill="currentColor"
                opacity="0.5"
              />
            ))}
          </svg>
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 md:gap-6 mb-8">
                <img
                  src="/images/transparent original logo.png"
                  alt="BRL Logo"
                  className="h-12 md:h-20 w-auto"
                />
                <div className="h-12 md:h-16 w-px bg-white/20" />
                <img
                  src="/images/uiu-logo.png"
                  alt="UIU Logo"
                  className="h-12 md:h-16 w-auto"
                />
              </div>
              <p className="text-white/60 max-w-sm text-lg leading-relaxed font-medium">
                Pushing the boundaries of biomedical research at United
                International University.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">
                Connect
              </h3>
              <ul className="flex flex-col gap-4 font-medium">
                <li>
                  <Link
                    to="/"
                    className="hover:text-white/50 transition-colors"
                  >
                    Research
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white/50 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white/50 transition-colors">
                    Facilities
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white/50 transition-colors">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">
                Contact
              </h3>
              <div className="flex flex-col gap-4 font-medium text-white/70">
                <p>
                  United City, Madani Ave,
                  <br />
                  Dhaka 1212, Bangladesh
                </p>
                <a
                  href="mailto:tahmina@pharmacy.uiu.ac.bd"
                  className="text-white hover:underline underline-offset-4"
                >
                  tahmina@pharmacy.uiu.ac.bd
                </a>
              </div>
            </div>
          </div>

          <div className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between gap-6 text-xs font-bold uppercase tracking-widest text-white/30">
            <p>&copy; {new Date().getFullYear()} UIU BME Lab</p>
            <div className="flex gap-8">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        
      </footer>
    </>
  )
}
