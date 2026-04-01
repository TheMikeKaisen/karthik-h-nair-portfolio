import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { LearningLab } from "@/components/LearningLab";
import { GardenTeaser } from "@/components/GardenTeaser";
import { ProfessionalCore } from "@/components/ProfessionalCore";
import { Footer } from "@/components/Footer";
import { SkillsMatrix } from "@/components/Skills";
import { getHeatmapData } from "@/lib/heatmap-utils";
import { ActivityHeatmap } from "@/components/ActivityHeatmap";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const activityData = await getHeatmapData();
  return (
    <>
      <main className="min-h-screen relative">
        <Hero />
        <ProjectGrid />
        <LearningLab />
        <ActivityHeatmap data={activityData} />
        <GardenTeaser />
        <ProfessionalCore />
        <SkillsMatrix/>
      </main>
      <Footer />
    </>
  );
}