---
id: 026
name: Luxury E-commerce
tags: [luxury, ecommerce, warm, light, product, premium]
tone: light
inspired_by: [aesop.com, cartier.com]
status: draft
---

# 026 — Luxury E-commerce

## Preview
`samples/026-luxury-ecommerce.html`

## Palette
- Background: #f5f1eb (warm off-white)
- Surface: #faf8f4 (alternating sections)
- Text Primary: #1a1611 (deep warm black)
- Text Muted: #6b6349 (muted olive)
- Accent: #9a8c6c (warm brass)
- Cream: #e8e2d8 (image placeholders, light text on dark overlay)
- Dividers: rgba(107, 99, 73, 0.15)

## Typography
- Heading: Cormorant Garamond (300 — light weight, luxury serif)
- Body: DM Sans (400)
- h1: text-5xl md:text-6xl lg:text-7xl (font-weight 300, letter-spacing -0.01em)
- h2: text-4xl md:text-5xl (font-weight 300)
- h3: text-xl (font-weight 300)
- Body: text-base (leading-relaxed)
- Labels: text-xs tracking-widest uppercase

## Layout
- Hero: 2-column, single large product image (aspect-ratio 3:4) + minimal text. Product-centric.
- Product Grid: 2x2, each product card with image placeholder + name + price [N]. Cards NOT same size (constraint #2) — alternating 3:4 and 4:3 aspect ratios.
- Editorial Story: full-width image with text overlay (gradient overlay from bottom)
- Ingredient List: clean list with thin dividers, chevron icons, hover padding-left shift
- Testimonial: single quote, Cormorant Garamond italic feel
- CTA: quiet, centered, understated "Find a Store" button
- Max width: max-w-7xl (hero/products), max-w-6xl (ingredients), max-w-3xl (CTA)
- Border-radius: rounded-sm only — 1 type (constraint #7)

## Key Details
- Very slow animations: 1200ms ease transitions, barely noticeable
- NO orange/warm accent colors as PRIMARY (constraint #17) — olive/brass is the accent, not orange
- NO radial glow (constraint #18)
- NO gradient text (constraint #19)
- NO 4-column stat grid (constraint #26)
- NO AI-generic testimonials (constraint #23) — raw, specific feedback
- Prices and metrics use [N] placeholders (constraint #25)
- Product cards have different aspect ratios (constraint #2)
- Sections have different padding: py-28, py-24, py-20, py-32 (constraint #3)
- Nav has CTA button (constraint #16)
- All interactive elements have transitions (constraint #14)
- SVG chevron icons on ingredient items (constraint #15)
- Understated CTA — border button, not gradient/filled
- Light and warm, product-focused — NOT the eliminated 011 Dark Luxury

## Section Order
Nav (glass warm) -> Hero (product image + text) -> Product Grid (2x2, warm white bg) -> Editorial Story (image + overlay text) -> Ingredients (list with dividers) -> Testimonial (single) -> CTA (quiet) -> Footer

## Background Pattern
#f5f1eb (hero) -> #faf8f4 (products) -> #f5f1eb (editorial) -> #faf8f4 (ingredients) -> #f5f1eb (testimonial) -> #faf8f4 (CTA) -> #f5f1eb (footer)

## Padding Pattern
hero: pt-28 pb-20 md:pt-36 md:pb-28 | products: py-24 | editorial: py-20 | ingredients: py-28 | testimonial: py-24 | CTA: py-32 | footer: py-16

## Data from crawled sites
- aesop.com: warm off-white bg, muted earth tones, Cormorant-style serifs, minimal product-centric layout, restraint in every element
- cartier.com: premium serif typography, quiet CTA style, editorial story sections
- Mapped: bg warmth from Aesop, editorial approach from Cartier, ingredient transparency from Aesop