"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const MONO = "font-[family-name:var(--font-jetbrains-mono)]";
const HEADING = "font-[family-name:var(--font-space-grotesk)]";

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
      setDisplayedLines((prev) => prev.length === 0 ? prev : []);
      setCurrentLine((prev) => prev === 0 ? prev : 0);
      setCurrentChar((prev) => prev === 0 ? prev : 0);
      setDone((prev) => prev === false ? prev : false);
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
        <span className={`ml-2 text-xs text-zinc-600 ${MONO}`}>refmade</span>
      </div>
      <div className={`space-y-1 p-4 text-xs leading-relaxed ${MONO}`}>
        <div>
          <span className="text-accent">$</span>{" "}
          <span className="text-zinc-300">refmade --scan</span>
          {step === 0 && <span className="text-accent-light animate-cursor-blink">_</span>}
        </div>
        {step >= 1 && (
          <div className="text-zinc-400">
            {bar1} <span className="text-accent-light">800</span> sites crawled
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
          <div className="text-accent-light">
            [<span style={{ color: "var(--accent-light)" }}>{"\u2713"}</span>] 20 references generated
          </div>
        )}
        {step >= 4 && (
          <div className="text-accent-light">
            [<span style={{ color: "var(--accent-light)" }}>{"\u2713"}</span>] ready to build
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
                  <span className="text-accent-light animate-cursor-blink">|</span>
                )}
              </h1>
            )}
            {displayedLines[1] !== undefined && (
              <p className={`mt-3 text-sm text-zinc-500 ${MONO}`}>
                <span className="text-accent">{displayedLines[1].slice(0, 2)}</span>
                {displayedLines[1].slice(2)}
                {done && (
                  <span className="text-accent-light animate-cursor-blink">|</span>
                )}
              </p>
            )}
          </div>

          {/* SYS message */}
          <p className={`mb-6 text-sm text-zinc-500 ${MONO}`}>
            <span className="text-accent">[SYS]</span> {referenceCount} references
            loaded. Ready.
          </p>

          {/* Stats line */}
          <div
            className={`inline-flex flex-wrap gap-x-4 gap-y-1 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-xs text-zinc-500 ${MONO}`}
          >
            <span>
              <span className="text-accent-light">800+</span> sites
            </span>
            <span className="text-zinc-700">|</span>
            <span>
              <span className="text-accent-light">{referenceCount}</span> references
            </span>
            <span className="text-zinc-700">|</span>
            <span>
              <span className="text-accent-light">27</span> constraints
            </span>
            <span className="text-zinc-700">|</span>
            <span>
              <span className="text-accent-light">8</span> batches
            </span>
          </div>
        </div>

        {/* Right: Terminal */}
        <div>
          <TerminalBlock isVisible={isVisible} />
        </div>
      </div>
    </div>
  );
}
