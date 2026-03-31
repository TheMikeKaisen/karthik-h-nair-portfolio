"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";

function BackButtonLogic() {
  const searchParams = useSearchParams();
  const view = searchParams.get("v");
  const href = view ? `/garden?v=${view}` : "/garden";

  return (
    <Link 
      href={href}
      className="inline-flex items-center gap-2 text-sm font-jetbrains text-emerald-500/80 hover:text-emerald-400 transition-colors group mb-10 border border-emerald-500/10 hover:border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 px-5 py-2.5 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.05)]"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      Return to Garden
    </Link>
  );
}

export default function BackToGardenButton() {
  return (
    <Suspense fallback={<div className="h-10 w-44 bg-white/5 rounded-full mb-10 animate-pulse border border-white/10" />}>
      <BackButtonLogic />
    </Suspense>
  )
}
