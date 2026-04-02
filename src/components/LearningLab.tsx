
import { sanityFetch } from "@/sanity/lib/client";
import { topSkillsQuery, recentActivitiesQuery } from "@/sanity/lib/queries";
import { Activity } from "@/types";
import { BookOpen, GitBranch, Binary } from "lucide-react";
import LabCard from "./LabCard";

export async function LearningLab() {
  const [pinned, recent] = await Promise.all([
    sanityFetch<Activity[]>({ query: topSkillsQuery }),
    sanityFetch<Activity[]>({ query: recentActivitiesQuery })
  ]);

  return (
    <section className="py-20 md:py-28 container mx-auto px-4 relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-jetbrains text-xs tracking-[0.3em] uppercase">
            <Binary className="w-4 h-4" /> Lab_Environment_v2
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#f8fafc] flex items-center gap-4">
            The Learning Lab
          </h2>
          <p className="text-slate-400 max-w-xl font-light">
            An active research environment documenting my deep dives into low-level systems, 
            backend architecture, and experimental engineering patterns.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-12">
        {/* Main Pinned Cards (3 in a row on large screens) */}
        <div className="lg:col-span-3">
          <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <h3 className="text-xs font-jetbrains uppercase tracking-[0.2em] text-slate-400 font-bold">
              Core_Knowledge_Modules
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinned.map((activity) => (
              <LabCard key={activity._id} activity={activity} />
            ))}
          </div>
        </div>

        {/* Sidebar: Recent Activity Log */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
            <GitBranch className="w-4 h-4 text-blue-500" />
            <h3 className="text-xs font-jetbrains uppercase tracking-[0.2em] text-slate-400 font-bold">
              Recent_Commits
            </h3>
          </div>

          <div className="space-y-4">
            {recent.map((activity) => (
              <a 
                key={activity._id} 
                href={activity.repoUrl || "#"}
                target="_blank" 
                rel="noreferrer"
                className="group block p-4 bg-white/[0.02] border border-white/5 rounded-md hover:bg-white/[0.04] hover:border-blue-500/30 transition-all"
              >
                <div className="flex justify-between items-center mb-1">
                   <span className="text-[9px] font-jetbrains text-blue-400 uppercase tracking-widest">{activity.categoryName}</span>
                   <div className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-blue-400 transition-colors" />
                </div>
                <h4 className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                  {activity.title}
                </h4>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}