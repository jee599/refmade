---
id: 074
name: Stripe
tags: [gradient, saas, fintech, bento, code]
tone: light
inspired_by: [stripe.com]
status: draft
---

# 074 — Stripe

## Preview
`samples/074-stripe.html`

## Palette
- Background: #ffffff
- Text: #0a2540
- Subtle BG: #f6f9fc
- Border: #e3e8ee
- Muted: #425466
- Accent: #635bff
- Accent 2: #00d4aa
- Gradient Start: #a960ee
- Gradient End: #00d4aa

## Typography
- Heading: Inter (600, -0.03em)
- Body: Inter (400)
- Mono: JetBrains Mono
- h1: text-5xl md:text-7xl (font-weight 600, letter-spacing -0.03em, line-height 1.05)
- h2: text-3xl sm:text-4xl (font-weight 600, letter-spacing -0.02em)
- h3: text-xl (font-weight 600, letter-spacing -0.01em)
- Body: text-base (line-height 1.7, color #425466)

## Layout
- Hero: left-aligned, gradient mesh background, py-28 md:py-36
- Features: bento grid (sm:grid-cols-2 lg:grid-cols-3, first card lg:col-span-2)
- Cards: rounded-xl, subtle shadow-sm, hover:shadow-md, bg-white on #f6f9fc sections
- Buttons: rounded-full, gradient primary (#635bff), white outline secondary
- Border-radius: rounded-xl (cards) + rounded-full (buttons, badges)
- Max width: max-w-7xl
- Code blocks: dark bg (#0a2540), syntax highlighted, rounded-lg

## Key Details
- Gradient mesh hero background (animated multi-color blobs, purple→teal→blue)
- Left-aligned hero with code snippet on right side
- Bento feature grid with UI mockups inside cards
- Code snippets with syntax highlighting (curl, Python, Node.js tabs)
- Animated product demos inside feature cards
- Social proof: logo strip with grayscale→color hover
- Metrics section with large numbers (text-5xl, tabular-nums)
- Gradient text on hero headline (purple→teal)
- Sticky nav with backdrop-blur-lg, white/90 bg
- Smooth scroll-triggered fade-in (IntersectionObserver, translateY 30px, 0.8s ease)
- CTA section with dark navy (#0a2540) background
- Wave/mesh SVG dividers between sections

## Material
- Glass: nav only (backdrop-blur-lg, bg-white/90)
- Shadows: shadow-sm default, shadow-md on hover (cards)
- Borders: 1px solid #e3e8ee on cards
- Gradients: multi-stop mesh backgrounds, gradient text
- Code blocks: syntax-highlighted with dark background

## Rhythm
- Hero → Logo Strip → Feature Bento → Code Demo → Metrics → Testimonials → CTA → Footer
- Alternating: white → #f6f9fc → white → #f6f9fc → #0a2540

## Anti-patterns
- No single-color flat backgrounds — always has subtle texture or gradient
- No harsh borders — uses shadow + subtle border combo
- No monochrome palette — always purple accent present
- No static code — code blocks feel interactive with tabs

## Reconstruction Hints
- Start with gradient mesh hero (CSS radial-gradient with animated position)
- Use bento grid with first card spanning 2 columns
- Include a code block section with language tabs (curl/Python/Node)
- Navy CTA section at bottom
- Logo strip needs grayscale filter with hover:grayscale-0 transition

## Section Order
Nav -> Hero -> Logo Strip -> Features Bento -> Code Demo -> Metrics -> Testimonials -> Pricing -> CTA -> Footer

## Background Pattern
white (#ffffff) -> #f6f9fc (logo strip) -> white (features) -> #f6f9fc (code demo) -> white (metrics) -> #f6f9fc (testimonials) -> white (pricing) -> #0a2540 (CTA) -> #0a2540 (footer)

## Padding Pattern
hero: py-28 md:py-36 | logos: py-14 | features: py-24 | code: py-20 | metrics: py-20 | testimonials: py-20 | pricing: py-24 | CTA: py-24 | footer: py-16
