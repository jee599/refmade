---
id: 028
name: Crypto Trading
tags: [crypto, trading, dark, data-dense, defi, pro]
tone: dark
inspired_by: [aave.com, blur.io, solana.com]
status: draft
---

# 028 — Crypto Trading

## Preview
`samples/028-crypto-trading.html`

## Palette
- Background: #050505 (deep black)
- Surface: #0a0a0a
- Card: rgba(255,255,255,0.03) (glass-dark)
- Card Border: rgba(255,255,255,0.06), hover → rgba(147,51,234,0.3) purple glow
- Text Primary: #e5e5e5
- Text Muted: #737373
- Accent Purple: #9333ea (primary)
- Accent Cyan: #06b6d4 (data/metrics)
- Green: #22c55e (price up)
- Red: #ef4444 (price down)
- Grid Pattern: rgba(147,51,234,0.02)

## Typography
- Heading: Space Grotesk (600)
- Body: Inter (300/400)
- Numbers/Prices: JetBrains Mono (400) — ALL numbers use monospace
- h1: text-5xl md:text-6xl lg:text-7xl (font-weight 600, letter-spacing -0.03em)
- h2: text-3xl md:text-4xl (font-weight 600, letter-spacing -0.02em)
- h3: text-lg (font-weight 600)
- Body: text-sm/text-base (leading-relaxed)

## Layout
- Hero: dark, centered, with animated mesh gradient blobs (purple + cyan, CSS animated, low opacity 0.15)
- Live ticker bar: fixed below nav, horizontal scrolling crypto prices (monospace, green/red color-coded)
- Protocol stats: inline text row in glass card, NOT 4-column grid (constraint #26)
- Trading dashboard mockup: candlestick bars (CSS), order book table (red asks / green bids), portfolio bar
- Feature cards: glass-dark, NOT same size (constraint #2) — 1 tall + 2 standard + 1 wide spanning 2 cols
- Security section: glass card with audit list
- CTA: purple button, aggressive but clean
- Max width: max-w-5xl (hero), max-w-6xl (dashboard/features), max-w-4xl (stats/security)
- Border-radius: rounded-xl (cards), rounded-lg (buttons) — 2 types (constraint #7)

## Key Details
- Mesh gradient blobs: 3 blobs, absolute positioned, CSS animated (12s ease-in-out infinite, hue-rotate), purple + cyan radial gradients, opacity 0.15
- Ticker bar: duplicated content for seamless scroll loop, 30s linear infinite animation
- Candlestick chart: pure CSS — flex items-end, green/red body divs + thin wick divs, varying heights
- Order book: red-tinted rows for asks, green-tinted for bids, spread in cyan, JetBrains Mono throughout
- Glass-dark cards: bg-white/[0.03] backdrop-blur border-white/[0.06], purple glow on hover
- Protocol badge: purple bg/border at low opacity, JetBrains Mono, rounded-full
- Pulse dot: green dot with 2s pulsing opacity animation next to "Live on Mainnet"
- Grid pattern bg: subtle purple-tinted grid lines on body
- NO orange/warm tones (constraint #17) — purple and cyan only
- NOT the same as 025 Neon Dark — 025 is creative/flashy with cyan+pink, this is data-dense/financial with purple+cyan
- NOT the same as eliminated 018 (Bento Crypto) — this is a trading platform, not a bento layout
- All values use [N] placeholders with $ and % formatting (constraint #25)
- All interactive elements have transitions (constraint #14)
- SVG icons on feature cards (constraint #15)
- Nav has CTA button "Launch App" (constraint #16)

## Section Order
Nav (dark glass) + Ticker Bar (fixed) -> Hero (mesh blobs + centered text) -> Protocol Stats (inline glass bar) -> Trading Dashboard (candlestick + order book + portfolio) -> Features (glass cards, varied sizes) -> Security & Audits (glass card) -> CTA -> Footer

## Background Pattern
#050505 with grid-pattern (throughout) | mesh blobs shift across sections

## Padding Pattern
hero: pt-36 pb-20 md:pt-48 md:pb-28 | stats: py-12 | dashboard: py-20 | features: py-24 | security: py-20 | CTA: py-28 | footer: py-12

## Data from crawled sites
- aave.com: dark bg, purple primary accent, glass cards, DeFi protocol stats, audit-focused
- blur.io: data-dense trading UI, aggressive dark theme, order book UI, real-time data
- solana.com: purple brand color, mesh gradient effects, protocol-level messaging
- Mapped: purple accent from Solana/Aave, trading UI from Blur, glass-dark cards from Aave, mesh gradients from Solana