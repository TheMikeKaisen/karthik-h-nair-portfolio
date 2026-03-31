import { sanityFetch } from "@/sanity/lib/client";
import { topSkillsQuery, recentActivitiesQuery } from "@/sanity/lib/queries";
import { Activity } from "@/types";
import { ArrowUpRight, BookOpen, Star, GitMerge } from "lucide-react";

export async function LearningLab() {
  // Parallel fetching structure
  const [pinned, recent] = await Promise.all([
    sanityFetch<Activity[]>({ query: topSkillsQuery }),
    sanityFetch<Activity[]>({ query: recentActivitiesQuery })
  ]);

  return (
    <section className="py-24 container mx-auto px-4 border-t border-white/5 bg-[#0a0a0a] z-10 relative">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3 text-[#f8fafc]">
          <BookOpen className="w-7 h-7 text-blue-400" />
          The Learning Lab
        </h2>
        <p className="text-slate-400">Deep dives, system design challenges, and architectural patterns.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Pinned Activities Column */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-slate-300">
            <Star className="w-5 h-5 text-emerald-400" /> Pinned Core Skills
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            {pinned.map(activity => (
              <a 
                key={activity._id} 
                href={activity.repoUrl || "#"} 
                className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex flex-col h-full shadow-lg"
                target="_blank" rel="noreferrer"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="text-[10px] uppercase font-jetbrains tracking-widest px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20 shadow-inner">
                    {activity.categoryName || "Architecture"}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors text-slate-200">{activity.title}</h4>
                <div className="mt-auto pt-6 flex items-center justify-between opacity-90 text-sm border-t border-white/5">
                  <span className="text-slate-500 font-medium">Difficulty:</span>
                  <span className={`font-semibold ${
                    activity.difficulty === "Advanced" ? "text-purple-400" : 
                    activity.difficulty === "Intermediate" ? "text-yellow-400" : "text-emerald-400"
                  }`}>
                    {activity.difficulty}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Recent Activities Column */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-6 text-slate-300 border-b border-white/10 pb-4 flex items-center gap-2">
            <GitMerge className="w-5 h-5 text-slate-500" /> Recent Log
          </h3>
          <div className="flex flex-col gap-3">
            {recent.map(activity => (
              <a 
                key={activity._id} 
                href={activity.repoUrl || "#"}
                target="_blank" rel="noreferrer"
                className="group flex flex-col p-4 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all"
              >
                <span className="text-[11px] uppercase font-jetbrains text-emerald-400 mb-1.5 opacity-80">{activity.categoryName}</span>
                <span className="font-medium text-slate-300 group-hover:text-blue-400 transition-colors">{activity.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
