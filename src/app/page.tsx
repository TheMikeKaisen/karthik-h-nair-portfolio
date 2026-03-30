import { sanityFetch } from "@/sanity/lib/client";
import { featuredProjectsQuery } from "@/sanity/lib/queries";
import { Project } from "@/types";

export default async function HomePage() {
  const projects = await sanityFetch<Project[]>({ query: featuredProjectsQuery });
  console.log(projects)

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8">
      {/* HERO SECTION */}
      <section className="py-20 text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Karthik Haji Nair
        </h1>
        <p className="mt-4 text-xl text-gray-400">
          Backend Engineer & System Designer
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <span className="px-3 py-1 rounded-full border border-gray-700 bg-gray-800/50 text-sm">Next.js 16</span>
          <span className="px-3 py-1 rounded-full border border-gray-700 bg-gray-800/50 text-sm">Node.js</span>
          <span className="px-3 py-1 rounded-full border border-gray-700 bg-gray-800/50 text-sm">System Design</span>
        </div>
      </section>

      {/* MAJOR PROJECTS SECTION */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Featured Builds</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="p-6 rounded-2xl border border-gray-800 bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-gray-400 mt-2">{project.description}</p>
              <div className="mt-4 flex gap-2">
                {project.tags?.map(tag => (
                  <span key={tag} className="text-xs text-blue-400">#{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}