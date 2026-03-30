export interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  slug: { current: string };
  mainImage: any;
}