---
id: 002
name: Professional Blue
tags: [professional, blue, split-hero, saas, landing]
tone: light
inspired_by: [stripe.com, vercel.com]
status: verified
---

# 002 — Professional Blue

## Preview
`samples/002-professional-blue.html`

## Palette
- Background: #ffffff
- Text: #0f172a
- Subtle BG: #f8fafc
- Border: #e2e8f0
- Muted: #64748b
- Accent: #2563eb

## Typography
- Heading: DM Sans (700, tracking-tight)
- Body: Inter (400)
- Mono: JetBrains Mono
- h1: text-5xl md:text-6xl (font-weight 700, letter-spacing -0.02em, line-height 1.08)
- h2: text-3xl sm:text-4xl (font-weight 700, tracking-tight)
- h3: text-lg (font-weight 600)
- Body: text-base (leading-relaxed)

## Layout
- Hero: split layout (lg:grid-cols-2), left text + right browser mockup, dot-pattern background
- Features: bento grid (sm:grid-cols-2 lg:grid-cols-3, first card sm:col-span-2)
- Cards: border + shadow-sm, card-hover effect (translateY(-4px) scale(1.01), box-shadow 0 8px 24px rgba(0,0,0,0.08))
- Buttons: rounded-lg, accent-blue solid primary with glow hover (box-shadow 0 4px 16px rgba(37,99,235,0.3)), border outline secondary
- Border-radius: rounded-lg (cards, buttons, inputs)
- Max width: max-w-6xl

## Key Details
- Split hero with browser mockup (full dashboard mockup with sidebar, stats, chart, task list)
- Browser chrome dots (red #FF5F57, yellow #FEBC2E, green #28C840) with address bar
- Accent color badge labels (rgba(37,99,235,0.08) bg, accent text)
- Brand logo uses accent color on first word: "<span accent>Task</span>Flow"
- Star ratings in testimonials (5 blue stars, SVG polygons)
- Avatar circles with accent-tinted backgrounds (rgba(37,99,235,0.08))
- Highlighted testimonial/pricing: border-2 border-accent, sm:scale-105
- CSS animation fade-in (fadeUp keyframes, 0.6s ease, delay classes 0.1-0.3s)
- Sticky nav with backdrop-blur-md, border-bottom, rgba(255,255,255,0.88) bg
- Dot pattern: radial-gradient(circle, #cbd5e1 1px, transparent 1px), 32px grid
- Social proof avatars with -space-x-2 overlap, border-2 border-white
- "Joined by 2,400+ teams" inline social proof in hero

## Section Order
Nav -> Hero (Split) -> Social Proof -> Features -> How It Works -> Testimonials -> Pricing -> CTA -> Footer

## Background Pattern
white (#ffffff, hero) -> #f8fafc (social proof) -> white (features) -> #f8fafc (how it works) -> white (testimonials) -> #f8fafc (pricing) -> gradient #111827->#030712 (CTA) -> #020617 (footer)

## Padding Pattern
hero: py-24 | social: py-12 | features: py-20 | how-it-works: py-20 | testimonials: py-20 | pricing: py-20 | CTA: py-24 | footer: py-16
