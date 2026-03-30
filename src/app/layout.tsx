import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalNavbar } from "@/components/GlobalNavbar";

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
  title: "Karthik Nair - Portfolio",
  description: "High-end portfolio for an elite Backend Engineer & System Designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans relative">
        <ThemeProvider>
          {/* Ambient Background Effects */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
             <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-blue-500/10 blur-[120px]" />
             <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-emerald-500/10 blur-[120px]" />
          </div>

          <GlobalNavbar />
          <main className="flex-1 w-full relative z-0">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
