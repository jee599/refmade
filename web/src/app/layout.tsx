import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Refmade — Design Reference System",
  description: "Reference-based design generation. Browse curated references, export prompts, generate with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-zinc-950 text-zinc-50 font-[family-name:var(--font-inter)]">
        <nav className="sticky top-0 z-50 border-b border-emerald-500/20 bg-zinc-950/85 backdrop-blur-xl">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <Link
                href="/"
                className="font-[family-name:var(--font-jetbrains-mono)] text-lg font-bold tracking-tight flex items-center gap-1"
              >
                <span className="text-emerald-500">&gt;</span>
                <span className="text-zinc-50">refmade</span>
                <span className="text-emerald-500 animate-cursor-blink">_</span>
              </Link>
              <div className="flex items-center gap-6 font-[family-name:var(--font-jetbrains-mono)] text-base">
              </div>
            </div>
          </nav>
          <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
