import Link from "next/link";
import type { Reference } from "@/app/data/references";

/**
 * Fully server-rendered gallery for mobile.
 * Zero client-side JavaScript — pure HTML/CSS.
 * Prevents OOM crashes on memory-constrained browsers (Naver app, etc.)
 */

function StaticPreview({ bg, accent, tone }: { bg: string; accent: string; tone: string }) {
  return (
    <div
      className="relative h-44 w-full overflow-hidden border-b border-zinc-800"
      style={{ backgroundColor: bg }}
    >
      <div className="flex items-center gap-2 px-4 pt-4">
        <div className="h-2 w-12 rounded-full" style={{ backgroundColor: accent, opacity: 0.8 }} />
        <div className="ml-auto flex gap-2">
          <div className="h-2 w-8 rounded-full" style={{ backgroundColor: tone === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }} />
          <div className="h-2 w-8 rounded-full" style={{ backgroundColor: tone === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }} />
        </div>
      </div>
      <div className="mt-5 px-4">
        <div className="h-3 w-3/4 rounded-full mb-2" style={{ backgroundColor: tone === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)" }} />
        <div className="h-3 w-1/2 rounded-full mb-3" style={{ backgroundColor: tone === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)" }} />
        <div className="h-5 w-16 rounded" style={{ backgroundColor: accent, opacity: 0.85 }} />
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-10"
        style={{ background: `linear-gradient(to top, ${bg}, transparent)` }}
      />
    </div>
  );
}

function StaticCard({ r }: { r: Reference }) {
  return (
    <Link href={`/reference/${r.id}`} className="block">
      <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
        {r.sampleFile ? (
          <StaticPreview bg={r.bg} accent={r.accent} tone={r.tone} />
        ) : (
          <div className="flex h-44 w-full items-center justify-center border-b border-zinc-800 bg-zinc-900">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-zinc-600">&gt;_</span>
          </div>
        )}
        <div className="p-3">
          <div className="mb-1.5 flex items-center gap-2">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-sm font-semibold text-zinc-50">
              {r.name}
            </h3>
            <span className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-zinc-500">
              {r.id}
            </span>
          </div>
          <p className="line-clamp-1 text-sm text-zinc-400">{r.description}</p>
          <div className="mt-1.5 flex items-center gap-3 font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-zinc-500">
            <span>{r.views} views</span>
            <span>{r.downloads} downloads</span>
            {r.status === "verified" && (
              <span className="text-emerald-500">verified</span>
            )}
          </div>
        </div>
        <div className="h-0.5 w-full" style={{ backgroundColor: r.accent }} />
      </div>
    </Link>
  );
}

export default function GalleryStatic({ references }: { references: Reference[] }) {
  const sorted = [...references].sort((a, b) => b.views - a.views);

  return (
    <div className="grid grid-cols-1 gap-3">
      {sorted.map((r) => (
        <StaticCard key={r.id} r={r} />
      ))}
    </div>
  );
}
