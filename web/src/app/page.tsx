import { references } from "@/app/data/references";
import GalleryClient from "@/app/components/GalleryClient";
import HeroSection from "@/app/components/HeroSection";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <HeroSection referenceCount={references.length} />
      <GalleryClient references={references} />
    </div>
  );
}
