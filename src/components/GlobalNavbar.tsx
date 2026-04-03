"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { IconMail } from "@tabler/icons-react";
import { handleEmailClick } from "@/lib/contact";

export function GlobalNavbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Background blur logic with threshold
      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Visibility logic with hysteresis to prevent flickering
      if (currentScrollY < 20) {
        // Always show near the very top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past a certain point
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 5) {
        // Scrolling up (with 5px buffer to prevent sensitivity issues)
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (pathname?.startsWith("/studio")) {
    return null;
  }

  // Define transition classes - Ensure border is always defined to prevent layout shifts
  const navTransformClass = isVisible ? "translate-y-0" : "-translate-y-full opacity-0";
  const navBackgroundClass = isScrolled
    ? "bg-black/40 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl"
    : "bg-transparent border-b border-transparent py-6";

  const isGardenPage = pathname?.startsWith("/garden");
  const navAction = isGardenPage 
    ? { name: "Back Home", href: "/", label: "Home" } 
    : { name: "The Garden", href: "/garden", label: "The Garden" };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${navTransformClass} ${navBackgroundClass}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">

        {/* Left Side: Brand Identity */}
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <span className="font-sans font-semibold text-lg md:text-xl tracking-tight text-white">Karthik H Nair</span>
          <span className="hidden sm:inline-block text-[10px] font-medium tracking-wide text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full uppercase leading-none">
            Portfolio
          </span>
        </Link>

        {/* Right Side: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">

          {/* Text Links (Pill Enclosures) */}
          <div className="flex items-center gap-2">
            <Link
              href={navAction.href}
              className="text-sm font-medium px-5 py-2 rounded-full transition-all text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.15)]"
            >
              {navAction.name}
            </Link>
          </div>

          {/* Social / Action Icons (Circular Pills) */}
          <button
            onClick={handleEmailClick}
            className="flex items-center gap-2 px-4 py-2 text-xs font-jetbrains uppercase tracking-widest  rounded-md hover:bg-emerald-500/10 transition-all group"
          >
            <IconMail className="group-hover:scale-110 transition-transform" />
          </button>

        </nav>

        {/* Mobile Action Button (Replaced Hamburger) */}
        <div className="md:hidden flex items-center gap-3">
          <Link
            href={navAction.href}
            className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.1)]"
          >
            {navAction.label}
          </Link>
        </div>

      </div>
    </header>
  );
}
