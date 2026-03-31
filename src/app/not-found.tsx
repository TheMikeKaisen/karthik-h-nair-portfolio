"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Leaf, Terminal, Activity } from "lucide-react";

export default function NotFound() {
  const [countdown, setCountdown] = useState(2);
  const router = useRouter();

  useEffect(() => {
    // 1. Handle the numeric countdown
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // 2. Trigger the redirect after 3 seconds
    const redirect = setTimeout(() => {
      router.push("/");
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [router]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center z-10 w-full max-w-2xl"
      >
        {/* Automated Protocol Badge */}
        <div className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-[10px] font-jetbrains font-bold tracking-[0.2em] text-emerald-400 uppercase">
            Protocol: Auto_Reroute_Active
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tighter">
          Page <span className="text-emerald-500 underline decoration-emerald-500/30 underline-offset-8">Not Found.</span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto mb-10 font-light">
          Pointer reference lost. Initializing automated recovery to stable Page.
        </p>

        {/* The Countdown UI */}
        <div className="mb-12 max-w-xs mx-auto">
          <div className="flex justify-between items-end mb-2 px-1">
             <span className="text-[10px] font-jetbrains text-emerald-500/60 uppercase tracking-widest">Re-routing in {countdown}s</span>
             <span className="text-[10px] font-jetbrains text-slate-600">L_HOME_ROOT</span>
          </div>
          {/* Progress Bar Container */}
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 3, ease: "linear" }}
              className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            />
          </div>
        </div>

        {/* Manual Override Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <button className="flex items-center gap-2 px-8 py-3 bg-emerald-500 text-black font-bold rounded-lg text-sm hover:bg-emerald-400 transition-all active:scale-95">
              <Home className="w-4 h-4" />
              Home
            </button>
          </Link>

          <Link href="/garden">
            <button className="flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-lg text-sm hover:bg-white/10 transition-all active:scale-95">
              <Leaf className="w-4 h-4 text-emerald-500" />
              Garden
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Blueprint metadata Footer */}
      <div className="absolute bottom-8 left-8 hidden md:flex flex-col gap-1 text-[9px] font-jetbrains text-slate-700 uppercase tracking-[0.3em]">
        <span>Status: Interrupt_Signal_Received</span>
        <span>Target: karthiknairportfolio.in/index</span>
        <span>Auto_Exec: True</span>
      </div>
    </main>
  );
}