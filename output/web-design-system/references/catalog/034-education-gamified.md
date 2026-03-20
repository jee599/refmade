---
id: 034
name: Education Gamified
tags: [education, learning, gamified, bright, teal, playful]
tone: clean-minimal
inspired_by: [brilliant.org, duolingo.com, egghead.io]
status: draft
---

# 034 — Education Gamified

## Preview
`samples/034-education-gamified.html`

## Palette
- Background: #ffffff
- Surface: #f0fdfa (teal-50)
- Card BG: #ffffff
- Card Border: #ccfbf1 (teal-100)
- Text Primary: #0f172a (slate-900)
- Text Muted: #64748b (slate-500)
- Accent: #0d9488 (teal-600 — single color)
- Accent Light: #14b8a6 (teal-500, for badges/progress)

## Typography
- Heading: Nunito (800 — extra-bold, friendly)
- Body: Nunito (400)
- h1: text-4xl md:text-5xl (font-weight 800, tight leading)
- h2: text-3xl (font-weight 700)
- h3: text-lg (font-weight 700)
- Body: text-base (leading-relaxed)
- Small: text-sm

## Layout
- Hero: left-aligned text + right side illustration (SVG character/mascot placeholder)
- Curriculum: vertical course pathway with connected nodes (like Duolingo tree)
- Features: bento grid (2x3) with icon + title + short description
- Interactive Demo: centered card with mock quiz/lesson interface
- Social Proof: horizontal scroll of learner result cards
- CTA: playful centered section with character illustration
- Max width: max-w-6xl
- Border-radius: rounded-2xl (everything) — 1 type only

## Key Details
- SVG placeholder illustrations (simple geometric shapes as mascot/characters)
- Progress bar component in hero (teal fill, 67% complete)
- Course path nodes: circles connected by dashed lines, completed = filled teal
- Quiz demo card: question + 4 option buttons, one highlighted as correct
- Streak counter badge with flame icon
- Nav: fixed, bg-white/90 backdrop-blur-md, teal CTA — constraint #16
- NO system fonts — constraint #20 (Nunito is distinctive)
- NO radial glow — constraint #18
- NO gradient text — constraint #19
- NO big corp names — constraint #22
- NO generic testimonial praise — constraint #23
- NO 4-col stat grid — constraint #26
- All animations repeat on scroll (IntersectionObserver)

## Section Order
Nav (light glass) -> Hero (split: text + illustration) -> Curriculum Path (connected nodes) -> Features (bento grid) -> Demo (quiz card) -> Social Proof (scroll cards) -> CTA -> Footer

## Background Pattern
#ffffff (hero) -> #f0fdfa (curriculum) -> #ffffff (features) -> #f0fdfa (demo) -> #ffffff (social proof) -> #f0fdfa (cta) -> #ffffff (footer)

## Padding Pattern
hero: pt-32 pb-20 | curriculum: py-24 | features: py-20 | demo: py-28 | social-proof: py-24 | cta: py-20 | footer: py-12

## Data from crawled sites
- brilliant.org: white bg, custom font, 36px h1 700wt, 1216px container, minimal hero, has animation
- duolingo.com: bright green gamified, playful characters, progress tracking
- egghead.io: illustrated characters, clean minimal
- Mapped: white bg + teal accent from edtech sites, rounded-2xl for playful feel, course path from Duolingo, quiz demo from Brilliant
