---
id: 004
name: Editorial Serif
tags: [editorial, serif, blog, content]
tone: light
inspired_by: [ghost.org, beehiiv.com]
status: draft
---

# 004 — Editorial Serif

## Palette
- Background: #faf8f5
- Text: #1a1a1a
- Subtle BG: #f0ece4
- Border: #d9d3c7
- Muted: #6b6560
- Accent: #c8102e

## Typography
- Heading: Playfair Display (700, -0.02em)
- Body: Source Serif 4 (400)
- Mono: IBM Plex Mono
- h1: text-4xl md:text-6xl (font-weight 700, letter-spacing -0.02em, line-height 1.1)
- h2: text-2xl sm:text-4xl (font-weight 700, letter-spacing -0.01em)
- h3: text-xl (font-weight 600)
- Body: text-base md:text-lg (line-height 1.8)

## Layout
- Hero: split (text left, featured image right), py-20 md:py-32
- Features: single-column article list with large featured image, max-w-3xl
- Cards: no border, bottom divider only (1px solid var(--border)), varied heights based on content
- Buttons: rounded-md, accent solid primary, ghost secondary with underline
- Border-radius: rounded-md (cards, images) + rounded-sm (buttons, tags)
- Max width: max-w-5xl (content), max-w-7xl (full-bleed images)

## Key Details
- Dramatic serif headings with tight leading (1.1) create magazine feel
- Pull quotes styled with large italic Playfair Display, 2px left border in accent color
- Category tags in uppercase IBM Plex Mono (11px, 0.1em tracking, accent color)
- Full-bleed images between sections breaking out of max-w container
- Author byline with small avatar, name in serif, date in mono
- Drop cap on article intro (first-letter: text-6xl, float-left, Playfair Display, 3-line height)
- Reading time estimate in muted mono next to date
- Hover on article cards: image scale(1.02) with overflow-hidden, 0.4s ease transition, focus-visible: ring-2 ring-accent

## Section Order
Nav -> Hero (Featured Post) -> Latest Posts Grid -> Category Filter -> Long-form Highlights -> Newsletter CTA -> Author Spotlight -> Footer

## Background Pattern
#faf8f5 (hero) -> #faf8f5 (posts) -> #f0ece4 (category filter) -> #faf8f5 (highlights) -> #1a1a1a (newsletter CTA) -> #f0ece4 (author) -> #1a1a1a (footer)

## Padding Pattern
hero: py-20 md:py-32 | posts: py-16 md:py-24 | filter: py-10 | highlights: py-20 md:py-28 | newsletter: py-20 | author: py-16 | footer: py-12
