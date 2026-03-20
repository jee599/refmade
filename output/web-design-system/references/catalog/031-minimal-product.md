---
id: 031
name: Minimal Product
tags: [minimal, product, saas, clean, indigo, white]
tone: clean-minimal
inspired_by: [tally.so, campsite.co, dopt.com]
status: draft
---

# 031 — Minimal Product

## Preview
`samples/031-minimal-product.html`

## Palette
- Background: #ffffff (pure white)
- Surface: #f9fafb (gray-50, for alternating sections)
- Card BG: #ffffff
- Card Border: #e5e7eb (default), #6366f1 (Pro card highlight)
- Text Primary: #111827
- Text Muted: #6b7280
- Accent: #6366f1 (soft indigo — single color)
- Accent Light: #eef2ff (indigo-50)

## Typography
- Heading: Inter (500 — medium weight, NOT bold)
- Body: Inter (400)
- h1: text-4xl md:text-5xl (font-weight 500, tight leading)
- h2: text-3xl (font-weight 500)
- h3: text-base (font-weight 500)
- Body: text-base (leading-relaxed)
- Small: text-sm

## Layout
- Hero: left-aligned text + right side product UI mockup in browser frame (form builder / tool interface)
- Features: 3-column grid, generous spacing (gap-8), icon + title + description
- Product Showcase: large centered browser frame with detailed dashboard UI inside (sidebar + table)
- Testimonial: single large quote, centered, minimal
- Pricing: 2-column (Free vs Pro), Pro has indigo border + "Popular" badge — constraint #9
- CTA: simple centered section, single button
- Max width: max-w-5xl
- Border-radius: rounded-lg (everything) — 1 type only

## Key Details
- Browser frame component: border + shadow, 3 colored dots header, URL bar
- Product mockup in hero: form builder with checkboxes, input fields, submit button — all using gray placeholder blocks
- Dashboard mockup: sidebar nav + data table with status badges (Active/Draft)
- Hover-lift effect on cards: translateY(-2px) + subtle shadow — constraint #14
- Nav: fixed, bg-white/90 backdrop-blur-md, indigo CTA button — constraint #16
- Everything is Inter — UI-focused, not typographic
- "Boring in a good way" — clean to the point of invisibility
- Different from 001: softer, more product-focused, less typographic/bold
- Different from 002: indigo not blue, more restrained, left-aligned hero
- NO orange/warm tones — constraint #17
- NO radial glow — constraint #18
- NO gradient text — constraint #19
- NO big corp names — constraint #22
- NO generic testimonial praise — constraint #23
- NO 4-col stat grid — constraint #26
- NO round numbers in stats — constraint #25
- All animations repeat on scroll (IntersectionObserver removes 'visible' class on exit)
- Lots of air — generous padding and whitespace throughout

## Section Order
Nav (light glass) -> Hero (left text + right browser mockup) -> Features (3-col with icons) -> Product Showcase (large browser frame) -> Testimonial (single, large) -> Pricing (2-col) -> CTA (simple) -> Footer

## Background Pattern
#ffffff (hero) -> #f9fafb (features) -> #ffffff (product) -> #f9fafb (testimonial) -> #ffffff (pricing) -> #f9fafb (CTA) -> #ffffff (footer)

## Padding Pattern
hero: pt-32 pb-20 | features: py-24 | product: py-20 | testimonial: py-24 | pricing: py-24 | cta: py-28 | footer: py-12

## Data from crawled sites
- tally.so: pure white bg, form builder product, extremely minimal, indigo accent
- campsite.co: clean product UI, browser frame mockups, simple pricing
- dopt.com: minimal SaaS, restrained design, product-focused
- Mapped: white + indigo from tally, browser-frame product showcase from campsite, overall restraint from all three
