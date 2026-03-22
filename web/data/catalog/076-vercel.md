---
id: 076
name: Vercel
tags: [monochrome, developer, deploy, dark, minimal]
tone: dark
inspired_by: [vercel.com]
status: draft
---

# 076 — Vercel

## Preview
`samples/076-vercel.html`

## Palette
- Background: #000000
- Surface: #111111
- Text: #ededed
- Subtle BG: #0a0a0a
- Border: #333333
- Muted: #888888
- Accent: #ffffff

## Typography
- Heading: Geist Sans (600, -0.04em)
- Body: Geist Sans (400)
- Mono: Geist Mono
- h1: text-5xl md:text-7xl (font-weight 600, letter-spacing -0.04em, line-height 1.0)
- h2: text-3xl sm:text-4xl (font-weight 600, letter-spacing -0.03em)
- h3: text-lg (font-weight 500)
- Body: text-base (line-height 1.6, color #888888)

## Layout
- Hero: center-aligned, minimal, py-32 md:py-40
- Features: bento grid with mixed card sizes
- Cards: bg-[#111111], border 1px #333333, rounded-lg, hover:border-[#555]
- Buttons: rounded-md, bg-white text-black primary, border-[#333] secondary
- Border-radius: rounded-lg (cards) + rounded-md (buttons)
- Max width: max-w-6xl

## Key Details
- Pure monochrome — black/white/gray only, zero color accents
- Triangle logo motif (▲) appears as decorative element
- Center-aligned hero with "Start Deploying" CTA
- Terminal/CLI aesthetic for code examples
- Deploy button visualization (git push → live in seconds)
- Edge network globe/map visualization
- Framework logos grid (Next.js, React, Svelte, Nuxt)
- Inverted buttons: white bg on dark, black bg on light
- Sticky nav: bg-black/80, backdrop-blur-lg, border-b border-[#333]
- Scroll-triggered fade-in (0.5s, translateY 16px)
- Code blocks with Geist Mono, bg-[#0a0a0a]
- Dotted grid background on hero
- Performance metrics with large tabular numbers

## Material
- Glass: nav only (backdrop-blur-lg, bg-black/80)
- Shadows: none or minimal
- Borders: 1px solid #333333 — primary separation method
- Gradients: rare, only subtle radial glow behind hero text
- Surface: flat matte dark

## Rhythm
- Hero → Framework Grid → Deploy Demo → Edge Network → Performance → Enterprise → CTA → Footer
- Monochrome throughout, sections separated by borders

## Anti-patterns
- No color at all — strict monochrome discipline
- No rounded-full buttons — rectangular with slight radius
- No gradients on cards — flat surfaces
- No illustrations — geometric shapes and code only
- No warm tones — pure neutral gray scale

## Reconstruction Hints
- Black bg, white text, gray borders — nothing else
- Hero: triangle icon + "Your code. Live in seconds." style messaging
- Include a deploy flow visualization (code → deploy → live URL)
- Framework logo grid with grayscale treatment
- Terminal-style code block showing CLI commands
- Globe or network visualization for edge concept

## Section Order
Nav -> Hero -> Frameworks -> Deploy Demo -> Edge Network -> Performance -> Enterprise -> CTA -> Footer

## Background Pattern
#000000 throughout, occasional #111111 card surfaces on #000 background

## Padding Pattern
hero: py-32 md:py-40 | frameworks: py-16 | deploy: py-24 | edge: py-24 | performance: py-20 | enterprise: py-20 | CTA: py-24 | footer: py-16
