"use client";

import Link from "next/link";
import { 
  IconBrandGithub, 
  IconBrandX, 
  IconBrandLinkedin, 
  IconMail, 
  IconCalendar, 
  IconCode, 
  IconCpu 
} from "@tabler/icons-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a] py-16 md:py-24 relative z-10 overflow-hidden">
      
      {/* 1. Refined Watermark: Larger, moved up, and masked for a premium fade */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none select-none overflow-hidden h-full items-end translate-y-[15%]">
        <h2 className="text-[14vw] font-bold text-white/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase [mask-image:linear-gradient(to_top,black_30%,transparent_100%)]">
          Karthik H Nair
        </h2>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* 2. Identity Block: Balanced leading and status indicators */}
          <div className="flex flex-col items-center md:items-start gap-5 text-center md:text-left">
            <Link href="/" className="flex items-center gap-3 font-bold tracking-tighter text-slate-100 hover:text-emerald-400 transition-colors group">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all">
                <IconCode size={24} className="text-emerald-400" stroke={1.5} />
              </div>
              <span className="text-2xl">Karthik Nair</span>
            </Link>
            
            <div className="flex flex-col gap-2">
              {/* Bio with improved leading-relaxed for better readability */}
              <p className="text-slate-500 text-sm max-w-xs font-light leading-relaxed">
                Associate Software Engineer @ Provus. <br />
                Building scalable systems and documenting the architectural journey.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-jetbrains text-slate-700 uppercase tracking-widest mt-2">
                <IconCpu size={14} stroke={1.5} className="text-emerald-500/50" /> 
                System_Status: <span className="text-emerald-500/80">Operational</span>
              </div>
            </div>
          </div>

          {/* 3. Connect Block: Sophisticated icon nodes and action button */}
          <div className="flex flex-col items-center md:items-end gap-8">
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com/TheMikeKaisen" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-500 hover:text-white transition-all p-2.5 bg-white/[0.03] border border-white/5 rounded-md hover:border-emerald-500/30 group" 
              >
                <IconBrandGithub size={20} stroke={1.5} />
              </a>
              <a 
                href="https://x.com/Karthik_h_nair" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-500 hover:text-white transition-all p-2.5 bg-white/[0.03] border border-white/5 rounded-md hover:border-blue-400/30" 
              >
                <IconBrandX size={20} stroke={1.5} />
              </a>
              <a 
                href="https://www.linkedin.com/in/karthik-h-nair/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-500 hover:text-white transition-all p-2.5 bg-white/[0.03] border border-white/5 rounded-md hover:border-blue-500/30" 
              >
                <IconBrandLinkedin size={20} stroke={1.5} />
              </a>
              <a 
                href="mailto:h.karthiknair@gmail.com" 
                className="text-slate-500 hover:text-white transition-all p-2.5 bg-white/[0.03] border border-white/5 rounded-md hover:border-emerald-500/30" 
              >
                <IconMail size={20} stroke={1.5} />
              </a>
            </div>

            <a 
              href="https://calendly.com/placeholder" 
              target="_blank" 
              rel="noreferrer" 
              className="group flex items-center gap-3 bg-emerald-500 text-black px-6 py-3 rounded-md text-sm font-bold transition-all hover:bg-emerald-400 active:scale-95 shadow-[0_0_25px_rgba(16,185,129,0.15)]"
            >
              <IconCalendar size={18} stroke={2} />
              Book_a_Sync
            </a>
          </div>
        </div>

        
      </div>
    </footer>
  );
}