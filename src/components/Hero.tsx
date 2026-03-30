"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Activity, Zap } from "lucide-react";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Organic Latency Simulator
  const [latency, setLatency] = useState(24);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const updateLatency = () => {
      // Fluctuate between 22 and 35 organically
      const newLatency = Math.floor(Math.random() * (35 - 22 + 1)) + 22;
      setLatency(newLatency);
      // Wait between 1.5s to 3s for the next update
      const nextUpdate = Math.floor(Math.random() * (3000 - 1500 + 1)) + 1500;
      timeoutId = setTimeout(updateLatency, nextUpdate);
    };
    
    timeoutId = setTimeout(updateLatency, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Canvas Node Mesh Logic
  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    let mouse = { x: -1000, y: -1000 };
    
    // Scale canvas to device pixel ratio for sharp rendering
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      initNodes(rect.width, rect.height);
    };

    const initNodes = (width: number, height: number) => {
      nodes = [];
      const nodeCount = 35; // 35 nodes for a clean, non-cluttered network
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 1.5,
        });
      }
    };

    // Throttle mousemove slightly
    let lastMouseMove = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseMove > 16) { // ~60fps throttle
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        lastMouseMove = now;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Initial sizing
    resizeCanvas();

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls smoothly
        if (node.x < 0 || node.x > rect.width) node.vx *= -1;
        if (node.y < 0 || node.y > rect.height) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fill();

        // Calculate distance to mouse
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Draw connecting line if close to mouse
        const maxDistance = 220;
        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          
          // Line opacity fades inversely with distance
          const opacity = 1 - Math.pow(distance / maxDistance, 2); // Easing curve for smoother fade
          
          // Gradient from Blue to Emerald
          const gradient = ctx.createLinearGradient(node.x, node.y, mouse.x, mouse.y);
          gradient.addColorStop(0, `rgba(96, 165, 250, ${opacity * 0.6})`); // blue-400
          gradient.addColorStop(1, `rgba(52, 211, 153, ${opacity * 0.6})`); // emerald-400
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-auto hidden md:block w-full h-full"
      />

      {/* Main Content Container */}
      <div className="z-10 container flex flex-col items-center text-center px-4 md:px-8 mt-12 md:mt-0">
        
        {/* System Status Ticker */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass font-jetbrains flex items-center justify-center flex-wrap gap-2 md:gap-5 px-5 py-3 rounded-full text-xs md:text-sm text-gray-300 shadow-2xl mb-10 md:mb-14"
        >
          {/* Active Dot */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-medium tracking-wider">SYSTEM ACTIVE</span>
          </div>

          <div className="hidden md:block w-px h-4 bg-white/20" />

          {/* Latency */}
          <div className="flex items-center gap-1.5 border border-white/10 bg-black/20 rounded border-b-0 px-2.5 py-1">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span className="w-9 font-medium">{latency}ms</span>
          </div>

          <div className="hidden lg:block w-px h-4 bg-white/20" />

          {/* Location / Uptime */}
          <div className="hidden lg:flex items-center gap-1.5 opacity-80">
            <MapPin className="w-3.5 h-3.5" />
            <span>Pune, IN</span>
            <span className="mx-1.5 text-white/30">•</span>
            <span>99.9% Uptime</span>
          </div>

          <div className="hidden md:block w-px h-4 bg-white/20" />

          {/* Tech Stack Badges */}
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-yellow-400 mr-1" />
            <span className="border border-white/10 bg-white/5 px-2 py-0.5 rounded text-white/90">TS</span>
            <span className="border border-white/10 bg-white/5 px-2 py-0.5 rounded text-white/90">Node</span>
            <span className="border border-white/10 bg-white/5 px-2 py-0.5 rounded text-white/90">Redis</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 md:mb-8 leading-[1.1]">
            Architecting{" "}
            <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 text-transparent bg-clip-text">
              Scalable Backend Systems
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed px-4">
            I design and build high-performance distributed systems, robust APIs, and fault-tolerant microservices that power massive modern applications.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
