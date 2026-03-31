import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { CodeBlock } from './CodeBlock';

// We map native Sanity blocks to tailored DOM elements.
// This preserves the dark-mode aesthetic uniformly across articles and dev logs.
const components: Partial<PortableTextReactComponents> = {
  types: {
    // 1. Responsive Sanity Images
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="relative w-full aspect-video my-10 rounded-xl overflow-hidden border border-white/10 shadow-lg shadow-black/40">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'PortableText Media'}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          />
        </div>
      );
    },
    // 2. Syntax Highlighted Code Blocks
    code: ({ value }) => {
      return <CodeBlock value={value} />;
    }
  },
  block: {
    normal: ({ children }) => <p className="mb-6 text-slate-300 leading-relaxed text-lg tracking-wide font-light">{children}</p>,
    h1: ({ children }) => <h1 className="text-4xl md:text-5xl font-bold mt-16 mb-8 text-[#f8fafc] tracking-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-12 mb-6 text-slate-100 tracking-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-200">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mt-8 mb-4 text-emerald-400 font-jetbrains">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-emerald-500 pl-6 py-2 my-8 italic text-slate-400 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-r-xl font-jetbrains text-sm">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white tracking-wide">{children}</strong>,
    em: ({ children }) => <em className="italic text-slate-400">{children}</em>,
    code: ({ children }) => (
      <code className="bg-white/10 text-emerald-300 px-1.5 py-0.5 rounded font-jetbrains text-sm mx-1 border border-white/5">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a 
          href={value?.href} 
          target={target} 
          rel={target === '_blank' ? 'noindex nofollow noreferrer' : ''} 
          className="text-emerald-400/90 hover:text-emerald-300 underline decoration-emerald-500/30 underline-offset-4 transition-colors font-medium"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-none leading-relaxed text-slate-300 ml-4 mb-8 space-y-3">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal leading-relaxed text-slate-300 ml-6 mb-8 space-y-3 marker:text-emerald-500 marker:font-jetbrains">{children}</ol>,
  },
  listItem: {
    // Custom bullet representation for list items
    bullet: ({ children }) => (
      <li className="relative pl-6">
        <span className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-emerald-500 rounded-sm" />
        {children}
      </li>
    ),
    number: ({ children }) => <li className="pl-2">{children}</li>,
  },
};

export function PortableTextRenderer({ content }: { content: any }) {
  if (!content) return null;
  return (
    <div className="portable-text w-full max-w-none">
      <PortableText value={content} components={components} />
    </div>
  );
}
