---
id: 077
name: Notion
tags: [warm, friendly, saas, illustrations, light]
tone: light
inspired_by: [notion.so]
status: draft
---

# 077 — Notion

## Preview
`samples/077-notion.html`

## Palette
- Background: #ffffff
- Text: #191919
- Subtle BG: #f7f6f3
- Border: #e9e5df
- Muted: #6b6b6b
- Accent: #000000
- Accent 2: #2eaadc
- Warm Tint: #fbfaf8

## Typography
- Heading: Inter (700, -0.03em)
- Body: Inter (400)
- Mono: Söhne Mono or JetBrains Mono
- h1: text-5xl md:text-6xl (font-weight 700, letter-spacing -0.03em, line-height 1.1)
- h2: text-3xl sm:text-4xl (font-weight 700, letter-spacing -0.02em)
- h3: text-xl (font-weight 600)
- Body: text-base (line-height 1.7, color #6b6b6b)

## Layout
- Hero: center-aligned, warm white bg, py-24 md:py-32
- Features: bento grid with mixed card sizes, colored accent backgrounds
- Cards: rounded-2xl, bg-[#f7f6f3], no shadow, hover:shadow-sm
- Buttons: rounded-md, bg-black text-white primary, border secondary
- Border-radius: rounded-2xl (cards) + rounded-md (buttons)
- Max width: max-w-6xl

## Key Details
- Warm white background (#fbfaf8) not pure white
- Playful illustrations with simple line art style
- Block-based UI demos inside feature cards (inline database, kanban, doc)
- Friendly professional copy ("One workspace. Zero busywork.")
- Logo strip with well-known company logos
- Colored section backgrounds (soft blue, soft yellow, soft pink for different features)
- Emoji as visual elements in cards and features
- Video/animated demos of product in action
- Sticky nav: bg-white/90, backdrop-blur-md, border-b border-[#e9e5df]
- Scroll-triggered fade-in (0.7s, translateY 24px)
- Testimonial cards with avatar photos and company logos
- "Get Notion free" primary CTA — black solid button
- Calculator/comparison section (vs other tools)

## Material
- Glass: nav only (backdrop-blur-md, bg-white/90)
- Shadows: shadow-sm on hover only, zero default shadows
- Borders: 1px solid #e9e5df, warm gray
- Gradients: none — flat solid colors
- Surface: warm matte, slight cream tint

## Rhythm
- Hero → Logo Strip → Feature Carousel → Bento Grid → Comparison → Testimonials → Apps → CTA → Footer
- Warm white → cream → colored accents → warm white

## Anti-patterns
- No dark sections until footer — warm throughout
- No gradient text — solid colors only
- No neon accents — muted, warm palette
- No complex animations — simple fade-ins only
- No code blocks — this is for everyone, not just developers

## Reconstruction Hints
- Warm white bg (#fbfaf8), not pure #fff
- Hero: simple headline + "Get started free" + "Request a demo" dual CTA
- Feature cards with pastel colored backgrounds (soft blue, yellow, pink)
- Include UI mockup inside a card (kanban board, doc editor, database table)
- Emoji usage as card icons (📋, 🎯, 📊)
- Friendly, human copy tone — avoid technical jargon
- Illustration spots with simple SVG line art

## Section Order
Nav -> Hero -> Logo Strip -> Feature Carousel -> Bento Grid -> Comparison -> Testimonials -> Download -> CTA -> Footer

## Background Pattern
#fbfaf8 (hero) -> #ffffff (logos) -> colored sections (features) -> #f7f6f3 (comparison) -> #ffffff (testimonials) -> #191919 (CTA) -> #191919 (footer)

## Padding Pattern
hero: py-24 md:py-32 | logos: py-12 | features: py-24 | comparison: py-20 | testimonials: py-20 | download: py-16 | CTA: py-24 | footer: py-16
