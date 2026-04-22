import React, { useState, useEffect } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { SearchModal } from './SearchModal';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const location = useLocation();
  const isHome = location.pathname === '/';
  const showBg = !isHome || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About BRL', to: '/about' },
    { 
      label: 'Research', 
      subItems: [
        { label: 'Area', to: '/#research' },
        { label: 'Partnership', to: '/partnership' },
        { label: 'Award and Achievement', to: '/awards' }
      ] 
    },
    { 
      label: 'Research Team', 
      subItems: [
        { label: 'Faculty Members', to: '/team' },
        { label: 'Research Assistant', to: '/team' }
      ] 
    },

    { label: 'Equipment Facility', to: '/#equipment' },
    { label: 'News and Events', to: '/#news' },
    { label: 'Gallery', to: '/gallery' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showBg ? 'bg-[#f0f7f4]/95 py-4 shadow-sm backdrop-blur-md' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 sm:gap-4 group relative z-[60]">
            <div className="flex flex-col">
              <span className={`text-xl sm:text-2xl font-black tracking-tighter leading-none transition-colors ${isOpen ? 'text-white' : (showBg ? 'text-brand-accent' : 'text-white')}`}>
                BRL
              </span>
              <span className={`text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.2em] transition-colors ${isOpen ? 'text-white/60' : (showBg ? 'text-brand-accent/60' : 'text-white/60')}`}>
                Research Lab
              </span>
            </div>
            <div className={`h-8 sm:h-10 w-[1px] bg-current opacity-20 mx-1 sm:mx-2 ${isOpen ? 'text-white' : (showBg ? 'text-brand-accent' : 'text-white')}`} />
            <img 
              src={(isOpen || !showBg) ? "/images/uiu-logo.png" : "/images/UIU-Logo-2.png"} 
              alt="UIU Logo" 
              className="h-8 sm:h-10 w-auto object-contain transition-all"
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
                        showBg ? 'text-brand-accent hover:text-brand-accent/70' : 'text-white hover:text-white/70'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                      showBg ? 'text-brand-accent' : 'text-white'
                    }`}>
                      {item.label}
                    </span>
                  )}
                  {item.subItems && (
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''} ${showBg ? 'text-brand-accent' : 'text-white'}`} />
                  )}
                </div>

                {/* Dropdown Menu */}
                {item.subItems && (
                  <div 
                    className={`absolute top-full left-0 w-64 bg-brand-text rounded-xl overflow-hidden transition-all duration-400 origin-top shadow-2xl ${
                      activeDropdown === item.label ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-4 invisible'
                    }`}
                  >
                    <div className="py-3">
                      {item.subItems.map((sub) => (
                        <div key={sub.label}>
                          {sub.to.startsWith('/#') ? (
                            <a
                              href={sub.to.substring(1)}
                              className="block px-6 py-3 text-[10px] font-bold text-white hover:bg-white/10 transition-colors uppercase tracking-[0.2em]"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {sub.label}
                            </a>
                          ) : (
                            <Link
                              to={sub.to as any}
                              className="block px-6 py-3 text-[10px] font-bold text-white hover:bg-white/10 transition-colors uppercase tracking-[0.2em]"
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

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 z-[45] bg-brand-text lg:hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-100%] pointer-events-none'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8 px-6 text-white overflow-y-auto pt-20">
            <nav className="flex flex-col items-center gap-6 w-full max-w-sm">
              {navItems.map((item) => (
                <div key={item.label} className="text-center w-full">
                  {item.to ? (
                    <Link 
                      to={item.to} 
                      className="text-xl font-bold uppercase tracking-widest hover:text-white/60 transition-colors block py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-xl font-bold uppercase tracking-widest opacity-40 block py-2">
                      {item.label}
                    </span>
                  )}
                  {item.subItems && (
                    <div className="mt-2 flex flex-col gap-2 bg-white/5 py-3 rounded-2xl">
                      {item.subItems.map((sub) => (
                        <div key={sub.label}>
                          {sub.to.startsWith('/#') ? (
                            <a
                              href={sub.to.substring(1)}
                              className="text-sm font-medium text-white/60 hover:text-white transition-colors block py-1"
                              onClick={() => setIsOpen(false)}
                            >
                              {sub.label}
                            </a>
                          ) : (
                            <Link
                              to={sub.to as any}
                              className="text-sm font-medium text-white/60 hover:text-white transition-colors block py-1"
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
      </nav>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}




