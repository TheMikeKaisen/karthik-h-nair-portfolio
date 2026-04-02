"use client"

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Terminal, ArrowRight, Search, ListFilter, X, Check, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Article, DevLog } from '@/types';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } }
};

interface GardenClientProps {
  articles: Article[];
  logs: DevLog[];
}

// Decorative SVG Components for the Greenery Look
const FloatingLeaf = ({ className, delay = 0, style }: { className?: string; delay?: number; style?: React.CSSProperties }) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    initial={{ rotate: -5, y: 0 }}
    animate={{ 
      rotate: [ -5, 5, -5 ],
      y: [ 0, -3, 0 ]
    }}
    transition={{
      duration: 5 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }}
  >
    <path d="M12 2C12 2 4 6 4 13C4 20 12 22 12 22C12 22 20 20 20 13C20 6 12 2 12 2Z" fill="currentColor" fillOpacity="0.4" />
    <path d="M12 2V22" stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.5" />
  </motion.svg>
);

const GrassBlade = ({ className, delay = 0, height = 20 }: { className?: string; delay?: number; height?: number }) => (
  <motion.div
    className={`w-[2.5px] bg-emerald-500/30 rounded-full origin-bottom ${className}`}
    style={{ height: `${height}px` }}
    animate={{ rotate: [-2, 2, -2] }}
    transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

export default function GardenClient({ articles, logs }: GardenClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterRef = useRef<HTMLDivElement>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tagSearchQuery, setTagSearchQuery] = useState("");

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Derive unique tags from both content types
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    articles.forEach((a: Article) => a.tags?.forEach((t: string) => tags.add(t)));
    logs.forEach((l: DevLog) => l.tags?.forEach((t: string) => tags.add(t)));
    return Array.from(tags).sort();
  }, [articles, logs]);

  const filteredAvailableTags = useMemo(() => {
    return allTags.filter(t => t.toLowerCase().includes(tagSearchQuery.toLowerCase()));
  }, [allTags, tagSearchQuery]);

  // Filtering Logic (OR)
  const filteredArticles = useMemo(() => {
    return articles.filter((a: Article) => {
      const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags = selectedTags.length === 0 || a.tags?.some((t: string) => selectedTags.includes(t));
      return matchesSearch && matchesTags;
    });
  }, [articles, searchQuery, selectedTags]);

  const filteredLogs = useMemo(() => {
    return logs.filter((l: DevLog) => {
      const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags = selectedTags.length === 0 || l.tags?.some((t: string) => selectedTags.includes(t));
      return matchesSearch && matchesTags;
    });
  }, [logs, searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const removeTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  // Strict URL Parameter Validation
  const rawView = searchParams.get('v');
  const view = rawView === 'logs' ? 'logs' : 'articles';

  const setView = (v: 'articles' | 'logs') => {
    router.push(`?v=${v}`, { scroll: false });
  };

  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        router.refresh();
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [router]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* 1. Enhanced Header Component with Greenery */}
      <header className="relative group overflow-hidden md:overflow-visible flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
        
        {/* Background Greenery Layer (Behind Text) */}
        <div className="absolute -left-10 -top-10 w-full h-full pointer-events-none select-none z-0 opacity-40 mix-blend-screen">
           <FloatingLeaf className="absolute left-4 top-4 w-16 h-16 text-emerald-900" delay={0.5} />
           <FloatingLeaf className="absolute left-20 top-2 w-12 h-12 text-emerald-800" delay={1.2} />
           <FloatingLeaf className="absolute left-32 top-8 w-20 h-20 text-emerald-950" delay={0.1} />
           <FloatingLeaf className="absolute left-8 top-16 w-10 h-10 text-emerald-700" delay={2.4} />
           {/* Hanging Vines Simulation */}
           <motion.div 
             className="absolute left-48 top-0 w-px h-32 bg-gradient-to-b from-emerald-900/0 via-emerald-800/40 to-emerald-700/0"
             animate={{ height: [120, 140, 120] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
           />
           <FloatingLeaf className="absolute left-[11.5rem] top-24 w-6 h-6 text-emerald-600" delay={1.8} />
        </div>

        <div className="relative z-10 flex flex-col gap-1">
          <div className="relative inline-block">
             {/* Title with subtle glow */}
             <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-1 relative z-20 mix-blend-plus-lighter">
               The Garden
               <div className="absolute -inset-2 bg-emerald-500/10 blur-2xl rounded-full -z-10" />
             </h1>
             {/* Roots poking from the base of the title */}
             <svg className="absolute -bottom-4 left-0 w-32 h-8 text-emerald-900/40 -z-10" viewBox="0 0 100 20">
               <path d="M10 0 Q 15 10 5 20 M25 0 Q 20 15 30 20 M50 0 Q 55 5 45 15 M80 0 Q 70 10 85 20" stroke="currentColor" fill="none" strokeWidth="0.5" />
             </svg>
          </div>
          <p className="text-slate-400 font-normal tracking-tight max-w-xs leading-snug">
             Notes, architectures, and terminal logs.
          </p>
        </div>

        {/* 2. Mode Switcher (Pill UI) stays clean but elevated */}
        <div className="relative z-10 bg-white/5 border border-white/10 p-1 rounded-full flex relative w-max font-jetbrains">
          <button
            onClick={() => setView('articles')}
            className={`relative px-5 py-2 rounded-full text-xs font-semibold z-10 transition-colors uppercase tracking-widest ${view === 'articles' ? 'text-slate-900' : 'text-slate-400 hover:text-white'}`}
          >
            Articles
            {view === 'articles' && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-emerald-400 rounded-full -z-10 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              />
            )}
          </button>
          
          <button
            onClick={() => setView('logs')}
            className={`relative px-5 py-2 rounded-full text-xs font-semibold z-10 transition-colors uppercase tracking-widest ${view === 'logs' ? 'text-slate-900' : 'text-slate-400 hover:text-white'}`}
          >
            Logs
            {view === 'logs' && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-emerald-400 rounded-full -z-10 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              />
            )}
          </button>
        </div>

        {/* Grass elements at the floor of the header */}
        <div className="absolute bottom-0 left-0 w-full flex items-end gap-1 px-4 pointer-events-none select-none">
           <GrassBlade height={12} delay={0.2} />
           <GrassBlade height={18} delay={0.8} />
           <GrassBlade height={14} delay={1.1} />
           <GrassBlade height={22} delay={0.4} />
           <GrassBlade height={16} delay={0.7} className="hidden sm:block" />
           <GrassBlade height={20} delay={1.5} className="hidden sm:block" />
           <GrassBlade height={12} delay={0.3} className="hidden md:block" />
           <GrassBlade height={24} delay={0.9} className="hidden md:block" />
           <GrassBlade height={14} delay={0.5} className="hidden lg:block" />
           <GrassBlade height={26} delay={1.2} className="hidden lg:block" />
        </div>
      </header>

      {/* 2. Search & Filtering Controls */}
      <div className="flex flex-col gap-4">
        {/* Top Row: Search bar and Filter Button */}
        <div className="flex items-center gap-3 w-full max-w-2xl relative" ref={filterRef}>
          {/* Main Search Bar */}
          <div className="relative group flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
            <input 
              type="text" 
              placeholder={`Search ${view === 'articles' ? 'articles' : 'logs'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:bg-white/[0.08] transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Button */}
          <div className="relative">
             <button 
               onClick={() => setIsFilterOpen(!isFilterOpen)}
               className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all text-sm font-medium whitespace-nowrap ${isFilterOpen || selectedTags.length > 0 ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:bg-white/[0.08]'}`}
             >
               <ListFilter className="w-4 h-4" />
               <span className="hidden sm:inline">Filter by Tags</span>
               {selectedTags.length > 0 && (
                 <span className="bg-emerald-500 text-slate-900 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold">
                   {selectedTags.length}
                 </span>
               )}
               <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
             </button>

             {/* Filter Dropdown Popover */}
             <AnimatePresence>
               {isFilterOpen && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10, scale: 0.95 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: 10, scale: 0.95 }}
                   className="absolute right-0 top-full mt-3 w-72 bg-[#0a0a0b]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-[60] overflow-hidden"
                 >
                   <div className="p-4 border-b border-white/5">
                      <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 group-focus-within:text-emerald-400" />
                        <input 
                          type="text" 
                          placeholder="Search tags..."
                          value={tagSearchQuery}
                          onChange={(e) => setTagSearchQuery(e.target.value)}
                          className="w-full bg-white/5 border border-white/5 rounded-lg py-2 pl-9 pr-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-white/10 transition-all"
                        />
                      </div>
                   </div>
                   
                   <div className="max-h-60 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10">
                      {filteredAvailableTags.length > 0 ? (
                        <div className="grid grid-cols-1 gap-1">
                           {filteredAvailableTags.map((tag) => (
                             <button
                               key={tag}
                               onClick={() => toggleTag(tag)}
                               className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors hover:bg-white/5 text-slate-400 hover:text-slate-200 group"
                             >
                                <div className="flex items-center gap-3">
                                   <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${selectedTags.includes(tag) ? 'bg-emerald-500 border-emerald-500' : 'border-white/20 group-hover:border-white/40'}`}>
                                      {selectedTags.includes(tag) && <Check className="w-3 h-3 text-slate-900 stroke-[3]" />}
                                   </div>
                                   <span>#{tag}</span>
                                </div>
                             </button>
                           ))}
                        </div>
                      ) : (
                        <div className="py-8 text-center text-slate-600 text-[10px] uppercase tracking-widest font-jetbrains">No matching nodes</div>
                      )}
                   </div>

                   {selectedTags.length > 0 && (
                     <div className="p-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-jetbrains uppercase tracking-widest">{selectedTags.length} selected</span>
                        <button 
                          onClick={() => setSelectedTags([])}
                          className="text-[10px] text-emerald-400 hover:text-white uppercase font-jetbrains font-bold transition-colors"
                        >
                          Clear_All
                        </button>
                     </div>
                   )}
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>

        {/* Bottom Row: Selected Tags Chips */}
        <AnimatePresence>
           {selectedTags.length > 0 && (
             <motion.div 
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="flex flex-wrap gap-2 items-center"
             >
                <div className="text-[10px] uppercase font-jetbrains tracking-widest text-slate-600 mr-2">Active_Filters:</div>
                {selectedTags.map(tag => (
                   <motion.div 
                     key={tag}
                     layoutId={`chip-${tag}`}
                     className="flex items-center gap-2 pl-3 pr-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium"
                   >
                     <span>#{tag}</span>
                     <button 
                       onClick={() => removeTag(tag)}
                       className="p-0.5 hover:bg-emerald-500/20 rounded-full transition-colors"
                     >
                       <X className="w-3 h-3" />
                     </button>
                   </motion.div>
                ))}
             </motion.div>
           )}
        </AnimatePresence>
      </div>

      {/* 3. Content Area */}
      <main className="min-h-[50vh] mt-4">
        <AnimatePresence mode="wait">
          {view === 'articles' ? (
            <motion.div
              key="articles"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -10, filter: "blur(4px)", transition: { duration: 0.2 } }}
              className="flex flex-col gap-10"
            >
              {filteredArticles.map((article) => (
                <Link key={article._id} href={`/garden/${article.slug.current}?v=articles`}>
                  <motion.article variants={itemVariants} className="group cursor-pointer">
                    {article.mainImage && (
                      <div className="mb-6 w-full h-48 md:h-64 relative rounded-xl overflow-hidden bg-white/5 border border-white/10">
                        <Image
                          src={urlFor(article.mainImage).url()}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>
                    )}
                    <div className="mb-2 flex items-center gap-3">
                      <span className="text-xs font-jetbrains text-emerald-400/80 tracking-widest uppercase">{formatDate(article.publishedAt)}</span>
                      {article.categoryName && (
                        <span className="text-xs font-jetbrains px-2 py-0.5 rounded-full bg-white/5 text-slate-400 tracking-widest uppercase border border-white/10">
                          {article.categoryName}
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-3 group-hover:text-blue-400 transition-colors tracking-tight">{article.title}</h2>
                    <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed max-w-2xl mb-4 line-clamp-2">{article.excerpt}</p>
                    
                    {/* Render Tags if any */}
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map(t => (
                          <span key={t} className="text-[10px] font-jetbrains text-slate-500">#{t}</span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm font-jetbrains font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                      Read_More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.article>
                </Link>
              ))}
              {filteredArticles.length === 0 && (
                <div className="flex flex-col items-center py-20 text-center">
                   <p className="text-slate-500 font-jetbrains text-sm mb-2">No binary matches found in local garden index.</p>
                   <button onClick={() => {setSearchQuery(""); setSelectedTags([])}} className="text-emerald-400 text-xs font-jetbrains uppercase hover:underline underline-offset-4">Reset_Filter</button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="logs"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -10, filter: "blur(4px)", transition: { duration: 0.2 } }}
              className="flex flex-col gap-3 font-jetbrains"
            >
              {filteredLogs.map((log) => (
                <Link key={log._id} href={`/garden/${log.slug.current}?v=logs`} className="group md:w-3/4">
                  <motion.div variants={itemVariants} className="flex gap-4 p-4 rounded-lg bg-black/40 border border-white/5 hover:border-white/10 hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="flex-shrink-0 mt-0.5">
                      <Terminal className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <div className="flex flex-col gap-1 w-full relative">
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                           {new Date(log.publishedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                         </span>
                         {log.tags && log.tags.length > 0 && (
                           <div className="flex gap-2">
                             {log.tags.map(t => (
                               <span key={t} className="text-[9px] text-slate-600">#{t}</span>
                             ))}
                           </div>
                         )}
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed font-light">{log.title}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
              {filteredLogs.length === 0 && (
                <div className="flex flex-col items-center py-20 text-center">
                  <p className="text-slate-500 text-sm mb-2">Null execution trace. Sequence terminated.</p>
                  <button onClick={() => {setSearchQuery(""); setSelectedTags([])}} className="text-emerald-400 text-xs uppercase hover:underline underline-offset-4">Reset_Filter</button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
