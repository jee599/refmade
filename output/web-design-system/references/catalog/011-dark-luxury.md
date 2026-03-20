---
id: 011
name: Dark Luxury
tags: [luxury, dark, premium, minimal]
tone: dark
inspired_by: [superhuman.com]
status: draft
---

# 011 — Dark Luxury

## Palette
- Background: #050505
- Text: #e8e8e8
- Subtle BG: #0e0e0e
- Border: #1f1f1f
- Muted: #6b6b6b
- Accent: #d4a574

## Typography
- Heading: Fraunces (400, -0.02em)
- Body: Satoshi (400)
- Mono: Berkeley Mono
- h1: text-4xl md:text-7xl (font-weight 400, letter-spacing -0.02em, line-height 1.05)
- h2: text-2xl sm:text-4xl (font-weight 400, letter-spacing -0.015em)
- h3: text-lg (font-weight 500)
- Body: text-base (line-height 1.7)

## Layout
- Hero: minimal center-aligned, extreme whitespace (py-36 md:py-48), very few words
- Features: 2-column grid max, generous gap-16, icon-minimal
- Cards: border (1px solid var(--border)), bg-[#0e0e0e], no shadow, hover:border-[#d4a574] transition-colors duration-300
- Buttons: rounded-none (sharp luxury edges), accent outline primary (border-[#d4a574] text-[#d4a574]), ghost secondary
- Border-radius: rounded-none (buttons) + rounded-sm (cards, very subtle)
- Max width: max-w-4xl (narrow, premium feel)

## Key Details
- Extreme negative space: hero may have only 6-10 words total, rest is void
- Fraunces headings at weight 400 (not bold) — elegance over impact
- Gold/amber accent (#d4a574) used only for: CTA border, hover states, occasional single-word highlight
- No icons in feature section — text-only descriptions with generous spacing
- Horizontal rule dividers: 1px solid #1f1f1f, max-w-24 centered, between sections
- Testimonial: single large quote, centered, Fraunces italic, no card border
- Subtle letter-by-letter fade-in on hero heading (0.05s stagger per character, 0.6s total)
- Product screenshot: floating on dark, no border, very subtle shadow (shadow-2xl with black/20)
- All interactive: transition-all duration-300 ease, focus-visible:ring-1 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2 focus-visible:ring-offset-black

## Section Order
Nav -> Hero (Minimal) -> Single Feature Statement -> Product Visual -> Testimonial -> Second Feature -> CTA -> Footer

## Background Pattern
#050505 (hero) -> #050505 (feature) -> #0e0e0e (product) -> #050505 (testimonial) -> #0e0e0e (feature 2) -> #050505 (CTA) -> #050505 (footer)

## Padding Pattern
hero: py-36 md:py-48 | feature1: py-24 md:py-36 | product: py-20 md:py-32 | testimonial: py-24 md:py-32 | feature2: py-24 md:py-36 | CTA: py-28 md:py-40 | footer: py-16
