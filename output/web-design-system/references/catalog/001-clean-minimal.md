---
id: 001
name: Clean Minimal
tags: [minimal, monochrome, saas, landing]
tone: light
inspired_by: [linear.app, cal.com]
status: verified
---

# 001 — Clean Minimal

## Preview
`samples/001-clean-minimal.html`

## Palette
- Background: #ffffff
- Text: #111111
- Subtle BG: #f5f5f5
- Border: #e5e5e5
- Muted: #737373
- Accent: #000000

## Typography
- Heading: Space Grotesk (500, -0.03em)
- Body: Inter (400)
- Mono: JetBrains Mono
- h1: text-5xl md:text-7xl (font-weight 500, letter-spacing -0.03em, line-height 1.05)
- h2: text-3xl sm:text-4xl (font-weight 500, letter-spacing -0.02em)
- h3: text-xl (font-weight 600, letter-spacing -0.01em)
- Body: text-base (line-height 1.7 for hero, leading-relaxed for cards)

## Layout
- Hero: center, dot-pattern background, py-28 md:py-36
- Features: bento grid (sm:grid-cols-2 lg:grid-cols-3, first card sm:col-span-2)
- Cards: border style (1px solid var(--border)), no shadow, hover:border-black
- Buttons: pill (rounded-full), black solid primary, border outline secondary
- Border-radius: rounded-lg (cards, icons) + rounded-full (buttons, badges)
- Max width: max-w-6xl

## Key Details
- Extreme size contrast (h1 text-7xl vs body text-base)
- Monospace section labels (JetBrains Mono, 11px, uppercase, 0.12em tracking, with 24px accent line prefix)
- Dot pattern hero background (radial-gradient, #d4d4d4 1px dots, 24px grid)
- Thin accent lines as separators (linear-gradient fade, dot-and-line divider between sections)
- Metrics section with large numbers (text-5xl md:text-6xl, -0.03em tracking)
- Quote marks in testimonials (SVG, opacity-20)
- Highlighted testimonial: border-2 border-black, sm:scale-105
- Highlighted pricing: border-2 border-black, sm:scale-105
- Avatar initials in rounded-full circles with mono font
- Scroll-triggered fade-in (IntersectionObserver, threshold 0.15, translateY 24px, 0.7s ease)
- Sticky nav with backdrop-blur-md, rgba(255,255,255,0.85) bg
- Nav accent line: 1px gradient linear-gradient(to right, transparent, black, transparent) at 15% opacity

## Section Order
Nav -> Hero -> Social Proof -> Features -> How It Works -> Metrics -> Testimonials -> Pricing -> CTA -> Footer

## Background Pattern
white (#ffffff) -> #f5f5f5 (social proof) -> white (features) -> #f5f5f5 (how it works) -> white (metrics) -> #f5f5f5 (testimonials) -> white (pricing) -> #111111 (CTA) -> #0a0a0a (footer)

## Padding Pattern
hero: py-28 md:py-36 | social: py-14 | features: py-24 | how-it-works: py-20 | metrics: py-20 | testimonials: py-20 | pricing: py-24 | CTA: py-24 | footer: py-16
