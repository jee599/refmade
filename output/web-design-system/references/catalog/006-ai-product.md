---
id: 006
name: AI Product
tags: [ai, product, dark, demo]
tone: dark
inspired_by: [anthropic.com, openai.com, mistral.ai]
status: draft
---

# 006 — AI Product

## Palette
- Background: #0a0a0a
- Text: #ededed
- Subtle BG: #141414
- Border: #262626
- Muted: #737373
- Accent: #818cf8

## Typography
- Heading: Geist (500, -0.03em)
- Body: Geist (400)
- Mono: Geist Mono
- h1: text-4xl md:text-6xl (font-weight 500, letter-spacing -0.03em, line-height 1.08)
- h2: text-2xl sm:text-4xl (font-weight 500, letter-spacing -0.02em)
- h3: text-lg (font-weight 500)
- Body: text-base (line-height 1.7)

## Layout
- Hero: minimal center-aligned, py-28 md:py-40, max-w-3xl text block
- Features: bento grid (sm:grid-cols-2 lg:grid-cols-3, varied col-span)
- Cards: border (1px solid var(--border)), bg-[#141414], no shadow, hover:border-[#404040] transition-colors duration-200
- Buttons: rounded-lg, accent solid primary (bg-indigo-400 text-black), ghost secondary (text-gray-400 hover:text-white)
- Border-radius: rounded-xl (cards, demo container) + rounded-lg (buttons)
- Max width: max-w-6xl

## Key Details
- Clean dark theme without radial glow or gradient backgrounds (constraint #18)
- Accent used sparingly: CTA buttons, inline code highlights, active nav item underline
- Interactive demo/playground section with code input area, monospace output, bordered container
- Subtle grid-dot pattern on hero (radial-gradient #262626 dots, 32px grid, opacity-50)
- Model comparison table with Geist Mono for numbers, alternating row bg (#141414 / #0a0a0a)
- API code snippet blocks with syntax highlighting, copy button with hover:bg-[#262626]
- Typed animation on hero subtitle (cursor blink, reveal one word at a time)
- All interactive: hover transitions 200ms ease, focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black

## Section Order
Nav -> Hero -> Social Proof Logos -> Demo / Playground -> Features (Bento) -> Model Specs -> API Example -> Pricing -> CTA -> Footer

## Background Pattern
#0a0a0a (hero) -> #0a0a0a (logos) -> #141414 (demo) -> #0a0a0a (features) -> #141414 (model specs) -> #0a0a0a (API) -> #141414 (pricing) -> #0a0a0a (CTA) -> #050505 (footer)

## Padding Pattern
hero: py-28 md:py-40 | logos: py-10 | demo: py-20 md:py-28 | features: py-20 md:py-28 | specs: py-16 md:py-24 | api: py-20 | pricing: py-20 md:py-28 | CTA: py-24 | footer: py-14
