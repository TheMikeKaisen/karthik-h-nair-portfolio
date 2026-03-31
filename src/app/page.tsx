import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { LearningLab } from "@/components/LearningLab";
import { GardenTeaser } from "@/components/GardenTeaser";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen relative">
        <Hero />
        <ProjectGrid />
        <LearningLab />
        <GardenTeaser />
      </main>
      <Footer />
    </>
  );
}