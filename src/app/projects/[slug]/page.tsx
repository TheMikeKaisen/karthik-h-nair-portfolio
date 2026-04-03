import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code2, ExternalLink, Activity } from 'lucide-react';
import { sanityFetch } from '@/sanity/lib/client';
import { projectBySlugQuery, nextProjectQuery, allProjectSlugsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { PortableTextRenderer } from '@/components/PortableTextRenderer';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({ query: allProjectSlugsQuery, revalidate: 3600 });
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await sanityFetch<any>({ query: projectBySlugQuery, params: { slug } });
  
  if (!project) return { title: 'Project Not Found' }
  
  return {
    title: `${project.title} | Case Study`,
    description: project.description || "A technical deep dive into system architecture and execution.",
    openGraph: project.mainImage ? { images: [urlFor(project.mainImage).url()] } : undefined
  }
}

// Architectural sub-component for Status Dots
const StatusDot = ({ status }: { status: string }) => {
  const colors = {
    'completed': 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
    'progress': 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]',
    'draft': 'bg-slate-500'
  }
  const cls = colors[status as keyof typeof colors] || colors.draft;
  return <div className={`w-2 h-2 rounded-full ${cls}`} />
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = await sanityFetch<any>({ 
    query: projectBySlugQuery, 
    params: { slug },
    tags: ["projects"]
  });
  
  if (!project) notFound();

  // Conditionally fetch next project based on current project's chronological publish date
  const nextProject = await sanityFetch<any>({ 
    query: nextProjectQuery, 
    params: { currentPublishedAt: project.publishedAt },
    tags: ["projects"]
  });

  return (
    <div className="min-h-screen bg-[#060606] relative pt-28 pb-10">
      {/* Absolute Blueprint CSS Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-jetbrains text-emerald-500/80 hover:text-emerald-400 transition-colors uppercase tracking-widest mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Root_Dashboard
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Main Content Area */}
          <main className="lg:col-span-8">
            <header className="mb-12">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-[#f8fafc] mb-6 leading-tight">
                {project.title}
              </h1>
              <p className="text-xl text-slate-400 font-light leading-relaxed max-w-3xl border-l-2 border-emerald-500/50 pl-6">
                {project.description}
              </p>
            </header>

            {project.mainImage && (
              <div className="relative w-full aspect-[16/9] mb-16 rounded-lg overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                <div className="absolute top-0 left-0 w-full h-8 bg-white/5 border-b border-white/5 backdrop-blur-sm flex items-center px-4 z-20 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700/50" />
                </div>
                <Image 
                  src={urlFor(project.mainImage).url()} 
                  alt={project.title}
                  fill 
                  className="object-cover mt-8"
                  priority
                />
              </div>
            )}

            <article className="prose prose-invert prose-lg max-w-none prose-img:rounded-lg">
              <PortableTextRenderer content={project.body} />
            </article>
          </main>

          {/* Blueprint Technical Sidebar */}
          <aside className="lg:col-span-4 self-start sticky top-32">
            <div className="p-6 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md shadow-xl font-jetbrains">
              <h3 className="text-xs uppercase tracking-[0.3em] font-semibold text-slate-500 mb-8 border-b border-white/10 pb-4">
                Architecture Specs
              </h3>

              <div className="flex flex-col gap-6">
                
                {/* Status Component */}
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-2">SYS_STATUS</span>
                  <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-md border border-white/5 w-max">
                    <StatusDot status={project.status} />
                    <span className="text-xs text-slate-300 uppercase tracking-wider">{project.status}</span>
                  </div>
                </div>

                {/* Tags Interface */}
                {project.tags?.length > 0 && (
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-3">DEPLOYED_STACK</span>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag: string) => (
                        <span key={tag} className="text-[10px] px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hyperlinks Interface */}
                <div className="pt-4 border-t border-white/10 mt-2 flex flex-col gap-3">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group">
                      <span className="flex items-center gap-2 text-xs text-emerald-400 uppercase tracking-widest font-semibold"><Activity className="w-3.5 h-3.5" /> Initialize Prod</span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-400/50 group-hover:text-emerald-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                    </a>
                  )}
                  
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group">
                      <span className="flex items-center gap-2 text-xs text-slate-300 uppercase tracking-widest font-semibold"><Code2 className="w-3.5 h-3.5" /> Source Code</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                    </a>
                  )}
                </div>

              </div>
            </div>
          </aside>

        </div>

        {/* Dynamic Nav Footer */}
        <div className="mt-32 pt-16 border-t border-white/10 border-dashed">
          {nextProject ? (
            <Link href={`/projects/${nextProject.slug.current}`} className="group block text-center lg:text-left">
              <span className="font-jetbrains text-xs text-emerald-500/70 tracking-[0.3em] uppercase mb-4 block group-hover:text-emerald-400 transition-colors">
                Run Sequence : Next Project
              </span>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-300 group-hover:text-white tracking-tighter transition-colors">
                  {nextProject.title}
                </h2>
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-300">
                  <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-black transition-colors" />
                </div>
              </div>
            </Link>
          ) : (
            <Link href="/" className="group flex flex-col items-center justify-center w-full py-10">
               <span className="font-jetbrains text-xs text-slate-500 tracking-[0.3em] uppercase mb-4 block group-hover:text-emerald-400 transition-colors">
                End of Sequence
              </span>
              <div className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-sm font-jetbrains text-slate-300 group-hover:bg-white/10 transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Return to Terminal
              </div>
            </Link>
          )}
        </div>

      </div>
    </div>
  )
}
