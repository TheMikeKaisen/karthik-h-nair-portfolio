import { sanityFetch } from "@/sanity/lib/client";
import { experienceQuery, educationQuery } from "@/sanity/lib/queries";
import { Experience, Education } from "@/types";
import { GitCommit, Briefcase, GraduationCap, Database, MapPin, Activity } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";

export async function ProfessionalCore() {
  const [experience, education] = await Promise.all([
    sanityFetch<Experience[]>({ query: experienceQuery }),
    sanityFetch<Education[]>({ query: educationQuery }),
  ]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <section className="py-24 container mx-auto px-4 border-t border-white/5 bg-[#0a0a0a] z-10 relative">
      {/* Section Title */}
      <div className="mb-20">
        <div className="flex items-center gap-2 text-emerald-500 font-jetbrains text-xs tracking-[0.3em] uppercase mb-4">
          <Database className="w-4 h-4" /> Making_of_an_Engineer
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#f8fafc]">
          Professional <span className="text-emerald-500">Core</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-x-20 items-start">
        
        {/* LEFT COLUMN: EXPERIENCE (Execution Trace) - Spans 5/12 */}
        <div className="lg:col-span-5 space-y-12">
          <h3 className="text-sm font-jetbrains uppercase tracking-[0.3em] text-emerald-500 font-bold mb-10 flex items-center gap-3 px-2 border-l-2 border-emerald-500">
            <GitCommit className="w-4 h-4" /> 01. Professional_Trace
          </h3>
          
          <div className="relative pl-6 border-l border-white/10 space-y-14">
            {experience.map((exp, idx) => (
              <div key={exp._id} className="relative group">
                {/* Timeline Node */}
                <div className="absolute -left-[33px] flex items-center justify-center p-1 bg-[#0a0a0a]">
                  {exp.isCurrent ? (
                    <div className="relative flex h-4 w-4 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-slate-800 border border-white/10" />
                  )}
                </div>

                {/* Technical Header Bar (Experience) */}
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                  <span className="text-[11px] font-jetbrains text-emerald-500/80 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10 uppercase tracking-widest">
                    {formatDate(exp.startDate)} — {exp.isCurrent ? "Active" : formatDate(exp.endDate)}
                  </span>
                  <span className="text-[9px] font-jetbrains text-slate-600 uppercase tracking-tighter">
                    // NODE_ID: 0{idx + 1}
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-2xl font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                    {exp.role}
                  </h4>
                  <div className="flex items-center gap-2 text-slate-400 font-medium text-md">
                    <Briefcase className="w-4 h-4 text-emerald-500/50" /> {exp.companyName} 
                    {exp.location && <span className="text-slate-600 font-normal"> @ {exp.location}</span>}
                  </div>

                  <div className="flex flex-wrap gap-1.5 py-1">
                    {exp.technologies?.map(tech => (
                      <span key={tech} className="text-[11px] font-jetbrains bg-white/[0.03] border border-white/5 text-slate-500 px-2 py-0.5 rounded uppercase">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="prose prose-sm prose-invert max-w-none text-slate-400 font-light leading-relaxed">
                    <PortableTextRenderer content={exp.description} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: EDUCATION (Academic Foundations) - Spans 7/12 */}
        <div className="lg:col-span-7 space-y-12">
          <h3 className="text-xs font-jetbrains uppercase tracking-[0.3em] text-blue-500 font-bold mb-10 flex items-center gap-3 px-2 border-l-2 border-blue-500">
            <GraduationCap className="w-4 h-4" /> 02. Academic_Foundations
          </h3>

          <div className="space-y-12">
            {education.map((edu, idx) => (
              <div key={edu._id} className="relative group">
                {/* Technical Header Bar (Education) */}
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-jetbrains text-blue-400 bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10 uppercase tracking-widest font-bold">
                      Class of {edu.endDate ? new Date(edu.endDate).getFullYear() : "2026"}
                    </span>
                    <span className="text-[9px] font-jetbrains text-slate-600 uppercase tracking-tighter">
                      // REF_ID: 0{idx + 1}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-slate-600" />
                    <span className="text-[11px] font-jetbrains text-slate-500 uppercase tracking-widest">
                      {edu.location || "India"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  {/* Institution Info */}
                  <div className="md:col-span-5 space-y-4">
                    <div className="flex items-center gap-4">
                      {edu.institutionLogo && (
                        <div className="relative w-12 h-12 bg-white/5 rounded-md border border-white/10 overflow-hidden shrink-0">
                          <Image src={urlFor(edu.institutionLogo).url()} alt={edu.institution} fill className="object-cover  transition-all" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors leading-tight">
                          {edu.institution}
                        </h4>
                        <p className="text-[11px] font-jetbrains text-blue-500/70 uppercase tracking-wider mt-1">
                          {edu.fieldOfStudy}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-3 rounded-sm">
                      <p className="text-[10px] font-jetbrains text-slate-500 uppercase mb-1">Credential</p>
                      <p className="text-sm text-slate-300 font-medium">{edu.degree}</p>
                    </div>
                  </div>

                  {/* Coursework & Metrics */}
                  <div className="md:col-span-7 space-y-6">
                    {edu.gpa && (
                      <div className="flex items-center justify-between px-4 py-2 bg-blue-500/5 border border-blue-500/10 rounded-sm">
                        <div className="flex items-center gap-2">
                          <Activity className="w-3 h-3 text-blue-400" />
                          <span className="text-[11px] font-jetbrains text-slate-400 uppercase">Performance</span>
                        </div>
                        <span className="text-md font-jetbrains font-bold text-blue-400">{edu.gpa}</span>
                      </div>
                    )}

                    <div className="space-y-3">
                      <span className="text-[11px] font-jetbrains text-slate-600 uppercase tracking-widest block">Core_Modules</span>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {edu.courses?.map((course) => (
                          <div key={course} className="flex items-center gap-2 group/course">
                            <div className="w-1 h-1 bg-blue-500/40 rounded-full group-hover/course:bg-blue-400" />
                            <span className="text-[11px] font-jetbrains text-slate-500 group-hover/course:text-slate-300 transition-colors uppercase">
                              {course}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Aesthetic Blueprint Bracket */}
                <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b border-r border-white/5 pointer-events-none group-hover:border-blue-500/20 transition-colors" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}