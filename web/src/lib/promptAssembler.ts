export interface GeneratePromptParams {
  skillContent: string;
  referenceContent: string;
  brandColor: string;
  description: string;
  outputFormat: "code" | "markdown";
}

export interface ImprovePromptParams {
  skillContent: string;
  referenceSummaries: string;
  input: string;
  inputType: "url" | "code";
}

export function assembleGeneratePrompt(params: GeneratePromptParams): string {
  const { skillContent, referenceContent, brandColor, description, outputFormat } = params;

  const systemPrompt =
    outputFormat === "code"
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

  const userMessage = `다음 사이트를 만들어주세요:\n\n${description}\n\n브랜드 색상: ${brandColor}\n출력 형식: ${outputFormat === "code" ? "HTML 코드" : "Markdown 설계서"}`;

  return `[System Prompt]\n${systemPrompt}\n\n---\n\n[User Message]\n${userMessage}`;
}

export function assembleImprovePrompt(params: ImprovePromptParams): string {
  const { skillContent, referenceSummaries, input, inputType } = params;

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

  const userMessage =
    inputType === "url"
      ? `분석 대상 URL: ${input}\n\n이 URL의 사이트를 SKILL.md 규칙 기준으로 분석해주세요. URL에 직접 접근할 수 없으니, 일반적인 웹사이트 디자인 패턴과 SKILL.md 규칙을 기준으로 개선점을 제시해주세요.`
      : `분석 대상 HTML 코드:\n\`\`\`html\n${input}\n\`\`\``;

  return `[System Prompt]\n${systemPrompt}\n\n---\n\n[User Message]\n${userMessage}`;
}
