"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Terminal } from "lucide-react";
import { usePathname } from "next/navigation";

const terminalLines = [
  { text: "$ whoami", isCommand: true },
  { text: "> Karthik H Nair", isCommand: false },
  { text: "", isCommand: false },
  { text: "$ role", isCommand: true },
  { text: "> Interning as Associate Software Engineer at provus", isCommand: false },
  { text: "", isCommand: false },
  { text: "$ currently_building", isCommand: true },
  { text: "> ", isCommand: false },
];

const rotatingTexts = [
  "`Build in Public` System for my Portfolio",
  "A system design visualizer",
  "A Strong foundation in system design",
  "CPQ products using Salesforce LWC"
];

function RotatingText({ texts }: { texts: string[] }) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (charIndex > 0) {
        timeout = setTimeout(() => setCharIndex(c => c - 1), 30); // Fast backspace
      } else {
        setIsDeleting(false);
        setTextIndex(i => (i + 1) % texts.length);
        timeout = setTimeout(() => {}, 200); // Pause before typing new word
      }
    } else {
      if (charIndex < currentText.length) {
        timeout = setTimeout(() => setCharIndex(c => c + 1), 50); // Normal typing speed
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 3000); // Wait 3s reading time before backspacing
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <>
      {texts[textIndex].substring(0, charIndex)}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-2 ml-1 h-[1.2em] bg-emerald-400 align-middle"
      />
    </>
  );
}

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [renderKey, setRenderKey] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const GRID_SIZE = 50;
  
  const totalChars = terminalLines.reduce((acc, line) => acc + line.text.length, 0);

  // Track Mouse for Spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (window.innerWidth >= 768) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Iron-clad hydration trigger for BfCache restorations mapped perfectly to the typewriter engine.
  // We execute a native string-slice interval mapping against React state precisely rendering at ~50fps.
  useEffect(() => {
    setRenderKey(Date.now());
    setVisibleChars(0);
    
    const initialDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleChars((prev) => {
          if (prev >= totalChars) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 20); // 143 keys * 20ms = ~2.8 seconds total rendering sequence
      
      return () => clearInterval(interval);
    }, 1000);
    
    return () => clearTimeout(initialDelay);
  }, [totalChars]);

  // Determine safely which lines should be physically rendered in the DOM right now
  let lastVisibleLineIndex = 0;
  for (let i = 0; i < terminalLines.length; i++) {
    const prevCount = terminalLines.slice(0, i).reduce((sum, l) => sum + l.text.length, 0);
    if (visibleChars >= prevCount) {
      lastVisibleLineIndex = i;
    }
  }

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] pt-16">
      {/* 1. Base Grid Layer */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1a1a1a 1px, transparent 1px),
            linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)
          `,
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        }}
      />

      {/* 2. Spotlight Masked Grid Layer */}
      <div
        className="absolute inset-0 z-0 pointer-events-none hidden md:block"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(52, 211, 153, 0.45) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(52, 211, 153, 0.45) 1px, transparent 1px)
          `,
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
          WebkitMaskImage: `radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
        }}
      />

      {/* Content Layout */}
      <div key={renderKey} className="z-10 container flex flex-col items-center text-center px-4 w-full">

        {/* Profile Image with Lightning Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-8"
        >
          {/* Radial Lightning Effect */}
          <div className="absolute inset-0 bg-emerald-500/30 blur-[60px] rounded-full transform scale-150 pointer-events-none" />
          <div className="absolute inset-0 bg-blue-500/20 blur-[50px] rounded-full transform scale-110 pointer-events-none -translate-x-4 translate-y-4" />

          {/* Image Container */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black">
            <Image
              src="/me.jpeg"
              alt="Karthik H Nair"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Core Subtext Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 leading-tight">
            Engineering systems. <span className="text-emerald-400">Tracking growth.</span>
          </h2>
          <span className="font-serif italic text-xl md:text-2xl text-slate-300">
            Building in public.
          </span>
        </motion.div>

        {/* Animated Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="w-full max-w-2xl mx-auto bg-[#0d0d0d] border border-white/10 rounded-xl overflow-hidden shadow-2xl text-left"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 text-center font-jetbrains text-xs text-slate-400 flex items-center justify-center gap-2">
              <Terminal className="w-3.5 h-3.5" /> guest@karthik-portfolio:~
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8 font-jetbrains text-sm md:text-base leading-relaxed min-h-[220px]">
            {terminalLines.slice(0, lastVisibleLineIndex + 1).map((line, index) => {
              const previousCharsCount = terminalLines.slice(0, index).reduce((acc, l) => acc + l.text.length, 0);
              const renderableLength = Math.max(0, Math.min(line.text.length, visibleChars - previousCharsCount));
              
              const isLastLine = index === terminalLines.length - 1;
              const isStaticFinished = visibleChars >= totalChars;

              return (
                <div
                  key={index}
                  className={`mb-1 min-h-[1.5rem] break-all sm:break-normal ${line.isCommand ? 'text-blue-400 font-semibold mt-4 first:mt-0' : 'text-slate-300'}`}
                >
                  {line.text.substring(0, renderableLength)}
                  
                  {/* Append Rotating Text or Static Cursor */}
                  {isLastLine && isStaticFinished ? (
                    <RotatingText texts={rotatingTexts} />
                  ) : index === lastVisibleLineIndex && !isStaticFinished ? (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-2 ml-1 h-[1.2em] bg-emerald-400 align-middle"
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
