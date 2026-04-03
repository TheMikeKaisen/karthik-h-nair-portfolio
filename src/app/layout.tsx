import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalNavbar } from "@/components/GlobalNavbar";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://karthik-h-nair.vercel.app/"),
  title: "Karthik Haji | Systems & Backend Engineer",
  description:
    "A living portfolio of scalable backend systems, technical deep dives, dev logs, and engineering journeys built in public.",
  openGraph: {
    title: "Kathik's Digital Garden",
    images: [{ url: '/og-image.png' }], // Create a cool Forest-themed preview image
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans relative">
        {/* Noise Texture Overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-40 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        <Suspense fallback={<div className="fixed top-0 left-0 right-0 h-16 bg-transparent z-50" />}>
          <GlobalNavbar />
        </Suspense>
        <main className="flex-1 w-full relative z-0">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
