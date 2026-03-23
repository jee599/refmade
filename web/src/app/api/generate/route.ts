import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { readFile, readdir } from "fs/promises";
import { join } from "path";
import { assembleProPrompt } from "@/lib/promptAssembler";
import { rateLimit } from "@/lib/rateLimit";

const ID_RE = /^[a-zA-Z0-9-]+$/;
const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/;

const CATALOG_DIR = join(
  process.cwd(),
  "data",
  "catalog"
);
const SKILL_PATH = join(
  process.cwd(),
  "data",
  "SKILL.md"
);

const MODEL_MAP: Record<string, string> = {
  haiku: "claude-haiku-4-5-20251001",
  sonnet: "claude-sonnet-4-6-20250627",
};

interface GenerateRequest {
  referenceId: string;
  description: string;
  brandColor: string;
  format: "code" | "prompt";
  model?: "haiku" | "sonnet";
}

type ProFormat = "code";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(ip, "generate", 5, 60_000)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = (await request.json()) as GenerateRequest;
    const { referenceId, description, brandColor, format, model: modelChoice } = body;
    const modelId = MODEL_MAP[modelChoice ?? "sonnet"] ?? MODEL_MAP.sonnet;

    if (format === "prompt") {
      return Response.json(
        { error: "Use client-side assembly for free prompts" },
        { status: 400 }
      );
    }

    if (!referenceId || !description) {
      return Response.json(
        { error: "referenceId and description are required." },
        { status: 400 }
      );
    }

    if (!ID_RE.test(referenceId)) {
      return Response.json(
        { error: "Invalid referenceId format." },
        { status: 400 }
      );
    }

    if (brandColor && !HEX_COLOR_RE.test(brandColor)) {
      return Response.json(
        { error: "brandColor must be a valid hex color (e.g. #1a2b3c)." },
        { status: 400 }
      );
    }

    const proFormat: ProFormat = format;

    let referenceContent: string;
    try {
      const files = await readdir(CATALOG_DIR);
      const refFile = files.find((f) => f.startsWith(referenceId) && f.endsWith(".md"));
      if (!refFile) throw new Error("not found");
      referenceContent = await readFile(join(CATALOG_DIR, refFile), "utf-8");
    } catch {
      return Response.json(
        { error: `Reference ${referenceId} not found.` },
        { status: 404 }
      );
    }

    let skillContent: string;
    try {
      skillContent = await readFile(SKILL_PATH, "utf-8");
    } catch {
      return Response.json(
        { error: "Could not read SKILL.md." },
        { status: 500 }
      );
    }

    const systemPrompt = assembleProPrompt({
      skillContent,
      referenceContent,
      brandColor,
      description,
      outputFormat: proFormat,
    });

    const client = new Anthropic();

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const messageStream = client.messages.stream({
            model: modelId,
            max_tokens: 8192,
            system: systemPrompt,
            messages: [
              {
                role: "user",
                content: `다음 사이트를 만들어주세요:\n\n${description}\n\n브랜드 색상: ${brandColor}\n출력 형식: HTML 코드`,
              },
            ],
          });

          messageStream.on("text", (text) => {
            controller.enqueue(encoder.encode(text));
          });

          await messageStream.finalMessage();
          controller.close();
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "알 수 없는 오류";
          controller.enqueue(encoder.encode(`\n\nError: ${message}`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return Response.json({ error: message }, { status: 500 });
  }
}
