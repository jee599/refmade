---
id: 008
name: Creative Portfolio
tags: [portfolio, creative, asymmetric, imagery]
tone: light
inspired_by: [readymag.com, spline.design]
status: draft
---

# 008 — Creative Portfolio

## Palette
- Background: #f7f7f7
- Text: #1a1a1a
- Subtle BG: #ebebeb
- Border: #d4d4d4
- Muted: #737373
- Accent: #e11d48

## Typography
- Heading: Space Grotesk (500, -0.04em)
- Body: Satoshi (400)
- Mono: Space Mono
- h1: text-5xl md:text-8xl (font-weight 500, letter-spacing -0.04em, line-height 1.0)
- h2: text-3xl sm:text-5xl (font-weight 500, letter-spacing -0.03em)
- h3: text-xl (font-weight 500)
- Body: text-base (line-height 1.6)

## Layout
- Hero: fullscreen, oversized typography filling viewport, minimal text, py-0 (full vh)
- Features: asymmetric masonry grid (grid-cols-12, items spanning 5/7 or 4/8 columns)
- Cards: no border, image-dominant with overlay text on hover, varied aspect ratios (portrait, landscape, square)
- Buttons: rounded-none (sharp edges), accent solid primary, text-link secondary with arrow animation
- Border-radius: rounded-none (buttons, containers) + rounded-sm (subtle image corners only)
- Max width: max-w-screen-2xl (near full-width)

## Key Details
- Oversized h1 (text-8xl) with extreme negative letter-spacing (-0.04em) for impact
- Asymmetric grid: projects at different scales, some full-width, some 40/60 splits
- Hover reveals: project cards show title + category overlay with backdrop-blur-sm, opacity transition 0.3s ease
- Horizontal scroll section for selected works (flex, overflow-x-auto, snap-x snap-mandatory)
- Cursor changes on hoverable areas (cursor-pointer with custom mix-blend-mode effect description)
- Minimal nav: logo left, single menu hamburger right, fixed position
- Project counter in Space Mono (01/, 02/, 03/ prefix on case studies)
- Smooth page transitions described: fade + translateY 16px, 0.5s ease
- All interactive: hover:opacity-80 transition-opacity duration-300, focus-visible:ring-2 focus-visible:ring-rose-500

## Section Order
Nav -> Hero (Full-screen Typography) -> Selected Works (Asymmetric Grid) -> About (Split Layout) -> Horizontal Scroll Showcase -> Services -> Contact CTA -> Footer

## Background Pattern
#f7f7f7 (hero) -> #f7f7f7 (works) -> #1a1a1a (about, dark section) -> #f7f7f7 (showcase) -> #ebebeb (services) -> #1a1a1a (contact) -> #1a1a1a (footer)

## Padding Pattern
hero: py-0 (full vh) | works: py-20 md:py-32 | about: py-24 md:py-36 | showcase: py-16 md:py-24 | services: py-20 md:py-28 | contact: py-24 | footer: py-10
