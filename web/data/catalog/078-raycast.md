---
id: 078
name: Raycast
tags: [dark, gradient, command-palette, glass, developer]
tone: dark
inspired_by: [raycast.com]
status: draft
---

# 078 — Raycast

## Preview
`samples/078-raycast.html`

## Palette
- Background: #070921
- Surface: #0d1023
- Text: #f5f5f5
- Subtle BG: #0a0c1a
- Border: rgba(255,255,255,0.1)
- Muted: #7a7d8e
- Accent: #ff6363
- Accent 2: #ff167a
- Gradient Start: #ff167a
- Gradient Mid: #635bff
- Gradient End: #00d4aa

## Typography
- Heading: Inter (600, -0.03em)
- Body: Inter (400)
- Mono: JetBrains Mono
- h1: text-5xl md:text-7xl (font-weight 600, letter-spacing -0.03em, line-height 1.05)
- h2: text-3xl sm:text-4xl (font-weight 600, letter-spacing -0.02em)
- h3: text-lg (font-weight 500)
- Body: text-base (line-height 1.6, color #7a7d8e)

## Layout
- Hero: center-aligned, animated gradient background, py-32 md:py-40
- Features: 3-column grid, glass-like cards
- Cards: bg-white/5, border 1px rgba(255,255,255,0.1), backdrop-blur-xl, rounded-xl
- Buttons: rounded-lg, gradient primary, border-white/10 secondary
- Border-radius: rounded-xl (cards) + rounded-lg (buttons)
- Max width: max-w-6xl

## Key Details
- Deep navy-black background (#070921) with subtle blue undertone
- Multi-color gradient blobs (animated, behind content)
- Command palette UI mockup as hero element (dark modal, search bar, list items)
- Keyboard shortcut badges (⌘ + K style, bg-white/10, rounded, mono)
- Glass-morphic cards (bg-white/5, backdrop-blur-xl, border-white/10)
- Extension grid showcasing tools (icons + names + descriptions)
- 3D cube or geometric shape animation in hero
- Productivity-focused messaging ("Your shortcut to everything")
- Category pills: Productivity, Engineering, Design, Writing
- Sticky nav: bg-[#070921]/80, backdrop-blur-lg, border-b border-white/10
- Scroll-triggered fade-in (0.6s, translateY 24px)
- Inline keyboard visualization (ASCII keyboard layout)
- AI section with gradient text
- Radial gradient glow effects behind sections

## Material
- Glass: heavy use (backdrop-blur-xl, bg-white/5, border-white/10)
- Shadows: colored shadows (rgba purple/pink, blur 40-60px)
- Borders: 1px rgba(255,255,255,0.1)
- Gradients: multi-color radial blobs, gradient text, gradient buttons
- Surface: glass on deep dark

## Rhythm
- Hero → Extensions Grid → AI Features → Shortcuts → Automation → Developer → CTA → Footer
- Dark throughout with gradient accent zones

## Anti-patterns
- No flat solid cards — everything has glass treatment
- No pure white text — slightly off-white #f5f5f5
- No single-color accents — multi-color gradient system
- No light sections — dark throughout
- No visible grid lines — glass separation only

## Reconstruction Hints
- Deep navy bg (#070921), not pure black
- Animated gradient blobs behind hero (CSS radial-gradient, animated position)
- Command palette mockup: dark modal with search input, icon+text list items
- Glass cards: bg-white/5, backdrop-blur-xl, border-white/10
- Keyboard shortcut badges scattered throughout
- Extension cards with app icons, names, short descriptions
- Include ⌘ symbols and keyboard keys in the UI
- Gradient CTA button (pink→purple→teal)

## Section Order
Nav -> Hero -> Extensions -> AI -> Shortcuts -> Automation -> Developer -> CTA -> Footer

## Background Pattern
#070921 throughout, gradient blob accents at section transitions

## Padding Pattern
hero: py-32 md:py-40 | extensions: py-24 | ai: py-20 | shortcuts: py-20 | automation: py-20 | developer: py-20 | CTA: py-24 | footer: py-16
