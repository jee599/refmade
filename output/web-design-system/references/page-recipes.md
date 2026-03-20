# Page Recipes Reference

> 페이지 유형별 섹션 조합 레시피.
> 측정: 전체 섹션 수 median 12개, mean 20.78개.

---

## 공통 원칙

### 배경 교대 패턴 (Background Alternation)

```
var(--bg) → var(--subtle-bg) → var(--bg) → var(--subtle-bg) → ... → var(--text) [CTA+Footer]
```

- 두 섹션이 같은 배경색을 연속으로 쓰지 않는다.
- 마지막 CTA + Footer는 색상 반전 (`var(--text)` 배경)으로 마무리.
- Social Proof는 border-top/bottom으로 구분하므로 subtle-bg 고정.

### 패딩 패턴 (Section Padding)

| 위치 | 패딩 | 근거 |
|------|------|------|
| Hero | py-24 (96px) | 첫 인상. 넉넉한 공간. |
| Social Proof | py-12 (48px) | 콘텐츠 적음. 얇게. |
| 일반 섹션 | py-20 (80px) | Features, How It Works, Testimonials, Pricing |
| CTA | py-24 (96px) | Hero와 대칭. 최종 전환 포인트. |
| Footer | py-16 (64px) | 정보 밀도 높음. 적당히. |

### Tone (톤) 가이드

- **Bold/Confident**: 짧은 문장, 숫자 강조, "Ship faster" 류
- **Friendly/Approachable**: 질문형 헤딩, "No credit card required"
- **Technical/Developer**: 코드 스니펫, API 레퍼런스 링크, monospace 폰트
- **Enterprise/Trust**: 보안 인증, SLA, "Trusted by Fortune 500"

---

## 1. SaaS Landing Page

가장 표준적인 구성. 측정 50개 사이트의 주류 패턴.

### 섹션 순서

```
1. Nav (sticky, backdrop-blur)
2. Hero (Center 또는 Split)     — bg
3. Social Proof (로고 바)       — subtle-bg + border
4. Features Grid (Bento)        — bg
5. Features Alternating          — subtle-bg
6. How It Works (3 steps)       — bg
7. Testimonials                  — subtle-bg
8. Pricing (3 columns)          — bg
9. CTA (색상 반전)              — text (inverted)
10. Footer                       — text (inverted)
```

### 배경 시퀀스

```
bg → subtle-bg → bg → subtle-bg → bg → subtle-bg → bg → text → text
```

### 핵심 룰

- Hero 타입 선택: **minimal(42%)** 또는 **split(26%)**이 무난. center는 2%.
- Social Proof는 Hero 바로 아래 — "이미 쓰고 있는 팀"으로 신뢰 확보
- Feature 섹션은 2-3개 조합 가능 (Grid 1개 + Alternating 1-2개)
- Pricing은 거의 필수 (96%)
- Testimonials는 선택 (32%) — 있으면 좋지만 없어도 됨
- FAQ는 거의 없음 (2%)

### CSS 변수 세팅 예시 (Dark Theme)

```css
:root {
  --bg: #0A0A0A;
  --text: #FAFAFA;
  --muted: #A1A1AA;
  --accent: #FFFFFF;
  --border: #27272A;
  --subtle-bg: #18181B;
}
```

### CSS 변수 세팅 예시 (Light Theme)

```css
:root {
  --bg: #FFFFFF;
  --text: #09090B;
  --muted: #71717A;
  --accent: #000000;
  --border: #E4E4E7;
  --subtle-bg: #F4F4F5;
}
```

---

## 2. Developer Tool Landing Page

개발자 대상. 코드 중심. 측정 데이터에서 product screenshot 46%, gradient text 12%.

### 섹션 순서

```
1. Nav (sticky, 우측에 GitHub stars badge)
2. Hero (Center, code snippet 포함)    — bg
3. Code Example (터미널/에디터 모크업)   — subtle-bg
4. Features Grid (Bento, 기술 중심)     — bg
5. Integrations (로고 그리드)           — subtle-bg
6. Pricing (2-3 columns)               — bg
7. CTA ("Star us on GitHub" 포함)      — text (inverted)
8. Footer                               — text (inverted)
```

### 톤 특징

- 코드를 보여준다. 말로 설명하지 않는다.
- H1에 monospace나 gradient-text 활용 (12% 사이트 사용)
- "npm install" or "npx create" 명령어를 Hero에 넣는다
- GitHub stars, npm downloads 같은 숫자 social proof

### Hero 코드 블록 패턴

```tsx
<div
  className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-lg border font-mono text-sm"
  style={{
    borderColor: "var(--border)",
    backgroundColor: "var(--subtle-bg)",
  }}
>
  <div
    className="flex items-center gap-2 border-b px-4 py-2"
    style={{ borderColor: "var(--border)" }}
  >
    <span className="text-xs" style={{ color: "var(--muted)" }}>terminal</span>
  </div>
  <pre className="p-4" style={{ color: "var(--text)" }}>
    <code>
      <span style={{ color: "var(--muted)" }}>$</span> npx create-your-app my-project
    </code>
  </pre>
</div>
```

---

## 3. Dashboard

앱 내부 UI. 랜딩페이지와 다른 레이아웃.

### 레이아웃 구조

```
┌──────────────────────────────────┐
│            Topbar (h-16)         │
├────────┬─────────────────────────┤
│        │                         │
│Sidebar │    Main Content Grid    │
│ w-64   │    (p-6, gap-6)        │
│        │                         │
│        │                         │
└────────┴─────────────────────────┘
```

### 코드 구조

```tsx
<div className="flex h-screen" style={{ backgroundColor: "var(--bg)" }}>
  {/* Sidebar */}
  <aside
    className="hidden w-64 shrink-0 border-r lg:block"
    style={{ borderColor: "var(--border)" }}
  >
    <div className="flex h-16 items-center px-6">
      <span className="text-lg font-bold" style={{ color: "var(--text)" }}>
        Logo
      </span>
    </div>
    <nav className="px-3 py-4">
      {/* nav items */}
    </nav>
  </aside>

  {/* Main area */}
  <div className="flex flex-1 flex-col overflow-hidden">
    {/* Topbar */}
    <header
      className="flex h-16 shrink-0 items-center border-b px-6"
      style={{ borderColor: "var(--border)" }}
    >
      {/* search, notifications, avatar */}
    </header>

    {/* Content */}
    <main className="flex-1 overflow-auto p-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Stat cards, charts, tables */}
      </div>
    </main>
  </div>
</div>
```

### 핵심 룰

- Sidebar: `w-64` (256px), `lg:block hidden` (모바일 숨김)
- Topbar: `h-16 border-b` — 랜딩 Nav와 동일 높이
- Content: `p-6 gap-6` — 일관된 간격
- `overflow-auto` — 메인 콘텐츠만 스크롤
- `h-screen flex` — 전체 화면 고정 레이아웃

---

## 4. Portfolio

개인 포트폴리오. 미니멀 우선.

### 섹션 순서

```
1. Nav (심플, 3-4 링크만)          — bg
2. Hero (Minimal, 이름 + 한 줄 소개) — bg
3. Projects Grid (2-3 cols)         — bg 또는 subtle-bg
4. About (사진 + 텍스트 split)      — subtle-bg
5. Contact (이메일 + 소셜 링크)     — bg
6. Footer (심플, 1줄)              — text (inverted)
```

### 톤 특징

- 텍스트 최소화. 작업물이 말한다.
- Hero에 H1 이름, subtitle에 "Designer / Developer / ..."
- Projects는 이미지 중심 grid, hover 시 제목 표시
- 색상은 모노톤 (neutral ratio 높게)

### Project Card 패턴

```tsx
<a
  href="/project/1"
  className="group relative aspect-[4/3] overflow-hidden rounded-lg"
  style={{ backgroundColor: "var(--subtle-bg)" }}
>
  {/* Project image */}
  <div className="h-full w-full transition-transform duration-300 group-hover:scale-105">
    {/* image */}
  </div>
  {/* Overlay on hover */}
  <div
    className="absolute inset-0 flex items-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    style={{
      background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
    }}
  >
    <div>
      <h3 className="text-lg font-semibold text-white">Project Title</h3>
      <p className="text-sm text-white/70">Category</p>
    </div>
  </div>
</a>
```

---

## 5. Blog / Docs

콘텐츠 중심 레이아웃. 가독성 최우선.

### 레이아웃 구조

```
┌──────────────────────────────────────────┐
│              Nav (sticky)                │
├──────────┬───────────────────┬───────────┤
│          │                   │           │
│ Sidebar  │     Content       │   TOC     │
│ TOC      │   max-w-3xl       │  (opt)    │
│ w-64     │                   │  w-48     │
│          │                   │           │
└──────────┴───────────────────┴───────────┘
│              Footer                      │
└──────────────────────────────────────────┘
```

### 코드 구조

```tsx
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <div className="flex gap-8">
    {/* Sidebar navigation */}
    <aside className="hidden w-64 shrink-0 lg:block">
      <nav className="sticky top-20 space-y-1 py-8">
        {/* doc navigation links */}
      </nav>
    </aside>

    {/* Main content */}
    <article
      className="min-w-0 max-w-3xl flex-1 py-8"
      style={{ color: "var(--text)" }}
    >
      {/* prose content */}
      <div className="prose prose-lg">
        {/* markdown rendered content */}
      </div>
    </article>

    {/* On-page TOC */}
    <aside className="hidden w-48 shrink-0 xl:block">
      <nav className="sticky top-20 space-y-2 py-8 text-sm">
        {/* heading anchors */}
      </nav>
    </aside>
  </div>
</div>
```

### 핵심 룰

- Content: `max-w-3xl` (768px) — 읽기 최적 너비 (60-75자/줄)
- Sidebar: `w-64 lg:block hidden` — 태블릿 이하에서 숨김
- TOC: `w-48 xl:block hidden` — 대형 화면에서만 표시
- `sticky top-20` — 스크롤 시 네비게이션 고정
- Typography: `prose prose-lg` (Tailwind Typography plugin) 또는 수동 스타일

### Blog Post 타이포그래피

```css
/* max-w-3xl 내부 */
h1: text-4xl font-bold tracking-tight      /* 36px */
h2: text-2xl font-semibold mt-12 mb-4      /* 24px */
h3: text-xl font-semibold mt-8 mb-3        /* 20px */
p: text-base leading-7                      /* 16px, line-height 28px */
code: text-sm font-mono bg-subtle-bg px-1.5 py-0.5 rounded
pre: text-sm font-mono bg-subtle-bg p-4 rounded-lg overflow-x-auto
```

---

## 페이지 타입별 비교표

| 특성 | SaaS Landing | Dev Tool | Dashboard | Portfolio | Blog/Docs |
|------|-------------|----------|-----------|-----------|-----------|
| 섹션 수 | 8-12 | 6-8 | 1 (layout) | 5-6 | 3-4 |
| Hero 타입 | Split/Minimal | Center+Code | N/A | Minimal | N/A |
| Pricing | 필수 (96%) | 필수 | N/A | N/A | N/A |
| Social Proof | 권장 (60%) | GitHub stars | N/A | 선택 | N/A |
| CTA 수 | 2 (primary+secondary) | 2 (install+docs) | N/A | 1 (contact) | N/A |
| 배경 교대 | 필수 | 필수 | 단색 | 선택 | 단색 |
| Dark Theme | 60% | 높음 | 높음 | 높음 | 낮음 |
| Max Width | max-w-6xl | max-w-6xl | full | max-w-5xl | max-w-3xl (content) |
| Animation | 94% | 높음 | 중간 | 높음 | 낮음 |
