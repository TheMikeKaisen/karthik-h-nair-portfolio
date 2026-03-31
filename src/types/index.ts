export interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  slug: { current: string };
  status: string;
  mainImage: any;
}

export interface Activity {
  _id: string;
  title: string;
  repoUrl?: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  categoryName?: string;
  isTopSkill?: boolean;
}

export interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: any;
  excerpt: string;
  publishedAt: string;
  difficultyLevel?: string;
  categoryName?: string;
}