import { notFound } from "next/navigation";
import Link from "next/link";
import { references } from "@/app/data/references";
import ReferenceDetailClient from "./ReferenceDetailClient";
import fs from "fs";
import path from "path";

export function generateStaticParams() {
  return references.map((r) => ({ id: r.id }));
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const reference = references.find((r) => r.id === id);
  if (!reference) return { title: "Not Found" };
  return {
    title: `${reference.name} — DesignMaker`,
    description: reference.description,
  };
}

export default async function ReferenceDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const reference = references.find((r) => r.id === id);

  if (!reference) {
    notFound();
  }

  const sampleFileName = `${reference.id}-${reference.name.toLowerCase().replace(/\s+/g, "-")}.html`;
  const samplePath = path.join(process.cwd(), "public", "samples", sampleFileName);
  const sampleExists = fs.existsSync(samplePath);

  return (
    <div className="flex flex-1 flex-col">
      {/* Breadcrumb */}
      <div className="border-b border-zinc-800 px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-zinc-500 transition-colors hover:text-zinc-300"
          >
            Gallery
          </Link>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-300">{reference.name}</span>
        </div>
      </div>

      <ReferenceDetailClient
        reference={reference}
        sampleExists={sampleExists}
      />
    </div>
  );
}
