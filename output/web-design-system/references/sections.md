# Section Patterns Reference

> 50개 SaaS 랜딩페이지 측정 데이터 기반 섹션별 코드 패턴.
> 모든 컴포넌트는 CSS 변수(`var(--bg)`, `var(--text)`, `var(--accent)`, `var(--muted)`, `var(--border)`, `var(--subtle-bg)`)를 사용한다.

---

## 공통 규칙

- **Container**: `max-w-6xl` (1152px) — 측정 median 1400px이지만, Tailwind 기본값 중 가장 가까운 `max-w-7xl`(1280px) 또는 `max-w-6xl`(1152px) 사용. 랜딩 텍스트 가독성을 위해 `max-w-6xl` 권장.
- **Horizontal padding**: `px-4 sm:px-6 lg:px-8`
- **Section padding**: `py-20` (80px) 기본, Hero는 `py-24` (96px)
- **Font stack**: Inter / Geist 계열 (측정 top: Inter 계열 8%, Geist 4%)
- **Animation**: 94%가 animation 사용 — `transition-all duration-200` 기본

---

## 1. Nav

**측정 데이터**: sticky/fixed 9.4%, static 46.5%, CTA 포함 68%, nav 높이 median 42px, 링크 font-size median 16px (text-base), weight 400 (76.7%)

```tsx
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "#docs" },
    { label: "Blog", href: "#blog" },
  ];

  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        backgroundColor: "color-mix(in srgb, var(--bg) 80%, transparent)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="text-lg font-bold"
            style={{ color: "var(--text)" }}
          >
            Logo
          </a>

          {/* Desktop links — text-sm font-medium (측정: 14-16px, weight 400) */}
          <div className="hidden items-center gap-8 sm:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-colors duration-150 hover:opacity-80"
                style={{ color: "var(--muted)" }}
              >
                {link.label}
              </a>
            ))}
            {/* Nav CTA — 68% 사이트에 존재 */}
            <a
              href="#cta"
              className="rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--bg)",
              }}
            >
              Get Started
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="rounded-lg p-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:hidden"
            style={{ color: "var(--text)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu — slide down */}
        {mobileOpen && (
          <div
            className="border-t pb-4 pt-2 sm:hidden"
            style={{ borderColor: "var(--border)" }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 hover:opacity-80"
                style={{ color: "var(--muted)" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              className="mt-2 block rounded-lg px-3 py-2 text-center text-sm font-medium transition-colors duration-150 hover:opacity-90"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--bg)",
              }}
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
```

**핵심 규칙**:
- `backdrop-blur-md` + `color-mix()` 투명 배경 — 26% 사이트에서 backdrop-blur 사용, 트렌드 상승 중
- 높이 `h-16` (64px) — 측정 median 42px이지만 터치 영역 고려해 64px 권장
- Nav CTA는 accent 색상 버튼, 나머지 링크는 `var(--muted)`
- 반응형: `sm:flex` / `sm:hidden`으로 분기

---

## 2. Hero (Center)

**측정 데이터**: center 타입 2%, 하지만 fullscreen(30%)과 minimal(42%)도 center 정렬이 많음. badge 12%, image 58%, video 26%, CTA median 1개.

```tsx
"use client";

import { ArrowRight } from "lucide-react";

export default function HeroCenter() {
  return (
    <section
      className="py-24"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge — 12% 사이트 사용, 신규 기능 강조용 */}
          <span
            className="mb-6 inline-block rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: "var(--subtle-bg)",
              color: "var(--muted)",
              border: "1px solid var(--border)",
            }}
          >
            Now in Public Beta
          </span>

          {/* H1 — 측정: median 64px (text-6xl), weight 400-700 분산 */}
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
            Build faster.{" "}
            <span style={{ color: "var(--accent)" }}>Ship sooner.</span>
          </h1>

          {/* Subtitle — body 16px 기반, text-xl로 살짝 크게 */}
          <p
            className="mx-auto mt-6 max-w-2xl text-xl"
            style={{ color: "var(--muted)" }}
          >
            The modern toolkit that helps you go from idea to production in
            record time. No boilerplate, no busywork.
          </p>

          {/* CTA buttons — primary + secondary 조합 */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-medium transition-colors duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--bg)",
              }}
            >
              Get Started Free
              <ArrowRight size={16} />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-base font-medium transition-colors duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              See Demo
            </a>
          </div>
        </div>

        {/* Browser mockup — 46% 사이트에 product screenshot 존재 */}
        <div
          className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-xl border shadow-2xl"
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
          {/* Screenshot placeholder */}
          <div className="aspect-video w-full" />
        </div>
      </div>
    </section>
  );
}
```

**핵심 규칙**:
- H1: `text-5xl md:text-6xl` (48px → 64px) — 측정 median 64px, h1/body ratio 4.0
- 텍스트 영역 `max-w-3xl`, 모크업 `max-w-4xl`
- CTA 2개: primary(accent bg) + secondary(outline border)
- `tracking-tight` — H1에 필수
- 모크업 `rounded-xl shadow-2xl` — 고급스러움 연출

---

## 3. Hero (Split)

**측정 데이터**: split 26%. grid-cols-2 레이아웃, 왼쪽 텍스트 + 오른쪽 이미지/모크업.

```tsx
"use client";

import { ArrowRight } from "lucide-react";

export default function HeroSplit() {
  return (
    <section
      className="py-24"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 sm:grid-cols-2">
          {/* Left: text */}
          <div>
            <span
              className="mb-6 inline-block rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: "var(--subtle-bg)",
                color: "var(--muted)",
                border: "1px solid var(--border)",
              }}
            >
              New Release
            </span>

            <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
              The smarter way to{" "}
              <span style={{ color: "var(--accent)" }}>launch</span>
            </h1>

            <p
              className="mt-6 text-xl"
              style={{ color: "var(--muted)" }}
            >
              Stop wasting time on infrastructure. Focus on what matters —
              building the product your users love.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#cta"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-medium transition-colors duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--bg)",
                }}
              >
                Start Building
                <ArrowRight size={16} />
              </a>
              <a
                href="#learn"
                className="inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 text-base font-medium transition-colors duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right: browser mockup */}
          <div
            className="overflow-hidden rounded-xl border shadow-2xl"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--subtle-bg)",
            }}
          >
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
                yourapp.com/dashboard
              </div>
            </div>
            <div className="aspect-video w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

**핵심 규칙**:
- `grid items-center gap-12 sm:grid-cols-2` — 모바일에서 스택, 데스크톱에서 2열
- 텍스트 왼쪽이 기본 (LTR 독서 패턴)
- gap-12 (48px) — 텍스트와 이미지 사이 충분한 여백
- 모바일에서 텍스트가 먼저 (DOM 순서 = 시각 순서)

---

## 4. Social Proof

**측정 데이터**: 60% 사이트 social proof 로고 존재. 보통 Hero 바로 아래 배치.

```tsx
"use client";

const logos = [
  { name: "Acme Corp", width: 120 },
  { name: "Globex", width: 100 },
  { name: "Initech", width: 110 },
  { name: "Hooli", width: 90 },
  { name: "Pied Piper", width: 130 },
  { name: "Stark Industries", width: 140 },
];

export default function SocialProof() {
  return (
    <section
      className="py-12"
      style={{
        backgroundColor: "var(--subtle-bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p
          className="mb-8 text-center text-sm font-medium uppercase tracking-wider"
          style={{ color: "var(--muted)" }}
        >
          Trusted by teams at
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center opacity-60 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0"
              style={{ color: "var(--muted)" }}
            >
              {/* 실제 사용 시 <Image> 또는 SVG 로고로 교체 */}
              <span
                className="text-lg font-semibold"
                style={{ color: "var(--muted)" }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**핵심 규칙**:
- `py-12` (48px) — 다른 섹션(py-20)보다 작은 패딩. 콘텐츠가 적으므로.
- `grayscale opacity-60` → hover 시 풀 컬러 — 시각적 노이즈 감소
- `uppercase tracking-wider text-sm` — "Trusted by" 라벨 표준 패턴
- 상하 border로 시각적 구분

---

## 5. Features (Bento Grid)

**측정 데이터**: feature 섹션은 거의 모든 사이트에 존재. 첫 번째 카드를 크게 만드는 bento 패턴 증가 추세.

```tsx
"use client";

import {
  Zap, Shield, BarChart3, Layers, Globe, Lock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built on edge infrastructure for sub-50ms response times globally. No cold starts, no waiting.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified with end-to-end encryption and role-based access control.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Track every metric that matters with live dashboards and custom alerts.",
  },
  {
    icon: Layers,
    title: "Composable Architecture",
    description:
      "Mix and match modules to build exactly what you need. Nothing more.",
  },
  {
    icon: Globe,
    title: "Global CDN",
    description:
      "Deployed across 200+ edge locations for instant content delivery worldwide.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "GDPR and CCPA compliant out of the box. Your users' data stays protected.",
  },
];

export default function FeaturesGrid() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to ship
          </h2>
          <p className="mt-4 text-base" style={{ color: "var(--muted)" }}>
            A complete platform with all the tools your team needs from day one.
          </p>
        </div>

        {/* Bento grid — 첫 카드 col-span-2 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isLarge = i === 0;

            return (
              <article
                key={feature.title}
                className={`group rounded-lg border p-6 transition-all duration-200 hover:shadow-md ${
                  isLarge ? "sm:col-span-2" : ""
                }`}
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--bg)",
                }}
              >
                <div
                  className="mb-4 inline-flex rounded-lg p-2"
                  style={{ backgroundColor: "var(--subtle-bg)" }}
                >
                  <Icon size={20} style={{ color: "var(--accent)" }} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

**핵심 규칙**:
- 첫 카드 `sm:col-span-2` — bento 그리드의 핵심. 시각적 변화를 준다.
- 카드: `border p-6 rounded-lg` — 측정 card_border_radius p75 10px (rounded-lg)
- hover: `hover:shadow-md transition-all duration-200`
- 아이콘 컨테이너: `rounded-lg p-2` + subtle-bg
- H2: `text-3xl sm:text-4xl` — 측정 median 32px (text-3xl)

---

## 6. Features (Alternating)

**측정 데이터**: 텍스트-이미지 교차 배치. 2-3개 행이 일반적.

```tsx
"use client";

import { Code, Workflow, PieChart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FeatureRow {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: { label: string; href: string };
}

const rows: FeatureRow[] = [
  {
    icon: Code,
    title: "Developer-first API",
    description:
      "Integrate in minutes with our well-documented REST and GraphQL APIs. SDKs available for every major language.",
    link: { label: "Read the docs", href: "#docs" },
  },
  {
    icon: Workflow,
    title: "Automated Workflows",
    description:
      "Define triggers and actions with a visual builder or code. Automate repetitive tasks and keep your pipeline flowing.",
    link: { label: "See examples", href: "#examples" },
  },
  {
    icon: PieChart,
    title: "Actionable Insights",
    description:
      "Go beyond vanity metrics. Get deep analytics on user behavior, conversion funnels, and retention in real time.",
  },
];

export default function FeaturesAlternating() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "var(--subtle-bg)", color: "var(--text)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works under the hood
          </h2>
          <p className="mt-4 text-base" style={{ color: "var(--muted)" }}>
            Powerful features designed to fit your workflow.
          </p>
        </div>

        <div className="space-y-20">
          {rows.map((row, i) => {
            const Icon = row.icon;
            const isEven = i % 2 === 1;

            return (
              <div
                key={row.title}
                className="grid items-center gap-12 sm:grid-cols-2"
              >
                {/* Text side */}
                <div className={isEven ? "sm:order-2" : ""}>
                  <div
                    className="mb-4 inline-flex rounded-lg p-2"
                    style={{ backgroundColor: "var(--bg)" }}
                  >
                    <Icon size={20} style={{ color: "var(--accent)" }} />
                  </div>
                  <h3 className="mb-3 text-2xl font-semibold">{row.title}</h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {row.description}
                  </p>
                  {row.link && (
                    <a
                      href={row.link.href}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition-colors duration-150 hover:opacity-80"
                      style={{ color: "var(--accent)" }}
                    >
                      {row.link.label} &rarr;
                    </a>
                  )}
                </div>

                {/* Image placeholder */}
                <div
                  className={`aspect-[4/3] rounded-lg border ${
                    isEven ? "sm:order-1" : ""
                  }`}
                  style={{
                    backgroundColor: "var(--bg)",
                    borderColor: "var(--border)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

**핵심 규칙**:
- `sm:order-2` / `sm:order-1` — 짝수 행에서 텍스트-이미지 순서 반전
- `space-y-20` (80px) — 행 간 간격 = 섹션 패딩과 동일
- 각 행에 CTA 링크 (optional) — `text-sm font-medium` accent 색상
- 이미지 placeholder: `aspect-[4/3]` — 가로형 비율

---

## 7. How It Works

**측정 데이터**: 3단계 프로세스가 표준. numbered steps + connector line.

```tsx
"use client";

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Connect your tools",
    description:
      "Link your existing stack in a few clicks. We support 50+ integrations out of the box.",
  },
  {
    number: "02",
    title: "Configure your workflow",
    description:
      "Use the visual builder or write code to define triggers, conditions, and actions.",
  },
  {
    number: "03",
    title: "Ship with confidence",
    description:
      "Deploy to production with one click. Monitor performance and iterate on real data.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Up and running in 3 steps
          </h2>
          <p className="mt-4 text-base" style={{ color: "var(--muted)" }}>
            No lengthy onboarding. No week-long setup. Just results.
          </p>
        </div>

        <div className="relative grid gap-8 sm:grid-cols-3">
          {/* Connecting line — 데스크톱에서만 표시 */}
          <div
            className="absolute left-0 right-0 top-10 hidden h-px sm:block"
            style={{ backgroundColor: "var(--border)" }}
            aria-hidden="true"
          />

          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              {/* Step number circle */}
              <div
                className="relative z-10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold"
                style={{
                  backgroundColor: "var(--subtle-bg)",
                  color: "var(--accent)",
                  border: "2px solid var(--border)",
                }}
              >
                {step.number}
              </div>

              <h3 className="mb-3 text-lg font-semibold">{step.title}</h3>
              <p
                className="mx-auto max-w-xs text-base leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**핵심 규칙**:
- 3열 그리드 `sm:grid-cols-3`
- Connector line: `absolute top-10 h-px` — 원형 중앙을 가로지르는 수평선
- 원형 스텝 넘버: `h-20 w-20 rounded-full` + `z-10` (라인 위에 배치)
- `"01"` 포맷 — 단순 숫자보다 프리미엄 느낌

---

## 8. Testimonials

**측정 데이터**: 32% 사이트 testimonials 존재. 3개 카드, 중앙 강조가 표준 패턴.

```tsx
"use client";

import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  highlighted?: boolean;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "We cut our deployment time from 45 minutes to under 3. The team actually enjoys shipping now.",
    name: "Sarah Chen",
    role: "CTO, Acme Corp",
  },
  {
    quote:
      "This replaced four tools in our stack. The unified dashboard alone saved us 10 hours a week.",
    name: "Marcus Rivera",
    role: "VP Engineering, Globex",
    highlighted: true,
  },
  {
    quote:
      "The developer experience is unmatched. Great docs, responsive support, and the API just works.",
    name: "Aisha Patel",
    role: "Lead Developer, Initech",
  },
];

export default function Testimonials() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "var(--subtle-bg)", color: "var(--text)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by engineering teams
          </h2>
          <p className="mt-4 text-base" style={{ color: "var(--muted)" }}>
            Don&apos;t take our word for it.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className={`group rounded-lg border p-6 transition-all duration-200 hover:shadow-md ${
                t.highlighted ? "sm:scale-105" : ""
              }`}
              style={{
                borderColor: t.highlighted ? "var(--accent)" : "var(--border)",
                backgroundColor: "var(--bg)",
              }}
            >
              <Quote
                size={20}
                className="mb-4"
                style={{ color: "var(--accent)", opacity: 0.5 }}
                aria-hidden="true"
              />

              <p
                className="mb-6 text-base leading-relaxed"
                style={{ color: "var(--text)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <footer className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: "var(--subtle-bg)",
                    color: "var(--muted)",
                    border: "1px solid var(--border)",
                  }}
                  aria-hidden="true"
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <cite className="block text-sm font-semibold not-italic">
                    {t.name}
                  </cite>
                  <span className="text-xs" style={{ color: "var(--muted)" }}>
                    {t.role}
                  </span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**핵심 규칙**:
- 중앙 카드 `sm:scale-105` + accent border — 시각적 강조
- `<blockquote>` + `<cite>` — 시맨틱 HTML
- Avatar: `h-10 w-10 rounded-full` + 이니셜 fallback
- Quote 아이콘: `opacity: 0.5` — 너무 튀지 않게

---

## 9. Pricing

**측정 데이터**: 96% 사이트에 pricing 존재. 3열 표준, 중앙 "Popular" 표기.

```tsx
"use client";

import { Check } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "For individuals and small side projects.",
    features: [
      "Up to 3 projects",
      "1,000 API calls/month",
      "Community support",
      "Basic analytics",
    ],
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing teams shipping real products.",
    features: [
      "Unlimited projects",
      "100,000 API calls/month",
      "Priority support",
      "Advanced analytics",
      "Custom domains",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For organizations with advanced needs.",
    features: [
      "Everything in Pro",
      "Unlimited API calls",
      "Dedicated support",
      "SLA guarantee",
      "SSO & SAML",
      "Audit logs",
      "Custom contracts",
    ],
    cta: "Contact Sales",
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-20"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-base" style={{ color: "var(--muted)" }}>
            No hidden fees. No surprise charges. Cancel anytime.
          </p>
        </div>

        <div className="grid items-start gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`group rounded-lg border p-8 transition-all duration-200 hover:shadow-md ${
                plan.highlighted ? "sm:scale-105" : ""
              }`}
              style={{
                borderColor: plan.highlighted
                  ? "var(--accent)"
                  : "var(--border)",
                backgroundColor: "var(--bg)",
              }}
            >
              {/* Popular badge */}
              {plan.highlighted && (
                <span
                  className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--bg)",
                  }}
                >
                  Popular
                </span>
              )}

              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                {plan.description}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-sm" style={{ color: "var(--muted)" }}>
                  {plan.period}
                </span>
              </div>

              <ul className="mt-8 space-y-3" role="list">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--accent)" }}
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#signup"
                className="mt-8 block rounded-lg border px-6 py-3 text-center text-sm font-medium transition-colors duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={
                  plan.highlighted
                    ? {
                        backgroundColor: "var(--accent)",
                        color: "var(--bg)",
                        borderColor: "var(--accent)",
                      }
                    : {
                        borderColor: "var(--border)",
                        color: "var(--text)",
                      }
                }
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**핵심 규칙**:
- 3열 `sm:grid-cols-3 items-start` — 카드 높이가 다를 수 있으므로 `items-start`
- 중앙 카드: `sm:scale-105` + accent border + "Popular" badge
- 가격: `text-4xl font-bold` — 시각적 앵커
- Feature list: Check 아이콘 + `space-y-3`
- Highlighted CTA: accent bg, 나머지: outline

---

## 10. CTA (Call-to-Action)

**측정 데이터**: CTA bg #000 (58% dominant). dark section 96% 존재. 색상 반전 패턴.

```tsx
"use client";

import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section
      className="py-24"
      style={{
        backgroundColor: "var(--text)",
        color: "var(--bg)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--bg)" }}
          >
            Ready to start building?
          </h2>
          <p
            className="mt-4 text-base"
            style={{ color: "var(--bg)", opacity: 0.7 }}
          >
            Join thousands of teams already shipping faster. Free to start,
            no credit card required.
          </p>
          <a
            href="#signup"
            className="mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-medium transition-colors duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              backgroundColor: "var(--bg)",
              color: "var(--text)",
            }}
          >
            Get Started Free
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
```

**핵심 규칙**:
- **색상 반전**: `backgroundColor: var(--text)`, `color: var(--bg)` — 페이지 전체와 대비
- CTA 버튼도 반전: `bg: var(--bg)`, `color: var(--text)`
- `py-24` — Hero와 동일한 넉넉한 패딩
- subtitle `opacity: 0.7` — 순백/순흑 대비 부드럽게
- 단일 CTA — 이 섹션의 목적은 하나: 전환

---

## 11. Footer

**측정 데이터**: footer column median 2, p75 4. dark bg + 로고 + 링크 + copyright.

```tsx
"use client";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#changelog" },
      { label: "Roadmap", href: "#roadmap" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "#docs" },
      { label: "API Reference", href: "#api" },
      { label: "Guides", href: "#guides" },
      { label: "Community", href: "#community" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
      { label: "Security", href: "#security" },
      { label: "GDPR", href: "#gdpr" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="py-16"
      style={{
        backgroundColor: "var(--text)",
        color: "var(--bg)",
        borderTop: "1px solid",
        borderColor: "color-mix(in srgb, var(--bg) 15%, transparent)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <span
              className="text-lg font-bold"
              style={{ color: "var(--bg)" }}
            >
              Logo
            </span>
            <p
              className="mt-3 text-sm"
              style={{ color: "var(--bg)", opacity: 0.6 }}
            >
              The modern toolkit for shipping products faster.
            </p>
          </div>

          {/* Link columns — 4열 */}
          {footerLinks.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h4
                className="mb-4 text-sm font-semibold"
                style={{ color: "var(--bg)", opacity: 0.8 }}
              >
                {group.heading}
              </h4>
              <ul className="space-y-2" role="list">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-150 hover:opacity-100"
                      style={{ color: "var(--bg)", opacity: 0.5 }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 border-t pt-8"
          style={{
            borderColor: "color-mix(in srgb, var(--bg) 15%, transparent)",
          }}
        >
          <p
            className="text-center text-sm"
            style={{ color: "var(--bg)", opacity: 0.4 }}
          >
            &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**핵심 규칙**:
- CTA 섹션과 같은 dark bg (`var(--text)`) — 자연스러운 연결
- `lg:grid-cols-5` — 1 brand + 4 link columns
- Link opacity 계층: heading 0.8, links 0.5, hover 1.0
- `color-mix()` border — 반투명 경계선
- Copyright `opacity: 0.4` — 가장 낮은 시각 우선순위

---

## 섹션 패딩 요약표

| Section | Padding | 배경 |
|---------|---------|------|
| Nav | h-16 (height) | bg 80% + blur |
| Hero | py-24 | var(--bg) |
| Social Proof | py-12 | var(--subtle-bg) |
| Features Grid | py-20 | var(--bg) |
| Features Alt | py-20 | var(--subtle-bg) |
| How It Works | py-20 | var(--bg) |
| Testimonials | py-20 | var(--subtle-bg) |
| Pricing | py-20 | var(--bg) |
| CTA | py-24 | var(--text) |
| Footer | py-16 | var(--text) |

배경색은 **bg → subtle-bg → bg → subtle-bg** 교대 패턴이 기본. CTA + Footer는 dark(inverted).
