---
id: 005
name: Fintech Trust
tags: [fintech, trust, enterprise, navy]
tone: light
inspired_by: [mercury.com, ramp.com, brex.com]
status: draft
---

# 005 — Fintech Trust

## Palette
- Background: #ffffff
- Text: #0f172a
- Subtle BG: #f1f5f9
- Border: #cbd5e1
- Muted: #64748b
- Accent: #0f172a

## Typography
- Heading: DM Sans (600, -0.02em)
- Body: DM Sans (400)
- Mono: DM Mono
- h1: text-5xl md:text-7xl (font-weight 600, letter-spacing -0.02em, line-height 1.08)
- h2: text-3xl sm:text-5xl (font-weight 600, letter-spacing -0.015em)
- h3: text-lg (font-weight 500)
- Body: text-base (line-height 1.7)

## Layout
- Hero: split (text left, product screenshot right), py-24 md:py-36
- Features: 3-column grid (lg:grid-cols-3), icon-top cards with varying heights
- Cards: subtle border (1px solid var(--border)), bg-white, no shadow, hover:border-slate-400 transition-colors duration-200
- Buttons: rounded-lg, navy solid primary (bg-slate-900 text-white), outline secondary (border-slate-300), px-6 py-3
- Border-radius: rounded-xl (cards) + rounded-lg (buttons, inputs)
- Max width: max-w-7xl

## Key Details
- Conservative, high-trust design with navy-dominant palette (fintech h1 median 72px)
- Trust badges row: SOC2, PCI DSS, bank-grade encryption icons in muted gray
- Social proof logos in grayscale with opacity-40 hover:opacity-70 transition
- Product screenshot in hero with subtle drop-shadow-xl and rounded-xl border
- Security section with lock/shield Lucide icons, 2-column layout
- Metric counters: large DM Mono numbers (text-5xl), navy color, with currency/percentage suffixes
- Testimonial cards with company logo, role title, subtle left border accent
- All interactive elements: hover:bg-slate-800 transition-all duration-200, focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2

## Section Order
Nav -> Hero -> Social Proof Logos -> Features -> Security & Compliance -> Product Demo Screenshot -> Metrics -> Testimonials -> Pricing -> CTA -> Footer

## Background Pattern
#ffffff (hero) -> #f1f5f9 (logos) -> #ffffff (features) -> #0f172a (security, dark section) -> #ffffff (demo) -> #f1f5f9 (metrics) -> #ffffff (testimonials) -> #f1f5f9 (pricing) -> #0f172a (CTA) -> #0f172a (footer)

## Padding Pattern
hero: py-24 md:py-36 | logos: py-12 | features: py-20 md:py-28 | security: py-20 md:py-28 | demo: py-16 md:py-24 | metrics: py-16 | testimonials: py-20 md:py-24 | pricing: py-20 md:py-28 | CTA: py-20 | footer: py-14
