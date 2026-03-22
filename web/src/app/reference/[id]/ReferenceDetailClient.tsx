"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import type { Reference } from "@/app/data/references";
import type { DesignPalette } from "@/app/data/designPalettes";

function CopyableSwatch({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(color).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [color]);

  return (
    <button
      onClick={handleCopy}
      className="group flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-left transition-colors hover:border-accent-30"
    >
      <span
        className="h-8 w-8 rounded-md border border-zinc-700"
        style={{ backgroundColor: color }}
      />
      <div>
        <div className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-600 uppercase tracking-wider">{label}</div>
        <div className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-zinc-300">
          {copied ? "Copied!" : color}
        </div>
      </div>
    </button>
  );
}

function generateHarmonicPalettes(baseAccent: string, baseBg: string, baseText: string, tone: string): DesignPalette[] {
  function hexToHsl(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  }

  function hslToHex(h: number, s: number, l: number): string {
    h = ((h % 360) + 360) % 360;
    s = Math.max(0, Math.min(100, s)) / 100;
    l = Math.max(0, Math.min(100, l)) / 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  const [baseH, baseS, baseL] = hexToHsl(baseAccent);
  const isDark = tone === "dark";
  const palettes: DesignPalette[] = [];

  const variations = [
    { name: "Original", hShift: 0, sShift: 0, lShift: 0 },
    { name: "Lighter", hShift: 0, sShift: -10, lShift: 15 },
    { name: "Deeper", hShift: 0, sShift: 10, lShift: -15 },
    { name: "Analogous 1", hShift: 30, sShift: 0, lShift: 0 },
    { name: "Analogous 2", hShift: -30, sShift: 0, lShift: 0 },
    { name: "Complementary", hShift: 180, sShift: 0, lShift: 0 },
    { name: "Triad 1", hShift: 120, sShift: -5, lShift: 5 },
    { name: "Triad 2", hShift: 240, sShift: -5, lShift: 5 },
    { name: "Warm", hShift: -60, sShift: 15, lShift: 0 },
    { name: "Cool", hShift: 60, sShift: 15, lShift: 0 },
    { name: "Desaturated", hShift: 0, sShift: -30, lShift: 5 },
    { name: "Vivid", hShift: 0, sShift: 25, lShift: -5 },
  ];

  variations.forEach((v, i) => {
    const accent = hslToHex(baseH + v.hShift, baseS + v.sShift, baseL + v.lShift);
    const bg = isDark ? "#09090b" : "#ffffff";
    const text = isDark ? "#fafafa" : "#09090b";
    palettes.push({
      id: `gen-${i}`,
      name: v.name,
      accent,
      bg,
      text,
      category: "generated" as any,
    });
  });

  return palettes;
}

export default function ReferenceDetailClient({
  reference,
  sampleExists,
}: {
  reference: Reference;
  sampleExists: boolean;
}) {
  const r = reference;
  const defaultTextColor = r.tone === "dark" ? "#fafafa" : "#09090b";
  const textColor = defaultTextColor;
  const mutedColor = r.tone === "dark" ? "#71717a" : "#a1a1aa";

  const samplePath = r.sampleFile ? `/samples/${r.sampleFile}` : null;

  // Customizer state
  const [customAccent, setCustomAccent] = useState(r.accent);
  const [customBg, setCustomBg] = useState(r.bg);
  const [customText, setCustomText] = useState(defaultTextColor);
  const [htmlContent, setHtmlContent] = useState("");
  const [isCustomizing, setIsCustomizing] = useState(false);

  // Palette state
  const [activePaletteId, setActivePaletteId] = useState<string | null>(null);

  const generatedPalettes = useMemo(
    () => generateHarmonicPalettes(r.accent, r.bg, defaultTextColor, r.tone),
    [r.accent, r.bg, defaultTextColor, r.tone]
  );

  useEffect(() => {
    if (r.sampleFile) {
      fetch(`/samples/${r.sampleFile}`)
        .then((res) => res.text())
        .then((html) => setHtmlContent(html))
        .catch(() => setHtmlContent(""));
    }
  }, [r.sampleFile]);

  const applyPalette = useCallback(
    (palette: DesignPalette) => {
      setCustomAccent(palette.accent);
      setCustomBg(palette.bg);
      setCustomText(palette.text);
      setActivePaletteId(palette.id);
    },
    []
  );

  const resetColors = useCallback(() => {
    setCustomAccent(r.accent);
    setCustomBg(r.bg);
    setCustomText(defaultTextColor);
    setActivePaletteId(null);
  }, [r.accent, r.bg, defaultTextColor]);

  const customizedHtml = useMemo(() => {
    if (!htmlContent) return "";
    let html = htmlContent;
    if (customAccent !== r.accent) {
      html = html.replaceAll(r.accent, customAccent);
    }
    if (customBg !== r.bg) {
      html = html.replaceAll(r.bg, customBg);
    }
    if (customText !== defaultTextColor) {
      html = html.replaceAll(defaultTextColor, customText);
    }
    return html;
  }, [htmlContent, customAccent, customBg, customText, r.accent, r.bg, defaultTextColor]);

  const hasCustomChanges = customAccent !== r.accent || customBg !== r.bg || customText !== defaultTextColor;

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      {/* Left: Preview */}
      <div className="flex-1 border-b border-zinc-800 p-4 lg:border-b-0 lg:border-r lg:p-6" style={{ minHeight: "70vh" }}>
        {sampleExists && samplePath ? (
          <div className="h-full overflow-hidden rounded-lg border border-zinc-800 bg-white">
            {hasCustomChanges && customizedHtml ? (
              <iframe
                srcDoc={customizedHtml}
                className="h-full w-full"
                title={`${r.name} customized preview`}
                style={{ minHeight: "60vh" }}
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <iframe
                src={samplePath}
                className="h-full w-full"
                title={`${r.name} preview`}
                style={{ minHeight: "60vh" }}
              />
            )}
          </div>
        ) : (
          <div className="flex h-full min-h-[60vh] items-center justify-center rounded-lg border border-dashed border-zinc-800 bg-zinc-900/50">
            <div className="text-center">
              <div className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-4xl text-zinc-700">&gt;_</div>
              <p className="font-[family-name:var(--font-jetbrains-mono)] text-lg font-medium text-zinc-500">
                Sample not yet generated
              </p>
              <p className="mt-1 font-[family-name:var(--font-jetbrains-mono)] text-sm text-zinc-600">
                Run ./generate to create an HTML sample.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Right: Details */}
      <div className="w-full shrink-0 space-y-6 overflow-y-auto p-4 lg:w-[40%] lg:p-6">
        {/* Header */}
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">
              {r.name}
            </h1>
            <span className="rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-500">
              {r.id}
            </span>
          </div>
          <p className="text-base text-zinc-400">{r.description}</p>
        </div>

        {/* Status + open in new tab */}
        <div className="flex items-center gap-3">
          {r.status === "verified" ? (
            <span className="inline-flex items-center gap-1.5 rounded border border-accent-30 bg-accent-10 px-3 py-1 font-[family-name:var(--font-jetbrains-mono)] text-sm text-accent-light">
              <span className="h-2 w-2 rounded-full animate-pulse-dot" style={{ backgroundColor: "var(--accent-light)" }} />
              verified
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded border border-zinc-700 bg-zinc-800 px-3 py-1 font-[family-name:var(--font-jetbrains-mono)] text-sm text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-zinc-600" />
              draft
            </span>
          )}
          {sampleExists && samplePath && (
            <a
              href={samplePath}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-600 hover:text-accent-light transition-colors"
            >
              ↗ open in new tab
            </a>
          )}
        </div>

        {/* Commands */}
        <div className="rounded-lg border border-zinc-800 bg-[#0c0c0e] overflow-hidden">
          <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900/50 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-red-500/60" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
            <span className="ml-2 font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-zinc-600">refmade</span>
          </div>
          <div className="p-3 space-y-1">
            <a
              href={`/generate?ref=${r.id}&mode=prompt`}
              className="flex items-center gap-2 rounded px-2 py-1.5 font-[family-name:var(--font-jetbrains-mono)] text-sm transition-colors hover:bg-zinc-800 group"
            >
              <span className="text-emerald-500">$</span>
              <span className="text-zinc-300 group-hover:text-white">refmade export</span>
              <span className="text-zinc-600">--prompt</span>
              <span className="ml-auto rounded border border-emerald-800 bg-emerald-900/20 px-1.5 py-0.5 text-[10px] text-emerald-400">free</span>
            </a>
            <a
              href={`/generate?ref=${r.id}`}
              className="flex items-center gap-2 rounded px-2 py-1.5 font-[family-name:var(--font-jetbrains-mono)] text-sm transition-colors hover:bg-zinc-800 group"
            >
              <span className="text-emerald-500">$</span>
              <span className="text-zinc-300 group-hover:text-white">refmade generate</span>
              <span className="text-zinc-600">--conversation</span>
              <span className="ml-auto rounded border border-amber-800 bg-amber-900/20 px-1.5 py-0.5 text-[10px] text-amber-400">pro</span>
            </a>
            <a
              href={`/improve?ref=${r.id}`}
              className="flex items-center gap-2 rounded px-2 py-1.5 font-[family-name:var(--font-jetbrains-mono)] text-sm transition-colors hover:bg-zinc-800 group"
            >
              <span className="text-emerald-500">$</span>
              <span className="text-zinc-300 group-hover:text-white">refmade improve</span>
              <span className="text-zinc-600">--redesign</span>
              <span className="ml-auto rounded border border-amber-800 bg-amber-900/20 px-1.5 py-0.5 text-[10px] text-amber-400">pro</span>
            </a>
          </div>
        </div>

        {/* Palette */}
        {sampleExists && htmlContent && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold uppercase tracking-wider text-zinc-600">
                palette <span className="text-zinc-700">--variants</span>
              </h2>
              {hasCustomChanges && (
                <button
                  onClick={resetColors}
                  className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
                >
                  --reset
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {generatedPalettes.map((p) => (
                <button
                  key={p.id}
                  onClick={() => applyPalette(p)}
                  className={`group relative h-8 w-8 rounded-full border-2 transition-all duration-200 cursor-pointer hover:scale-110 ${
                    activePaletteId === p.id
                      ? "border-white ring-2 ring-white/20 scale-110"
                      : "border-zinc-700 hover:border-zinc-500"
                  }`}
                  style={{ backgroundColor: p.accent }}
                  title={p.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* Colors */}
        <div>
          <h2 className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold uppercase tracking-wider text-zinc-600">
            colors <span className="text-zinc-700">--current</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            <CopyableSwatch color={hasCustomChanges ? customBg : r.bg} label="bg" />
            <CopyableSwatch color={hasCustomChanges ? customText : textColor} label="text" />
            <CopyableSwatch color={hasCustomChanges ? customAccent : r.accent} label="accent" />
            <CopyableSwatch color={mutedColor} label="muted" />
          </div>
        </div>

        {/* Fine-tune */}
        {sampleExists && htmlContent && (
          <div>
            <button
              onClick={() => setIsCustomizing(!isCustomizing)}
              className="mb-3 font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold uppercase tracking-wider text-zinc-600 hover:text-accent-light transition-colors cursor-pointer"
            >
              fine-tune {isCustomizing ? "[-]" : "[+]"}
            </button>
            {isCustomizing && (
              <div className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customAccent}
                    onChange={(e) => { setCustomAccent(e.target.value); setActivePaletteId(null); }}
                    className="h-8 w-8 cursor-pointer rounded border border-zinc-700 bg-transparent"
                  />
                  <div>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-600">accent:</span>
                    <input
                      type="text"
                      value={customAccent}
                      onChange={(e) => { setCustomAccent(e.target.value); setActivePaletteId(null); }}
                      maxLength={7}
                      className="ml-2 w-20 rounded border border-zinc-700 bg-zinc-900 px-2 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-300 focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customBg}
                    onChange={(e) => { setCustomBg(e.target.value); setActivePaletteId(null); }}
                    className="h-8 w-8 cursor-pointer rounded border border-zinc-700 bg-transparent"
                  />
                  <div>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-600">background:</span>
                    <input
                      type="text"
                      value={customBg}
                      onChange={(e) => { setCustomBg(e.target.value); setActivePaletteId(null); }}
                      maxLength={7}
                      className="ml-2 w-20 rounded border border-zinc-700 bg-zinc-900 px-2 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-300 focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customText}
                    onChange={(e) => { setCustomText(e.target.value); setActivePaletteId(null); }}
                    className="h-8 w-8 cursor-pointer rounded border border-zinc-700 bg-transparent"
                  />
                  <div>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-600">text:</span>
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => { setCustomText(e.target.value); setActivePaletteId(null); }}
                      maxLength={7}
                      className="ml-2 w-20 rounded border border-zinc-700 bg-zinc-900 px-2 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-300 focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
                {hasCustomChanges && (
                  <button
                    onClick={resetColors}
                    className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
                  >
                    --reset-colors
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        <div>
          <h2 className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold uppercase tracking-wider text-zinc-600">
            tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {r.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-zinc-700 bg-zinc-800/50 px-3 py-1 font-[family-name:var(--font-jetbrains-mono)] text-sm text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Inspired-by */}
        <div>
          <h2 className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold uppercase tracking-wider text-zinc-600">
            inspired-by
          </h2>
          <div className="flex flex-wrap gap-2">
            {r.inspired.map((site) => (
              <a
                key={site}
                href={`https://${site}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 font-[family-name:var(--font-jetbrains-mono)] text-sm text-zinc-500 transition-colors hover:border-accent-30 hover:text-accent-light"
              >
                {site}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
