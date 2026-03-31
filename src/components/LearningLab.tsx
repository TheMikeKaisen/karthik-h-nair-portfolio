// import { sanityFetch } from "@/sanity/lib/client";
// import { topSkillsQuery, recentActivitiesQuery } from "@/sanity/lib/queries";
// import { Activity } from "@/types";
// import { ArrowUpRight, BookOpen, Star, GitMerge } from "lucide-react";

// export async function LearningLab() {
//   // Parallel fetching structure
//   const [pinned, recent] = await Promise.all([
//     sanityFetch<Activity[]>({ query: topSkillsQuery }),
//     sanityFetch<Activity[]>({ query: recentActivitiesQuery })
//   ]);

//   return (
//     <section className="py-24 container mx-auto px-4 border-t border-white/5 bg-[#0a0a0a] z-10 relative">
//       <div className="mb-12">
//         <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3 text-[#f8fafc]">
//           <BookOpen className="w-7 h-7 text-blue-400" />
//           The Learning Lab
//         </h2>
//         <p className="text-slate-400">Deep dives, system design challenges, and architectural patterns.</p>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-12">
//         {/* Pinned Activities Column */}
//         <div className="lg:col-span-2">
//           <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-slate-300">
//             <Star className="w-5 h-5 text-emerald-400" /> Pinned Core Skills
//           </h3>
//           <div className="grid md:grid-cols-2 gap-5">
//             {pinned.map(activity => (
//               <a 
//                 key={activity._id} 
//                 href={activity.repoUrl || "#"} 
//                 className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex flex-col h-full shadow-lg"
//                 target="_blank" rel="noreferrer"
//               >
//                 <div className="flex items-start justify-between mb-5">
//                   <span className="text-[10px] uppercase font-jetbrains tracking-widest px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20 shadow-inner">
//                     {activity.categoryName || "Architecture"}
//                   </span>
//                   <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
//                 </div>
//                 <h4 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors text-slate-200">{activity.title}</h4>
//                 <div className="mt-auto pt-6 flex items-center justify-between opacity-90 text-sm border-t border-white/5">
//                   <span className="text-slate-500 font-medium">Difficulty:</span>
//                   <span className={`font-semibold ${
//                     activity.difficulty === "Advanced" ? "text-purple-400" : 
//                     activity.difficulty === "Intermediate" ? "text-yellow-400" : "text-emerald-400"
//                   }`}>
//                     {activity.difficulty}
//                   </span>
//                 </div>
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* Recent Activities Column */}
//         <div className="lg:col-span-1">
//           <h3 className="text-lg font-semibold mb-6 text-slate-300 border-b border-white/10 pb-4 flex items-center gap-2">
//             <GitMerge className="w-5 h-5 text-slate-500" /> Recent Log
//           </h3>
//           <div className="flex flex-col gap-3">
//             {recent.map(activity => (
//               <a 
//                 key={activity._id} 
//                 href={activity.repoUrl || "#"}
//                 target="_blank" rel="noreferrer"
//                 className="group flex flex-col p-4 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all"
//               >
//                 <span className="text-[11px] uppercase font-jetbrains text-emerald-400 mb-1.5 opacity-80">{activity.categoryName}</span>
//                 <span className="font-medium text-slate-300 group-hover:text-blue-400 transition-colors">{activity.title}</span>
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
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
    <section className="py-32 container mx-auto px-4 relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
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