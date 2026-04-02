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
  description,
  "difficulty": select(
    difficulty == "beginner" => "Beginner",
    difficulty == "intermediate" => "Intermediate",
    difficulty == "advanced" => "Advanced",
    "Beginner"
  ),
  "categoryName": category->title
}`;

// 4. Fetch recent non-pinned Activities
export const recentActivitiesQuery = groq`*[_type == "activity" && isTopSkill != true] | order(_createdAt desc)[0...5] {
  _id,
  title,
  repoUrl,
  description,
  "difficulty": select(
    difficulty == "beginner" => "Beginner",
    difficulty == "intermediate" => "Intermediate",
    difficulty == "advanced" => "Advanced",
    "Beginner"
  ),
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
  tags,
  "categoryName": category->title
}`;

// 6. Fetch all Dev Logs for The Garden
export const devLogsQuery = groq`*[_type == "devLog"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  tags,
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
  tags,
  "categoryName": category->title,
  "relatedProject": relatedProject->{title, slug}
}`;

// 7. Fetch single project by Slug
export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  description,
  status,
  publishedAt,
  tags,
  githubUrl,
  liveUrl,
  body
}`;

// 8. Fetch the strictly next project chronologically
export const nextProjectQuery = groq`*[_type == "project" && publishedAt > $currentPublishedAt] | order(publishedAt asc)[0] {
  _id,
  title,
  slug,
  mainImage,
  description
}`;


export const experienceQuery = groq`*[_type == "experience"] | order(startDate desc) {
  _id,
  companyName,
  role,
  isCurrent,
  startDate,
  endDate,
  location,
  technologies,
  description,
  companyLogo,
  link
}`;

export const educationQuery = groq`*[_type == "education"] | order(endDate desc) {
  _id,
  institution,
  degree,
  fieldOfStudy,
  location,
  startDate,
  endDate,
  gpa,
  courses,
  institutionLogo
}`;

export const skillsQuery = groq`*[_type == "skill"] | order(category->title asc, title asc) {
  _id,
  title,
  "categoryName": category->title,
  isPrimary,
  icon
}`;

// Query to fetch activity metrics for the last year, excluding today
export const heatmapMetricsQuery = `*[_type == "activityMetric" && date < $today && date >= $oneYearAgo] | order(date asc) {
  date,
  githubCommits,
  leetcodeSolved,
  gfgSolved,
  articlesPublished,
  devLogs,
  totalActivity
}`;