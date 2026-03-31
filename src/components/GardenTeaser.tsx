import { sanityFetch } from "@/sanity/lib/client";
import { featuredArticlesQuery } from "@/sanity/lib/queries";
import { Article } from "@/types";
import Link from "next/link";
import { ArrowRight, Leaf, Command } from "lucide-react";
import GardenCard from "./GardenCard";

export async function GardenTeaser() {
  const articles = await sanityFetch<Article[]>({ query: featuredArticlesQuery });

  return (
    <section className="py-32 container mx-auto px-4 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Blueprint Text in Background */}
      <div className="absolute -bottom-10 -left-10 opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[12rem] font-bold text-white leading-none">ARCHIVE</h2>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-emerald-500 font-jetbrains text-xs tracking-[0.3em] uppercase">
            <Command className="w-4 h-4" /> Intellectual_Output
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#f8fafc] flex items-center gap-4">
            The Digital <span className="text-emerald-500 italic font-serif">Garden</span>
          </h2>
          <p className="text-slate-400 max-w-xl font-light">
            An unstructured archive of engineering thoughts, deep dives into systems, 
            and the mental models powering my architecture.
          </p>
        </div>

        <Link 
          href="/garden" 
          className="group text-[10px] font-jetbrains uppercase tracking-[0.2em] text-emerald-500 flex items-center gap-2 hover:text-emerald-400 transition-colors"
        >
          [ Access_Full_Archive ]
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <GardenCard key={article._id} article={article} />
        ))}
      </div>
    </section>
  );
}
