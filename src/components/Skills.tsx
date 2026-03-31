import { sanityFetch } from "@/sanity/lib/client";
import { skillsQuery } from "@/sanity/lib/queries";
import { Skill } from "@/types";
import { Code2 } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export async function SkillsMatrix() {
  const skills = await sanityFetch<Skill[]>({ query: skillsQuery });

  return (
    <section className="py-24 container mx-auto px-4 bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative Blueprint Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 text-emerald-500 font-jetbrains text-[10px] tracking-[0.4em] uppercase mb-4 px-3 py-1 border border-emerald-500/20 rounded-full bg-emerald-500/5">
          <Code2 className="w-3 h-3" /> Technical_Inventory
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-white">The <span className="italic font-serif text-emerald-500">Stack</span></h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {skills.map((skill) => (
          <div 
            key={skill._id} 
            className={`group relative p-6 rounded-md border transition-all duration-300 flex flex-col items-center justify-center gap-4 bg-white/[0.01] ${
              skill.isPrimary 
              ? 'border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
              : 'border-white/5 hover:border-white/10'
            }`}
          >
            {/* The Badge Icon */}
            {skill.icon && (
              <div className="relative w-10 h-10 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                <Image 
                  src={urlFor(skill.icon).url()} 
                  alt={skill.title} 
                  fill 
                  className="object-contain"
                />
              </div>
            )}
            
            <span className={`text-[11px] font-jetbrains uppercase tracking-widest transition-colors ${
              skill.isPrimary ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'
            }`}>
              {skill.title}
            </span>

            {/* Corner Accent for Primary Skills */}
            {skill.isPrimary && (
              <div className="absolute top-1 right-1">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,1)]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}