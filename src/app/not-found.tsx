"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Alert the user as requested
    alert("The page does not exist.");

    // If the user navigated here from within the site, bounce them right back
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push("/");
    }

    // Force a rigorous hard-reload of the browser engine 100ms after the Next router 
    // changes the URL. This guarantees the Home Page memory tree is destroyed and 
    // rebuilt perfectly from scratch, eliminating any frozen typewriter animations.
    setTimeout(() => {
      window.location.reload();
    }, 100);

  }, [router]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center">
      <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-slate-400">Redirecting...</p>
    </div>
  );
}