"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookText, Calendar } from "lucide-react";
import { Article } from "@/types";

export default function GardenCard({ article }: { article: Article }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <Link 
      href={`/garden/${article.slug.current}`} 
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col bg-[#0d0d0d] border border-white/5 rounded-md p-6 transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.02]"
    >
      {/* Interactive Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-md opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      {/* Header Metadata */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-[10px] font-jetbrains text-slate-500 uppercase tracking-widest">
            {formattedDate}
          </span>
        </div>
        <div className="px-2 py-0.5 rounded-sm bg-blue-500/5 border border-blue-500/20">
          <span className="text-[9px] font-jetbrains text-blue-400 uppercase tracking-tighter">
            {article.categoryName || "Entry"}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-200 group-hover:text-emerald-400 transition-colors mb-3 leading-snug relative z-10">
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="text-slate-400 text-sm font-light leading-relaxed line-clamp-3 mb-8 relative z-10">
        {article.excerpt}
      </p>

      {/* Footer Specification */}
      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 text-slate-600">
          <BookText className="w-3.5 h-3.5" />
          <span className="text-[10px] font-jetbrains uppercase tracking-widest">
            {Math.ceil(article.excerpt?.length / 50) || 5} min read
          </span>
        </div>
        
        <div className="flex items-center gap-1 text-emerald-500/0 group-hover:text-emerald-500 transition-all transform translate-x-2 group-hover:translate-x-0">
          <span className="text-[10px] font-jetbrains uppercase font-bold">Open_File</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
    
  );
}