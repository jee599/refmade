---
id: 012
name: E-commerce Landing
tags: [ecommerce, product, shopping]
tone: light
inspired_by: [shopify.com, gumroad.com]
status: draft
---

# 012 — E-commerce Landing

## Palette
- Background: #ffffff
- Text: #1a1a2e
- Subtle BG: #f5f5f7
- Border: #e0e0e6
- Muted: #6e6e80
- Accent: #16a34a

## Typography
- Heading: General Sans (600, -0.02em)
- Body: General Sans (400)
- Mono: JetBrains Mono
- h1: text-4xl md:text-6xl (font-weight 600, letter-spacing -0.02em, line-height 1.1)
- h2: text-2xl sm:text-4xl (font-weight 600, letter-spacing -0.015em)
- h3: text-lg (font-weight 500)
- Body: text-base (line-height 1.6)

## Layout
- Hero: split (product image left occupying 55%, text + CTA right), py-16 md:py-28
- Features: product card grid (sm:grid-cols-2 lg:grid-cols-3), varied card heights (featured product taller)
- Cards: bg-white, border (1px solid var(--border)), hover:shadow-lg transition-shadow duration-200, product image top / info bottom
- Buttons: rounded-xl, green solid primary (bg-green-600 text-white px-6 py-3), outline secondary (border-gray-300)
- Border-radius: rounded-xl (cards, product images) + rounded-lg (buttons)
- Max width: max-w-7xl

## Key Details
- Product images as hero: large high-quality product shot, clean white/neutral background
- Product cards: image aspect-[4/5], hover:scale-[1.02] on image with overflow-hidden
- Price display: text-2xl font-semibold, original price line-through in muted, sale price in accent green
- Size/variant selector: pill buttons in a row, active state border-2 border-[#1a1a2e], inactive border-gray-200
- Add-to-cart CTA: sticky bottom bar on mobile (fixed bottom-0), full-width green button
- Star ratings: 5-star SVG row with half-star support, review count in muted text
- Trust strip below hero: free shipping, 30-day returns, secure checkout — icon + text in 3-column
- Cart icon in nav with item count badge (absolute positioned, bg-green-600 text-white text-xs rounded-full)
- All interactive: hover transition-all duration-200, focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2

## Section Order
Nav (with cart) -> Hero (Product Showcase) -> Trust Strip -> Product Grid -> Featured Product Detail -> Reviews -> Related Products -> Newsletter -> Footer

## Background Pattern
#ffffff (hero) -> #f5f5f7 (trust strip) -> #ffffff (product grid) -> #f5f5f7 (featured detail) -> #ffffff (reviews) -> #f5f5f7 (related) -> #1a1a2e (newsletter) -> #1a1a2e (footer)

## Padding Pattern
hero: py-16 md:py-28 | trust: py-8 | grid: py-16 md:py-24 | featured: py-20 md:py-28 | reviews: py-14 md:py-20 | related: py-16 md:py-24 | newsletter: py-16 | footer: py-12
