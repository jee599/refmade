import { NextRequest } from "next/server";
import { readFile, readdir } from "fs/promises";
import { join } from "path";

const CATALOG_DIR = join(process.cwd(), "data", "catalog");

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return Response.json({ error: "id parameter is required." }, { status: 400 });
  }

  if (!/^[a-zA-Z0-9-]+$/.test(id)) {
    return Response.json({ error: "Invalid id format." }, { status: 400 });
  }

  try {
    const files = await readdir(CATALOG_DIR);
    const refFile = files.find((f) => f.startsWith(id) && f.endsWith(".md"));
    if (!refFile) throw new Error("not found");
    const content = await readFile(join(CATALOG_DIR, refFile), "utf-8");
    return new Response(content, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch {
    return Response.json({ error: `Reference ${id} not found.` }, { status: 404 });
  }
}
