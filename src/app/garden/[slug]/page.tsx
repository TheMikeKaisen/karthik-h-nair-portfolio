import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { sanityFetch } from '@/sanity/lib/client';
import { postBySlugQuery, allPostSlugsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { PortableTextRenderer } from '@/components/PortableTextRenderer';
import BackToGardenButton from './BackToGardenButton';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({ query: allPostSlugsQuery, revalidate: 3600 });
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<any>({ query: postBySlugQuery, params: { slug } });
  
  if (!post) {
    return { title: 'Post Not Found | Karthik Nair Garden' }
  }
  
  return {
    title: `${post.title} | Karthik Nair`,
    description: post.excerpt || `A technical ${post._type} entry logged natively in the Garden.`,
    openGraph: post.mainImage ? { images: [urlFor(post.mainImage).url()] } : undefined
  }
}

export default async function GardenDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await sanityFetch<any>({ 
    query: postBySlugQuery, 
    params: { slug },
    tags: ["garden"] 
  });
  
  if (!post) notFound();

  // The query fetches content for Articles, and optionally body for DEV logs based on older definitions.
  // We coalesce this to cleanly supply the renderer.
  const rawContent = post.content || post.body;

  const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-32">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Navigation Context Interception */}
        <BackToGardenButton />

        <article className="w-full">
          {/* 1. Header Metadata block */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className={`text-[10px] font-jetbrains font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full border ${post._type === 'article' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                {post._type === 'article' ? 'Article' : 'Dev Log'}
              </span>
              <span className="text-[10px] font-jetbrains text-slate-500 tracking-[0.2em] uppercase">
                {publishedDate}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[#f8fafc] mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-6">
              {post.categoryName && (
                <div className="text-slate-500 font-jetbrains tracking-widest text-xs uppercase flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  {post.categoryName}
                </div>
              )}
              {post.difficultyLevel && (
                <div className="text-amber-500/70 font-jetbrains tracking-widest text-xs uppercase flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
                  {post.difficultyLevel}
                </div>
              )}
            </div>
          </header>

          {/* 2. Responsive Hero Media */}
          {post.mainImage && (
            <div className="relative w-full aspect-[21/9] mb-16 rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
              <Image 
                src={urlFor(post.mainImage).url()} 
                alt={post.title} 
                fill 
                className="object-cover"
                priority // Priority load LCP image
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          )}

          {/* 3. Render Engine Output */}
          <div className="prose prose-invert prose-lg max-w-none text-slate-300">
            <PortableTextRenderer content={rawContent} />
          </div>
        </article>
      </div>
    </div>
  )
}
