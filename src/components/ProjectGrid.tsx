import { sanityFetch } from "@/sanity/lib/client";
import { featuredProjectsQuery } from "@/sanity/lib/queries";
import { Project } from "@/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export async function ProjectGrid() {
  const projects = await sanityFetch<Project[]>({ query: featuredProjectsQuery });
  const topProjects = projects.slice(0, 4);

  return (
    <section className="py-24 container mx-auto px-4 z-10 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-[#f8fafc]">Featured Builds</h2>
          <p className="text-slate-400">High-performance systems and production architectures.</p>
        </div>
        <Link href="/projects" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 mt-4 md:mt-0 font-jetbrains">
          [{`view_all_projects`}] <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topProjects.map((project) => (
          <Link key={project._id} href={`/projects/${project.slug.current}`} className="group block h-full">
            <div className="glass p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-all hover:bg-white-[0.02] flex flex-col h-full bg-black/20 backdrop-blur-md">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl mb-6 bg-white/5 border border-white/5">
                {project.mainImage ? (
                  <Image 
                    src={urlFor(project.mainImage).url()} 
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600 font-jetbrains text-sm">NO_IMAGE_DATA</div>
                )}
              </div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold tracking-tight group-hover:text-emerald-400 transition-colors text-slate-200">{project.title}</h3>
                {project.status && (
                  <span className="text-[10px] uppercase tracking-wider font-jetbrains px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-300 shadow-inner">
                    {project.status}
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-sm line-clamp-2 mb-6 leading-relaxed flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags?.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs font-medium text-slate-400 bg-black/40 px-2.5 py-1 rounded shadow-inner border border-white/5">
                    {tag}
                  </span>
                ))}
                {project.tags && project.tags.length > 3 && (
                  <span className="text-xs font-medium text-slate-500 bg-black/20 px-2.5 py-1 rounded shadow-inner border border-white/5">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
