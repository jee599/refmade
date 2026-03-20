# Component Patterns Reference

> 50개 SaaS 랜딩페이지 측정 데이터 기반 개별 컴포넌트 패턴.
> CSS 변수: `var(--bg)`, `var(--text)`, `var(--accent)`, `var(--muted)`, `var(--border)`, `var(--subtle-bg)`

---

## Button

측정 데이터:
- CTA bg: #000000 (58%), 나머지 브랜드 컬러
- Button height/body ratio: median 2.0 (body 16px 기준 → 약 32-40px)
- Border-radius: median 0, p75 6px (rounded-md). 일부 rounded-full.
- Padding: px median 4px, py median 0 (높이로 제어하는 사이트 다수)

### Primary Button

```tsx
<a
  href="#"
  className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
  style={{
    backgroundColor: "var(--accent)",
    color: "var(--bg)",
  }}
>
  Get Started
  <ArrowRight size={16} />
</a>
```

- 높이: `py-3` (12px * 2) + text-sm (20px line) = 약 44px → h-10~h-11 범위
- `rounded-lg` (8px) — 측정 p75 6px, 트렌드 상 8px가 현대적
- `hover:opacity-90` — 색상 변경보다 opacity가 CSS 변수와 호환성 좋음
- `focus-visible:ring-2 ring-offset-2` — 접근성 필수
- `transition-colors duration-150` — 150ms 빠른 반응

### Secondary Button (Outline)

```tsx
<a
  href="#"
  className="inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-medium transition-colors duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
  style={{
    borderColor: "var(--border)",
    color: "var(--text)",
  }}
>
  Learn More
</a>
```

- border만 사용, 배경 없음
- hover: `opacity-80` — primary보다 미묘한 변화
- primary와 동일한 높이/패딩 유지

### Ghost Button

```tsx
<button
  className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
  style={{ color: "var(--muted)" }}
>
  Cancel
</button>
```

- border도 배경도 없음
- `var(--muted)` — 낮은 시각 우선순위
- `px-4 py-2` — primary보다 작은 패딩 (보조 동작)

### Button Size 변형

| Size | Classes | 용도 |
|------|---------|------|
| sm | `px-3 py-1.5 text-xs` | Nav CTA, 카드 내부 |
| md (기본) | `px-4 py-2 text-sm` | 일반 버튼 |
| lg | `px-6 py-3 text-base` | Hero CTA, 주요 전환 |

### Rounded-full 변형 (pill)

```tsx
<a
  href="#"
  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
  style={{
    backgroundColor: "var(--accent)",
    color: "var(--bg)",
  }}
>
  Get Started
</a>
```

- `rounded-full` — pill 형태, 부드러운 느낌
- 측정 상 border-radius max에 매우 큰 값(33554400) — rounded-full 사용 사이트 존재

---

## Card

측정 데이터:
- Shadow: 10% 사용
- Border: 12% 사용
- Border-radius: p75 10px (rounded-lg)
- Padding: median 0 (외부 정의), 실제 카드 내부 p-6~p-8 표준

### Standard Card (Border)

```tsx
<article
  className="group rounded-lg border p-6 transition-all duration-200 hover:shadow-md"
  style={{
    borderColor: "var(--border)",
    backgroundColor: "var(--bg)",
  }}
>
  <h3 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>
    Card Title
  </h3>
  <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
    Card description text goes here.
  </p>
</article>
```

- `border` + `hover:shadow-md` — 평상시 border, hover 시 shadow 추가
- shadow와 border를 동시에 기본 적용하지 않는다 (둘 중 하나)
- `group` — 내부 요소 hover 스타일링 가능

### Shadow Card

```tsx
<article
  className="rounded-lg p-6 shadow-sm transition-all duration-200 hover:shadow-md"
  style={{ backgroundColor: "var(--bg)" }}
>
  <h3 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>
    Card Title
  </h3>
  <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
    Card description text.
  </p>
</article>
```

- `shadow-sm` → `hover:shadow-md` — 미묘한 elevation 변화
- border 없음 — 깨끗한 느낌

### Highlighted Card

```tsx
<article
  className="rounded-lg border-2 p-6 sm:scale-105"
  style={{
    borderColor: "var(--accent)",
    backgroundColor: "var(--bg)",
  }}
>
  {/* "Popular" badge 등 */}
  <span
    className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium"
    style={{
      backgroundColor: "var(--accent)",
      color: "var(--bg)",
    }}
  >
    Popular
  </span>
  {/* ... content ... */}
</article>
```

- `border-2` + accent color — 강조 카드 (pricing 중앙)
- `sm:scale-105` — 살짝 크게 (3D 돌출 효과)

---

## Badge / Chip

### Subtle Badge (Hero 상단)

```tsx
<span
  className="inline-block rounded-full px-3 py-1 text-xs font-medium"
  style={{
    backgroundColor: "var(--subtle-bg)",
    color: "var(--muted)",
    border: "1px solid var(--border)",
  }}
>
  Now in Public Beta
</span>
```

- 측정: hero badge 12% 사이트 사용
- `rounded-full` + `px-3 py-1` + `text-xs`
- 배경 subtle, 텍스트 muted — 주목하되 H1을 압도하지 않음

### Accent Badge (Pricing "Popular")

```tsx
<span
  className="inline-block rounded-full px-3 py-1 text-xs font-medium"
  style={{
    backgroundColor: "var(--accent)",
    color: "var(--bg)",
  }}
>
  Popular
</span>
```

- 강한 대비: accent bg + bg text (반전)
- pricing, feature card에서 특정 항목 강조

### Status Badge

```tsx
<span
  className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
  style={{
    backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)",
    color: "var(--accent)",
  }}
>
  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
  Active
</span>
```

- `color-mix()` — accent 15% 투명 배경
- 작은 dot indicator — 상태 표시
- dashboard, card 내부 상태 표시용

---

## Input

```tsx
<input
  type="email"
  placeholder="you@example.com"
  className="h-10 w-full rounded-lg border px-3 text-sm transition-colors duration-150 placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
  style={{
    borderColor: "var(--border)",
    backgroundColor: "var(--bg)",
    color: "var(--text)",
  }}
/>
```

- `h-10` (40px) — 버튼과 동일 높이 (나란히 배치 시 정렬)
- `rounded-lg` — 버튼과 동일 radius
- `px-3` — 내부 여백
- `focus:ring-2 ring-offset-2` — 접근성
- `placeholder:opacity-50` — 부드러운 placeholder

### Input + Button 조합 (이메일 수집)

```tsx
<div className="flex gap-2">
  <input
    type="email"
    placeholder="you@example.com"
    className="h-10 flex-1 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
    style={{
      borderColor: "var(--border)",
      backgroundColor: "var(--bg)",
      color: "var(--text)",
    }}
  />
  <button
    className="h-10 shrink-0 rounded-lg px-4 text-sm font-medium transition-colors duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    style={{
      backgroundColor: "var(--accent)",
      color: "var(--bg)",
    }}
  >
    Subscribe
  </button>
</div>
```

- `flex gap-2` — 간격 8px
- input `flex-1` — 남은 공간 차지
- button `shrink-0` — 줄어들지 않음
- 높이 h-10 일치

---

## Avatar

### Basic Avatar

```tsx
<div
  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium"
  style={{
    backgroundColor: "var(--subtle-bg)",
    color: "var(--muted)",
    border: "1px solid var(--border)",
  }}
  aria-hidden="true"
>
  SC
</div>
```

- `h-10 w-10 rounded-full` (40x40px)
- 이미지 없을 때 이니셜 fallback
- `aria-hidden="true"` — 장식 요소

### Avatar with Image

```tsx
<img
  src="/avatar.jpg"
  alt="Sarah Chen"
  className="h-10 w-10 rounded-full object-cover"
/>
```

### Avatar Group (겹쳐진 아바타)

```tsx
<div className="flex -space-x-2">
  {avatars.map((avatar, i) => (
    <img
      key={i}
      src={avatar.src}
      alt={avatar.name}
      className="h-8 w-8 rounded-full border-2 object-cover"
      style={{ borderColor: "var(--bg)" }}
    />
  ))}
  <div
    className="flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-medium"
    style={{
      borderColor: "var(--bg)",
      backgroundColor: "var(--subtle-bg)",
      color: "var(--muted)",
    }}
  >
    +5
  </div>
</div>
```

- `-space-x-2` — 겹침 효과
- `border-2` bg 색상 — 겹침 경계선

---

## Browser Mockup

측정: product screenshot 46%, SVG/illustration 100%

```tsx
<div
  className="overflow-hidden rounded-xl border shadow-2xl"
  style={{
    borderColor: "var(--border)",
    backgroundColor: "var(--subtle-bg)",
  }}
>
  {/* Browser chrome — 3-dot header */}
  <div
    className="flex items-center gap-2 border-b px-4 py-3"
    style={{ borderColor: "var(--border)" }}
  >
    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "#28C840" }} />
    <div
      className="ml-2 flex-1 rounded-lg px-3 py-1 text-xs"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--muted)",
      }}
    >
      yourapp.com
    </div>
  </div>

  {/* Content area */}
  <div className="aspect-video w-full">
    {/* 스크린샷 또는 SVG illustration */}
  </div>
</div>
```

**핵심 규칙**:
- `rounded-xl` (12px) — 카드보다 큰 radius로 프리미엄 느낌
- `shadow-2xl` — 강한 그림자로 floating 효과
- 3-dot: 실제 macOS 색상 (#FF5F57, #FEBC2E, #28C840) 또는 `var(--border)` 단색
- URL bar: `rounded-lg px-3 py-1 text-xs` — subtle-bg 안의 bg 색상 (depth 연출)
- `aspect-video` (16:9) — 스크린샷 비율

### Phone Mockup

```tsx
<div
  className="mx-auto w-64 overflow-hidden rounded-[2.5rem] border-[6px] shadow-2xl"
  style={{
    borderColor: "var(--border)",
    backgroundColor: "var(--subtle-bg)",
  }}
>
  {/* Notch */}
  <div className="relative">
    <div
      className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl"
      style={{ backgroundColor: "var(--border)" }}
    />
  </div>

  {/* Screen */}
  <div className="aspect-[9/19.5] w-full">
    {/* 스크린 콘텐츠 */}
  </div>
</div>
```

- `rounded-[2.5rem]` — 40px radius (iPhone 스타일)
- `border-[6px]` — 두꺼운 프레임
- `aspect-[9/19.5]` — 모바일 화면 비율

---

## Icon Container

아이콘을 감싸는 배경 컨테이너. feature 카드에서 주로 사용.

```tsx
<div
  className="inline-flex rounded-lg p-2"
  style={{ backgroundColor: "var(--subtle-bg)" }}
>
  <Zap size={20} style={{ color: "var(--accent)" }} />
</div>
```

- `rounded-lg p-2` — 아이콘 주변에 8px 패딩
- subtle-bg 배경 — 아이콘에 시각적 무게감 부여
- 아이콘 color: accent — 브랜드 색상 일관성

### 원형 변형

```tsx
<div
  className="inline-flex rounded-full p-3"
  style={{ backgroundColor: "var(--subtle-bg)" }}
>
  <Shield size={24} style={{ color: "var(--accent)" }} />
</div>
```

---

## Section Header (공통 패턴)

거의 모든 섹션에 동일한 구조로 반복된다.

```tsx
<div className="mx-auto mb-16 max-w-2xl text-center">
  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
    Section Title
  </h2>
  <p className="mt-4 text-base" style={{ color: "var(--muted)" }}>
    Supporting description that explains the section.
  </p>
</div>
```

- `max-w-2xl text-center mx-auto` — 중앙 정렬, 최대 672px 폭
- `mb-16` (64px) — 헤더와 콘텐츠 사이 간격
- H2: `text-3xl sm:text-4xl` — 측정 median 32px
- Description: `mt-4 text-base` muted — 보조 설명
