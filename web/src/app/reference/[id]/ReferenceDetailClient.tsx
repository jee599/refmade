"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import type { Reference } from "@/app/data/references";

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
      className="group flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-left transition-colors hover:border-emerald-500/30"
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

  useEffect(() => {
    if (r.sampleFile) {
      fetch(`/samples/${r.sampleFile}`)
        .then((res) => res.text())
        .then((html) => setHtmlContent(html))
        .catch(() => setHtmlContent(""));
    }
  }, [r.sampleFile]);

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
    a.download = `${r.id}-${r.name.toLowerCase().replace(/\s+/g, "-")}.html`;
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
      <div className="w-full shrink-0 space-y-6 p-4 lg:w-[40%] lg:p-6">
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
            <span className="inline-flex items-center gap-1.5 rounded border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-[family-name:var(--font-jetbrains-mono)] text-sm text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-dot" />
              verified
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded border border-zinc-700 bg-zinc-800 px-3 py-1 font-[family-name:var(--font-jetbrains-mono)] text-sm text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-zinc-600" />
              draft
            </span>
          )}
        </div>

        {/* Palette */}
        <div>
          <h2 className="mb-3 font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold uppercase tracking-wider text-zinc-600">
            // palette
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <CopyableSwatch color={r.bg} label="bg" />
            <CopyableSwatch color={textColor} label="text" />
            <CopyableSwatch color={r.accent} label="accent" />
            <CopyableSwatch color={subtleColor} label="subtle" />
            <CopyableSwatch color={mutedColor} label="muted" />
          </div>
        </div>

        {/* Customizer */}
        {sampleExists && htmlContent && (
          <div>
            <button
              onClick={() => setIsCustomizing(!isCustomizing)}
              className="mb-3 font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold uppercase tracking-wider text-zinc-600 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              // customize {isCustomizing ? "[-]" : "[+]"}
            </button>
            {isCustomizing && (
              <div className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customAccent}
                    onChange={(e) => setCustomAccent(e.target.value)}
                    className="h-8 w-8 cursor-pointer rounded border border-zinc-700 bg-transparent"
                  />
                  <div>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-600">accent:</span>
                    <input
                      type="text"
                      value={customAccent}
                      onChange={(e) => setCustomAccent(e.target.value)}
                      maxLength={7}
                      className="ml-2 w-20 rounded border border-zinc-700 bg-zinc-900 px-2 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-300 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customBg}
                    onChange={(e) => setCustomBg(e.target.value)}
                    className="h-8 w-8 cursor-pointer rounded border border-zinc-700 bg-transparent"
                  />
                  <div>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-600">background:</span>
                    <input
                      type="text"
                      value={customBg}
                      onChange={(e) => setCustomBg(e.target.value)}
                      maxLength={7}
                      className="ml-2 w-20 rounded border border-zinc-700 bg-zinc-900 px-2 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-300 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="h-8 w-8 cursor-pointer rounded border border-zinc-700 bg-transparent"
                  />
                  <div>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-600">text:</span>
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      maxLength={7}
                      className="ml-2 w-20 rounded border border-zinc-700 bg-zinc-900 px-2 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-300 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
                {hasCustomChanges && (
                  <button
                    onClick={() => {
                      setCustomAccent(r.accent);
                      setCustomBg(r.bg);
                      setCustomText(defaultTextColor);
                    }}
                    className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
                  >
                    $ reset --colors
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Typography */}
        <div>
          <h2 className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold uppercase tracking-wider text-zinc-600">
            // typography
          </h2>
          <p className="text-sm text-zinc-400">
            {r.tone === "dark" ? "Dark theme" : "Light theme"} — optimized for {r.tags.includes("serif") ? "serif" : "sans-serif"} typography with high contrast.
          </p>
        </div>

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
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 font-[family-name:var(--font-jetbrains-mono)] text-sm text-zinc-500 transition-colors hover:border-emerald-500/30 hover:text-emerald-400"
              >
                {site}
              </a>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2">
          <a
            href={`/generate?ref=${r.id}`}
            className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium text-zinc-950 transition-colors hover:bg-emerald-400"
          >
            $ use --ref {r.id.split("-")[0]}
          </a>
          {sampleExists && samplePath && (
            <>
              <a
                href={samplePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
              >
                $ open --preview
              </a>
              {htmlContent && (
                <button
                  onClick={handleDownloadRef}
                  className="inline-flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700 cursor-pointer"
                >
                  $ download --ref {r.id}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
