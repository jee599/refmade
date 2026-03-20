import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { readFile, readdir } from "fs/promises";
import { join } from "path";

const CATALOG_DIR = join(
  process.cwd(),
  "..",
  "output",
  "web-design-system",
  "references",
  "catalog"
);
const SKILL_PATH = join(
  process.cwd(),
  "..",
  "output",
  "web-design-system",
  "SKILL.md"
);

interface ImproveRequest {
  url?: string;
  code?: string;
}

async function loadAllReferenceSummaries(): Promise<string> {
  const files = await readdir(CATALOG_DIR);
  const mdFiles = files.filter(
    (f) => f.endsWith(".md") && f !== "INDEX.md"
  );
  const summaries: string[] = [];

  for (const file of mdFiles) {
    const content = await readFile(join(CATALOG_DIR, file), "utf-8");
    const lines = content.split("\n").slice(0, 25);
    summaries.push(lines.join("\n"));
  }

  return summaries.join("\n---\n");
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ImproveRequest;
    const { url, code } = body;

    if (!url && !code) {
      return Response.json(
        { error: "URL 또는 코드를 입력해주세요." },
        { status: 400 }
      );
    }

    let skillContent: string;
    try {
      skillContent = await readFile(SKILL_PATH, "utf-8");
    } catch {
      return Response.json(
        { error: "SKILL.md를 읽을 수 없습니다." },
        { status: 500 }
      );
    }

    const referenceSummaries = await loadAllReferenceSummaries();

    const userInput = url
      ? `분석 대상 URL: ${url}\n\n이 URL의 사이트를 SKILL.md 규칙 기준으로 분석해주세요. URL에 직접 접근할 수 없으니, 일반적인 웹사이트 디자인 패턴과 SKILL.md 규칙을 기준으로 개선점을 제시해주세요.`
      : `분석 대상 HTML 코드:\n\`\`\`html\n${code}\n\`\`\``;

    const systemPrompt = `You are a web design expert. Analyze the given code/site against the SKILL.md rules.
Your response MUST be valid JSON with this exact structure:
{
  "score": <number 1-10>,
  "issues": [
    { "id": "<unique-id>", "description": "<issue description in Korean>", "severity": "high" | "medium" | "low" }
  ],
  "closestReference": { "id": "<NNN>", "name": "<reference name>" },
  "summary": "<brief summary in Korean>",
  "improvedCode": "<full improved HTML code with Tailwind CDN>"
}

Score criteria based on SKILL.md:
- Anti-pattern violations (each -1 point)
- Typography scale compliance
- Section padding variance
- Card size diversity
- Interactive element states (hover, transition, focus-visible)
- Semantic HTML usage
- Accessibility
- Responsive design

For the closestReference, match against these references:
${referenceSummaries}

For improvedCode:
- Fix all identified issues
- Apply the closest reference's design language
- Use Tailwind CDN (<script src="https://cdn.tailwindcss.com"></script>)
- Include Google Fonts
- Make it production-quality

=== SKILL.md ===
${skillContent}`;

    const client = new Anthropic();

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const messageStream = client.messages.stream({
            model: "claude-sonnet-4-20250514",
            max_tokens: 8192,
            system: systemPrompt,
            messages: [
              {
                role: "user",
                content: userInput,
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
          controller.enqueue(
            encoder.encode(
              JSON.stringify({ error: message })
            )
          );
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
