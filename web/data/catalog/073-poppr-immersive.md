---
id: 073
name: Poppr Immersive
tags: [agency, immersive, vr, light, minimal]
tone: light
inspired_by: [poppr.be]
status: draft
---

# 073 — Poppr Immersive

## Preview
`samples/073-poppr-immersive.html`

## Palette
- Background: #ffffff
- Text: #111111
- Subtle BG: #f7f7f7
- Border: #e5e5e5
- Muted: #888888
- Accent: #000000

## Typography
- Heading: Space Grotesk (500, -0.02em)
- Body: Inter (400)
- Nav: Inter (400, 0.35em letter-spacing, uppercase)
- h1: text-5xl md:text-7xl (font-weight 500, letter-spacing -0.02em, line-height 1.05)
- h2: text-3xl sm:text-4xl (font-weight 500, letter-spacing -0.01em)
- h3: text-xl (font-weight 500)
- Body: text-base (line-height 1.7)
- Nav items: text-sm (letter-spacing 0.35em, uppercase — decorative spaced letters)

## Layout
- Hero: left-aligned tagline with large type, py-32 md:py-44
- Portfolio: horizontal drag carousel with card-based project grid
- Cards: image + overlay text, rounded-lg, hover:scale-[1.02] transition
- Buttons: minimal with arrow icon suffix (→), no fill, border-bottom style
- Nav: wide letter-spacing items ("W o r k", "S o l u t i o n s"), CTA right-aligned
- Max width: max-w-7xl
- Border-radius: rounded-lg (cards) + rounded-full (buttons, avatars)

## Key Details
- Decorative letter-spacing in navigation (0.35em tracking on nav items)
- Drag-to-scroll portfolio carousel with cursor: grab
- "Conversion through immersion" tagline treatment — large italic serif accent
- Owl mascot as brand element in footer/newsletter section
- Arrow SVG icons (→) as navigation affordances on cards and buttons
- Clean card overlays: project name + category tags on hover
- Generous whitespace between sections (py-24 to py-32)
- Sticky nav with backdrop-blur-sm, white bg at 90% opacity
- Scroll-triggered fade-in (IntersectionObserver, threshold 0.15, translateY 20px, 0.6s ease)
- Minimal color: near-monochrome with photography providing all color

## Section Order
Nav -> Hero (tagline) -> Selected Work (drag carousel) -> Services -> About -> Testimonials -> Newsletter (owl mascot) -> Footer

## Background Pattern
white (#ffffff) -> white (hero) -> #f7f7f7 (selected work) -> white (services) -> #f7f7f7 (about) -> white (testimonials) -> #111111 (newsletter/CTA) -> #0a0a0a (footer)

## Padding Pattern
hero: py-32 md:py-44 | selected-work: py-24 | services: py-20 | about: py-24 | testimonials: py-20 | newsletter: py-24 | footer: py-16

## Material
Owl feathers floating in a white gallery

## Rhythm
- pacing: medium
- density: balanced

## Anti-patterns
- No heavy gradients — photography carries all color
- No rounded-full cards — keep geometric, rectangular
- No colorful backgrounds — strictly white/off-white/dark
- No drop shadows on cards — use border or subtle scale on hover
- No busy nav — spaced letters create breathing room, not clutter

## Reconstruction Hints
- Nav letter-spacing is the signature detail: apply `tracking-[0.35em] uppercase text-sm` to nav links
- Portfolio carousel: use `overflow-x: auto` with `scroll-snap-type: x mandatory` and `cursor: grab`
- Cards should be wide (min-w-[350px] md:min-w-[450px]) with 3:2 aspect ratio images
- Arrow icons: inline SVG `→` or custom arrow, not emoji
- Hero tagline: mix weights — "conversion" in regular, "through immersion" in italic serif
- Keep total color count under 4 (black, white, off-white, one muted gray)
- Photography is the color — use high-quality Unsplash images for vibrancy
- Owl mascot: SVG illustration in newsletter section, subtle and brand-reinforcing
