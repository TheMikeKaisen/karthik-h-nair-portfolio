import { groq } from "next-sanity";

// 1. Fetch featured projects for the Home Page
export const featuredProjectsQuery = groq`*[_type == "project" && featured == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  description,
  tags,
  status
}`;

// 2. Fetch latest 3 featured articles for the "Garden Preview"
export const featuredArticlesQuery = groq`*[_type == "article" && featured == true && isPublished == true] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  difficultyLevel,
  "categoryName": category->title
}`;

// 3. Fetch top "Learning Lab" skills
export const topSkillsQuery = groq`*[_type == "activity" && isTopSkill == true] | order(_createdAt desc) {
  _id,
  title,
  repoUrl,
  difficulty,
  "categoryName": category->title
}`;

// 4. Fetch recent non-pinned Activities
export const recentActivitiesQuery = groq`*[_type == "activity" && isTopSkill != true] | order(_createdAt desc)[0...5] {
  _id,
  title,
  repoUrl,
  difficulty,
  "categoryName": category->title
}`;

// 5. Fetch all published Articles for The Garden
export const publishedArticlesQuery = groq`*[_type == "article" && isPublished == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  difficultyLevel,
  "categoryName": category->title
}`;

// 6. Fetch all Dev Logs for The Garden
export const devLogsQuery = groq`*[_type == "devLog"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt
}`;

// Add this to your queries.ts
export const postBySlugQuery = groq`*[( _type == "article" || _type == "devLog" ) && slug.current == $slug][0] {
  _type,
  title,
  publishedAt,
  content, // For Articles
  body,    // For Dev Logs (if named differently)
  mainImage,
  difficultyLevel,
  isPremium,
  "categoryName": category->title,
  "relatedProject": relatedProject->{title, slug}
}`;