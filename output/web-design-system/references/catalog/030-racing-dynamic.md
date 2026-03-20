---
id: 030
name: Racing / Dynamic Sports
tags: [racing, sports, dark, neon-green, dynamic, aggressive]
tone: dark
inspired_by: [landonorris.com]
status: draft
---

# 030 — Racing / Dynamic Sports

## Preview
`samples/030-racing-dynamic.html`

## Palette
- Background: #0a0a0a (near-black)
- Surface: rgba(255, 255, 255, 0.03)
- Text Primary: #ffffff
- Text Muted: #6b7280 (gray-500)
- Accent: #39FF14 (neon green — racing energy)
- Racing Stripe: linear-gradient(90deg, transparent, #39FF14, transparent) at 40% opacity
- Speed Lines: diagonal stripes at 2% opacity

## Typography
- Heading: Space Grotesk (800 — aggressive weight)
- Body: Inter (400)
- Mono: JetBrains Mono (400) — for lap times, stats
- h1: text-5xl md:text-6xl lg:text-7xl (font-weight 800, tight tracking)
- h2: text-3xl md:text-4xl (font-weight 800)
- h3: text-lg (font-weight 700)
- Body: text-base (leading-relaxed)
- Stats: text-4xl mono, green accent

## Layout
- Hero: fullscreen dark, h1 with neon green accent word, diagonal slash graphic elements, driver portrait with clip-path polygon crop
- Stats: 3-column (NOT 4 — constraint #26), monospace numbers, horizontal lap time bars
- Gallery: asymmetric grid (1 large 2-col + 2 small + 1 wide), all with diagonal-crop clip-path
- Career Timeline: left-aligned year labels + content blocks
- Sponsors: centered text placeholders
- CTA: fullscreen-feel, neon green button
- Max width: max-w-6xl
- Border-radius: rounded-none EVERYWHERE — sharp corners are the identity

## Key Details
- Speed lines: CSS repeating-linear-gradient(-45deg) at very low opacity in background
- Diagonal crop: clip-path: polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%) on image placeholders
- Slash graphic elements: 4px wide, 80px tall, rotated -20deg, neon green, with parallax scroll
- Cards: sharp corners (rounded-none), thin green border on hover only
- Nav: minimal fixed, green dot indicator for active section — constraint #16
- Racing stripe dividers between sections
- ALL animations are FAST (200ms transitions) — constraint #14
- Elements slide in from SIDES (left/right), not top — unique to this ref
- Parallax on slash decorative elements
- NO orange/warm tones — constraint #17
- NO radial glow — constraint #18
- NO gradient text — constraint #19
- NO big corp sponsor names — constraint #22
- All stats use [N] placeholders — constraint #25
- All animations repeat on scroll (IntersectionObserver removes class on exit)

## Section Order
Nav (dark glass, green dot) -> Hero (fullscreen, diagonal crop portrait) -> Racing Stripe -> Stats (3-col + lap bars) -> Racing Stripe -> Gallery (asymmetric diagonal crops) -> Racing Stripe -> Career Timeline -> Sponsors -> CTA (neon green) -> Footer

## Background Pattern
#0a0a0a + speed-lines throughout — no alternating sections, monolithic dark

## Padding Pattern
hero: min-h-screen | stats: py-24 | gallery: py-20 | career: py-24 | sponsors: py-20 | cta: py-28 | footer: py-12

## Data from crawled sites
- landonorris.com: dark bg, neon accents, racing driver personal brand, aggressive typography, dynamic imagery
- Mapped: neon green (shifted from typical racing red for uniqueness), Space Grotesk 800 for aggression, diagonal elements for speed feel
