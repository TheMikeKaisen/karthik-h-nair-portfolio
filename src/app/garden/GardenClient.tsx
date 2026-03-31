"use client"

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } }
};

// Mock Data
const MOCK_ARTICLES = [
  { id: '1', title: 'Architecting Scalable Node.js Microservices', date: 'Mar 15, 2026', excerpt: 'A deep dive into building fault-tolerant microservices using gRPC, Redis, and horizontal scaling strategies.', slug: 'architecting-scalable-node' },
  { id: '2', title: 'Why I Prefer Postgres over NoSQL for Financial Data', date: 'Feb 28, 2026', excerpt: 'ACID compliance isn\'t just a buzzword. Exploring the robust guarantees of PostgreSQL when handling ledger transactions in high-throughput environments.', slug: 'postgres-financial-data' },
];

const MOCK_LOGS = [
  { id: 'l1', title: 'Migrated primary auth DB from AWS RDS to PlanetScale.', timestamp: '2026-03-31T08:45:00Z' },
  { id: 'l2', title: 'Resolved memory leak in the WebSocket handling layer. CPU usage down 40% across clusters.', timestamp: '2026-03-29T14:20:00Z' },
  { id: 'l3', title: 'Updated Redis cache invalidation strategy for user sessions.', timestamp: '2026-03-25T01:15:00Z' },
  { id: 'l4', title: 'Deployed new egress pipeline for real-time analytics aggregation.', timestamp: '2026-03-20T18:30:00Z' },
];

export default function GardenClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const view = searchParams.get('v') || 'articles';

  const setView = (v: 'articles' | 'logs') => {
    router.push(`?v=${v}`, { scroll: false });
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
              {MOCK_ARTICLES.map((article) => (
                <motion.article key={article.id} variants={itemVariants} className="group cursor-pointer">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-xs font-jetbrains text-emerald-400/80 tracking-widest uppercase">{article.date}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-3 group-hover:text-blue-400 transition-colors tracking-tight">{article.title}</h2>
                  <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed max-w-2xl mb-4">{article.excerpt}</p>
                  <div className="flex items-center gap-2 text-sm font-jetbrains font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    Read_More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.article>
              ))}
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
              {MOCK_LOGS.map((log) => (
                <motion.div key={log.id} variants={itemVariants} className="flex gap-4 p-4 rounded-lg bg-black/40 border border-white/5 hover:border-white/10 hover:bg-white/5 transition-colors group">
                  <div className="flex-shrink-0 mt-0.5">
                    <Terminal className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div className="flex flex-col gap-1 w-full relative">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">{log.timestamp}</span>
                    <p className="text-sm text-slate-300 leading-relaxed font-light">{log.title}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
