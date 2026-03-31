import { sanityFetch } from "@/sanity/lib/client";
import { featuredArticlesQuery } from "@/sanity/lib/queries";
import { Article } from "@/types";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

export async function GardenTeaser() {
  const articles = await sanityFetch<Article[]>({ query: featuredArticlesQuery });

  return (
    <section className="py-24 container mx-auto px-4 border-t border-white/5 z-10 relative bg-[#0a0a0a]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3 text-[#f8fafc]">
            <Leaf className="w-7 h-7 text-emerald-400" />
            The Digital Garden
          </h2>
          <p className="text-slate-400">Thoughts, devlogs, and engineering insights.</p>
        </div>
        <Link href="/garden" className="text-sm font-jetbrains text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 mt-6 md:mt-0">
          [{`enter_the_garden`}] <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article._id} href={`/garden/${article.slug.current}`} className="group block h-full">
            <div className="p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all hover:bg-white/[0.03] flex flex-col h-full bg-white/5 shadow-lg">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] font-jetbrains text-slate-500 uppercase tracking-widest pl-1 border-l-2 border-slate-700">
                  {new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded shadow-inner uppercase font-jetbrains tracking-wider flex items-center border border-blue-500/20">
                  {article.categoryName || "Log"}
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-3 group-hover:text-emerald-400 transition-colors leading-[1.3] text-slate-200">
                {article.title}
              </h3>
              <p className="text-slate-400 text-sm line-clamp-3 mb-6 leading-relaxed flex-1">
                {article.excerpt}
              </p>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                <span className="text-emerald-400/0 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-1">
                  Read more <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
