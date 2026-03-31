// "use client";

// import { useRef, useState } from "react";
// import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
// import Image from "next/image";
// import { urlFor } from "@/sanity/lib/image";
// import { ArrowUpRight, Cpu, Terminal } from "lucide-react";
// import Link from "next/link";
// import { Project } from "@/types";

// export default function ProjectCard({ project, index }: { project: Project; index: number }) {
//   const cardRef = useRef<HTMLDivElement>(null);
  
//   // Mouse tracking for 3D effect
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);

//   const mouseXSpring = useSpring(x);
//   const mouseYSpring = useSpring(y);

//   const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
//   const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!cardRef.current) return;
//     const rect = cardRef.current.getBoundingClientRect();
//     const width = rect.width;
//     const height = rect.height;
//     const mouseX = e.clientX - rect.left;
//     const mouseY = e.clientY - rect.top;
//     const xPct = mouseX / width - 0.5;
//     const yPct = mouseY / height - 0.5;
//     x.set(xPct);
//     y.set(yPct);
//   };

//   const handleMouseLeave = () => {
//     x.set(0);
//     y.set(0);
//   };

//   return (
//     <motion.div
//       ref={cardRef}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
//       className="relative group h-[450px] w-full"
//     >
//       <Link href={`/projects/${project.slug.current}`} className="block h-full">
//         <div className="relative h-full w-full rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm p-6 transition-colors group-hover:border-emerald-500/50 group-hover:bg-white/[0.04] overflow-hidden">
          
//           {/* Blueprint Grid Overlay */}
//           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none" />

//           {/* Card Header (Terminal Style) */}
//           <div className="flex items-center justify-between mb-6 relative z-10">
//             <div className="flex items-center gap-2">
//               <Terminal className="w-4 h-4 text-emerald-500" />
//               <span className="text-[10px] font-jetbrains text-slate-500 uppercase tracking-widest">
//                 Mod_0{index + 1} // {project.status || "Stable"}
//               </span>
//             </div>
//             <div className="h-px flex-1 bg-white/10 mx-4" />
//             <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
//           </div>

//           {/* Main Title */}
//           <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
//             {project.title}
//           </h3>
          
//           {/* Tags as "Modules" */}
//           <div className="flex flex-wrap gap-2 mb-6">
//             {project.tags?.slice(0, 3).map((tag) => (
//               <span key={tag} className="text-[9px] font-jetbrains uppercase px-2 py-0.5 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
//                 {tag}
//               </span>
//             ))}
//           </div>

//           {/* Image Container with "Scanner" effect */}
//           <div className="relative aspect-video rounded-lg overflow-hidden border border-white/5 mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
//             {project.mainImage ? (
//               <Image 
//                 src={urlFor(project.mainImage).url()} 
//                 alt={project.title} 
//                 fill 
//                 className="object-cover"
//               />
//             ) : (
//               <div className="w-full h-full bg-neutral-900 flex items-center justify-center font-jetbrains text-[10px] text-slate-600">
//                 INIT_RENDER_FAILED
//               </div>
//             )}
//             {/* Glossy Overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60" />
//           </div>

//           {/* Blueprint Corner Brackets */}
//           <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/20" />
//           <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/20" />
//           <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-white/20" />
//           <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/20" />

//           {/* Description */}
//           <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 font-light">
//             {project.description}
//           </p>
//         </div>
//       </Link>
//     </motion.div>
//   );
// }

"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ArrowUpRight, Terminal, Activity } from "lucide-react";
import Link from "next/link";
import { Project } from "@/types";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group h-[520px] w-full perspective-1000"
    >
      <Link href={`/projects/${project.slug.current}`} className="block h-full">
        <div className="relative h-full w-full rounded-2xl bg-[#0d0d0d] border border-white/5 backdrop-blur-xl p-6 transition-all duration-500 group-hover:border-emerald-500/40 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] overflow-hidden flex flex-col">
          
          {/* Blueprint Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none" />

          {/* Header Area */}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-jetbrains text-emerald-500/70 uppercase tracking-[0.2em]">
                Live_Node_{index + 1}
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>

          {/* Project Title & Status */}
          <div className="mb-4 relative z-10">
            <h3 className="text-2xl font-bold text-slate-100 mb-1 group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-3">
               <span className="text-[9px] font-jetbrains text-slate-500 uppercase tracking-widest px-2 py-0.5 border border-white/5 rounded bg-white/[0.02]">
                Status: {project.status || "Operational"}
              </span>
            </div>
          </div>

          {/* Image Container */}
          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 mb-6 group-hover:border-emerald-500/20 transition-colors shadow-2xl">
            {project.mainImage ? (
              <Image 
                src={urlFor(project.mainImage).url()} 
                alt={project.title} 
                fill 
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
            ) : (
              <div className="w-full h-full bg-neutral-900 flex items-center justify-center font-jetbrains text-[10px] text-slate-600">
                NULL_PTR_EXCEPTION
              </div>
            )}
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-20" />
          </div>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-2 mb-6 relative z-10">
            {project.tags?.slice(0, 4).map((tag) => (
              <span key={tag} className="text-[10px] font-jetbrains text-slate-400 bg-white/5 border border-white/10 px-2 py-1 rounded-md hover:border-emerald-500/30 transition-colors">
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom Summary Section */}
          <div className="mt-auto pt-5 border-t border-white/5 relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-3 h-3 text-emerald-500/50" />
              <span className="text-[9px] font-jetbrains text-emerald-500/50 uppercase tracking-[0.2em] font-bold">
                Technical_Summary
              </span>
            </div>
            <p className="text-slate-400 text-[16px] leading-relaxed line-clamp-3 font-light group-hover:text-slate-300 transition-colors">
              {project.description}
            </p>
          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-[80px] group-hover:bg-emerald-500/10 transition-colors" />
          <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-2 border-l-2 border-emerald-500/0 group-hover:border-emerald-500/20 transition-all duration-500 rounded-bl-xl" />
        </div>
      </Link>
    </motion.div>
  );
}