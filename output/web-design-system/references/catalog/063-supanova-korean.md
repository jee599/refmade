---
id: 063
name: Supanova Korean
tags: [korean, saas, dark, cyan, asymmetric, premium, analytics]
tone: dark
inspired_by: [toss.im, channel.io, wadiz.kr]
status: verified
---

# 063 — Supanova Korean

## Preview
`samples/063-supanova-korean.html`

## Palette
- Background: #09090b
- Text: #fafafa
- Subtle BG: #18181b
- Border: #27272a
- Muted: #71717a
- Accent: #22d3ee (cyan-400)
- Accent Dim: rgba(34, 211, 238, 0.08)
- Accent Glow: rgba(34, 211, 238, 0.12)

## Typography
- Korean Heading: Pretendard (700, leading-tight, word-break: keep-all)
- Korean Body: Pretendard (400, leading-snug, word-break: keep-all)
- English Heading: Cabinet Grotesk (700, tracking-tight)
- English Body: Geist Sans (400)
- h1: text-4xl sm:text-5xl md:text-6xl (font-weight 700, leading-tight)
- h2: text-3xl sm:text-4xl (font-weight 700, leading-tight)
- h3: text-lg (font-weight 600)
- Body: text-base (leading-snug)

## Layout
- DESIGN_VARIANCE: 8 — no two sections share the same layout pattern
- Hero: asymmetric split (60/40), left text + right dashboard mockup, min-h-[100dvh]
- Social Proof: horizontal logo ticker strip
- Features: staggered 2-col with alternating image/text sides
- Testimonials: offset card grid (masonry-like, 3-col)
- CTA: full-width banner with centered content
- Max width: max-w-7xl mx-auto

## Key Details
- All Korean text uses word-break: keep-all
- Pretendard loaded via CDN (orioncactus/pretendard)
- Cabinet Grotesk for English product name "Spark" and headings
- Cyan accent (#22d3ee) on zinc-950 (#09090b) base
- Inline SVG icons (Solar icon style)
- picsum.photos for placeholder images, pravatar.cc for avatars
- Natural Korean CTAs: "무료로 시작하기", "지금 바로 체험하기"
- Staggered fade-in animations (IntersectionObserver, threshold 0.1, translateY 32px, 0.7s ease)
- Sticky nav: rgba(9,9,11,0.85) bg with backdrop-blur(16px)
- Dashboard mockup in hero with subtle cyan glow shadow
- Metric counters in social proof section
- Feature sections alternate layout direction
- Testimonial cards with avatar + role + company
- Responsive: mobile-first, breakpoints sm/md/lg

## Section Order
Nav -> Hero (Asymmetric Split) -> Social Proof (Metrics + Logos) -> Features (Alternating Rows) -> Testimonials (Offset Grid) -> CTA (Full-width Banner) -> Footer

## Background Pattern
#09090b (hero) -> #18181b (social proof) -> #09090b (features) -> #18181b (testimonials) -> #09090b (CTA, accent border-top) -> #18181b (footer)

## Padding Pattern
hero: py-0 (full viewport) | social: py-16 | features: py-24 | testimonials: py-24 | CTA: py-20 | footer: py-16
