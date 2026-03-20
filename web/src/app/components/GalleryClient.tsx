"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Reference } from "@/app/data/references";

type Filter = "all" | "light" | "dark" | "verified";

function ColorDot({ color }: { color: string }) {
  return (
    <span
      className="inline-block h-4 w-4 rounded-full border border-zinc-700"
      style={{ backgroundColor: color }}
    />
  );
}

function StatusBadge({ status }: { status: Reference["status"] }) {
  if (status === "verified") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950 px-2 py-0.5 text-xs text-emerald-400">
        ✅ verified
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
      📝 draft
    </span>
  );
}

function ReferenceCard({ reference: r }: { reference: Reference }) {
  // Derive text and muted colors from bg
  const textColor = r.tone === "dark" ? "#fafafa" : "#09090b";
  const mutedColor = r.tone === "dark" ? "#71717a" : "#a1a1aa";

  return (
    <Link href={`/reference/${r.id}`} className="group block">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-blue-500/50 group-hover:shadow-lg group-hover:shadow-blue-500/10">
        {/* Color strip */}
        <div className="mb-3 flex items-center gap-2">
          <ColorDot color={r.bg} />
          <ColorDot color={textColor} />
          <ColorDot color={r.accent} />
          <ColorDot color={r.tone === "dark" ? "#18181b" : "#f4f4f5"} />
          <ColorDot color={mutedColor} />
        </div>

        {/* Name + ID */}
        <div className="mb-2 flex items-center gap-2">
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-zinc-50">
            {r.name}
          </h3>
          <span className="rounded bg-zinc-800 px-1.5 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-500">
            {r.id}
          </span>
        </div>

        {/* Tags */}
        <div className="mb-2 flex flex-wrap gap-1">
          {r.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="mb-2 line-clamp-1 text-sm text-zinc-400">
          {r.description}
        </p>

        {/* Inspired by */}
        <p className="mb-3 text-xs text-zinc-600">
          Inspired by {r.inspired.join(", ")}
        </p>

        {/* Status */}
        <StatusBadge status={r.status} />
      </div>
    </Link>
  );
}

const filterButtons: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "Verified", value: "verified" },
];

export default function GalleryClient({
  references,
}: {
  references: Reference[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = references;

    if (filter === "light") result = result.filter((r) => r.tone === "light");
    else if (filter === "dark") result = result.filter((r) => r.tone === "dark");
    else if (filter === "verified")
      result = result.filter((r) => r.status === "verified");

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.tags.some((t) => t.includes(q)) ||
          r.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [references, filter, search]);

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === btn.value
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search references..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-50 placeholder-zinc-600 outline-none transition-colors focus:border-blue-500 sm:w-64"
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-zinc-600">
          No references match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <ReferenceCard key={r.id} reference={r} />
          ))}
        </div>
      )}
    </div>
  );
}
