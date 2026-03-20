---
id: 035
name: Travel Immersive
tags: [travel, cinematic, immersive, dark, serif, photography]
tone: professional
inspired_by: [designhotels.com, blacktomato.com, visiticeland.com]
status: draft
---

# 035 — Travel Immersive

## Preview
`samples/035-travel-immersive.html`

## Palette
- Background: #0c0c0c (rich black)
- Surface: #1a1a1a (dark surface)
- Card BG: #1a1a1a
- Card Border: #333333
- Text Primary: #f5f0eb (warm white)
- Text Muted: #9ca3af (gray-400)
- Accent: #c2956a (warm gold — single color)
- Accent Light: #d4a574 (lighter gold for hover)

## Typography
- Heading: Cormorant Garamond (500 — elegant serif)
- Body: Outfit (300 — light, clean sans)
- h1: text-6xl md:text-8xl (font-weight 500, super tight leading)
- h2: text-4xl md:text-5xl (font-weight 500)
- h3: text-xl (font-weight 400)
- Body: text-base (leading-relaxed, font-weight 300)
- Small: text-sm (font-weight 300)

## Layout
- Hero: fullscreen with video/image placeholder, thin text overlay at bottom
- Destinations: horizontal card carousel (large 16:9 image + overlay text)
- Philosophy: single column wide text with large serif pull quote
- Experiences: staggered 2-column with parallax image offsets
- Booking: centered form with dates + guest selector
- CTA: minimal with single line + button
- Max width: max-w-7xl
- Border-radius: rounded-none (sharp edges for editorial feel)

## Key Details
- Fullscreen hero with gradient overlay (bottom: black to transparent)
- Destination cards: full-bleed image, text at bottom with backdrop-blur
- Parallax offset on experience images (even items shift up by 60px)
- Thin serif typography with generous letter-spacing on headings
- Horizontal thin line above each section heading
- Nav: fixed, transparent -> bg-[#0c0c0c]/80 on scroll, gold CTA — constraint #16
- NO system fonts — constraint #20 (Cormorant Garamond + Outfit)
- NO radial glow — constraint #18
- NO gradient text — constraint #19
- NO big corp names — constraint #22
- NO generic testimonial praise — constraint #23
- NO 4-col stat grid — constraint #26
- All animations repeat on scroll (IntersectionObserver)

## Section Order
Nav (transparent glass) -> Hero (fullscreen image) -> Destinations (horizontal cards) -> Philosophy (centered text) -> Experiences (staggered 2-col) -> Booking (form) -> Footer

## Background Pattern
#0c0c0c throughout, with image sections providing visual variety

## Padding Pattern
hero: pt-0 pb-0 (fullscreen) | destinations: py-28 | philosophy: py-32 | experiences: py-24 | booking: py-28 | footer: py-16

## Data from crawled sites
- designhotels.com: dark bg, Suisse font, 48px h1, 1749px container, has animation
- blacktomato.com: luxury travel, full-screen visuals, elegant serif typography
- visiticeland.com: immersive landscape photography, nature-first
- Mapped: dark cinematic bg, elegant serif from luxury travel, fullscreen hero from both, gold accent for warmth
