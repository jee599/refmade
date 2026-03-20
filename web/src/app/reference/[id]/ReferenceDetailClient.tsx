"use client";

import { useState, useCallback } from "react";
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
      className="group flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-left transition-colors hover:border-zinc-700"
    >
      <span
        className="h-8 w-8 rounded-md border border-zinc-700"
        style={{ backgroundColor: color }}
      />
      <div>
        <div className="text-xs text-zinc-500">{label}</div>
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
  const textColor = r.tone === "dark" ? "#fafafa" : "#09090b";
  const mutedColor = r.tone === "dark" ? "#71717a" : "#a1a1aa";
  const subtleColor = r.tone === "dark" ? "#18181b" : "#f4f4f5";

  const sampleFileName = `${r.id}-${r.name.toLowerCase().replace(/\s+/g, "-")}.html`;
  const samplePath = `/samples/${sampleFileName}`;

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      {/* Left: Preview */}
      <div className="flex-1 border-b border-zinc-800 p-4 lg:border-b-0 lg:border-r lg:p-6" style={{ minHeight: "70vh" }}>
        {sampleExists ? (
          <div className="h-full overflow-hidden rounded-xl border border-zinc-800 bg-white">
            <iframe
              src={samplePath}
              className="h-full w-full"
              title={`${r.name} preview`}
              style={{ minHeight: "60vh" }}
            />
          </div>
        ) : (
          <div className="flex h-full min-h-[60vh] items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900/50">
            <div className="text-center">
              <div className="mb-2 text-4xl">🎨</div>
              <p className="text-lg font-medium text-zinc-400">
                Sample not yet generated
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                Use the Generate page to create an HTML sample for this reference.
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
            <span className="rounded bg-zinc-800 px-2 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-500">
              {r.id}
            </span>
          </div>
          <p className="text-sm text-zinc-400">{r.description}</p>
        </div>

        {/* Status */}
        <div>
          {r.status === "verified" ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950 px-3 py-1 text-sm text-emerald-400">
              ✅ Verified
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-400">
              📝 Draft
            </span>
          )}
        </div>

        {/* Palette */}
        <div>
          <h2 className="mb-3 font-[family-name:var(--font-space-grotesk)] text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Palette
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <CopyableSwatch color={r.bg} label="Background" />
            <CopyableSwatch color={textColor} label="Text" />
            <CopyableSwatch color={r.accent} label="Accent" />
            <CopyableSwatch color={subtleColor} label="Subtle" />
            <CopyableSwatch color={mutedColor} label="Muted" />
          </div>
        </div>

        {/* Typography */}
        <div>
          <h2 className="mb-2 font-[family-name:var(--font-space-grotesk)] text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Typography
          </h2>
          <p className="text-sm text-zinc-400">
            {r.tone === "dark" ? "Dark theme" : "Light theme"} — optimized for {r.tags.includes("serif") ? "serif" : "sans-serif"} typography with high contrast.
          </p>
        </div>

        {/* Tags */}
        <div>
          <h2 className="mb-2 font-[family-name:var(--font-space-grotesk)] text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {r.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Inspired by */}
        <div>
          <h2 className="mb-2 font-[family-name:var(--font-space-grotesk)] text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Inspired By
          </h2>
          <div className="flex flex-wrap gap-2">
            {r.inspired.map((site) => (
              <a
                key={site}
                href={`https://${site}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200"
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
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
          >
            Use This Reference
          </a>
          {sampleExists && (
            <a
              href={samplePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-100"
            >
              Open Full Preview
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
