---
id: 033
name: Restaurant Editorial
tags: [restaurant, food, editorial, warm, serif, cream]
tone: professional
inspired_by: [noma.dk, dishoom.com, ottolenghi.co.uk]
status: draft
---

# 033 — Restaurant Editorial

## Preview
`samples/033-restaurant-editorial.html`

## Palette
- Background: #faf6f1 (warm cream)
- Surface: #f0ebe3 (warm beige)
- Card BG: #ffffff
- Card Border: #e0d8cc
- Text Primary: #1a1714 (warm black)
- Text Muted: #78716c (stone-500)
- Accent: #b45309 (amber-700 — deep, not orange — single color)
- Accent Dark: #92400e

## Typography
- Heading: Playfair Display (600 — serif, editorial)
- Body: Source Sans 3 (400 — clean sans-serif)
- h1: text-5xl md:text-6xl (font-weight 600, tight leading)
- h2: text-3xl md:text-4xl (font-weight 600)
- h3: text-xl (font-weight 600)
- Body: text-base (leading-relaxed)
- Small: text-sm

## Layout
- Hero: full-width image with text overlay (centered, dark overlay gradient)
- Menu Highlights: 2-column with large food image + text description (alternating sides)
- Philosophy: single column centered text with pull quotes
- Gallery: masonry-style 3-column image grid
- Reservation: form section with warm surface background
- CTA: simple centered
- Max width: max-w-6xl
- Border-radius: rounded-lg (everything) — 1 type only

## Key Details
- Decorative serif ampersand (&) used as visual element
- Thin horizontal rules with small diamond/dot ornaments between sections
- Food images use subtle sepia filter overlay for warm consistency
- Parallax-lite: hero image scrolls slower than content
- Nav: fixed, bg-[#faf6f1]/90 backdrop-blur-sm, amber CTA — constraint #16
- Menu items have price aligned right with dotted leader
- NO system fonts — constraint #20 (Playfair + Source Sans 3)
- NO radial glow — constraint #18
- NO gradient text — constraint #19
- NO big corp names — constraint #22
- NO generic testimonial praise — constraint #23
- NO 4-col stat grid — constraint #26
- All animations repeat on scroll (IntersectionObserver)

## Section Order
Nav (warm glass) -> Hero (full-width image + overlay) -> About (centered text) -> Menu Highlights (alternating 2-col) -> Gallery (masonry) -> Reservation (form) -> Footer

## Background Pattern
#faf6f1 (hero, about) -> #f0ebe3 (menu) -> #faf6f1 (gallery) -> #f0ebe3 (reservation) -> #1a1714 (footer, dark)

## Padding Pattern
hero: pt-0 pb-0 (full bleed) | about: py-28 | menu: py-24 | gallery: py-20 | reservation: py-24 | footer: py-16

## Data from crawled sites
- noma.dk: #000 bg, Helvetica Neue, 32px h1, minimal center hero
- dishoom.com: vintage typography, warm nostalgic palette
- ottolenghi.co.uk: earthy palette, recipe-focused editorial
- Mapped: warm cream from editorial food sites, serif heading for dining elegance, alternating layout for menu items
