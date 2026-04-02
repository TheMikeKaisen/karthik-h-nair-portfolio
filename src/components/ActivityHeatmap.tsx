"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ActivityMetric } from "@/types";
import { 
  IconGitCommit, 
  IconCode, 
  IconLeaf, 
  IconTerminal, 
  IconInfoCircle 
} from "@tabler/icons-react";

interface Props {
  data: ActivityMetric[];
}

export function ActivityHeatmap({ data }: Props) {
  const [hoveredDay, setHoveredDay] = useState<ActivityMetric | null>(null);

  // Helper to determine emerald intensity
// 1. Update the helper to sum the values manually
const getLevel = (day: ActivityMetric) => {
  const total = 
    (day.githubCommits || 0) + 
    (day.leetcodeSolved || 0) + 
    (day.gfgSolved || 0) + 
    (day.articlesPublished || 0) + 
    (day.devLogs || 0);

  if (total === 0) return "bg-white/5";
  if (total <= 2) return "bg-emerald-500/20";
  if (total <= 5) return "bg-emerald-500/40";
  if (total <= 8) return "bg-emerald-500/70";
  
  // High intensity "Glow" state
  return "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]";
};

// 2. Then update the grid mapping to use the whole 'day' object
{data.map((day) => (
  <div
    key={day.date}
    onMouseEnter={() => setHoveredDay(day)}
    onMouseLeave={() => setHoveredDay(null)}
    className={`w-3 h-3 rounded-[2px] transition-all duration-300 cursor-crosshair hover:ring-1 hover:ring-white/50 ${getLevel(day)}`}
  />
))}

  return (
    <section className="py-16 md:py-20 container mx-auto px-4 border-t border-white/5 relative">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-500 font-jetbrains text-xs tracking-[0.3em] uppercase">
            <IconInfoCircle size={14} /> i_love_to_code
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Consistency <span className="text-emerald-500">Heatmap</span>
          </h2>
          <p className="text-slate-400 max-w-md font-light text-sm">
            A 365-day execution trace aggregating commits, logic puzzles, and documentation logs.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[10px] font-jetbrains text-slate-500 uppercase tracking-widest">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-white/5" />
          <div className="w-3 h-3 rounded-sm bg-emerald-500/20" />
          <div className="w-3 h-3 rounded-sm bg-emerald-500/40" />
          <div className="w-3 h-3 rounded-sm bg-emerald-500/70" />
          <div className="w-3 h-3 rounded-sm bg-emerald-500" />
          <span>More</span>
        </div>
      </div>

      <div className="relative group">
        {/* Heatmap Grid Wrapper */}
        <div className="overflow-x-auto pb-4 no-scrollbar">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[800px]">
            {data.map((day, idx) => (
              <div
                key={day.date}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
                className={`w-3 h-3 rounded-[2px] transition-all duration-300 cursor-crosshair hover:ring-1 hover:ring-white/50 ${getLevel(day)}`}
              />
            ))}
          </div>
        </div>

        {/* Floating Tooltip Card */}
        <AnimatePresence>
          {hoveredDay && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute z-50 pointer-events-none top-[-140px] left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0"
            >
              <div className="glass p-5 rounded-md border border-emerald-500/30 bg-[#0d0d0d]/90 backdrop-blur-xl shadow-2xl w-64">
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                  <span className="text-[10px] font-jetbrains text-emerald-500 font-bold uppercase tracking-widest">
                    {new Date(hoveredDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-[9px] font-jetbrains text-slate-600 uppercase tracking-tighter">
                    // LOG_ENTRY
                  </span>
                </div>

                <ul className="space-y-3">
                  {[
                    { label: "Commits", val: hoveredDay.githubCommits, icon: <IconGitCommit size={14} className="text-emerald-400" /> },
                    { label: "Algos", val: (hoveredDay.leetcodeSolved || 0) + (hoveredDay.gfgSolved || 0), icon: <IconCode size={14} className="text-blue-400" /> },
                    { label: "Articles", val: hoveredDay.articlesPublished, icon: <IconLeaf size={14} className="text-emerald-400" /> },
                    { label: "Dev Logs", val: hoveredDay.devLogs, icon: <IconTerminal size={14} className="text-slate-400" /> },
                  ]
                    .filter(item => item.val > 0)
                    .map((item, i) => (
                      <li key={i} className="flex items-center justify-between group/item">
                        <div className="flex items-center gap-2">
                          {item.icon}
                          <span className="text-[11px] font-jetbrains text-slate-400 uppercase tracking-tight">{item.label}</span>
                        </div>
                        <span className="text-xs font-jetbrains font-bold text-slate-200">+{item.val}</span>
                      </li>
                    ))}
                  
                  {hoveredDay.totalActivity === 0 && (
                    <li className="text-[10px] font-jetbrains text-slate-600 italic">No system activity detected.</li>
                  )}
                </ul>
                
                {/* Blueprint Accent */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-emerald-500/40" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Metadata Footer */}
      <div className="mt-8 flex items-center justify-between text-[9px] font-jetbrains text-slate-700 uppercase tracking-[0.3em]">
        <span>Source: Multi_API_Aggregator</span>
        <span className="hidden md:block">Update_Cycle: 24H_DELAYED</span>
        
      </div>
    </section>
  );
}