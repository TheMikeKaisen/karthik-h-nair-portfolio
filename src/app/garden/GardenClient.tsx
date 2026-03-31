"use client"

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Terminal, ArrowRight } from 'lucide-react';
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

export default function GardenClient({ articles, logs }: GardenClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Strict URL Parameter Validation
  const rawView = searchParams.get('v');
  const view = rawView === 'logs' ? 'logs' : 'articles';

  const setView = (v: 'articles' | 'logs') => {
    router.push(`?v=${v}`, { scroll: false });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full flex flex-col gap-12">
      {/* 1. Header Component */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#f8fafc] mb-2">The Garden</h1>
          <p className="text-slate-400">Notes, architectures, and terminal logs.</p>
        </div>

        {/* 2. Mode Switcher (Pill UI) */}
        <div className="bg-white/5 border border-white/10 p-1 rounded-full flex relative w-max font-jetbrains">
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
      </header>

      {/* 3. Content Area */}
      <main className="min-h-[50vh]">
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
              {articles.map((article) => (
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
                    <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed max-w-2xl mb-4">{article.excerpt}</p>
                    <div className="flex items-center gap-2 text-sm font-jetbrains font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                      Read_More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.article>
                </Link>
              ))}
              {articles.length === 0 && (
                <div className="text-slate-500 font-jetbrains text-sm">No articles published yet.</div>
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
              {logs.map((log) => (
                <Link key={log._id} href={`/garden/${log.slug.current}?v=logs`} className="group md:w-3/4">
                  <motion.div variants={itemVariants} className="flex gap-4 p-4 rounded-lg bg-black/40 border border-white/5 hover:border-white/10 hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="flex-shrink-0 mt-0.5">
                      <Terminal className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <div className="flex flex-col gap-1 w-full relative">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                        {new Date(log.publishedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                      <p className="text-sm text-slate-300 leading-relaxed font-light">{log.title}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
              {logs.length === 0 && (
                <div className="text-slate-500 text-sm">No system logs executed sequence.</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
