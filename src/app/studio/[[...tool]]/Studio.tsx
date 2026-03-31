'use client';

import { NextStudio } from 'next-sanity/studio';
import sanityConfig from '../../../../sanity.config';
import { useEffect, useState } from 'react';

export function Studio() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="text-emerald-400 font-jetbrains animate-pulse">Initializing Studio Workspace...</div>
      </div>
    );
  }

  return <NextStudio config={sanityConfig} />;
}
