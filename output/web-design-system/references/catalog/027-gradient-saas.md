---
id: 027
name: Gradient SaaS
tags: [saas, gradient, bright, friendly, productivity, pink, orange]
tone: light
inspired_by: [superlist.com, wealthsimple.com]
status: draft
---

# 027 — Gradient SaaS

## Preview
`samples/027-gradient-saas.html`

## Palette
- Background: white → subtle gradient (white → #fff5f7 faint pink → white → #fff8f0 faint peach → white)
- Card BG: #ffffff
- Card Border: #f3f4f6
- Text Primary: #1a1a2e (dark navy-ish)
- Text Muted: #6b7280 (gray-500)
- Accent Gradient: #ec4899 (pink) → #f97316 (orange) — applied to CTAs, gradient text on key words
- Card Top Borders: #ec4899 (pink), #f97316 (orange), #f43f5e (rose) — each card different
- Surface: #fafafa (alternate sections)

## Typography
- Heading: DM Sans (700)
- Body: Inter (400)
- h1: text-5xl md:text-6xl lg:text-7xl (font-weight 700, letter-spacing -0.03em)
- h2: text-4xl md:text-5xl (font-weight 700, letter-spacing -0.02em)
- h3: text-xl (font-weight 700)
- Body: text-base (leading-relaxed)

## Layout
- Hero: centered, h1 with gradient text on key word only ("faster"), not whole heading
- Product mockup: window-chrome card with task management UI, floating notification cards
- Feature cards: 3 white cards with colored top borders (pink/orange/rose), NOT same size (constraint #2)
- Integration logos: row of placeholder boxes
- Testimonials: 2 cards (not 4-column grid)
- Pricing teaser: simple centered text + CTA
- Max width: max-w-4xl (hero), max-w-5xl (mockup), max-w-6xl (features)
- Border-radius: rounded-xl (cards), rounded-lg (buttons) — 2 types (constraint #7)

## Key Details
- Gradient text: background-clip on key word only, pink→orange
- Gradient CTA button: pink→orange, rounded-xl, box-shadow with pink glow
- Cards hover: translateY(-6px) + shadow, 600ms ease
- Floating mockup cards: CSS float animation (4s ease-in-out infinite, staggered delays)
- Pill badge: gradient bg at 10% opacity, rounded-full
- NO orange as MAIN palette (constraint #17) — gradient accent only, bg is white/pink
- NO radial glow (constraint #18)
- NOT white→gray gradient text (constraint #19) — it's pink→orange gradient
- NO AI-generic stats (constraint #25) — [N] placeholders
- NO 4-column stat grid (constraint #26)
- NO generic company names (constraint #22) — [Your customer] placeholders
- All interactive elements have transitions (constraint #14)
- SVG icons on feature cards (constraint #15)
- Nav has CTA button (constraint #16)
- Bridges glassmorphism (023) and colorful — more product-focused

## Section Order
Nav (glass white) -> Hero (centered, gradient keyword) -> Product Mockup (floating UI cards) -> Features (3 colored-border cards) -> Integration Logos -> Social Proof (2 testimonial cards) -> Pricing Teaser -> Footer

## Background Pattern
white-gradient (hero) -> white-gradient (mockup) -> #fafafa (features) -> white (logos) -> #fafafa (social proof) -> white (pricing) -> white (footer)

## Padding Pattern
hero: pt-32 pb-20 md:pt-44 md:pb-32 | mockup: pb-24 | features: py-24 | logos: py-20 | social: py-24 | pricing: py-28 | footer: py-16

## Data from crawled sites
- superlist.com: bright gradient accents (pink-orange), clean white cards, productivity UI mockups, floating UI elements
- wealthsimple.com: subtle gradients, clean typography, friendly professional tone
- Mapped: gradient accent from Superlist, clean card layout from Wealthsimple, optimistic energy from both