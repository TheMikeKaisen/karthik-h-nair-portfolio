import { Suspense } from "react";
import { headers } from "next/headers";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { LearningLab } from "@/components/LearningLab";
import { GardenTeaser } from "@/components/GardenTeaser";
import { ProfessionalCore } from "@/components/ProfessionalCore";
import { Footer } from "@/components/Footer";
import { SkillsMatrix } from "@/components/Skills";
import { getHeatmapData } from "@/lib/heatmap-utils";
import { ActivityHeatmap } from "@/components/ActivityHeatmap";

// 1. Isolated Dynamic Component
// This component "owns" the dynamic hole, allowing the rest of the page to be static.
async function DynamicActivityHeatmap() {
  await headers(); // Opt-in to dynamic rendering for this specific block
  const activityData = await getHeatmapData();
  return <ActivityHeatmap data={activityData} />;
}

// 2. Loading Fallback
function HeatmapFallback() {
  return (
    <div className="w-full h-48 bg-white/5 rounded-xl animate-pulse flex items-center justify-center border border-white/10">
      <span className="text-slate-500 font-jetbrains text-xs tracking-widest uppercase">Initializing_Heatmap...</span>
    </div>
  );
}

export default async function HomePage() {
  return (
    <>
      <main className="min-h-screen relative">
        <Hero />
        <ProjectGrid />
        
        {/* 3. Suspense Boundary for PPR Optimization */}
        <div className="container mx-auto px-4 mb-20">
          <Suspense fallback={<HeatmapFallback />}>
            <DynamicActivityHeatmap />
          </Suspense>
        </div>

        <LearningLab />
        <GardenTeaser />
        <ProfessionalCore />
        <SkillsMatrix />
      </main>
      <Footer />
    </>
  );
}