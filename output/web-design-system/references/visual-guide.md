# Visual Design Guide Reference

> 시각 디자인 원칙과 가이드. 측정 데이터 + 디자인 이론 기반.
> 코드가 아닌 "느낌"과 "판단 기준"에 집중한다.

---

## 1. Color Mood (색상 무드)

### Dark Neutral (60% of measured sites)

```
--bg: #0A0A0A    (거의 순흑)
--text: #FAFAFA  (거의 순백)
--muted: #A1A1AA (zinc-400)
--accent: #FFFFFF (순백 or 브랜드 컬러)
--border: #27272A (zinc-800)
--subtle-bg: #18181B (zinc-900)
```

- 느낌: 프리미엄, 테크, 모던
- 대표: Vercel, Linear, Raycast
- CTA: 흰색 버튼 (#FFFFFF) 또는 브랜드 컬러
- 주의: 순수 #000000보다 #0A0A0A가 눈에 편하다

### Light Clean

```
--bg: #FFFFFF
--text: #09090B
--muted: #71717A (zinc-500)
--accent: #000000
--border: #E4E4E7 (zinc-200)
--subtle-bg: #F4F4F5 (zinc-100)
```

- 느낌: 깔끔, 신뢰, 전통적
- 대표: Stripe, Notion, Figma
- CTA: 검정 버튼 (#000000) — 측정 58%

### Warm Neutral

```
--bg: #FFFDF7
--text: #1C1917
--muted: #78716C (stone-500)
--accent: #C2410C (orange-700)
--border: #E7E5E4 (stone-200)
--subtle-bg: #F5F5F4 (stone-100)
```

- 느낌: 따뜻한, 인간적, 크래프트
- 적합: 에디터, 노트앱, 라이프스타일

### Cool Blue

```
--bg: #020617 (slate-950)
--text: #F8FAFC (slate-50)
--muted: #94A3B8 (slate-400)
--accent: #3B82F6 (blue-500)
--border: #1E293B (slate-800)
--subtle-bg: #0F172A (slate-900)
```

- 느낌: 기술적, 안정적, 기업
- 적합: 클라우드, 인프라, 보안

### Vibrant Brand

```
--bg: #0A0A0A
--text: #FAFAFA
--muted: #A1A1AA
--accent: #7C3AED (violet-600)
--border: #27272A
--subtle-bg: #18181B
```

- 느낌: 에너지, 크리에이티브, 대담
- accent 색상만 바꾸면 전체 느낌이 변한다
- 보라, 초록, 파랑 — 브랜드 개성 표현

---

## 2. Image Treatment (이미지 처리)

### Browser Mockup (가장 일반적)

```
┌─ ● ● ● ──────────────────┐
│  ○ yourapp.com            │
├───────────────────────────┤
│                           │
│      [Screenshot]         │
│                           │
└───────────────────────────┘
```

- `rounded-xl border shadow-2xl` — 프리미엄 느낌의 핵심
- 3-dot chrome: macOS 실제 색상 또는 단색 (var(--border))
- URL bar: subtle 톤의 작은 텍스트

### Phone Mockup

- `rounded-[2.5rem] border-[6px]` — 두꺼운 프레임
- `aspect-[9/19.5]` — 모바일 화면 비율
- notch 또는 dynamic island 선택적 표현

### Rounded Shadow (간단한 이미지 처리)

```tsx
<img
  className="rounded-lg shadow-xl"
  style={{ border: "1px solid var(--border)" }}
/>
```

- 스크린샷에 바로 적용
- mockup 없이도 깔끔한 결과

### 이미지 기울이기 (Perspective)

```tsx
<div className="[perspective:1200px]">
  <div className="[transform:rotateY(-5deg)_rotateX(5deg)]">
    <img className="rounded-xl shadow-2xl" />
  </div>
</div>
```

- 3D perspective — Hero에서 시선 집중 효과
- 과하면 촌스러움. 5deg 이내 권장.

---

## 3. Typography Feeling (타이포 느낌)

### Geometric-Clean (가장 일반적)

- 폰트: Inter, Geist, SF Pro
- 특징: 깔끔한 기하학적 형태, 높은 가독성
- 적합: SaaS, 개발자 도구, 대부분의 프로덕트
- 측정: Inter 계열이 총 8%로 최다

### Humanist-Warm

- 폰트: Source Sans, Nunito, DM Sans
- 특징: 약간의 곡선, 부드러운 인상
- 적합: B2C, 에듀테크, 헬스케어

### Monospace-Tech

- 폰트: Berkeley Mono, JetBrains Mono, Fira Code
- 특징: 고정폭, 코드 느낌
- 적합: 개발자 도구, CLI 제품
- 측정: BerkeleyMono, ui-monospace 존재 (각 2%)

### Serif-Editorial

- 폰트: IBM Plex Serif, Georgia, Lora
- 특징: 권위, 전통, 콘텐츠 중심
- 적합: 미디어, 퍼블리싱, 고급 브랜드
- 측정: IBM Plex Serif 2%

### H1 Weight 가이드

| Weight | 비율 | 느낌 | 추천 상황 |
|--------|------|------|-----------|
| 300 (light) | 6% | 우아, 고급 | 패션, 라이프스타일 |
| 400 (normal) | 24% | 차분, 자신감 | 큰 타이포 (text-7xl+) |
| 500 (medium) | 16% | 균형 | 범용 |
| 600 (semibold) | 20% | 명확, 현대적 | SaaS 표준 |
| 700 (bold) | 24% | 강렬, 확신 | 가장 흔한 선택 |
| 800 (extrabold) | 8% | 대담, 임팩트 | 큰 스테이트먼트 |

---

## 4. Whitespace 원칙

### 넉넉하게 > 빡빡하게

측정 데이터가 증명한다:
- Hero padding: median 0 (콘텐츠 자체가 충분히 커서 패딩이 필요 없음)
- Section padding: py-20 (80px) — 넉넉한 여백
- Card padding: p-6~p-8 (24-32px) — 숨 쉴 공간

### 여백 스케일

```
4px  (1)   — 인라인 요소 간 미세 간격
8px  (2)   — 아이콘과 텍스트 사이
16px (4)   — 관련 요소 그룹 내부
24px (6)   — 카드 내부 패딩 (p-6)
32px (8)   — 소규모 섹션 간 간격
48px (12)  — Social Proof 패딩
64px (16)  — 섹션 헤더 ↔ 콘텐츠 (mb-16)
80px (20)  — 섹션 패딩 (py-20)
96px (24)  — Hero/CTA 패딩 (py-24)
```

### 규칙

1. **여백이 의미를 만든다** — 가까이 있으면 관련됨, 멀면 별개
2. **일관성** — 같은 레벨의 요소는 같은 간격
3. **비율** — 큰 요소에는 큰 여백 (H1 아래 mt-6, H2 아래 mt-4)
4. **콘텐츠가 적을수록 여백이 많아야** — Social Proof py-12 vs Feature py-20

---

## 5. Visual Hierarchy (시각 계층)

### 한 뷰포트에 하나의 초점 (One Focal Point per Viewport)

- Hero: H1이 초점. 나머지는 보조.
- Feature 섹션: 섹션 타이틀이 초점.
- Pricing: 중앙 "Popular" 카드가 초점.

### 계층 도구

| 도구 | 높은 계층 | 낮은 계층 |
|------|-----------|-----------|
| 크기 | text-6xl | text-sm |
| 무게 | font-bold (700) | font-normal (400) |
| 색상 | var(--text) | var(--muted) |
| 대비 | accent color | border color |
| 공간 | 주변 여백 큼 | 밀집 |

### H1/Body 비율

측정 median: **4.0** (H1 64px / Body 16px)

이 비율이 중요한 이유:
- 3.0 미만: H1이 충분히 크지 않다. 임팩트 부족.
- 4.0: 적정. 명확한 계층.
- 5.0 이상: 과감한 스타일. 대형 스테이트먼트.

### Neutral Color Ratio

측정 median: **0.71** (전체 색상 중 71%가 중성색)

- 0.7 이상: 모노톤 중심. accent가 돋보인다.
- 0.5-0.7: 약간의 색감. 균형잡힌 팔레트.
- 0.5 미만: 화려함. 과하면 산만.

---

## 6. Section Rhythm (섹션 리듬)

### Dense → Sparse 교대

- **Dense**: Feature Grid (카드 6개, 정보 많음) → 다음 섹션은
- **Sparse**: How It Works (3개 스텝, 넉넉한 여백) → 다음은
- **Dense**: Testimonials (3개 카드, 인용문) → 다음은
- **Sparse**: CTA (텍스트 + 버튼 하나)

이 교대가 스크롤 피로를 줄인다.

### 시각적 무게 교대

```
Light section (bg)     → 가벼운 느낌
Subtle section (subtle-bg) → 약간 무거움
Light section (bg)     → 다시 가벼움
...
Heavy section (text bg, inverted) → 확실한 마무리
```

---

## 7. Detail Craftsmanship Checklist

프로페셔널과 아마추어를 구분하는 디테일.

### 필수 (Must-have)

- [ ] `transition-colors duration-150` 또는 `transition-all duration-200` — 모든 인터랙티브 요소에
- [ ] `focus-visible:ring-2 ring-offset-2` — 키보드 접근성
- [ ] `tracking-tight` — H1, H2에 적용 (자간 조밀하게)
- [ ] `leading-relaxed` — body text에 적용 (행간 넉넉하게)
- [ ] `antialiased` — body에 font smoothing (Next.js 기본 적용)
- [ ] 일관된 border-radius — 같은 컴포넌트는 같은 radius
- [ ] hover state — 모든 클릭 가능한 요소에 시각적 피드백

### 고급 (Nice-to-have)

- [ ] `backdrop-blur-md` nav — 26% 사이트 사용, 트렌드 상승
- [ ] `grayscale` social proof 로고 — hover 시 컬러 전환
- [ ] `sm:scale-105` highlighted card — 미묘한 3D 효과
- [ ] `color-mix()` 반투명 배경/경계 — 모던 CSS
- [ ] gradient text — 12% 사이트 사용
- [ ] dot pattern 배경 — subtle 데코레이션

---

## 8. Trend Elements 2025-2026

측정 데이터 + 트렌드 관찰 기반.

### Backdrop-blur Navigation (26% → 상승 추세)

```tsx
<nav className="sticky top-0 z-50 border-b backdrop-blur-md"
  style={{
    backgroundColor: "color-mix(in srgb, var(--bg) 80%, transparent)",
  }}
/>
```

### Bento Grid Layout

불규칙한 그리드. 첫 카드 `col-span-2`, 일부 카드 `row-span-2`.
Apple, Linear 스타일.

### Gradient Text (12%)

```tsx
<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
  gradient headline
</span>
```

- H1의 일부분에만 적용. 전체 적용은 과함.

### Dot Pattern Background

```tsx
<div
  className="absolute inset-0 opacity-20"
  style={{
    backgroundImage: "radial-gradient(circle, var(--border) 1px, transparent 1px)",
    backgroundSize: "24px 24px",
  }}
/>
```

- `opacity-20` — 매우 미묘하게
- Hero 또는 CTA 섹션 배경에 depth 추가

### Glow Effect

```tsx
<div
  className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl"
  style={{
    backgroundColor: "var(--accent)",
    opacity: 0.1,
  }}
/>
```

- 원형 blur로 부드러운 빛 효과
- dark theme에서 효과적
- `opacity: 0.1` — 과하면 안 됨

### SVG Illustrations (100%)

모든 측정 사이트가 SVG를 사용한다. 래스터 이미지 대신 벡터.

---

## 9. "What Makes It Feel Professional" 요약

### 프로페셔널 사이트의 공통점

1. **제한된 팔레트**: 2-3 색 + 뉴트럴 (neutral ratio 0.71)
2. **일관된 간격**: 4px 그리드 기반, 예외 없음
3. **Typography 계층**: H1/Body ratio 4.0, 명확한 크기 차이
4. **미묘한 인터랙션**: hover 시 opacity 변화, 작은 shadow 추가
5. **의도적 여백**: "비워둠"이 "채움"보다 고급
6. **디테일 일관성**: 모든 카드 같은 radius, 모든 버튼 같은 height
7. **색상 반전 CTA**: 페이지 끝에서 확실한 전환점

---

## 10. Upper vs Lower Quality 비교표

| 요소 | 상위 품질 | 하위 품질 |
|------|-----------|-----------|
| **색상 수** | 2-3 + 뉴트럴 (median 15) | 5+ 무분별한 색상 |
| **H1 크기** | text-5xl~6xl (48-64px) | text-2xl~3xl (너무 작음) |
| **H1/Body ratio** | 4.0 이상 | 2.0 미만 |
| **여백** | py-20~24 (넉넉) | py-8~12 (빡빡) |
| **Border radius** | 일관 (전부 rounded-lg) | 불일관 (lg, md, xl 혼용) |
| **Transition** | duration-150~200 (빠름) | 없거나 duration-500 (느림) |
| **Font weight** | 2-3 단계 (400, 500, 700) | 1 단계 또는 5+ 단계 |
| **Shadow** | shadow-sm + hover:shadow-md | shadow-lg 기본 (과함) |
| **배경 교대** | bg ↔ subtle-bg 일관 | 같은 색상 연속 |
| **CTA** | 명확한 1-2개 | 모든 곳에 CTA (선택 피로) |
| **아이콘** | 단일 라이브러리 (lucide) | 스타일 혼용 |
| **이미지 처리** | mockup + shadow + border | 날것 스크린샷 |
| **반응형** | sm: 브레이크포인트 설계 | 데스크톱만 고려 |
| **Focus state** | focus-visible:ring | 없음 (접근성 위반) |
| **호버** | 미묘 (opacity, shadow) | 과도 (scale, color 변경) |
| **Footer** | 4-column links + brand | 1줄 copyright만 |
