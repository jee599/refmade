import { references } from "@/app/data/references";
import GalleryClient from "@/app/components/GalleryClient";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight">
          Design References
        </h1>
        <p className="mt-2 text-zinc-400">
          {references.length} curated landing page patterns. Click any card to explore.
        </p>
      </div>
      <GalleryClient references={references} />
    </div>
  );
}
