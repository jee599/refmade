"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import type { Reference } from "@/app/data/references";
import {
  designPalettes,
  paletteCategories,
  type PaletteCategory,
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
      className={`group flex flex-col gap-1.5 rounded-lg border p-2 transition-all duration-200 cursor-pointer ${
        isActive
          ? "border-accent bg-accent-10"
          : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-900"
      }`}
      style={isActive ? { outlineColor: "var(--accent)" } : undefined}
      title={palette.name}
    >
      {/* Color preview bar */}
      <div className="flex h-6 w-full overflow-hidden rounded-md">
        <div className="flex-1" style={{ backgroundColor: palette.bg }} />
        <div className="w-5" style={{ backgroundColor: palette.accent }} />
        <div className="flex-1" style={{ backgroundColor: palette.text }} />
      </div>
      {/* Name */}
      <span className="truncate font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-zinc-500 group-hover:text-zinc-400">
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

  // Prompt panel state
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [promptLoading, setPromptLoading] = useState(false);
  const [siteDescription, setSiteDescription] = useState("");
  const [promptCopied, setPromptCopied] = useState(false);

  // Palette state
  const [activePaletteId, setActivePaletteId] = useState<string | null>(null);
  const [paletteCategory, setPaletteCategory] = useState<PaletteCategory | "all">("all");

  const filteredPalettes = useMemo(
    () =>
      paletteCategory === "all"
        ? designPalettes
        : designPalettes.filter((p) => p.category === paletteCategory),
    [paletteCategory]
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
                // palettes
                <span className="ml-2 text-zinc-700">({designPalettes.length})</span>
              </h2>
              {hasCustomChanges && (
                <button
                  onClick={resetColors}
                  className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
                >
                  reset
                </button>
              )}
            </div>

            {/* Category filter */}
            <div className="mb-3 flex flex-wrap gap-1">
              <button
                onClick={() => setPaletteCategory("all")}
                className={`rounded-md px-2 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-[10px] transition-colors cursor-pointer ${
                  paletteCategory === "all"
                    ? "bg-accent-10 text-accent-light border border-accent-30"
                    : "text-zinc-600 border border-zinc-800 hover:text-zinc-400 hover:border-zinc-700"
                }`}
              >
                all
              </button>
              {paletteCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setPaletteCategory(cat.id)}
                  className={`rounded-md px-2 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-[10px] transition-colors cursor-pointer ${
                    paletteCategory === cat.id
                      ? "bg-accent-10 text-accent-light border border-accent-30"
                      : "text-zinc-600 border border-zinc-800 hover:text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Palette grid */}
            <div className="grid grid-cols-3 gap-1.5 max-h-[280px] overflow-y-auto pr-1">
              {filteredPalettes.map((p) => (
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
            // current colors
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
              // fine-tune {isCustomizing ? "[-]" : "[+]"}
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
                    $ reset --colors
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        <div>
          <h2 className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold uppercase tracking-wider text-zinc-600">
            // tags
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
            // inspired_by
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
              $ open --preview
            </a>
            {htmlContent && (
              <button
                onClick={handleDownloadRef}
                className="inline-flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700 cursor-pointer"
              >
                $ download{activePaletteId ? ` --palette ${activePaletteId}` : ` --ref ${r.id}`}
              </button>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="space-y-4 pt-2">
          {/* Site description input */}
          <div>
            <label className="mb-2 block font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold uppercase tracking-wider text-zinc-600">
              // site description
            </label>
            <textarea
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              placeholder="AI 기반 프로젝트 관리 도구의 랜딩 페이지"
              rows={3}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-sm text-zinc-100 placeholder:text-zinc-600 transition-all duration-200 focus:border-accent focus:outline-none resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={async () => {
                if (!siteDescription.trim()) return;
                setPromptLoading(true);
                setShowPrompt(false);
                try {
                  const res = await fetch("/api/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      referenceId: r.id,
                      description: siteDescription.trim(),
                      brandColor: hasCustomChanges ? customAccent : r.accent,
                      format: "prompt",
                    }),
                  });
                  const text = await res.text();
                  setPromptText(text);
                  setShowPrompt(true);
                } catch {
                  setPromptText("프롬프트 생성에 실패했습니다.");
                  setShowPrompt(true);
                } finally {
                  setPromptLoading(false);
                }
              }}
              disabled={promptLoading || !siteDescription.trim()}
              className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium text-zinc-950 transition-colors hover:bg-accent-60 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {promptLoading ? "generating..." : "$ export --prompt"}
            </button>
            <a
              href={`/generate?ref=${r.id}`}
              className="inline-flex items-center justify-center rounded-lg border border-accent-30 bg-accent-10 px-4 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium text-accent-light transition-colors hover:bg-accent-20"
            >
              $ generate --conversation
            </a>
            <a
              href="/improve"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700"
            >
              $ improve --redesign
            </a>
          </div>

          {/* Prompt output panel */}
          {showPrompt && promptText && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold uppercase tracking-wider text-zinc-600">
                  // generated prompt
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(promptText);
                    setPromptCopied(true);
                    setTimeout(() => setPromptCopied(false), 2000);
                  }}
                  className="rounded-md border border-accent-30 bg-accent-10 px-3 py-1.5 font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium text-accent-light transition-all duration-200 hover:bg-accent-20 cursor-pointer"
                >
                  {promptCopied ? "copied!" : "copy"}
                </button>
              </div>
              <div className="rounded-lg border border-accent-30 bg-accent-10 px-4 py-3 font-[family-name:var(--font-jetbrains-mono)] text-xs text-accent-light">
                이 프롬프트를 Claude, ChatGPT 등 AI에 붙여넣으세요.
              </div>
              <pre className="max-h-[400px] overflow-auto rounded-lg border border-zinc-800 bg-[#0c0c0e] p-4 font-[family-name:var(--font-jetbrains-mono)] text-xs leading-relaxed text-zinc-300 whitespace-pre-wrap break-words">
                {promptText}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
