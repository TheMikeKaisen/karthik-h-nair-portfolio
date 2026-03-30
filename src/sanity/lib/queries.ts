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
export const topSkillsQuery = groq`*[_type == "activity" && isTopSkill == true] {
  _id,
  title,
  repoUrl,
  difficulty,
  "categoryName": category->title
}`;