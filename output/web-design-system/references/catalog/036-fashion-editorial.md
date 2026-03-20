---
id: 036
name: Fashion Editorial
tags: [fashion, editorial, monochrome, minimal, high-end, grid]
tone: clean-minimal
inspired_by: [jacquemus.com, ssense.com, acnestudios.com]
status: draft
---

# 036 — Fashion Editorial

## Preview
`samples/036-fashion-editorial.html`

## Palette
- Background: #ffffff (pure white)
- Surface: #f5f5f5 (neutral-100)
- Card BG: #ffffff
- Card Border: #e5e5e5 (neutral-200)
- Text Primary: #0a0a0a (near-black)
- Text Muted: #737373 (neutral-500)
- Accent: #0a0a0a (black — the "color" IS black — single color)
- Accent Hover: #404040 (neutral-700)

## Typography
- Heading: Syne (600 — geometric, high-fashion)
- Body: Work Sans (300 — thin, airy)
- h1: text-5xl md:text-7xl (font-weight 600, extra-tight leading, uppercase tracking-wide)
- h2: text-2xl md:text-3xl (font-weight 500, uppercase tracking-widest)
- h3: text-sm (font-weight 500, uppercase tracking-widest)
- Body: text-base (leading-relaxed, font-weight 300)
- Small: text-xs (uppercase, tracking-widest)

## Layout
- Hero: full-bleed image grid (2x2 asymmetric, one large + three small)
- Collection: horizontal scrolling lookbook cards
- About: split layout — large text left, image right
- Editorial: magazine-style 3-column with varying heights (masonry)
- Newsletter: minimal centered email input
- CTA: single line text + arrow
- Max width: max-w-7xl
- Border-radius: rounded-none (sharp, editorial)

## Key Details
- Uppercase headings with wide tracking (letter-spacing: 0.2em)
- Image hover: grayscale(0) -> grayscale(0), scale(1.02) with smooth transition
- Thin 1px borders used as grid dividers (not cards)
- Lookbook cards show "01/", "02/" numbering in top-left
- Category labels as small caps above headings
- Nav: fixed, bg-white/95 backdrop-blur-sm, black text CTA "SHOP" — constraint #16
- Extreme whitespace — padding is 2x normal between sections
- NO warm tones — constraint #17 (monochrome only)
- NO radial glow — constraint #18
- NO gradient text — constraint #19
- NO big corp names — constraint #22
- NO generic testimonial praise — constraint #23
- NO 4-col stat grid — constraint #26
- All animations repeat on scroll (IntersectionObserver)

## Section Order
Nav (minimal white) -> Hero (image grid) -> Collection (horizontal scroll) -> About (split) -> Editorial (masonry) -> Newsletter (centered) -> Footer

## Background Pattern
#ffffff throughout, images provide all visual weight

## Padding Pattern
hero: pt-20 pb-0 | collection: py-32 | about: py-28 | editorial: py-32 | newsletter: py-28 | footer: py-20

## Data from crawled sites
- jacquemus.com: black bg (but we invert for fashion white), Futura PTT, minimal hero
- ssense.com: monochrome grid, editorial curation
- acnestudios.com: ultra-minimal white, product focus
- Mapped: pure white + black accent from Scandinavian fashion, wide tracking from luxury brands, masonry editorial from SSENSE
