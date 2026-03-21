"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const MONO = "font-[family-name:var(--font-jetbrains-mono)]";
const HEADING = "font-[family-name:var(--font-space-grotesk)]";

// Floating design element cards
function FloatingCard({
  children,
  className = "",
  delay,
  duration,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
  duration: number;
}) {
  return (
    <div
      className={`absolute rounded-lg border border-zinc-700/50 bg-zinc-900/80 px-3 py-2 backdrop-blur-sm ${className}`}
      style={{
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      {children}
    </div>
  );
}

function useTypingAnimation(
  lines: string[],
  charDelay: number,
  lineDelay: number,
  shouldStart: boolean
) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!shouldStart) {
      setDisplayedLines([]);
      setCurrentLine(0);
      setCurrentChar(0);
      setDone(false);
      return;
    }

    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }

    const line = lines[currentLine];

    if (currentChar === 0 && currentLine > 0) {
      // Pause between lines
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, ""]);
        setCurrentChar(1);
      }, lineDelay);
      return () => clearTimeout(timeout);
    }

    const charIndex = currentChar === 0 ? 0 : currentChar - (currentLine > 0 ? 1 : 0);

    if (charIndex >= line.length) {
      setCurrentLine((prev) => prev + 1);
      setCurrentChar(0);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedLines((prev) => {
        const updated = [...prev];
        if (currentLine === 0 && currentChar === 0) {
          updated[0] = line[0];
        } else {
          const idx = updated.length - 1;
          updated[idx] = (updated[idx] || "") + line[charIndex];
        }
        return updated;
      });
      setCurrentChar((prev) => prev + 1);
    }, charDelay);

    return () => clearTimeout(timeout);
  }, [shouldStart, currentLine, currentChar, lines, charDelay, lineDelay]);

  return { displayedLines, done };
}

function TerminalBlock({ isVisible }: { isVisible: boolean }) {
  const [step, setStep] = useState(0);
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setStep(0);
      setProgress1(0);
      setProgress2(0);
      return;
    }

    // step 0: show command
    const t0 = setTimeout(() => setStep(1), 600);
    return () => clearTimeout(t0);
  }, [isVisible]);

  // Progress bar 1 animation
  useEffect(() => {
    if (step < 1) return;
    if (progress1 >= 20) {
      setStep(2);
      return;
    }
    const t = setTimeout(() => setProgress1((p) => p + 1), 40);
    return () => clearTimeout(t);
  }, [step, progress1]);

  // Progress bar 2 animation
  useEffect(() => {
    if (step < 2) return;
    if (progress2 >= 12) {
      // Show checkmarks sequentially
      const t1 = setTimeout(() => setStep(3), 400);
      return () => clearTimeout(t1);
    }
    const t = setTimeout(() => setProgress2((p) => p + 1), 60);
    return () => clearTimeout(t);
  }, [step, progress2]);

  useEffect(() => {
    if (step === 3) {
      const t = setTimeout(() => setStep(4), 500);
      return () => clearTimeout(t);
    }
  }, [step]);

  const bar1 = "\u2588".repeat(progress1) + "\u2591".repeat(20 - progress1);
  const bar2 = "\u2588".repeat(progress2) + "\u2591".repeat(20 - progress2);

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-700/50 bg-zinc-950/80 backdrop-blur-sm">
      {/* Terminal title bar */}
      <div className="flex items-center gap-1.5 border-b border-zinc-800 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        <span className={`ml-2 text-xs text-zinc-600 ${MONO}`}>designmaker</span>
      </div>
      <div className={`space-y-1 p-4 text-xs leading-relaxed ${MONO}`}>
        <div>
          <span className="text-emerald-500">$</span>{" "}
          <span className="text-zinc-300">designmaker --scan</span>
          {step === 0 && <span className="animate-cursor-blink text-emerald-400">_</span>}
        </div>
        {step >= 1 && (
          <div className="text-zinc-400">
            {bar1} <span className="text-emerald-400">800</span> sites crawled
          </div>
        )}
        {step >= 2 && (
          <div className="text-zinc-400">
            {bar2}
            <span className="text-zinc-500">{"\u2591".repeat(8)}</span>{" "}
            analyzing patterns...
          </div>
        )}
        {step >= 3 && (
          <div className="text-emerald-400">
            [<span className="text-emerald-300">{"\u2713"}</span>] 20 references generated
          </div>
        )}
        {step >= 4 && (
          <div className="text-emerald-400">
            [<span className="text-emerald-300">{"\u2713"}</span>] ready to build
          </div>
        )}
      </div>
    </div>
  );
}

export default function HeroSection({
  referenceCount,
}: {
  referenceCount: number;
}) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setIsVisible(false);
      // Force re-trigger by setting visible in next frame
      requestAnimationFrame(() => setIsVisible(true));
    }
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleVisibility, {
      threshold: 0.3,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleVisibility]);

  const titleLines = [
    "Design References",
    `> ${referenceCount} curated references from 800+ sites`,
  ];

  const { displayedLines, done } = useTypingAnimation(
    titleLines,
    50,
    400,
    isVisible
  );

  return (
    <div ref={heroRef} className="relative mb-12 overflow-hidden py-12 sm:py-16">
      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-2">
        {/* Left: Title + Stats */}
        <div>
          {/* Typing title */}
          <div className="mb-6 min-h-[5rem]">
            {displayedLines[0] !== undefined && (
              <h1
                className={`${HEADING} text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl`}
              >
                {displayedLines[0]}
                {displayedLines.length === 1 && !done && (
                  <span className="animate-cursor-blink text-emerald-400">|</span>
                )}
              </h1>
            )}
            {displayedLines[1] !== undefined && (
              <p className={`mt-3 text-sm text-zinc-500 ${MONO}`}>
                <span className="text-emerald-500">{displayedLines[1].slice(0, 2)}</span>
                {displayedLines[1].slice(2)}
                {done && (
                  <span className="animate-cursor-blink text-emerald-400">|</span>
                )}
              </p>
            )}
          </div>

          {/* SYS message */}
          <p className={`mb-6 text-sm text-zinc-500 ${MONO}`}>
            <span className="text-emerald-500">[SYS]</span> {referenceCount} references
            loaded. Ready.
          </p>

          {/* Stats line */}
          <div
            className={`inline-flex flex-wrap gap-x-4 gap-y-1 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-xs text-zinc-500 ${MONO}`}
          >
            <span>
              <span className="text-emerald-400">800+</span> sites
            </span>
            <span className="text-zinc-700">|</span>
            <span>
              <span className="text-emerald-400">{referenceCount}</span> references
            </span>
            <span className="text-zinc-700">|</span>
            <span>
              <span className="text-emerald-400">27</span> constraints
            </span>
            <span className="text-zinc-700">|</span>
            <span>
              <span className="text-emerald-400">8</span> batches
            </span>
          </div>
        </div>

        {/* Right: Terminal + floating cards */}
        <div className="relative">
          {/* Floating cards */}
          <FloatingCard
            className="left-[-1rem] top-[-0.5rem] z-20 sm:left-[-2rem] sm:top-[-1rem]"
            delay={0}
            duration={4}
          >
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="h-3 w-3 rounded-full bg-blue-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-violet-400" />
            </div>
          </FloatingCard>

          <FloatingCard
            className="right-[-0.5rem] top-[0.5rem] z-20 sm:right-[-1.5rem] sm:top-[0rem]"
            delay={0.5}
            duration={5}
          >
            <span className={`text-lg font-bold text-zinc-300 ${HEADING}`}>Aa</span>
          </FloatingCard>

          <FloatingCard
            className="bottom-[2rem] left-[-0.5rem] z-20 sm:bottom-[1rem] sm:left-[-1.5rem]"
            delay={1}
            duration={4.5}
          >
            <div className="grid grid-cols-3 gap-0.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-sm ${i < 4 ? "bg-emerald-500/60" : "bg-zinc-700"}`}
                />
              ))}
            </div>
          </FloatingCard>

          <FloatingCard
            className="bottom-[0.5rem] right-[0.5rem] z-20 sm:bottom-[-0.5rem] sm:right-[-0.5rem]"
            delay={1.5}
            duration={3.5}
          >
            <div className="h-4 w-10 rounded-sm bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500" />
          </FloatingCard>

          {/* Terminal block */}
          <div className="relative z-10">
            <TerminalBlock isVisible={isVisible} />
          </div>
        </div>
      </div>
    </div>
  );
}
