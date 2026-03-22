---
id: 060
name: Ethereal Glass
tags: [glassmorphism, premium, agency, luxury, animated]
tone: dark
inspired_by: [apple.com, stripe.com, linear.app]
status: draft
---

# 060 — Ethereal Glass

## Preview
`samples/060-ethereal-glass.html`

## Palette
- Background: #0c0c0f
- Text: #f4f4f5
- Subtle BG: #16161a
- Border: rgba(255,255,255,0.06)
- Muted: #71717a
- Accent: #a78bfa

## Typography
- Heading: Outfit (700, tracking-tight)
- Body: Satoshi (400)
- Mono: Geist Mono
- h1: text-5xl md:text-7xl (font-weight 700, letter-spacing -0.03em, line-height 1.02)
- h2: text-3xl md:text-5xl (font-weight 700, tracking-tight)
- h3: text-xl (font-weight 600)
- Body: text-base (leading-relaxed)

## Layout
- Hero: Z-Axis Cascade with floating glass layers, staggered depth
- Features: Asymmetrical Bento with "double-bezel" card containers
- Cards: nested borders (outer border-zinc-800, inner border-zinc-700/30), backdrop-blur-xl bg-white/[0.03]
- Buttons: "button-in-button" pattern — outer pill with inner icon circle, scale transition
- Nav: "Fluid Island" floating nav with backdrop-blur-2xl, magnetic hover on items
- Border-radius: rounded-2xl (cards), rounded-full (buttons, nav)
- Max width: max-w-7xl

## Key Details
- Floating glass nav with backdrop-blur-2xl and bg-white/[0.04] border
- Double-bezel cards: outer container with subtle border, inner container with tighter border
- Z-axis layered hero with overlapping glass panels at different depths
- Custom cubic-bezier transitions (0.34, 1.56, 0.64, 1) for spring-like motion
- Magnetic hover effect on nav items and buttons
- Staggered reveal animations on scroll
- Gradient mesh backgrounds with subtle noise texture
- Violet accent (#a78bfa) used sparingly

## Section Order
Nav (Fluid Island) -> Hero (Z-Axis Cascade) -> Logos -> Features (Asymmetric Bento) -> Product Showcase -> Testimonials -> Pricing -> CTA -> Footer

## Background Pattern
#0c0c0f (hero, subtle radial gradient) -> #16161a (logos) -> #0c0c0f (features) -> #16161a (showcase) -> #0c0c0f (testimonials) -> #16161a (pricing) -> gradient mesh (CTA) -> #0c0c0f (footer)

## Padding Pattern
hero: py-32 md:py-40 | logos: py-12 | features: py-24 md:py-32 | showcase: py-24 | testimonials: py-20 | pricing: py-24 | CTA: py-28 | footer: py-16
