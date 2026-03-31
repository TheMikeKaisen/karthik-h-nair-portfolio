"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Activity, Server } from "lucide-react";

// The Packet Type for data flow animation
type Packet = {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number; // seconds
};

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [packets, setPackets] = useState<Packet[]>([]);
  const [latency, setLatency] = useState(24);
  const GRID_SIZE = 50;

  // Track Mouse for Spotlight
  useEffect(() => {
    // We bind to the window to track the mouse seamlessly
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Disable on small screens per performance requirements
    if (window.innerWidth >= 768) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Organic Latency Simulator
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const updateLatency = () => {
      const newLatency = Math.floor(Math.random() * (35 - 22 + 1)) + 22;
      setLatency(newLatency);
      const nextUpdate = Math.floor(Math.random() * (3000 - 1500 + 1)) + 1500;
      timeoutId = setTimeout(updateLatency, nextUpdate);
    };
    timeoutId = setTimeout(updateLatency, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Packet Spawner (Data Flow)
  useEffect(() => {
    const spawnPacket = () => {
      const isHorizontal = Math.random() > 0.5;
      const length = (Math.floor(Math.random() * 8) + 4) * GRID_SIZE; // Travel distance between 200px and 600px

      let startX, startY, endX, endY;

      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;

      if (isHorizontal) {
        // Snap to grid Y
        startY = Math.floor((Math.random() * height) / GRID_SIZE) * GRID_SIZE;
        endY = startY;
        const goingRight = Math.random() > 0.5;
        startX = goingRight ? -length : width + length;
        endX = goingRight ? width + length : -length;
      } else {
        // Snap to grid X
        startX = Math.floor((Math.random() * width) / GRID_SIZE) * GRID_SIZE;
        endX = startX;
        const goingDown = Math.random() > 0.5;
        startY = goingDown ? -length : height + length;
        endY = goingDown ? height + length : -length;
      }

      const newPacket: Packet = {
        id: crypto.randomUUID(),
        startX,
        startY,
        endX,
        endY,
        duration: 3.5, // Crisp, clean 3.5s traversal speed
      };

      setPackets(prev => [...prev, newPacket]);

      // Scavenge packet once off-screen
      setTimeout(() => {
        setPackets(prev => prev.filter(p => p.id !== newPacket.id));
      }, newPacket.duration * 1000);
    };

    // Standard interval is 3 seconds, meaning there is usually 1-2 packets visible.
    const intervalId = setInterval(spawnPacket, 3000);
    spawnPacket();
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* 1. Base Grid Layer (Faint Structural Dark Lines) */}
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

      {/* 2. Spotlight Masked Grid Layer (Glowing Intersections) */}
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

      {/* 3. Packet Flow Engine */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence>
          {packets.map((p) => {
            const isHorizontal = p.startY === p.endY;
            const goingRight = p.endX > p.startX;
            const goingDown = p.endY > p.startY;

            return (
              <motion.div
                key={p.id}
                initial={{ x: p.startX, y: p.startY, opacity: 0 }}
                animate={{ x: p.endX, y: p.endY, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: p.duration, ease: "linear" }}
                className="absolute shadow-[0_0_8px_1px_rgba(52,211,153,0.6)]"
                style={{
                  width: isHorizontal ? '30px' : '2px',
                  height: isHorizontal ? '2px' : '30px',
                  // Ghost tail effect transitioning to transparent
                  background: isHorizontal
                    ? `linear-gradient(${goingRight ? 'to left' : 'to right'}, #34d399 20%, transparent)`
                    : `linear-gradient(${goingDown ? 'to top' : 'to bottom'}, #34d399 20%, transparent)`,
                  marginLeft: isHorizontal ? (goingRight ? 0 : -30) : 0,
                  marginTop: !isHorizontal ? (goingDown ? 0 : -30) : 0,
                }}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* 4. Core Typography content */}
      <div className="z-10 container flex flex-col items-center text-center px-4 mt-6 md:mt-12 pb-12">
        <div className="animate-hero-fade max-w-5xl">
          <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter mb-4 md:mb-6 text-[#f8fafc] leading-[1.05]">
            Architecting Scalable
            <br className="hidden sm:block" />
            Backend Systems
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-12 sm:mb-16">
            Designing highly available data pipelines, robust enterprise APIs, and fault-tolerant microservices built for extreme scale.
          </p>
        </div>

        {/* 5. Mosey-Inspired System Dock */}
        <div className="animate-hero-fade-delayed opacity-0 flex flex-col md:flex-row items-center font-jetbrains text-xs text-slate-400 bg-white/5 backdrop-blur-xl border border-white/10 p-1 md:p-1.5 rounded-xl md:rounded-lg shadow-2xl">
          {/* Active Status Segment */}
          <div className="flex items-center gap-2 px-4 py-2.5 md:py-1.5 border-b md:border-b-0 md:border-r border-white/10 w-full md:w-auto justify-center">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-medium tracking-wide">SYSTEM ACTIVE</span>
          </div>

          {/* Metric: Location & Uptime */}
          <div className="flex items-center gap-2.5 px-4 py-2.5 md:py-1.5 border-b md:border-b-0 md:border-r border-white/10 shrink-0 w-full md:w-auto justify-center">
            <MapPin className="w-4 h-4 text-slate-500" />
            <span className="text-slate-300">Pune, IN</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">99.9% Uptime</span>
          </div>

          {/* Metric: Latency */}
          <div className="flex items-center gap-2 px-4 py-2.5 md:py-1.5 border-b md:border-b-0 md:border-r border-white/10 min-w-0 md:min-w-[100px] justify-center w-full md:w-auto">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-slate-300">{latency}ms</span>
          </div>

          {/* Tech Stack Segment */}
          <div className="flex items-center gap-2 px-4 py-2.5 md:py-1.5 w-full md:w-auto justify-center">
            <Server className="w-4 h-4 text-slate-500 mr-1" />
            <span className="px-1.5 py-0.5 rounded bg-black/40 text-slate-300 shadow-inner">TypeScript</span>
            <span className="px-1.5 py-0.5 rounded bg-black/40 text-slate-300 shadow-inner">Node.js</span>
            <span className="px-1.5 py-0.5 rounded bg-black/40 text-slate-300 shadow-inner">Redis</span>
          </div>
        </div>
      </div>
    </section>
  );
}
