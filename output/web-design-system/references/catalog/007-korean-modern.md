---
id: 007
name: Korean Modern
tags: [korean, mobile, app, bold]
tone: light
inspired_by: [toss.im, about.daangn.com]
status: draft
---

# 007 — Korean Modern

## Palette
- Background: #ffffff
- Text: #191f28
- Subtle BG: #f2f4f6
- Border: #d1d6db
- Muted: #8b95a1
- Accent: #3182f6

## Typography
- Heading: Pretendard (700, -0.02em)
- Body: Pretendard (400)
- Mono: Fira Code
- h1: text-3xl md:text-5xl (font-weight 700, letter-spacing -0.02em, line-height 1.15)
- h2: text-2xl sm:text-4xl (font-weight 700, letter-spacing -0.015em)
- h3: text-lg (font-weight 600)
- Body: text-base (line-height 1.7)

## Layout
- Hero: split (text left, phone mockup right), py-20 md:py-32
- Features: alternating split sections (image+text, text+image), full-width
- Cards: bg-white, rounded-2xl border (1px solid var(--border)), varied sizes (sm card vs lg featured)
- Buttons: rounded-xl, black solid primary (bg-[#191f28] text-white, px-8 py-4, text-lg), blue outline secondary
- Border-radius: rounded-2xl (cards, phone frame) + rounded-xl (buttons)
- Max width: max-w-6xl

## Key Details
- Bold heading weight (700) with strong visual hierarchy, korean median h1 32px mobile / 64px desktop
- Phone mockup in hero: perspective transform, subtle shadow-2xl, app screenshot inside rounded frame
- App store badges (Google Play + App Store) below CTA button
- Feature sections alternate: phone screenshot on left/right with text on opposite side
- Numbers/stats in blue accent color with Fira Code mono, large text-4xl
- Strong black CTA button is dominant interactive element, hover:bg-[#333d4b] transition-all duration-200
- Social proof: user count badge, rating stars, real user review cards
- Scroll-triggered slide-in animations (translateX for alternating sections, 0.6s ease)
- All interactive: focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2

## Section Order
Nav -> Hero (Phone Mockup) -> Social Proof (User Count) -> Feature 1 (Split) -> Feature 2 (Split) -> Feature 3 (Split) -> Stats -> User Reviews -> Download CTA -> Footer

## Background Pattern
#ffffff (hero) -> #f2f4f6 (social proof) -> #ffffff (feature 1) -> #f2f4f6 (feature 2) -> #ffffff (feature 3) -> #f2f4f6 (stats) -> #ffffff (reviews) -> #191f28 (CTA) -> #191f28 (footer)

## Padding Pattern
hero: py-20 md:py-32 | social: py-10 | feature1: py-16 md:py-28 | feature2: py-16 md:py-28 | feature3: py-16 md:py-28 | stats: py-14 md:py-20 | reviews: py-16 md:py-24 | CTA: py-20 | footer: py-12
