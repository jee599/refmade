# Web Design System Skill

> 이 스킬은 50개 상위 SaaS 사이트 실측 데이터 기반이다.
> Claude Code가 프론트엔드를 생성할 때 반드시 이 문서를 따른다.
> 순서: 금지 → 질문 → 규칙 → 생성 → 검증.
>
> **참조 파일:**
> - `references/sections.md` — 섹션별 패턴 + Tailwind 코드
> - `references/components.md` — 컴포넌트 패턴 + 실측 수치
> - `references/page-recipes.md` — 페이지 조합 레시피
> - `references/visual-guide.md` — 시각 분석 기반 디자인 가이드

---

## 1. 안티패턴 — 절대 금지 (Anti-patterns)

아래 13개 + 데이터 검증 항목을 **절대 하지 마라.** 각 항목에 대안을 따른다.

| # | 금지 (X) | 대안 (O) |
|---|----------|----------|
| 1 | 모든 섹션에 동일한 `py-20` 패딩 | 섹션별 패딩 변주: hero `py-24`~`py-32`, social proof `py-12`~`py-16`, 일반 `py-20`, CTA `py-24` |
| 2 | 모든 카드 동일 크기 | 카드 3개 이상이면 첫 번째를 `col-span-2` 또는 크게 만든다 |
| 3 | `text-3xl` 이하의 h1 | h1은 `text-5xl` 이상 (실측 median 64px = `text-6xl`) |
| 4 | 3종 이상의 `border-radius` 사용 | `rounded-lg` + `rounded-full` 등 최대 2종 |
| 5 | 2종 이상의 `shadow` 사용 | `shadow-sm` 또는 `shadow-md` 하나만 통일 |
| 6 | hover/transition 없는 버튼·카드 | 모든 인터랙티브 요소에 `hover:` + `transition-all duration-200` |
| 7 | `focus-visible` 없는 인터랙티브 요소 | `focus-visible:ring-2 focus-visible:ring-offset-2` 필수 |
| 8 | 무채색만으로 구성된 CTA 영역 | 최소 1개 액센트 색상 CTA 버튼 포함 |
| 9 | `<div>`로 만든 버튼/링크 | `<button>`은 버튼, `<a>`는 링크. 시맨틱 HTML 준수 |
| 10 | 제목 순서 건너뛰기 (h1 → h3) | h1 → h2 → h3 순서 엄수 |
| 11 | 시스템 기본 폰트만 사용 | 커스텀 폰트 지정 (실측: 94%가 커스텀 폰트 사용) |
| 12 | 7종 이상의 font-size 사용 | 최대 6종 (실측 median 9이나, 6종 이내가 깔끔함) |
| 13 | placeholder 텍스트 "Lorem ipsum" | 실제 맥락에 맞는 카피 또는 사용자 제공 문구 사용 |
| 14 | 애니메이션 없는 정적 페이지 | 최소 fade-in 또는 scroll-triggered 애니메이션 포함 (실측: 94% 사용) |
| 15 | SVG/일러스트레이션 없는 페이지 | 아이콘 또는 일러스트 최소 1개 포함 (실측: 100% 사용) |
| 16 | Nav에 CTA 버튼 없음 | Nav 우측에 CTA 버튼 배치 (실측: 68% 사용) |

---

## 2. 사전 질문 + 페이지 유형 + 톤 판별

### 2-1. 필수 사전 질문 (코드 생성 전에 반드시 물어본다)

```
Q1: 브랜드 색상이 있나요? (HEX 코드)
    → 있으면 --accent로 사용. 없으면 톤별 기본 액센트 적용.

Q2: 제품을 한 문장으로 설명해주세요.
    → hero headline과 subheadline에 반영. "Lorem ipsum" 금지.
```

### 2-2. 페이지 유형 판별

사용자 요청에서 자동 판별하고, 유형별 규칙을 분기한다:

| 유형 | 적용 규칙 |
|------|-----------|
| **Landing page** | 전체 규칙 적용 (섹션 시퀀스, 히어로, CTA, 소셜프루프) |
| **Dashboard** | 섹션 시퀀스/히어로 제외. 사이드바 + 데이터 그리드 + 카드 |
| **Single page** (로그인/가입/404) | 센터 정렬 폼 + 여백 + 폰트만. 섹션 시퀀스 미적용 |
| **Blog/Docs** | 읽기 폭 `max-w-3xl` + 타이포 중심. 사이드바 TOC 선택적 |

### 2-3. 디자인 톤 선택

사용자에게 아래 5가지 중 선택하게 한다. **명시하지 않으면 B를 기본값으로 사용.**

```
어떤 분위기를 원하시나요?

A. Clean Minimal — Linear, Cal.com 스타일
B. Professional — Stripe, Vercel 스타일 (기본값)
C. Dark Premium — Raycast, Arc 스타일
D. Friendly — Notion, Loom 스타일
E. Developer — Supabase, Hono 스타일
```

---

## 3. 생성 규칙 (6가지 사전 적용)

코드를 쓰기 전에 이 규칙을 반드시 숙지하고, **처음부터 이 규칙대로 생성**한다.

### 규칙 1: 섹션 배경 교대
홀수 섹션 `bg-white` (또는 `var(--bg)`), 짝수 섹션 `bg-muted` (또는 `var(--subtle-bg)`).
CTA 섹션은 항상 다크 배경 `bg-gray-900` (실측: 96%가 다크 섹션 보유).

### 규칙 2: 섹션 패딩 변주
최소 2가지 이상의 패딩 크기를 사용한다 (실측 padding variance median 0.25).
- Hero: `py-24` ~ `py-32`
- Social proof: `py-12` ~ `py-16` (가장 compact)
- 일반 섹션: `py-20`
- CTA: `py-24`

### 규칙 3: 카드 크기 다양성
카드가 3개 이상이면 **첫 번째 카드를 크게** 만든다 (`col-span-2` 또는 row-span-2).
모든 카드가 동일한 크기면 템플릿 느낌이 난다.

### 규칙 4: 타이포그래피 스케일
- h1: `text-5xl` 이상 (실측 median `text-6xl` = 64px)
- h2: `text-3xl` (실측 median 32px)
- body: `text-base` (실측 median 16px)
- 사용하는 font-size 종류: **최대 6종**
- h1/body 크기비: **3.0 이상** (실측 median 4.0)

### 규칙 5: 시각적 통일성
- `border-radius`: **2종 이내** (예: `rounded-lg` + `rounded-full`)
- `box-shadow`: **1종만** (예: `shadow-sm` 통일)
- 색상: 뉴트럴 비율 **60% 이상** (실측 median 71%)

### 규칙 6: 디테일 필수
모든 인터랙티브 요소에 아래를 **빠짐없이** 적용한다:
- `hover:` 상태 변화
- `transition-all duration-200` (또는 `duration-300`)
- `focus-visible:ring-2 focus-visible:ring-offset-2`
- 버튼 `cursor-pointer`
- 카드 hover 시 `hover:-translate-y-1` 또는 `hover:shadow-md`

---

## 4. 디자인 톤 레시피 (실측 데이터 기반)

### Tone A: Clean Minimal
```
배경:        #ffffff (white)
텍스트:       #0f172a (slate-900)
뉴트럴:       slate 계열 (#f8fafc, #f1f5f9, #e2e8f0)
액센트:       #000000 (black) — 실측 CTA 58%가 #000
폰트 페어:    Inter + Inter (단일), Geist Sans, Satoshi
h1 크기:      text-5xl ~ text-6xl (48~64px)
h1 weight:    font-medium (500) 또는 font-semibold (600)
간격 밀도:     넉넉함 — py-24 ~ py-32
레이아웃:      minimal hero (42%) 선호, 넓은 여백
디테일:       border-b 구분선, 미세한 shadow 없음, 깨끗한 라인
이미지:       product screenshot 또는 minimal illustration
```

### Tone B: Professional (기본값)
```
배경:         #ffffff (white)
텍스트:        #1e293b (slate-800)
뉴트럴:        slate 계열 (#f8fafc, #f1f5f9, #e2e8f0, #cbd5e1)
액센트:        #2563eb (blue-600) — 실측 blue 계열 다수
폰트 페어:     Inter + mono, Geist Sans + Geist Mono
h1 크기:       text-5xl ~ text-7xl (48~72px)
h1 weight:     font-bold (700)
간격 밀도:      보통 — py-20 ~ py-24
레이아웃:       split hero (26%) 또는 center hero, social proof 포함
디테일:        subtle shadow, refined border, gradient 배경 가능
이미지:        product screenshot (46%) + mockup 처리
```

### Tone C: Dark Premium
```
배경:         #0a0a0a (neutral-950)
텍스트:        #fafafa (neutral-50)
뉴트럴:        neutral 계열 (#171717, #262626, #404040, #a3a3a3)
액센트:        #3b82f6 (blue-500) 또는 #8b5cf6 (violet-500)
폰트 페어:     Geist Sans + Geist Mono, Satoshi + mono
h1 크기:       text-6xl ~ text-8xl (64~96px) — 다크 배경에서 큰 타이포 효과적
h1 weight:     font-bold (700) 또는 font-extrabold (800)
간격 밀도:      넉넉함 — py-24 ~ py-32
레이아웃:       fullscreen hero (30%), 넓은 여백, backdrop-blur nav
디테일:        backdrop-blur-md (26%), gradient text (12%), border border-white/10
이미지:        glow 효과, 다크 스크린샷, SVG 일러스트
```

### Tone D: Friendly
```
배경:         #fffbf5 (warm white) 또는 #fafaf9 (stone-50)
텍스트:        #44403c (stone-700)
뉴트럴:        stone 계열 (#f5f5f4, #e7e5e4, #d6d3d1)
액센트:        #f97316 (orange-500) 또는 #8b5cf6 (violet-500)
폰트 페어:     rounded sans (Nunito, Quicksand 계열) + system
h1 크기:       text-5xl ~ text-6xl (48~64px)
h1 weight:     font-semibold (600)
간격 밀도:      넉넉함 — py-20 ~ py-28
레이아웃:       split hero + 일러스트, 부드러운 곡선
디테일:        rounded-2xl, 따뜻한 shadow, 이모지/아이콘 활용, 부드러운 색상 전환
이미지:        일러스트레이션, 아바타, 밝은 톤 스크린샷
```

### Tone E: Developer
```
배경:         #09090b (zinc-950)
텍스트:        #e4e4e7 (zinc-200)
뉴트럴:        zinc 계열 (#18181b, #27272a, #3f3f46, #71717a)
액센트:        #22c55e (green-500) — 터미널 그린
폰트 페어:     mono accent (JetBrains Mono, Berkeley Mono) + sans body
h1 크기:       text-5xl ~ text-6xl (48~64px)
h1 weight:     font-bold (700)
간격 밀도:      보통 ~ 타이트 — py-16 ~ py-24
레이아웃:       minimal hero + code block, 터미널 스타일 UI
디테일:        코드 블록 강조, border border-zinc-800, monospace 액센트
이미지:        코드 스니펫, 터미널 UI, API 문서 스타일
```

---

## 5. 절대 수치 (실측 데이터 → Tailwind 매핑)

50개 상위 SaaS 사이트 측정 기준.

### Typography
| 항목 | 실측 median | Tailwind | 범위 (p25~p75) |
|------|------------|---------|---------------|
| h1 font-size | 64px | `text-6xl` | 48~80px (`text-5xl` ~ `text-7xl`) |
| h2 font-size | 32px | `text-3xl` | 16~48px (`text-base` ~ `text-5xl`) |
| body font-size | 16px | `text-base` | 16px 고정 |
| h1 line-height | 70.4px | `leading-tight` | 48~80px |
| body line-height | 24px | `leading-6` | 24px 고정 |
| nav link size | 16px | `text-base` | 14~16px (`text-sm` ~ `text-base`) |
| nav link weight | 400 (77%) | `font-normal` | — |
| h1 weight | 700 (24%), 600 (20%), 400 (24%) | 톤별 지정 | 큰 분포 |
| 커스텀 폰트 사용 | 94% | — | 시스템 기본 6%만 |

### Spacing
| 항목 | 실측 median | Tailwind | 범위 (p25~p75) |
|------|------------|---------|---------------|
| container max-width | 1400px | `max-w-7xl` (1280px) 또는 커스텀 | 1280~1448px |
| nav height | 42px | `h-10` ~ `h-12` | 32~72px |
| card border-radius | 0~10px | `rounded-none` ~ `rounded-lg` | — |
| button border-radius | 0~6px | `rounded-none` ~ `rounded-md` | — |
| card shadow 사용률 | 10% | 대부분 shadow 없음 | — |
| card border 사용률 | 12% | `border` 선택적 | — |

### Colors
| 항목 | 실측 | 비고 |
|------|------|------|
| dark theme | 60% | 과반수가 다크 테마 |
| dark section 존재 | 96% | 거의 모든 사이트에 다크 섹션 있음 |
| CTA bg #000000 | 58% (29/50) | 검정 CTA가 압도적 |
| body bg #000000 | 38% (19/50) | 다크 배경 가장 많음 |
| body bg #ffffff | 16% (8/50) | 라이트 배경 두 번째 |
| 뉴트럴 색상 비율 | median 71% | 전체 색상 중 무채색 71% |
| 고유 색상 수 | median 15 | 11~23개 범위 |

### Layout
| 항목 | 실측 | 비고 |
|------|------|------|
| hero: minimal | 42% | 가장 흔함 |
| hero: fullscreen | 30% | 두 번째 |
| hero: split | 26% | 세 번째 |
| social proof logos | 60% | 과반수 사용 |
| nav CTA | 68% | 대다수 사용 |
| hero badge | 12% | 소수 사용 |
| hero image | 58% | 과반수 사용 |
| hero video | 26% | — |
| 총 섹션 수 | median 12 | 7~24개 범위 |
| footer 컬럼 | median 2 | 1~4개 범위 |

### Visual Effects
| 항목 | 실측 | 비고 |
|------|------|------|
| 애니메이션 | 94% | 거의 필수 |
| SVG/일러스트 | 100% | 전부 사용 |
| 그래디언트 텍스트 | 12% | Tone C에서 선택적 |
| backdrop blur | 26% | 다크 테마에서 효과적 |
| product screenshot | 46% | — |
| 실사 사진 | 26% | — |

---

## 6. 비율 기준 (실측 수치화)

이 비율을 **생성 시 반드시 검증**한다.

| 비율 | 실측 median | 기준 | 의미 |
|------|-----------|------|------|
| h1/body 크기비 | **4.0** | ≥ 3.0 | 이보다 작으면 제목이 약하다 |
| h2/h1 크기비 | **0.58** | 0.4~0.75 | h2는 h1의 절반 근처 |
| hero/viewport 높이비 | **0.24** | 0.16~0.28 | 뷰포트의 약 1/4 |
| 섹션 패딩 변주율 | **0.25** | ≥ 0.2 | 0이면 단조로움, 0.2+ 이면 리듬 있음 |
| 뉴트럴 색상 비율 | **0.71** | ≥ 0.6 | 전체 색상 중 무채색 60% 이상 |
| 고유 font-size 수 | **9** | ≤ 9 | 너무 많으면 산만함 |
| container/viewport 비율 | **0.97** | 0.89~1.01 | 거의 뷰포트 꽉 채움 |
| button높이/body 비율 | **2.0** | 1.5~2.2 | 버튼 높이 = body 크기의 2배 |

---

## 7. 접근성 + 다크 모드 + 반응형

### 접근성 (WCAG AA 필수)

모든 생성 코드에 아래를 기본 포함한다:

**시맨틱 HTML:**
- `<nav>`, `<main>`, `<footer>`, `<section>` 시맨틱 태그 사용
- 제목 순서: h1 → h2 → h3 (건너뛰기 금지)
- 버튼은 `<button>`, 링크는 `<a>` (`<div>` 대체 금지)

**접근성 속성:**
- 아이콘 전용 버튼에 `sr-only` 텍스트 또는 `aria-label`
- 이미지에 `alt` 텍스트
- 모든 인터랙티브 요소에 `focus-visible:ring-2 ring-offset-2`

**대비:**
- 일반 텍스트/배경 대비 4.5:1 이상
- 큰 텍스트(18px bold 또는 24px+)/배경 대비 3:1 이상

**모션:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 다크 모드 CSS 변수

```css
:root {
  --bg: #ffffff;
  --text: #0f172a;
  --subtle-bg: #f8fafc;
  --border: #e2e8f0;
  --muted: #64748b;
  --accent: /* 톤별 기본값 또는 사용자 브랜드 색상 */;
}

.dark {
  --bg: #0a0a0a;
  --text: #fafafa;
  --subtle-bg: #171717;
  --border: #262626;
  --muted: #a3a3a3;
  --accent: /* 라이트와 동일하거나 밝기 +10% 조정 */;
}
```

HTML에 `class="dark"` 토글로 전환. Tailwind의 `dark:` 프리픽스와 병행.

### 반응형 브레이크포인트

```
모바일 우선 (mobile-first) 접근:

sm (640px):  1열 → 2열 그리드 전환
md (768px):  nav 모바일 메뉴 → 데스크탑 메뉴
lg (1024px): hero split 레이아웃 활성화
xl (1280px): max-w-7xl 컨테이너 활성화

축소 규칙:
- h1: text-6xl → sm:text-4xl → xs:text-3xl
- h2: text-3xl → sm:text-2xl
- 섹션 패딩: py-24 → sm:py-16 → xs:py-12
- 그리드: grid-cols-3 → sm:grid-cols-1
- hero split: lg:flex-row → flex-col (모바일에서 세로 배치)
```

---

## 8. 최종 체크리스트

코드 생성 완료 후 아래 10개 항목을 **전부 확인**한다. 위반 사항이 있으면 **즉시 수정**한다.

```
□ 1. 안티패턴 16개 위반 0건
□ 2. h1 font-size ≥ text-5xl (48px)
□ 3. h1/body 크기비 ≥ 3.0
□ 4. 사용된 border-radius 종류 ≤ 2
□ 5. 사용된 box-shadow 종류 ≤ 1
□ 6. 뉴트럴 색상 비율 ≥ 60%
□ 7. 모든 인터랙티브 요소에 hover + transition + focus-visible
□ 8. 시맨틱 HTML (nav, main, footer, section, button, a)
□ 9. prefers-reduced-motion 미디어 쿼리 포함
□ 10. 반응형: sm 브레이크포인트에서 레이아웃 정상 전환
```

---

## 생성 워크플로우 요약

```
1. 사전 질문 → 브랜드 색상, 제품 설명 확인
2. 페이지 유형 판별 → landing / dashboard / single / blog
3. 톤 선택 → A~E (기본 B)
4. 구조 계획 (코드 전에 텍스트로)
   - 섹션 구성: Nav → Hero → Social Proof → Features → ...
   - 각 섹션 배경: white → subtle → white → ...
   - 각 섹션 패딩: py-24 → py-12 → py-20 → ...
5. references/ 참조하여 코드 작성
   - page-recipes.md → 섹션 구성
   - sections.md → 각 섹션 코드
   - components.md → 컴포넌트
   - visual-guide.md → 색감/트렌드
6. 최종 체크리스트 10개 확인
7. 위반 사항 수정
```
