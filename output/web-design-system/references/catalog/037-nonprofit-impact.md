---
id: 037
name: Nonprofit Impact
tags: [nonprofit, social-impact, warm, storytelling, teal, serif]
tone: professional
inspired_by: [charitywater.org, conservation.org, malala.org]
status: draft
---

# 037 — Nonprofit Impact

## Preview
`samples/037-nonprofit-impact.html`

## Palette
- Background: #faf7f2 (warm off-white, from conservation.org)
- Surface: #f0ebe3 (warm beige)
- Card BG: #ffffff
- Card Border: #e0d8cc
- Text Primary: #152d44 (dark navy)
- Text Muted: #5b6c7c (slate blue)
- Accent: #0e7490 (cyan-700 — ocean teal — single color)
- Accent Light: #06b6d4 (cyan-500, for highlights)

## Typography
- Heading: Libre Baskerville (700 — warm, authoritative serif)
- Body: Source Sans 3 (400 — clean, accessible)
- h1: text-4xl md:text-5xl (font-weight 700, leading-tight)
- h2: text-3xl (font-weight 700)
- h3: text-lg (font-weight 600)
- Body: text-base md:text-lg (leading-relaxed)
- Small: text-sm

## Layout
- Hero: fullscreen image/video with centered text overlay + single CTA
- Mission: centered text block with large serif pull quote
- Impact: 3-column story cards (image + text + "Read more")
- How It Works: numbered steps in alternating 2-column layout
- Donation: prominent centered donation box with amount buttons
- Partners: small logo row (real placeholder logos)
- CTA: emotional centered section with single button
- Max width: max-w-6xl
- Border-radius: rounded-xl (everything) — 1 type only

## Key Details
- Hero uses gradient overlay (navy to transparent upward) over placeholder image
- Impact counter: single line "Since 2018, [your number] lives changed" — constraint #25
- Story cards with real-feeling placeholder text (not corporate AI copy)
- Donation box: pre-set amounts ($25, $50, $100, Custom) as selectable pills
- Progress bar showing campaign progress
- Nav: fixed, bg-[#faf7f2]/90 backdrop-blur-md, teal CTA "Donate" — constraint #16
- Warm, human, accessible feeling throughout
- NO system fonts — constraint #20 (Libre Baskerville + Source Sans 3)
- NO radial glow — constraint #18
- NO gradient text — constraint #19
- NO big corp names — constraint #22
- NO generic testimonial praise — constraint #23
- NO 4-col stat grid — constraint #26
- All animations repeat on scroll (IntersectionObserver)

## Section Order
Nav (warm glass) -> Hero (fullscreen + overlay) -> Mission (centered text) -> Impact Stories (3-col cards) -> How It Works (steps) -> Donate (centered box) -> CTA -> Footer

## Background Pattern
#faf7f2 (hero bg behind image) -> #ffffff (mission) -> #faf7f2 (impact) -> #ffffff (how it works) -> #f0ebe3 (donate) -> #152d44 (cta, dark) -> #152d44 (footer, dark)

## Padding Pattern
hero: pt-0 pb-0 (fullscreen) | mission: py-28 | impact: py-24 | how-it-works: py-20 | donate: py-28 | cta: py-24 | footer: py-16

## Data from crawled sites
- charitywater.org: white bg, Kazimir Text serif h1, Proxima Nova body, 46px h1, warm tones #F8EED3, fullscreen hero
- conservation.org: #FAF7F2 bg, 112px h1, ProximaNovaExCn, navy/teal palette #27455C, 1280px container
- malala.org: vibrant colors, youthful typography, clear donation pathways
- Mapped: warm off-white from conservation.org, teal accent from water themes, serif heading for authority, fullscreen hero from both
