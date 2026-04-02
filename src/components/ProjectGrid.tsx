
import { sanityFetch } from "@/sanity/lib/client";
import { featuredProjectsQuery } from "@/sanity/lib/queries";
import { Project } from "@/types";
import Link from "next/link";
import { ArrowUpRight, Cpu } from "lucide-react";
import ProjectCard from "./ProjectCard"; // Import our new Client Component

export async function ProjectGrid() {
  const projects = await sanityFetch<Project[]>({ query: featuredProjectsQuery });
  const topProjects = projects.slice(0, 4);

  return (
    <section className="py-32 container mx-auto px-4 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -z-10 opacity-20">
        <div className="text-[15rem] font-bold text-white/5 select-none tracking-tighter">PROJECTS</div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-500 font-jetbrains text-xs tracking-[0.3em] uppercase">
            <Cpu className="w-4 h-4" /> System_Deployments
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#f8fafc]">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Builds</span>
          </h2>
          <p className="text-slate-400 max-w-md font-light">
            Production-grade architectures and specialized backend systems validated for high-availability.
          </p>
        </div>
        
        {/* <Link 
          href="/projects" 
          className="group flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-emerald-500 hover:text-black transition-all duration-300 font-jetbrains text-xs uppercase tracking-widest"
        >
          View_All_Modules <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link> */}
      </div>

      {/* The Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {topProjects.map((project, index) => (
          <ProjectCard key={project._id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}