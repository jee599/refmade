---
id: 061
name: Editorial Minimal
tags: [editorial, minimalist, premium, utilitarian, serif, clean]
tone: light
inspired_by: [notion.so, cal.com, linear.app]
status: draft
---

# 061 — Editorial Minimal

## Preview
`samples/061-editorial-minimal.html`

## Palette
- Background: #FFFFFF
- Text: #111111
- Subtle BG: #F7F6F3
- Border: #EAEAEA
- Muted: #888888
- Accent: #111111

## Typography
- Heading: Newsreader (600, tracking-tight)
- Body: Geist Sans (400)
- Mono: Geist Mono
- h1: text-4xl md:text-6xl (font-weight 600, letter-spacing -0.02em, line-height 1.1)
- h2: text-3xl md:text-4xl (font-weight 600, tracking-tight)
- h3: text-xl (font-weight 500)
- Body: text-base (leading-relaxed, color #111111, line-height 1.6)

## Layout
- Hero: centered editorial layout, generous top padding (py-32), single-column
- Features: 3-column grid (lg:grid-cols-3), generous gap-8
- Cards: border border-[#EAEAEA] bg-white, no shadows, rounded-md
- Buttons: bg-[#111111] text-white rounded-md, no shadows, hover:bg-[#333333]
- Badges: uppercase text-xs tracking-widest, pill-shaped (rounded-full), border border-[#EAEAEA]
- Border-radius: rounded-md (cards, buttons), rounded-full (badges)
- Max width: max-w-6xl

## Key Details
- Premium utilitarian minimalism, editorial-style
- Warm monochromatic base (#FFFFFF, #F7F6F3), no gradients or neon
- Serif headings (Newsreader) + geometric sans body (Geist Sans)
- Off-black text (#111111), never pure black
- Cards with 1px solid #EAEAEA borders only, no box-shadow
- Solid black buttons without shadows
- Pill-shaped uppercase badges for labels
- translateY(12px) + opacity fade-ins over 600ms
- Staggered grid reveals with IntersectionObserver
- Hover shadow shifts on cards (subtle)
- No bento grids, no glassmorphism, no 3D effects
- No Inter/Roboto/Open Sans, no standard icon libraries

## Section Order
Nav -> Hero (Centered Editorial) -> Social Proof -> Features (3-col Grid) -> How It Works -> Testimonials -> CTA -> Footer

## Background Pattern
#FFFFFF (nav) -> #FFFFFF (hero) -> #F7F6F3 (social proof) -> #FFFFFF (features) -> #F7F6F3 (how it works) -> #FFFFFF (testimonials) -> #F7F6F3 (CTA) -> #FFFFFF (footer)

## Padding Pattern
hero: py-24 md:py-32 | social: py-12 | features: py-20 md:py-28 | how-it-works: py-20 | testimonials: py-20 | CTA: py-24 | footer: py-16
