import React, { useState, useEffect, useMemo } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Search, X, Command, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from '@tanstack/react-router';
import { projectsData, newsData, equipmentData } from '../data/data';
import { facultyData } from '../data/faculty';

interface SearchResult {
  id: string;
  title: string;
  type: 'Research' | 'News' | 'Faculty' | 'Equipment';
  description?: string;
  link: string;
}

export function SearchModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const allData: SearchResult[] = useMemo(() => {
    const research = projectsData.map(p => ({
      id: p.id,
      title: p.title,
      type: 'Research' as const,
      description: p.description,
      link: `/projects/${p.id}`
    }));

    const news = newsData.map(n => ({
      id: n.id,
      title: n.title,
      type: 'News' as const,
      description: n.description,
      link: `/news/${n.id}`
    }));

    const faculty = facultyData.map(f => ({
      id: f.id,
      title: f.name,
      type: 'Faculty' as const,
      description: f.designation,
      link: `/faculty/${f.id}`
    }));

    const equipment = equipmentData.map(e => ({
      id: e.id,
      title: e.name,
      type: 'Equipment' as const,
      description: e.description,
      link: '/#equipment'
    }));

    return [...research, ...news, ...faculty, ...equipment];
  }, []);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const searchTerms = query.toLowerCase().split(' ');
    return allData.filter(item => {
      const text = `${item.title} ${item.description || ''} ${item.type}`.toLowerCase();
      return searchTerms.every(term => text.includes(term));
    }).slice(0, 8);
  }, [query, allData]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-brand-text/40 backdrop-blur-sm animate-in fade-in duration-300" />
        <Dialog.Content className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-[600px] z-[101] bg-brand-bg rounded-[32px] overflow-hidden animate-in zoom-in-95 slide-in-from-top-4 duration-300 outline-none">
          <div className="p-6 border-b border-brand-border flex items-center gap-4">
            <Search className="w-5 h-5 text-brand-text/30" />
            <input 
              autoFocus
              placeholder="Search research, faculty, news..."
              className="flex-1 bg-transparent border-none outline-none text-brand-text placeholder:text-brand-text/20 font-medium text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              onClick={() => onOpenChange(false)}
              className="p-2 hover:bg-brand-text/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-brand-text/40" />
            </button>
          </div>

          <div className="max-h-[450px] overflow-y-auto p-4 no-scrollbar">
            {query.trim() === '' ? (
              <div className="py-20 text-center space-y-4">
                 <div className="w-16 h-16 bg-brand-text/5 rounded-full flex items-center justify-center mx-auto">
                    <Command className="w-8 h-8 text-brand-text/10" />
                 </div>
                 <p className="text-brand-text/30 font-bold uppercase tracking-widest text-[10px]">What are you looking for today?</p>
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="space-y-2">
                {filteredResults.map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => {
                      if (result.link.startsWith('/#')) {
                         const id = result.link.split('#')[1];
                         navigate({ to: '/' });
                         setTimeout(() => {
                           document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                         }, 100);
                      } else {
                        navigate({ to: result.link as any });
                      }
                      onOpenChange(false);
                      setQuery('');
                    }}
                    className="w-full group p-4 rounded-2xl hover:bg-brand-text hover:text-brand-bg transition-all duration-300 flex items-center justify-between text-left"
                  >
                    <div className="flex flex-col gap-1 pr-4">
                       <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100">{result.type}</span>
                       </div>
                       <h4 className="text-lg font-bold tracking-tight leading-tight">{result.title}</h4>
                       {result.description && (
                         <p className="text-xs opacity-50 font-medium line-clamp-1 group-hover:opacity-80">
                           {result.description}
                         </p>
                       )}
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                 <p className="text-brand-text/30 font-bold uppercase tracking-widest text-[10px]">No results found for "{query}"</p>
              </div>
            )}
          </div>

          <div className="p-4 bg-brand-text/5 border-t border-brand-border flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-brand-text/30">
             <span>UIU BME Lab Search</span>
             <div className="flex gap-4">
                <span className="flex items-center gap-1"><span className="px-1.5 py-0.5 bg-brand-bg rounded border border-brand-border">ESC</span> to close</span>
             </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
