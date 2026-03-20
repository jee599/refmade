---
id: 016
name: Neobrutalist SaaS
tags: [brutalist, bold, anti-corporate, pink]
tone: light
inspired_by: [gumroad.com]
status: draft
---

# 016 — Neobrutalist SaaS

## Palette
- Background: #F4F4F0
- Text: #000000
- Pink: #FF90E8
- Yellow: #FFC900
- Green: #23C45E
- Border: #000000

## Typography
- Heading: Space Grotesk (700, normal)
- Body: Space Grotesk (400)
- h1: text-5xl md:text-7xl (font-weight 700, line-height 1.05)
- h2: text-3xl md:text-5xl (font-weight 700)
- h3: text-xl (font-weight 700)
- Body: text-lg (line-height 1.6)

## Layout
- Hero: fullscreen, pink bg (#FF90E8), massive bold text, thick-bordered CTA buttons with hard shadows
- Features: 3-column grid (lg:grid-cols-3), alternating bright bg cards (pink, yellow, green), thick black borders
- Pricing: thick-bordered cards, hard box-shadows, hover shifts shadow and translates card
- Cards: bg-white border-[3px] border-black, shadow-[4px_4px_0_#000], no border-radius (rounded-none or rounded-sm)
- Buttons: border-[3px] border-black, shadow-[4px_4px_0_#000], hover:shadow-[2px_2px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px], transition-all duration-150
- Border-radius: rounded-none (cards) + rounded-sm (buttons) — max 2 variants
- Max width: max-w-6xl

## Key Details
- Every card, button, and input has 3px solid black border + 4px 4px hard shadow
- No soft shadows, no gradients, no blur effects anywhere
- Bright bg sections alternate: #FF90E8 (pink), #FFC900 (yellow), #23C45E (green), #F4F4F0 (cream)
- Nav: cream bg with thick bottom border, bold logo text, "Start Free" CTA button with hard shadow
- Hero illustration: thick-bordered stacked cards with product icons (SVG, pure CSS)
- Feature icons: simple SVG in thick-bordered circles with colored fills
- Pricing toggle: thick-bordered pills with hard shadow on active state
- Testimonial: single large quote in thick-bordered card, no stock name — "[your customer quote]" placeholder
- All interactive elements have hard snap animations (ease-out 150ms), no smooth easing

## Section Order
Nav (with "Start Free" CTA) -> Hero (pink bg) -> Feature Grid -> How It Works (cream bg) -> Pricing (yellow bg) -> Testimonial (green bg) -> Final CTA (pink bg) -> Footer (black bg)

## Background Pattern
#FF90E8 (hero) -> #F4F4F0 (features) -> #F4F4F0 (how it works) -> #FFC900 (pricing) -> #23C45E (testimonial) -> #FF90E8 (CTA) -> #000000 (footer)

## Padding Pattern
hero: py-16 md:py-24 | features: py-16 md:py-28 | how-it-works: py-12 md:py-20 | pricing: py-16 md:py-28 | testimonial: py-12 md:py-20 | CTA: py-16 md:py-24 | footer: py-10 md:py-14
