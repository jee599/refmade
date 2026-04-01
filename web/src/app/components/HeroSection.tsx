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

const TERMINAL_COMMANDS = [
  {
    cmd: "refmade --scan",
    steps: [
      { text: (p: number) => `${"\u2588".repeat(p)}${"\u2591".repeat(20 - p)} ${Math.round(p / 20 * 1000)}+ sites crawled`, maxProgress: 20, speed: 40, color: "text-zinc-400" },
      { text: () => "extracting design tokens...", static: true, delay: 300, color: "text-zinc-500" },
      { text: () => "  palette: 847 unique colors → 42 clusters", static: true, delay: 250, color: "text-zinc-400" },
      { text: () => "  typography: 156 font pairs analyzed", static: true, delay: 200, color: "text-zinc-400" },
      { text: () => "  layout: 23 grid patterns classified", static: true, delay: 200, color: "text-zinc-400" },
      { text: () => `[\u2713] 42 references generated`, static: true, delay: 400, color: "text-accent-light" },
    ],
  },
  {
    cmd: "refmade --diff 074-stripe 075-linear",
    steps: [
      { text: () => "comparing design systems...", static: true, delay: 300, color: "text-zinc-500" },
      { text: () => "  hero: gradient-mesh vs radial-glow", static: true, delay: 250, color: "text-zinc-400" },
      { text: () => "  palette: #635bff (warm) vs #5e6ad2 (cool)", static: true, delay: 250, color: "text-zinc-400" },
      { text: () => "  cards: shadow-lift vs border-reveal", static: true, delay: 250, color: "text-zinc-400" },
      { text: () => "  nav: scroll-blur vs fixed-island", static: true, delay: 250, color: "text-zinc-400" },
      { text: () => `[\u2713] divergence score: 0.73 (high)`, static: true, delay: 400, color: "text-accent-light" },
    ],
  },
  {
    cmd: "refmade --generate --ref 054-aurora-dark",
    steps: [
      { text: () => "loading 054-aurora-dark.md...", static: true, delay: 200, color: "text-zinc-500" },
      { text: () => "  tone: atmospheric-dark", static: true, delay: 150, color: "text-zinc-400" },
      { text: () => "  palette: #030712 #10B981 #14B8A6 #3B82F6", static: true, delay: 200, color: "text-zinc-400" },
      { text: () => "  font: Plus Jakarta Sans 700 -0.03em", static: true, delay: 200, color: "text-zinc-400" },
      { text: () => "  blobs: 4x blur(120px) mix-blend:screen", static: true, delay: 200, color: "text-zinc-400" },
      { text: (p: number) => `${"\u2588".repeat(p)}${"\u2591".repeat(18 - p)} rendering sections...`, maxProgress: 18, speed: 35, color: "text-zinc-400" },
      { text: () => `[\u2713] 054-aurora-dark.html (21.3KB)`, static: true, delay: 400, color: "text-accent-light" },
    ],
  },
  {
    cmd: "refmade --improve https://mysite.com",
    steps: [
      { text: () => "fetching site...", static: true, delay: 300, color: "text-zinc-500" },
      { text: (p: number) => `${"\u2588".repeat(p)}${"\u2591".repeat(14 - p)} scoring against 27 rules`, maxProgress: 14, speed: 55, color: "text-zinc-400" },
      { text: () => "score: 6.2/10", static: true, delay: 400, color: "text-yellow-500" },
      { text: () => "[!] uniform card sizes (-1.0)", static: true, delay: 200, color: "text-red-400" },
      { text: () => "[!] missing hover states (-0.8)", static: true, delay: 200, color: "text-red-400" },
      { text: () => "[!] h1/body ratio 1.8x (need 3x) (-1.0)", static: true, delay: 200, color: "text-red-400" },
      { text: () => `[\u2713] closest match: 074-stripe (0.68)`, static: true, delay: 300, color: "text-accent-light" },
      { text: () => `[\u2713] suggested fix: apply 074 + bento grid`, static: true, delay: 400, color: "text-accent-light" },
    ],
  },
  {
    cmd: "refmade --extract stripe.com",
    steps: [
      { text: () => "crawling stripe.com...", static: true, delay: 300, color: "text-zinc-500" },
      { text: (p: number) => `${"\u2588".repeat(p)}${"\u2591".repeat(16 - p)} extracting CSS tokens`, maxProgress: 16, speed: 45, color: "text-zinc-400" },
      { text: () => "  bg: #0a2540 | accent: #635bff #00d4aa", static: true, delay: 250, color: "text-zinc-400" },
      { text: () => "  font: system-ui 700 -0.035em", static: true, delay: 200, color: "text-zinc-400" },
      { text: () => "  hero: gradient-mesh (5 radial stops)", static: true, delay: 200, color: "text-zinc-400" },
      { text: () => "  sections: 9 | avg-padding: py-24", static: true, delay: 200, color: "text-zinc-400" },
      { text: () => `[\u2713] saved as 074-stripe.md`, static: true, delay: 400, color: "text-accent-light" },
    ],
  },
  {
    cmd: "refmade --analyze 062-tactical-telemetry",
    steps: [
      { text: () => "loading constraint checker...", static: true, delay: 200, color: "text-zinc-500" },
      { text: (p: number) => `${"\u2588".repeat(p)}${"\u2591".repeat(12 - p)} validating 27 rules`, maxProgress: 12, speed: 50, color: "text-zinc-400" },
      { text: () => `[\u2713] h1 60px / body 14px = 4.3x ratio`, static: true, delay: 250, color: "text-accent-light" },
      { text: () => `[\u2713] 0 border-radius (brutalist)`, static: true, delay: 250, color: "text-accent-light" },
      { text: () => `[\u2713] scanline overlay present`, static: true, delay: 250, color: "text-accent-light" },
      { text: () => `[\u2713] 5 padding variations detected`, static: true, delay: 250, color: "text-accent-light" },
      { text: () => `[\u2713] score: 9.4/10 — production ready`, static: true, delay: 400, color: "text-accent-light" },
    ],
  },
  {
    cmd: "refmade --batch --refs 074..083",
    steps: [
      { text: () => "batch mode: 10 references queued", static: true, delay: 200, color: "text-zinc-500" },
      { text: () => "  074-stripe ........... \u2713 (18.7KB)", static: true, delay: 150, color: "text-accent-light" },
      { text: () => "  075-linear ........... \u2713 (15.5KB)", static: true, delay: 150, color: "text-accent-light" },
      { text: () => "  076-vercel ........... \u2713 (17.5KB)", static: true, delay: 150, color: "text-accent-light" },
      { text: () => "  077-notion ........... \u2713 (16.8KB)", static: true, delay: 150, color: "text-accent-light" },
      { text: () => "  078-raycast .......... \u2713 (20.6KB)", static: true, delay: 150, color: "text-accent-light" },
      { text: (p: number) => `${"\u2588".repeat(p)}${"\u2591".repeat(10 - p)} 079-083 generating...`, maxProgress: 10, speed: 60, color: "text-zinc-400" },
      { text: () => `[\u2713] 10/10 complete — 187KB total`, static: true, delay: 400, color: "text-accent-light" },
    ],
  },
  {
    cmd: "refmade --taste-profile",
    steps: [
      { text: () => "analyzing your preferences...", static: true, delay: 200, color: "text-zinc-500" },
      { text: () => "  tone.dark: 0.62 ████████████░░░░", static: true, delay: 250, color: "text-zinc-400" },
      { text: () => "  tone.light: 0.38 ███████░░░░░░░░░", static: true, delay: 250, color: "text-zinc-400" },
      { text: () => "  style.minimal: 0.44 ████████░░░░░░░░", static: true, delay: 250, color: "text-zinc-400" },
      { text: () => "  style.glass: 0.28 █████░░░░░░░░░░░", static: true, delay: 250, color: "text-zinc-400" },
      { text: () => "  avoid: [earthy, retro-pixel, pastel]", static: true, delay: 250, color: "text-red-400/70" },
      { text: () => `[\u2713] taste vector saved — 7 anchors`, static: true, delay: 400, color: "text-accent-light" },
    ],
  },
  {
    cmd: "refmade --refine 063-supanova-korean",
    steps: [
      { text: () => "fetching inspired_by sites...", static: true, delay: 200, color: "text-zinc-500" },
      { text: () => "  toss.im → Pretendard 700, keep-all", static: true, delay: 250, color: "text-zinc-400" },
      { text: () => "  channel.io → cyan accent, blur nav", static: true, delay: 250, color: "text-zinc-400" },
      { text: () => "  wadiz.kr → asymmetric hero, metric cards", static: true, delay: 250, color: "text-zinc-400" },
      { text: (p: number) => `${"\u2588".repeat(p)}${"\u2591".repeat(16 - p)} regenerating HTML...`, maxProgress: 16, speed: 40, color: "text-zinc-400" },
      { text: () => `[\u2713] 063-supanova-korean.html (24.1KB)`, static: true, delay: 300, color: "text-accent-light" },
      { text: () => `[\u2713] DESIGN_VARIANCE: 8 — all unique`, static: true, delay: 400, color: "text-accent-light" },
    ],
  },
  {
    cmd: "refmade --stats",
    steps: [
      { text: () => "computing catalog stats...", static: true, delay: 200, color: "text-zinc-500" },
      { text: () => "  references: 42 (28 dark, 14 light)", static: true, delay: 200, color: "text-zinc-400" },
      { text: () => "  avg score: 8.7/10", static: true, delay: 200, color: "text-zinc-400" },
      { text: () => "  top fonts: Geist, Plus Jakarta, Inter", static: true, delay: 200, color: "text-zinc-400" },
      { text: () => "  top patterns: bento, split-hero, glass", static: true, delay: 200, color: "text-zinc-400" },
      { text: () => "  constraints: 27 active, 0 violations", static: true, delay: 200, color: "text-zinc-400" },
      { text: () => "  total HTML: 1.2MB across 42 samples", static: true, delay: 200, color: "text-zinc-400" },
      { text: () => `[\u2713] catalog health: excellent`, static: true, delay: 400, color: "text-accent-light" },
    ],
  },
];

type TerminalStep = {
  text: (p: number) => string;
  maxProgress?: number;
  speed?: number;
  static?: boolean;
  delay?: number;
  color: string;
};

function TerminalBlock({ isVisible }: { isVisible: boolean }) {
  const [cmdIndex, setCmdIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<{ text: string; color: string }[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanup = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  // Reset on visibility change
  useEffect(() => {
    if (!isVisible) {
      cleanup();
      setCmdIndex(0);
      setStepIndex(-1);
      setProgress(0);
      setVisibleSteps([]);
      setShowCursor(true);
    } else {
      timerRef.current = setTimeout(() => setStepIndex(0), 600);
    }
    return cleanup;
  }, [isVisible, cleanup]);

  // Process steps
  useEffect(() => {
    if (!isVisible || stepIndex < 0) return;

    const cmd = TERMINAL_COMMANDS[cmdIndex];
    if (!cmd) return;

    // All steps done for this command → pause then next command
    if (stepIndex >= cmd.steps.length) {
      timerRef.current = setTimeout(() => {
        const nextCmd = (cmdIndex + 1) % TERMINAL_COMMANDS.length;
        setCmdIndex(nextCmd);
        setStepIndex(-1);
        setProgress(0);
        setVisibleSteps([]);
        // Small pause before typing next command
        timerRef.current = setTimeout(() => setStepIndex(0), 800);
      }, 2000);
      return () => cleanup();
    }

    const step: TerminalStep = cmd.steps[stepIndex];

    if (step.static) {
      timerRef.current = setTimeout(() => {
        setVisibleSteps((prev) => [...prev, { text: step.text(0), color: step.color }]);
        setStepIndex((s) => s + 1);
      }, step.delay || 300);
      return () => cleanup();
    }

    // Progress bar step
    const max = step.maxProgress || 20;
    if (progress >= max) {
      setVisibleSteps((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { text: step.text(max), color: step.color };
        return updated;
      });
      setProgress(0);
      setStepIndex((s) => s + 1);
      return;
    }

    if (progress === 0) {
      setVisibleSteps((prev) => [...prev, { text: step.text(0), color: step.color }]);
    }

    timerRef.current = setTimeout(() => {
      const newP = progress + 1;
      setProgress(newP);
      setVisibleSteps((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { text: step.text(newP), color: step.color };
        return updated;
      });
    }, step.speed || 40);

    return () => cleanup();
  }, [isVisible, cmdIndex, stepIndex, progress, cleanup]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  const cmd = TERMINAL_COMMANDS[cmdIndex];

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-700/50 bg-zinc-950/80 backdrop-blur-sm">
      <div className="flex items-center gap-1.5 border-b border-zinc-800 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        <span className={`ml-2 text-xs text-zinc-600 ${MONO}`}>refmade</span>
      </div>
      <div className={`space-y-1 p-4 text-xs leading-relaxed ${MONO}`} style={{ minHeight: "180px" }}>
        <div>
          <span className="text-accent">$</span>{" "}
          <span className="text-zinc-300">{cmd?.cmd}</span>
          {stepIndex < 0 && showCursor && <span className="text-accent-light">_</span>}
        </div>
        {visibleSteps.map((s, i) => (
          <div key={`${cmdIndex}-${i}`} className={s.color}>
            {s.text}
          </div>
        ))}
        {stepIndex >= 0 && stepIndex < (cmd?.steps.length || 0) && (
          <span className={`text-accent-light ${showCursor ? "opacity-100" : "opacity-0"}`}>_</span>
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

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const titleLines = [
    "Design References",
    `> ${referenceCount} curated references from 1000+ sites`,
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

          <p className={`mb-6 text-sm text-zinc-500 ${MONO}`}>
            <span className="text-accent">[SYS]</span> {referenceCount} references
            loaded. Ready.
          </p>

          <div
            className={`inline-flex flex-wrap gap-x-4 gap-y-1 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-xs text-zinc-500 ${MONO}`}
          >
            <span>
              <span className="text-accent-light">1000+</span> sites
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

        {/* Right: Terminal — continuously cycles through commands */}
        <div>
          <TerminalBlock isVisible={isVisible} />
        </div>
      </div>
    </div>
  );
}
