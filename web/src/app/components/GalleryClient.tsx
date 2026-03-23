"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import type { Reference } from "@/app/data/references";

function IframePreview({ src, title }: { src: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setScale(el.offsetWidth / 1440);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 스크롤 가능한 최대 오프셋 (scaled 기준으로 전체 페이지 높이 - 컨테이너 높이)
  const scrollDistance = 900 * scale - 208; // 900px iframe height * scale - 208px container height
  const maxScroll = Math.max(0, scrollDistance);

  return (
    <div
      ref={containerRef}
      className="relative h-52 w-full overflow-hidden border-b border-zinc-800 bg-zinc-900"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <iframe
        src={src}
        className="pointer-events-none absolute left-0 top-0 border-0"
        style={{
          width: "1440px",
          height: "4000px",
          transform: `scale(${scale}) translateY(${hovered ? `-${Math.min(maxScroll / scale, 2400)}px` : "0px"})`,
          transformOrigin: "top left",
          transition: hovered
            ? "transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)"
            : "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
        title={title}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
      />
      {/* 호버 시 스크롤 힌트 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-900/80 to-transparent transition-opacity duration-300"
        style={{ opacity: hovered ? 0 : 1 }}
      />
    </div>
  );
}

type Filter = "all" | "light" | "dark" | "verified";
type Sort = "views" | "downloads" | "newest";

function StatusBadge({ status }: { status: Reference["status"] }) {
  if (status === "verified") {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded px-2 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-xs"
        style={{
          borderWidth: "1px",
          borderColor: "var(--accent-30)",
          backgroundColor: "var(--accent-10)",
          color: "var(--accent-light)",
        }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full animate-pulse-dot"
          style={{ backgroundColor: "var(--accent-light)" }}
        />
        verified
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-500">
      <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
      draft
    </span>
  );
}

function ReferenceCard({ reference: r }: { reference: Reference }) {
  return (
    <Link href={`/reference/${r.id}`} className="group block">
      <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-accent-50 group-hover:shadow-lg group-hover:shadow-accent-5">
        {/* Preview section */}
        {r.sampleFile ? (
          <IframePreview src={`/samples/${r.sampleFile}`} title={r.name} />
        ) : (
          <div className="flex h-52 w-full items-center justify-center border-b border-zinc-800 bg-zinc-900">
            <div className="text-center">
              <div className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-2xl text-zinc-700">&gt;_</div>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-zinc-600">Coming Soon</span>
            </div>
          </div>
        )}

        {/* Card body */}
        <div className="p-4">
          {/* Name + ID */}
          <div className="mb-2 flex items-center gap-2">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-zinc-50">
              {r.name}
            </h3>
            <span className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-500">
              {r.id}
            </span>
          </div>

          {/* Tags */}
          <div className="mb-2 flex flex-wrap gap-1">
            {r.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-zinc-700 bg-zinc-800/50 px-2 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="mb-2 line-clamp-1 text-base text-zinc-400">
            {r.description}
          </p>

          {/* Stats + Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 font-[family-name:var(--font-jetbrains-mono)] text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                {r.views}
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                {r.downloads}
              </span>
            </div>
            <StatusBadge status={r.status} />
          </div>
        </div>

        {/* Accent color bar */}
        <div className="h-1 w-full bg-accent-20 transition-colors group-hover:bg-accent-60" />
        <div className="h-0.5 w-full" style={{ backgroundColor: r.accent }} />
      </div>
    </Link>
  );
}

const filterButtons: { label: string; value: Filter }[] = [
  { label: "all", value: "all" },
  { label: "light", value: "light" },
  { label: "dark", value: "dark" },
  { label: "verified", value: "verified" },
];

export default function GalleryClient({
  references,
}: {
  references: Reference[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("views");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = [...references];

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

    if (sort === "views") result.sort((a, b) => b.views - a.views);
    else if (sort === "downloads") result.sort((a, b) => b.downloads - a.downloads);

    return result;
  }, [references, filter, sort, search]);

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`rounded-lg border px-4 py-1.5 font-[family-name:var(--font-jetbrains-mono)] text-sm transition-all duration-200 ${
                filter === btn.value
                  ? "border-accent bg-accent-10 text-accent-light"
                  : "border-zinc-700 bg-zinc-900 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 font-[family-name:var(--font-jetbrains-mono)] text-sm text-zinc-400 outline-none transition-colors focus:border-accent"
          >
            <option value="views">sort:views</option>
            <option value="downloads">sort:downloads</option>
            <option value="newest">sort:newest</option>
          </select>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-[family-name:var(--font-jetbrains-mono)] text-sm text-accent-70">$</span>
            <input
              type="text"
              placeholder="search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 py-2 pl-7 pr-4 font-[family-name:var(--font-jetbrains-mono)] text-sm text-zinc-50 placeholder-zinc-600 outline-none transition-colors focus:border-accent sm:w-52"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center font-[family-name:var(--font-jetbrains-mono)] text-zinc-600">
          <span className="text-accent-50">[ERR]</span> No references match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((r) => (
            <ReferenceCard key={r.id} reference={r} />
          ))}
        </div>
      )}
    </div>
  );
}
