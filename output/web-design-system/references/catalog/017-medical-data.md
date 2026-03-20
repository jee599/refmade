---
id: 017
name: Medical Data Clean
tags: [medical, data, clean, healthcare]
tone: light
inspired_by: [arcturisdata.com]
status: draft
---

# 017 — Medical Data Clean

## Palette
- Background: #F7F7F3
- Text: #131E29
- Subtle BG: #ffffff
- Border: #D9D9D9
- Muted: #6B7280
- Accent: #0d9488 (teal-600)

## Typography
- Heading: DM Sans (500, -0.02em)
- Body: DM Sans (400)
- Mono: Space Mono
- h1: text-4xl md:text-6xl (font-weight 500, letter-spacing -0.02em, line-height 1.1)
- h2: text-2xl md:text-4xl (font-weight 500, letter-spacing -0.015em)
- h3: text-lg (font-weight 500)
- Body: text-base (line-height 1.7)

## Layout
- Hero: split — left text with badge + CTA, right animated data visualization (CSS dots connecting with lines)
- Features: 3-column grid (lg:grid-cols-3) with mini chart illustrations inside each card
- Dashboard: full-width mockup showing health metrics, bar charts, line graphs (all CSS)
- Trust: horizontal row of compliance badges (HIPAA, SOC 2, ISO 27001), subtle borders
- Cards: bg-white border (1px solid #D9D9D9), rounded-2xl, no shadow, hover:border-teal-400 transition-colors duration-200
- Buttons: rounded-lg, teal solid primary (bg-teal-600 text-white px-6 py-3), outline secondary (border-gray-300), transition-all duration-200
- Border-radius: rounded-2xl (cards, dashboard) + rounded-lg (buttons, badges) — 2 variants
- Max width: max-w-7xl

## Key Details
- Subtle dot-grid background pattern on hero and CTA sections (radial-gradient dots)
- Data visualization in hero: 6 animated dots (teal) with connecting lines, pulsing glow
- Mini charts inside feature cards: bar chart (CSS flex), sparkline (SVG path), pie segment (conic-gradient)
- Dashboard mockup: dark panel (#131E29) with teal accent bars, line chart, metric cards
- Compliance badges: HIPAA, SOC 2, ISO 27001 with shield SVG icons, subtle gray bg, rounded-lg
- No stock testimonials — single "[your customer quote]" placeholder in bordered card
- Animations: dots pulse on loop, chart bars grow on scroll-in, scroll-reveal fade-up on all sections
- All animations repeat on scroll in/out (IntersectionObserver with unobserve:false)
- Clean clinical whitespace — generous py/px everywhere
- Nav: fixed, white bg with bottom border, teal "Get Started" CTA

## Section Order
Nav (fixed, with "Get Started" CTA) -> Hero (split: text + data viz) -> Trust Badges -> Features Grid -> Dashboard Mockup -> How It Works (3-step) -> Final CTA (dot-grid bg) -> Footer

## Background Pattern
#F7F7F3 (hero, dot-grid) -> #ffffff (trust) -> #F7F7F3 (features) -> #131E29 (dashboard, dark) -> #ffffff (how it works) -> #F7F7F3 (CTA, dot-grid) -> #131E29 (footer)

## Padding Pattern
hero: py-20 md:py-32 | trust: py-10 md:py-14 | features: py-16 md:py-28 | dashboard: py-16 md:py-24 | how-it-works: py-16 md:py-24 | CTA: py-16 md:py-24 | footer: py-10 md:py-14
