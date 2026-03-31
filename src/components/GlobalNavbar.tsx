"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, CalendarDays, Globe, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "projects", href: "/projects" },
  { name: "lab", href: "/lab" },
  { name: "the Garden", href: "/garden", highlight: true },
];

export function GlobalNavbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname?.startsWith("/studio")) {
    return null;
  }

  return (
    <header className="fixed top-0 z-50 w-full pt-6">
      <div className="container mx-auto px-4 flex items-center justify-between">
        
        {/* Left Side: Brand Identity */}
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <span className="font-sans font-semibold text-xl tracking-tight text-white">Karthik H Nair</span>
          <span className="text-[10px] font-medium tracking-wide text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full uppercase leading-none">
            Portfolio
          </span>
        </Link>

        {/* Right Side: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          
          {/* Text Links (Pill Enclosures) */}
          <div className="flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium px-5 py-2 rounded-full transition-all ${
                  link.highlight
                    ? 'text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.15)]'
                    : 'text-slate-300 hover:text-white border border-transparent hover:border-white/10 hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social / Action Icons (Circular Pills) */}
          <div className="flex items-center gap-2 ml-4">
            <Link href="/calendar" className="p-2.5 rounded-full border border-transparent hover:border-white/10 hover:bg-white/5 text-slate-300 hover:text-white transition-all">
              <CalendarDays className="w-4 h-4" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="p-2.5 rounded-full border border-transparent hover:border-white/10 hover:bg-white/5 text-slate-300 hover:text-white transition-all">
              <Globe className="w-4 h-4" />
            </Link>
            <Link href="mailto:contact@example.com" className="p-2.5 rounded-full border border-transparent hover:border-white/10 hover:bg-white/5 text-slate-300 hover:text-white transition-all">
              <Mail className="w-4 h-4" />
            </Link>
          </div>

        </nav>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 transition-colors text-slate-300"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-4 right-4 mt-4 glass flex flex-col items-center py-6 gap-6 rounded-2xl shadow-2xl"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-medium transition-all ${
                  link.highlight
                    ? 'text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-6 py-2 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.15)]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 mt-2 pt-6 border-t border-white/10 w-[80%] justify-center">
              <Link href="/calendar" className="p-3 rounded-full bg-white/5 text-slate-300 hover:text-white">
                <CalendarDays className="w-5 h-5" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="p-3 rounded-full bg-white/5 text-slate-300 hover:text-white">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="mailto:contact@example.com" className="p-3 rounded-full bg-white/5 text-slate-300 hover:text-white">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
