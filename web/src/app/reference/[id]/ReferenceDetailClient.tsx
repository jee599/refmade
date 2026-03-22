"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import type { Reference } from "@/app/data/references";
import {
  designPalettes,
  type DesignPalette,
} from "@/app/data/designPalettes";

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

function PaletteCard({
  palette,
  isActive,
  onSelect,
}: {
  palette: DesignPalette;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`group flex flex-col gap-1 rounded-lg border p-2 transition-all duration-200 cursor-pointer shrink-0 w-[80px] ${
        isActive
          ? "border-accent bg-accent-10"
          : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-900"
      }`}
      style={isActive ? { outlineColor: "var(--accent)" } : undefined}
      title={palette.name}
    >
      <div className="flex h-5 w-full overflow-hidden rounded-md">
        <div className="flex-1" style={{ backgroundColor: palette.bg }} />
        <div className="w-4" style={{ backgroundColor: palette.accent }} />
        <div className="flex-1" style={{ backgroundColor: palette.text }} />
      </div>
      <span className="truncate w-full font-[family-name:var(--font-jetbrains-mono)] text-[9px] text-zinc-500 group-hover:text-zinc-400">
        {palette.name}
      </span>
    </button>
  );
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
  const subtleColor = r.tone === "dark" ? "#18181b" : "#f4f4f5";

  const samplePath = r.sampleFile ? `/samples/${r.sampleFile}` : null;

  // Customizer state
  const [customAccent, setCustomAccent] = useState(r.accent);
  const [customBg, setCustomBg] = useState(r.bg);
  const [customText, setCustomText] = useState(defaultTextColor);
  const [htmlContent, setHtmlContent] = useState("");
  const [isCustomizing, setIsCustomizing] = useState(false);

  // Palette state
  const [activePaletteId, setActivePaletteId] = useState<string | null>(null);

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

  const handleDownloadRef = () => {
    const content = hasCustomChanges && customizedHtml ? customizedHtml : htmlContent;
    if (!content) return;
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${r.id}-${r.name.toLowerCase().replace(/\s+/g, "-")}${activePaletteId ? `-${activePaletteId}` : ""}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

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
          <p className="text-sm text-zinc-400">{r.description}</p>
        </div>

        {/* Status */}
        <div>
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
        </div>

        {/* ── Color Palettes ── */}
        {sampleExists && htmlContent && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold uppercase tracking-wider text-zinc-600">
                팔레트
                <span className="ml-2 text-zinc-700">({designPalettes.length})</span>
              </h2>
              {hasCustomChanges && (
                <button
                  onClick={resetColors}
                  className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
                >
                  초기화
                </button>
              )}
            </div>

            {/* Palette strip */}
            <div
              className="flex gap-2 overflow-x-auto pb-2 cursor-grab active:cursor-grabbing select-none"
              style={{ scrollbarWidth: 'thin' }}
              onMouseDown={(e) => {
                const el = e.currentTarget;
                const startX = e.pageX - el.offsetLeft;
                const scrollLeft = el.scrollLeft;

                const onMouseMove = (e: MouseEvent) => {
                  const x = e.pageX - el.offsetLeft;
                  el.scrollLeft = scrollLeft - (x - startX);
                };

                const onMouseUp = () => {
                  document.removeEventListener('mousemove', onMouseMove);
                  document.removeEventListener('mouseup', onMouseUp);
                };

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
              }}
            >
              {designPalettes.map((p) => (
                <PaletteCard
                  key={p.id}
                  palette={p}
                  isActive={activePaletteId === p.id}
                  onSelect={() => applyPalette(p)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Current Palette Display */}
        <div>
          <h2 className="mb-3 font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold uppercase tracking-wider text-zinc-600">
            현재 색상
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <CopyableSwatch color={hasCustomChanges ? customBg : r.bg} label="bg" />
            <CopyableSwatch color={hasCustomChanges ? customText : textColor} label="text" />
            <CopyableSwatch color={hasCustomChanges ? customAccent : r.accent} label="accent" />
            <CopyableSwatch color={subtleColor} label="subtle" />
            <CopyableSwatch color={mutedColor} label="muted" />
          </div>
        </div>

        {/* Manual Customizer */}
        {sampleExists && htmlContent && (
          <div>
            <button
              onClick={() => setIsCustomizing(!isCustomizing)}
              className="mb-3 font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold uppercase tracking-wider text-zinc-600 hover:text-accent-light transition-colors cursor-pointer"
            >
              색상 미세조정 {isCustomizing ? "[-]" : "[+]"}
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
                    색상 초기화
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        <div>
          <h2 className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold uppercase tracking-wider text-zinc-600">
            태그
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

        {/* Inspired by */}
        <div>
          <h2 className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold uppercase tracking-wider text-zinc-600">
            영감
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

        {/* Preview & Download */}
        {sampleExists && samplePath && (
          <div className="flex flex-col gap-2 pt-2">
            <a
              href={samplePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-accent-30 bg-accent-10 px-4 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium text-accent-light transition-colors hover:bg-accent-20"
            >
              미리보기
            </a>
            {htmlContent && (
              <button
                onClick={handleDownloadRef}
                className="inline-flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700 cursor-pointer"
              >
                다운로드
              </button>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-2">
          <a
            href={`/generate?ref=${r.id}&mode=prompt`}
            className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium text-zinc-950 transition-colors hover:opacity-90"
            style={{ backgroundColor: customAccent }}
          >
            프롬프트 받기 (무료)
          </a>
          <a
            href={`/generate?ref=${r.id}`}
            className="inline-flex items-center justify-center rounded-lg border px-4 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium transition-colors hover:opacity-80"
            style={{ borderColor: customAccent + '4d', backgroundColor: customAccent + '1a', color: customAccent }}
          >
            대화형식으로 고도화 (유료)
          </a>
          <a
            href={`/improve?ref=${r.id}`}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700"
          >
            특정 사이트 리디자인 (유료)
          </a>
        </div>
      </div>
    </div>
  );
}
