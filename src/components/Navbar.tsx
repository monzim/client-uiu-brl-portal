import React, { useState, useEffect } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Menu, X, ChevronDown, Search, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { SearchModal } from './SearchModal';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const location = useLocation();
  const showBg = isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Background logic
      setIsScrolled(currentScrollY > 50);

      // Hide/Show logic
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems = [
    { label: 'About BRL', to: '/about' },
    { 
      label: 'Research', 
      subItems: [
        { label: 'Area', to: '/area' },
        { label: 'Partnership', to: '/partnership' },
        { label: 'Award and Achievement', to: '/awards' }
      ] 
    },
    { 
      label: 'Research Team', 
      subItems: [
        { label: 'Faculty Members', to: '/faculty' },
        { label: 'Research Assistant', to: '/assistants' }
      ] 
    },

    { label: 'Equipment Facility', to: '/equipment' },
    { label: 'News and Events', to: '/news' },
    { label: 'Gallery', to: '/gallery' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform flex flex-col ${
          (isVisible || isOpen) ? 'translate-y-0' : '-translate-y-full'
        } ${
          showBg 
            ? (isOpen ? 'bg-transparent lg:bg-brand-bg lg:backdrop-blur-md' : 'bg-brand-bg backdrop-blur-md') 
            : 'bg-transparent'
        }`}
      >
        {/* Top Social Bar */}
        {/* <div className={`w-full h-6 flex justify-end items-center px-6 transition-colors duration-500 ${showBg ? 'border-b border-brand-border/10' : ''}`}>
          <div className="max-w-[1400px] w-full mx-auto flex justify-end gap-4">
            <a href="#" aria-label="Facebook" className={`transition-colors ${showBg ? 'text-brand-text/60 hover:text-brand-text' : 'text-white/60 hover:text-white'}`}>
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="#" aria-label="Twitter" className={`transition-colors ${showBg ? 'text-brand-text/60 hover:text-brand-text' : 'text-white/60 hover:text-white'}`}>
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href="#" aria-label="LinkedIn" className={`transition-colors ${showBg ? 'text-brand-text/60 hover:text-brand-text' : 'text-white/60 hover:text-white'}`}>
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a href="#" aria-label="YouTube" className={`transition-colors ${showBg ? 'text-brand-text/60 hover:text-brand-text' : 'text-white/60 hover:text-white'}`}>
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>
        </div> */}

        {/* Main Navbar */}
        <div className={`max-w-[1400px] w-full mx-auto px-6 flex items-center justify-between transition-all duration-500 ${showBg ? 'py-4' : 'py-8'}`}>
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 sm:gap-4 group relative z-[60]">
            <img 
              src={(isOpen || !showBg) ? "/images/transparent original logo.png" : "/images/transparent black logo.png"} 
              alt="BRL Logo" 
              className="h-7 sm:h-10 md:h-12 w-auto object-contain transition-all duration-500"
            />
            <div className={`h-6 sm:h-8 md:h-10 w-[1px] bg-current opacity-20 mx-1 sm:mx-2 ${isOpen ? 'text-white' : (showBg ? 'text-brand-accent' : 'text-white')}`} />
            <img 
              src={(isOpen || !showBg) ? "/images/uiu-logo.png" : "/images/UIU-Logo-2.png"} 
              alt="UIU Logo" 
              className="h-6 sm:h-8 md:h-10 w-auto object-contain transition-all duration-500"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <div 
                key={item.label}
                className="relative py-2"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center gap-1 cursor-pointer">
                  {item.to ? (
                    <Link 
                      to={item.to}
                      className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                        (location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to)))
                          ? (showBg ? 'text-brand-accent underline underline-offset-[6px] decoration-2' : 'text-white underline underline-offset-[6px] decoration-2')
                          : (showBg ? 'text-brand-accent hover:text-brand-accent/70' : 'text-white hover:text-white/70')
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                      item.subItems?.some(sub => location.pathname === sub.to || (sub.to !== '/' && location.pathname.startsWith(sub.to)))
                        ? (showBg ? 'text-brand-accent underline underline-offset-[6px] decoration-2' : 'text-white underline underline-offset-[6px] decoration-2')
                        : (showBg ? 'text-brand-accent' : 'text-white')
                    }`}>
                      {item.label}
                    </span>
                  )}
                  {item.subItems && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''} ${showBg ? 'text-brand-accent' : 'text-white'}`} />
                  )}
                </div>

                {/* Dropdown Menu */}
                {item.subItems && (
                  <div 
                    className={`absolute top-full left-0 w-64 bg-brand-text rounded-xl overflow-hidden transition-all duration-400 origin-top ${
                      activeDropdown === item.label ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-4 invisible'
                    }`}
                  >
                    <div className="py-3">
                      {item.subItems.map((sub) => (
                        <div key={sub.label}>
                          {sub.to.startsWith('/#') ? (
                            <a
                              href={sub.to.substring(1)}
                              className="block px-6 py-3 text-xs font-bold text-white hover:bg-white/10 transition-colors uppercase tracking-widest"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {sub.label}
                            </a>
                          ) : (
                            <Link
                              to={sub.to as any}
                              className="block px-6 py-3 text-xs font-bold text-white hover:bg-white/10 transition-colors uppercase tracking-widest"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {sub.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Search Icon */}
            <button 
              onClick={() => setSearchOpen(true)}
              className={`p-2 transition-colors ${showBg ? 'text-brand-accent' : 'text-white'}`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4 relative z-[60]">
            <button 
              onClick={() => setSearchOpen(true)}
              className={`p-2 ${isOpen ? 'text-white' : (showBg ? 'text-brand-accent' : 'text-white')}`}
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              className="p-2 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="text-white" />
              ) : (
                <Menu className={showBg ? 'text-brand-accent' : 'text-white'} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[45] bg-brand-text lg:hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-100%] pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full px-6 text-white pt-16">
          <nav className="flex flex-col items-center gap-4 w-full max-w-sm">
            {navItems.map((item) => (
              <div key={item.label} className="text-center w-full">
                {item.to ? (
                  <Link 
                    to={item.to} 
                    className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors block py-1 ${
                      (location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to)))
                        ? 'text-white underline underline-offset-[6px] decoration-2'
                        : 'text-white hover:text-white/60'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={`text-sm font-bold uppercase tracking-[0.2em] block py-1 ${
                    item.subItems?.some(sub => location.pathname === sub.to || (sub.to !== '/' && location.pathname.startsWith(sub.to)))
                      ? 'text-white underline underline-offset-[6px] decoration-2'
                      : 'text-white opacity-40'
                  }`}>
                    {item.label}
                  </span>
                )}
                {item.subItems && (
                  <div className="mt-1 flex flex-col gap-1 bg-white/5 py-2 rounded-xl border border-white/5">
                    {item.subItems.map((sub) => (
                      <div key={sub.label}>
                        {sub.to.startsWith('/#') ? (
                          <a
                            href={sub.to.substring(1)}
                            className="text-xs font-medium text-white/60 hover:text-white transition-colors block py-1 uppercase tracking-widest"
                            onClick={() => setIsOpen(false)}
                          >
                            {sub.label}
                          </a>
                        ) : (
                          <Link
                            to={sub.to as any}
                            className={`text-xs font-medium transition-colors block py-1 uppercase tracking-widest ${
                              location.pathname === sub.to || (sub.to !== '/' && location.pathname.startsWith(sub.to))
                                ? 'text-white underline underline-offset-4 decoration-2'
                                : 'text-white/60 hover:text-white'
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}




