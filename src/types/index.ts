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
  description?: string;
  tags?: string[];
  dateStarted?: string;
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

export interface DevLog {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
}

export interface Experience {
  _id: string;
  companyName: string;
  role: string;
  isCurrent: boolean;
  startDate: string;
  endDate?: string;
  location?: string;
  technologies?: string[];
  description?: string;
  companyLogo?: any;
  link?: string;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location?: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  courses?: string[];
  institutionLogo?: any;
}

export interface Skill {
  _id: string;
  title: string;
  categoryName: string;
  isPrimary: boolean;
  icon?: any;
}