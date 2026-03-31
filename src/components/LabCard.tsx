"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight, Beaker, Zap } from "lucide-react";
import { Activity } from "@/types";

export default function LabCard({ activity }: { activity: Activity }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative aspect-[1.5/1] bg-[#0d0d0d] border border-white/5 rounded-md overflow-hidden flex flex-col p-5 transition-colors hover:border-emerald-500/30"
    >
      {/* The "Green Spotlight" Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-md opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Header: Category & Link */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-emerald-500/50" />
          <span className="text-[9px] font-jetbrains uppercase tracking-[0.2em] text-slate-500">
            {activity.categoryName || "Research"}
          </span>
        </div>
        <a 
          href={activity.repoUrl || "#"} 
          target="_blank" 
          rel="noreferrer"
          className="p-1.5 rounded bg-white/5 border border-white/10 text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Title & Description */}
      <div className="relative z-10 flex-1">
        <h4 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors mb-2 leading-tight">
          {activity.title}
        </h4>
        {activity.description && (
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-4 font-light">
            {activity.description}
          </p>
        )}
      </div>

      {/* Footer: Difficulty Specs */}
      <div className="mt-auto pt-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-emerald-500/50" />
            <span className="text-[9px] font-jetbrains uppercase text-slate-600 tracking-widest">Complexity</span>
          </div>
          <span className={`text-[10px] font-jetbrains font-bold uppercase tracking-widest ${
            activity.difficulty === "Advanced" ? "text-purple-400" : 
            activity.difficulty === "Intermediate" ? "text-yellow-400" : "text-emerald-400"
          }`}>
            {activity.difficulty}
          </span>
        </div>
        {/* Visual "Load" Bar */}
        <div className="mt-2 h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: activity.difficulty === "Advanced" ? "100%" : activity.difficulty === "Intermediate" ? "65%" : "35%" }}
            className={`h-full ${
              activity.difficulty === "Advanced" ? "bg-purple-500" : 
              activity.difficulty === "Intermediate" ? "bg-yellow-500" : "bg-emerald-500"
            }`}
          />
        </div>
      </div>
    </div>
  );
}