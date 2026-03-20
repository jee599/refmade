import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
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

interface GenerateRequest {
  referenceId: string;
  description: string;
  brandColor: string;
  format: "code" | "markdown";
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as GenerateRequest;
    const { referenceId, description, brandColor, format } = body;

    if (!referenceId || !description) {
      return Response.json(
        { error: "referenceId와 description은 필수입니다." },
        { status: 400 }
      );
    }

    const refFileName = `${referenceId}.md`;
    let referenceContent: string;
    try {
      referenceContent = await readFile(
        join(CATALOG_DIR, refFileName),
        "utf-8"
      );
    } catch {
      return Response.json(
        { error: `래퍼런스 ${referenceId}를 찾을 수 없습니다.` },
        { status: 404 }
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

    const systemPrompt =
      format === "code"
        ? `You are a senior frontend designer. You generate production-quality HTML code.
Follow the SKILL.md rules exactly. Use the selected reference's palette, typography, and layout.
The user's brand color (${brandColor}) replaces the reference's accent color.
Generate complete, standalone HTML with Tailwind CDN (use <script src="https://cdn.tailwindcss.com"></script>).
Include Google Fonts links as specified in the reference.
Output ONLY the HTML code, no explanations.

=== SKILL.md ===
${skillContent}

=== Selected Reference ===
${referenceContent}`
        : `You are a senior frontend designer. You create detailed design specification documents in Markdown.
Follow the SKILL.md rules exactly. Use the selected reference's palette, typography, and layout.
The user's brand color (${brandColor}) replaces the reference's accent color.
Output a comprehensive design plan in Korean (한국어) with:
- 페이지 구조 (섹션 순서, 배경색, 패딩)
- 색상 팔레트 (HEX 코드)
- 타이포그래피 (폰트, 크기, weight)
- 컴포넌트 명세 (버튼, 카드, 네비게이션)
- 반응형 브레이크포인트 처리
- 접근성 체크리스트
Output ONLY the Markdown, no explanations.

=== SKILL.md ===
${skillContent}

=== Selected Reference ===
${referenceContent}`;

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
                content: `다음 사이트를 만들어주세요:\n\n${description}\n\n브랜드 색상: ${brandColor}\n출력 형식: ${format === "code" ? "HTML 코드" : "Markdown 설계서"}`,
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
