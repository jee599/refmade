---
id: 018
name: Bento Crypto
tags: [bento, crypto, bold, dark, motion]
tone: dark
inspired_by: [ctrl.xyz]
status: draft
---

# 018 — Bento Crypto

## Preview
`samples/018-bento-crypto.html`

## Palette
- Background: #0a0a0a
- Surface: #111111
- Card BG: rgba(255, 255, 255, 0.05)
- Card Border: rgba(255, 255, 255, 0.10)
- Card Hover Border: rgba(168, 85, 247, 0.40)
- Text Primary: #fafafa
- Text Muted: #737373
- Accent: #a855f7 (purple)
- Accent Secondary: #3b82f6 (blue, gradient pair)
- Positive: #22c55e (green, for price up indicators)

## Typography
- Heading: Space Grotesk (700, tracking-tight)
- Body: Space Grotesk (400)
- Mono: JetBrains Mono (for prices, addresses, code snippets)
- h1: text-5xl sm:text-6xl md:text-7xl (font-weight 700, tracking-tight)
- h2: text-3xl sm:text-4xl (font-weight 700, tracking-tight)
- h3: text-lg (font-weight 600)
- Body: text-base (leading-relaxed)
- Data/Numbers: JetBrains Mono (font-weight 500)

## Layout
- Hero: centered, full-width dark bg, animated gradient text (purple→blue shift)
- Bento Grid: 3-column grid with varied spans — 1x1, 2x1, 1x2, 2x2 cards
- Cards: glassmorphism (bg-white/5 backdrop-blur-xl border border-white/10), hover glow effect
- Buttons: rounded-full, accent-purple solid primary, ghost outline secondary
- Border-radius: rounded-2xl (cards), rounded-full (buttons, badges)
- Max width: max-w-7xl

## Bento Grid Card Map
1. Token Price (1x1) — monospace ticker with animated counting, green/red delta
2. Mini Bar Chart (1x1) — CSS-only bar chart, 7 bars with varying heights
3. Feature Card (2x1) — large text + description, purple accent line
4. Metric Card (2x1) — large number with label, animated counting
5. Code Snippet (1x2) — wallet connect code example, monospace with syntax colors
6. Integration Logos (1x1) — grid of protocol/chain SVG placeholders
7. Status Card (1x1) — network status with pulsing dots

## Key Details
- Hero gradient text: background-clip text, animated purple→blue gradient shift (3s ease infinite)
- Glassmorphism cards: backdrop-filter: blur(24px), bg rgba(255,255,255,0.05), border rgba(255,255,255,0.10)
- Card hover: border transitions to purple/40, subtle box-shadow glow (0 0 40px rgba(168,85,247,0.10))
- Number ticker animation: CSS counter or JS counting up effect
- Bar chart: 7 CSS bars with staggered grow animation (cubic-bezier)
- Floating card effect on hover: translateY(-4px) with 0.3s ease
- Nav: fixed, glassmorphism bg with blur, CTA button "Launch App"
- Monospace accent for all numerical data, addresses, code
- NO orange/warm tones — purple (#a855f7) + white on #0a0a0a
- No 4-column stat grid (constraint #26) — stats integrated into bento cards naturally
- No radial glow behind hero (constraint #18)
- No white→gray gradient text (constraint #19)

## Section Order
Nav -> Hero (Centered + Gradient Text) -> Bento Grid -> Feature Highlight -> CTA -> Footer

## Background Pattern
#0a0a0a (hero) -> #0a0a0a (bento grid, seamless) -> #111111 (feature highlight) -> #0a0a0a (CTA) -> #0a0a0a (footer)

## Padding Pattern
hero: py-32 | bento: py-24 | feature: py-20 | CTA: py-24 | footer: py-12

## Data from ctrl.xyz (css-analysis.json)
- h1_font_size: 158px (very bold), font_weight: 600
- h1_body_ratio: 11.25 (extreme contrast)
- card_padding: ~70px, card_border_radius: ~18px
- nav_height: ~48px, nav_position: fixed
- section_padding_variance: 0.31 (varied padding)
- is_dark_theme: true, body_bg: #000000
- Font: "Tomato Grotesk" → mapped to Space Grotesk (similar geometric grotesk)
