import Link from "next/link";
import { GitBranch, Mail, Calendar, Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] py-12 relative z-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="flex flex-col items-center md:items-start gap-2 text-slate-500 text-sm">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tighter text-slate-300 hover:text-blue-400 transition-colors mb-1">
            <Code2 className="w-5 h-5 text-emerald-400" />
            <span className="text-lg">Karthik Nair</span>
          </Link>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Karthik H Nair.</span>
            <span className="hidden md:inline text-slate-700 font-bold">|</span>
            <span className="text-slate-400 font-jetbrains text-xs uppercase tracking-widest mt-2 md:mt-0 opacity-80">Architecting Systems</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com/TheMikeKaisen" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full" aria-label="GitHub">
            <GitBranch className="w-5 h-5" />
          </a>
          <a href="mailto:h.karthiknair@gmail.com" className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full" aria-label="Email">
            <Mail className="w-5 h-5" />
          </a>
          <a href="https://calendly.com/placeholder" target="_blank" rel="noreferrer" className="text-slate-900 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full ml-1 md:ml-2 shadow-[0_0_15px_rgba(52,211,153,0.25)] hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Book Sync</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
