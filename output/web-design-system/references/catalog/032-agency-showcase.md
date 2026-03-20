---
id: 032
name: Agency Showcase
tags: [agency, dark, bold, 3d, portfolio, case-study]
tone: professional
inspired_by: [clay.global, dogstudio.co, active-theory.com]
status: draft
---

# 032 — Agency Showcase

## Preview
`samples/032-agency-showcase.html`

## Palette
- Background: #06070a (near-black blue)
- Surface: #111318 (dark card surface)
- Card BG: #16181f
- Card Border: #2a2d36
- Text Primary: #e8eaed
- Text Muted: #666c7a
- Accent: #4f46e5 (indigo-600 — single color)
- Accent Light: #818cf8 (indigo-400, for hover states)

## Typography
- Heading: DM Sans (700 — bold, condensed feel)
- Body: DM Sans (400)
- h1: text-6xl md:text-7xl (font-weight 700, tight leading)
- h2: text-4xl (font-weight 600)
- h3: text-xl (font-weight 600)
- Body: text-base (leading-relaxed)
- Small: text-sm

## Layout
- Hero: fullscreen dark with large display text + subtle grid background pattern
- Case Studies: asymmetric 2-column with large image + overlay text
- Services: horizontal scroll or 3-column with icon + title + description
- Team: circular avatar grid with name overlays
- Process: numbered vertical timeline
- CTA: bold centered section
- Max width: max-w-7xl
- Border-radius: rounded-xl (everything) — 1 type only

## Key Details
- Subtle dot-grid background pattern on dark surface
- Case study cards with image zoom on hover + overlay text reveal
- Horizontal rule dividers between sections (1px, #2a2d36)
- Stagger animation: children fade in with 100ms delay between each
- Nav: fixed, bg-[#06070a]/90 backdrop-blur-md, indigo CTA — constraint #16
- NO orange/warm tones — constraint #17
- NO radial glow — constraint #18
- NO gradient text — constraint #19
- NO big corp names — constraint #22
- NO generic testimonial praise — constraint #23
- NO 4-col stat grid — constraint #26
- All animations repeat on scroll (IntersectionObserver)

## Section Order
Nav (dark glass) -> Hero (fullscreen, grid bg) -> Case Studies (asymmetric grid) -> Services (3-col) -> Process (timeline) -> Testimonial (single) -> CTA -> Footer

## Background Pattern
#06070a (all sections) with alternating surface panels #111318

## Padding Pattern
hero: pt-32 pb-24 | case-studies: py-28 | services: py-24 | process: py-20 | testimonial: py-28 | cta: py-24 | footer: py-16

## Data from crawled sites
- clay.global: #000000 bg, 74px h1, custom sans font, fullscreen hero, has animation
- dogstudio.co: WebGL transitions, immersive dark aesthetic
- active-theory.com: cinematic 3D experiences, dark theme
- Mapped: dark bg from clay, bold h1 sizing, grid pattern from agency sites, asymmetric case study layout
