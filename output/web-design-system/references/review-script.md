# Screenshot Review Script Reference

> 스크린샷 기반 피드백 루프.
> 생성된 페이지를 Playwright로 캡처 → Claude Vision으로 비평 → 수정 반복.

---

## 개요

AI가 생성한 랜딩페이지의 품질을 자동으로 검증하는 프로세스.
리뷰 없이 1차 생성만 하면 6-7점. 리뷰 루프를 돌면 7-8점까지 올라간다.

### 예상 점수 (10점 만점)

| 단계 | 점수 | 설명 |
|------|------|------|
| 1차 생성 (no review) | 6-7 | 구조는 맞지만 디테일 부족 |
| 1차 리뷰 후 수정 | 7-7.5 | 여백, 색상, 계층 개선 |
| 2차 리뷰 후 수정 | 7.5-8 | 미세 디테일 수정 |
| 3차 이상 | 수확 체감 | 2회가 최적 ROI |

---

## Step 1: Playwright 스크린샷 캡처

### 설치

```bash
npm install -D playwright
npx playwright install chromium
```

### 캡처 스크립트

```typescript
// scripts/screenshot.ts
import { chromium } from "playwright";

async function captureScreenshots(url: string, outputDir: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Desktop viewport (1440x900)
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: "networkidle" });

  // Full page screenshot
  await page.screenshot({
    path: `${outputDir}/full-page-desktop.png`,
    fullPage: true,
  });

  // Above-the-fold (Hero)
  await page.screenshot({
    path: `${outputDir}/hero-desktop.png`,
    fullPage: false,
  });

  // Mobile viewport (390x844 — iPhone 14 Pro)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: `${outputDir}/hero-mobile.png`,
    fullPage: false,
  });

  await page.screenshot({
    path: `${outputDir}/full-page-mobile.png`,
    fullPage: true,
  });

  await browser.close();

  return [
    `${outputDir}/hero-desktop.png`,
    `${outputDir}/full-page-desktop.png`,
    `${outputDir}/hero-mobile.png`,
    `${outputDir}/full-page-mobile.png`,
  ];
}

// 사용
captureScreenshots("http://localhost:3000", "./screenshots");
```

### CLI 단축 명령

```bash
# package.json에 추가
"scripts": {
  "screenshot": "npx tsx scripts/screenshot.ts"
}

# 실행
npm run screenshot
```

---

## Step 2: Claude Vision 비평 프롬프트

스크린샷을 Claude에 첨부하고 아래 프롬프트를 사용한다.

### 비평 프롬프트 (Korean)

```
이 스크린샷은 AI가 생성한 SaaS 랜딩페이지다.
아래 기준으로 10점 만점 평가하고, 구체적 개선점을 코드 수준으로 제시해라.

## 평가 기준

1. **Visual Hierarchy (시각 계층)** /2점
   - H1이 명확한 focal point인가?
   - H1/body 크기 비율이 적절한가? (이상적: 4.0)
   - 계층이 3단계 이상 구분되는가? (H1 → H2 → body → muted)

2. **Spacing & Rhythm (여백과 리듬)** /2점
   - 섹션 간 여백이 일관적인가?
   - 카드/요소 내부 패딩이 충분한가?
   - 빈 공간이 의도적으로 느껴지는가?

3. **Color & Contrast (색상과 대비)** /2점
   - 색상이 3색 이내 + 뉴트럴로 제한되어 있는가?
   - CTA 버튼이 배경과 충분히 대비되는가?
   - 배경 교대 패턴이 적용되어 있는가?

4. **Component Quality (컴포넌트 품질)** /2점
   - 버튼에 hover/focus 상태가 있는가?
   - border-radius가 일관적인가?
   - 카드에 border OR shadow (둘 다는 아닌지)?

5. **Overall Polish (전반적 완성도)** /2점
   - 프로페셔널 사이트처럼 보이는가?
   - "아마추어"스러운 요소가 없는가?
   - 반응형이 제대로 동작하는가?

## 출력 형식

### 점수: X/10

### 잘된 점 (Keep)
- ...

### 개선 필요 (Fix)
1. [구체적 위치] — [문제] → [해결 코드/클래스]
2. ...
3. ...

### 우선순위
- P0 (즉시): ...
- P1 (중요): ...
- P2 (선택): ...
```

### 비평 프롬프트 (English, 간결 버전)

```
Rate this AI-generated SaaS landing page screenshot 1-10.

Criteria:
- Visual hierarchy (H1 prominence, h1/body ratio ~4.0)
- Spacing consistency (section padding, card padding)
- Color restraint (max 3 colors + neutrals, bg alternation)
- Component polish (hover states, consistent radius, border XOR shadow)
- Professional feel (no amateur patterns)

Output: Score, 3 things to keep, top 5 fixes with exact Tailwind classes.
```

---

## Step 3: 수정 반복 (Iteration)

### 1차 리뷰 후 흔한 수정 사항

| 빈도 | 문제 | 수정 |
|------|------|------|
| 높음 | H1이 너무 작음 | `text-4xl` → `text-5xl md:text-6xl` |
| 높음 | 섹션 여백 부족 | `py-12` → `py-20` |
| 높음 | 배경 교대 없음 | bg/subtle-bg 교대 적용 |
| 중간 | CTA 대비 부족 | accent color 대비 확인 |
| 중간 | 카드에 shadow+border 동시 | 하나만 남기기 |
| 낮음 | 텍스트 너비 과도 | `max-w-2xl` 또는 `max-w-3xl` 추가 |

### 수정 워크플로우

```
1. 스크린샷 캡처 (screenshot.ts)
2. Claude Vision 비평 (위 프롬프트)
3. P0 수정 적용
4. 재캡처 → 재비평
5. P1 수정 적용
6. 최종 확인 (보통 2회면 충분)
```

### 수정 시 주의사항

- 한 번에 너무 많이 바꾸지 않는다. P0 먼저, P1 다음.
- 색상을 바꾸면 전체 페이지에 영향. CSS 변수 하나만 수정.
- 여백 수정은 안전. 레이아웃이 깨지지 않는다.
- 폰트 크기 수정은 모바일 확인 필수.

---

## Step 4: 자동화 스크립트 (Optional)

### 전체 파이프라인

```typescript
// scripts/review-loop.ts
import { captureScreenshots } from "./screenshot";
import { readFileSync } from "fs";

async function reviewLoop(url: string, maxIterations = 2) {
  for (let i = 0; i < maxIterations; i++) {
    console.log(`\n=== Review iteration ${i + 1} ===\n`);

    // 1. 캡처
    const screenshots = await captureScreenshots(url, `./screenshots/iter-${i + 1}`);

    // 2. 스크린샷 경로 출력 (Claude에 수동 첨부)
    console.log("Screenshots captured:");
    screenshots.forEach((s) => console.log(`  ${s}`));

    // 3. 비평 요청 (수동 또는 API)
    console.log("\nAttach screenshots to Claude and run the review prompt.");
    console.log("Apply fixes, then press Enter to continue...");

    // 4. 대기 (수동 수정 후)
    await new Promise((resolve) => {
      process.stdin.once("data", resolve);
    });
  }

  console.log("\n=== Review complete ===");
}

reviewLoop("http://localhost:3000");
```

### Claude API 활용 (완전 자동화)

```typescript
import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "fs";

async function autoReview(screenshotPath: string): Promise<string> {
  const client = new Anthropic();

  const imageData = readFileSync(screenshotPath).toString("base64");

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/png",
              data: imageData,
            },
          },
          {
            type: "text",
            text: "Rate this SaaS landing page 1-10. Focus on: visual hierarchy, spacing, color restraint, component polish. Give top 5 fixes with Tailwind classes.",
          },
        ],
      },
    ],
  });

  return response.content[0].type === "text" ? response.content[0].text : "";
}
```

---

## Viewport 기준

| Device | Width | Height | 용도 |
|--------|-------|--------|------|
| Desktop | 1440 | 900 | 주 평가 기준 |
| Tablet | 768 | 1024 | 반응형 확인 |
| Mobile | 390 | 844 | 모바일 경험 |

### Desktop 1440px를 기준으로 하는 이유

- 측정 container median 1400px — 1440 뷰포트에서 딱 맞음
- max-w-6xl (1152px) 또는 max-w-7xl (1280px) — 양쪽 여백 확인 가능
- 대부분의 사용자가 이 해상도 범위

---

## 체크리스트 (Quick Review)

스크린샷 없이 코드만 보고 빠르게 확인할 수 있는 항목.

```
□ H1: text-5xl md:text-6xl + font-bold + tracking-tight
□ H2: text-3xl sm:text-4xl + font-bold + tracking-tight
□ Body: text-base + leading-relaxed (muted color)
□ Section padding: py-20 (Hero/CTA: py-24)
□ 배경 교대: bg ↔ subtle-bg ↔ bg ↔ ... ↔ text(inverted)
□ Container: max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
□ CTA button: accent bg + hover:opacity-90 + focus-visible:ring-2
□ Card: border OR shadow (not both) + rounded-lg + p-6
□ Nav: sticky + backdrop-blur-md + h-16
□ Transitions: duration-150 or duration-200 on all interactive
□ Mobile: sm: breakpoints on grid/flex layouts
□ Footer: inverted (text bg) + 4-column links
```
