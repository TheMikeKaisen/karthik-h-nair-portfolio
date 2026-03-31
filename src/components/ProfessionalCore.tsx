import { sanityFetch } from "@/sanity/lib/client";
import { experienceQuery, educationQuery, skillsQuery } from "@/sanity/lib/queries";
import { Experience, Education, Skill } from "@/types";
import { GitCommit, Briefcase, GraduationCap, Database, Code2, Server } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";

export async function ProfessionalCore() {
  const [experience, education, skills] = await Promise.all([
    sanityFetch<Experience[]>({ query: experienceQuery }),
    sanityFetch<Education[]>({ query: educationQuery }),
    sanityFetch<Skill[]>({ query: skillsQuery }),
  ]);

  // Group Skills natively by category for the Bento display
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.categoryName || "Core";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <section className="py-24 container mx-auto px-4 border-t border-white/5 bg-[#0a0a0a] z-10 relative">
      <div className="mb-16 md:mb-24 flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 flex items-center justify-center md:justify-start gap-4 text-[#f8fafc]">
          <Database className="w-8 h-8 text-emerald-400" />
          Professional Core
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl font-light">
          A trace of my deployment history, academic foundations, and the active technological integrations powering my architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

        {/* Left Column: The Deployment Timeline */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-200 uppercase tracking-widest font-jetbrains text-sm">
              <GitCommit className="w-5 h-5 text-slate-400" /> Execution Trace
            </h3>

            <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-12">
              {experience.map((exp, index) => {
                const isCurrentRole = exp.isCurrent;
                const isLast = index === experience.length - 1;

                return (
                  <div key={exp._id} className="relative group">
                    {/* The Timeline Node */}
                    <div className="absolute -left-[31px] sm:-left-[39px] flex items-center justify-center p-1 bg-[#0a0a0a]">
                      {isCurrentRole ? (
                        <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                        </div>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-600 group-hover:bg-slate-400 transition-colors border border-black" />
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      {/* Meta Node */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-jetbrains font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded shadow-inner border border-emerald-500/20">
                          {formatDate(exp.startDate)} — {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                        </span>
                        {exp.location && (
                          <span className="text-[10px] font-jetbrains uppercase tracking-widest text-slate-500">
                            // {exp.location}
                          </span>
                        )}
                      </div>

                      {/* Header */}
                      <h4 className="text-2xl font-bold tracking-tight text-slate-200 group-hover:text-emerald-400 transition-colors">
                        {exp.role}
                      </h4>
                      <span className="text-emerald-500/70 font-semibold mb-3 tracking-wide flex items-center gap-2">
                        <Briefcase className="w-4 h-4" /> {exp.companyName}
                      </span>

                      {/* Technical payload mapping */}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                          {exp.technologies.map(tech => (
                            <span key={tech} className="text-[10px] uppercase font-jetbrains bg-white/5 border border-white/10 text-slate-300 px-2.5 py-1 rounded-sm shadow-inner group-hover:border-white/20 transition-colors">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {exp.description && (
                        <div className="prose prose-sm prose-invert max-w-none text-slate-400 leading-relaxed mt-2 prose-p:mb-2 prose-li:my-1">
                          <PortableTextRenderer content={exp.description} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: The Bento Grid */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* Education Box (Top spans full width of right col) */}
          <div className="glass p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors bg-gradient-to-br from-white/[0.03] to-transparent shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700 pointer-events-none">
              <GraduationCap className="w-48 h-48" />
            </div>

            <h3 className="text-[11px] font-jetbrains uppercase tracking-[0.3em] font-bold text-blue-400 mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" /> Academic Core
            </h3>

            <div className="flex flex-col gap-8 relative z-10">
              {education.map(edu => (
                <div key={edu._id} className="flex flex-col group/edu">
                  <div className="flex items-start justify-between mb-2 gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      {edu.institutionLogo && (
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-white/5 rounded-full border border-white/10 overflow-hidden shadow-inner flex items-center justify-center">
                          <Image src={urlFor(edu.institutionLogo).url()} alt={edu.institution} fill className="object-cover" />
                        </div>
                      )}
                      <h4 className="text-xl sm:text-2xl font-bold text-slate-200 tracking-tight leading-tight">{edu.institution}</h4>
                    </div>
                    {edu.gpa && (
                      <span className="text-xs font-jetbrains bg-blue-500/10 text-blue-400 px-2 py-1.5 rounded shadow-inner border border-blue-500/20 font-bold tracking-widest mt-1 shrink-0 whitespace-nowrap">
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </div>
                  <span className="text-slate-400 font-medium tracking-wide flex items-center gap-2 sm:text-lg mb-1">
                    {edu.degree} in {edu.fieldOfStudy}
                  </span>
                  <span className="text-xs font-jetbrains text-slate-500 uppercase tracking-widest mb-4">
                    {formatDate(edu.startDate)} — {!edu.endDate ? "Present" : formatDate(edu.endDate)}  {edu.location ? `// ${edu.location}` : ''}
                  </span>

                  {edu.courses && edu.courses.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {edu.courses.map(course => (
                        <span key={course} className="text-xs bg-black/40 border border-white/5 text-slate-300 px-3 py-1.5 rounded-md shadow-inner">
                          {course}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skills Grid (Dynamic Columns per Category) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(groupedSkills).map(([category, catSkills]) => (
              <div
                key={category}
                className="glass p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all bg-white/[0.015] hover:bg-white/[0.02] shadow-xl flex flex-col group relative overflow-hidden"
              >
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700 pointer-events-none">
                  {category.toLowerCase().includes('backend') ? <Server className="w-32 h-32" /> : <Code2 className="w-32 h-32" />}
                </div>

                <h3 className="text-xs font-jetbrains uppercase tracking-widest font-bold text-emerald-400 mb-6 flex items-center gap-2 border-b border-white/10 pb-4 relative z-10">
                  <span className="w-2 h-2 rounded-sm bg-emerald-500/50" />
                  {category} Stack
                </h3>

                <div className="flex flex-wrap gap-2 relative z-10">
                  {catSkills.map(skill => (
                    <span
                      key={skill._id}
                      className={`text-sm tracking-wide px-3 py-1.5 rounded-lg border shadow-inner transition-all ${skill.isPrimary
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300 font-medium hover:bg-emerald-500/20'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                    >
                      {skill.title}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
