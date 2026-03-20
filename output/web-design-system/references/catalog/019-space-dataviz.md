---
id: 019
name: Space Data Viz
tags: [space, dataviz, dark, immersive, 3d]
tone: dark
inspired_by: [eyes.nasa.gov]
status: draft
---

# 019 — Space Data Viz

## Preview
`samples/019-space-dataviz.html`

## Palette
- Background: #030308
- Surface: #0a0a14
- Panel BG: rgba(10, 10, 30, 0.80)
- Panel Border: #1a1a2e
- Text Primary: #e2e8f0
- Text Muted: #64748b
- Text Data: #94a3b8 (for readouts)
- Accent Active: #3b82f6 (blue, for active/selected elements)
- Danger: #ef4444 (red, for hazard indicators)
- Safe: #22c55e (green, for safe status)
- Warning: #eab308 (yellow, for caution)

## Typography
- Heading: Space Grotesk (600, tracking-wide, uppercase)
- Body: Space Grotesk (400)
- Mono: JetBrains Mono (ALL data readouts, stats, coordinates, timestamps)
- h1: text-4xl sm:text-5xl md:text-6xl (font-weight 600, uppercase, tracking-wide)
- h2: text-2xl sm:text-3xl (font-weight 600, uppercase, tracking-wider)
- h3: text-sm (font-weight 600, uppercase, tracking-widest, monospace)
- Body: text-sm (leading-relaxed)
- Data: JetBrains Mono text-xs sm:text-sm

## Layout
- Hero: centered, deep dark bg with CSS star field (100+ dots), monospace subtitle
- Dashboard Section: asymmetric grid panels (not equal-sized cards)
  - Left column: object tracker list (tall, 2-row span)
  - Right top: radar/grid visualization
  - Right bottom: stats readout panel
  - Full-width: timeline bar
- HUD-style panels: thin borders (#1a1a2e), minimal padding, data-dense
- Buttons: rounded-none (sharp HUD style), blue accent outline
- Border-radius: rounded-none (panels, buttons) — sharp, military HUD aesthetic
- Max width: max-w-7xl

## Dashboard Panel Map
1. Object Tracker (1x2 tall) — list of tracked objects with color-coded status dots (green=safe, yellow=caution, red=hazard), monospace data per row
2. Radar Grid (1x1) — CSS radial grid lines + plotted dots, rotating sweep line
3. Stats Readout (1x1) — monospace key:value pairs (velocity, distance, trajectory, risk), values cycle with animation
4. Timeline Bar (full-width) — horizontal bar with marked events, time labels in mono
5. Alert Panel (1x1) — recent alerts/events with timestamps, color-coded severity

## Key Details
- CSS Star Field: 100+ absolutely positioned dots (1-2px), varying opacity (0.2-0.8), ~15 with twinkle animation (random delay, 2-4s)
- Star twinkle: @keyframes twinkle { 0%,100% { opacity: 0.2 } 50% { opacity: 1 } }
- Radar sweep: rotating line (linear gradient from transparent to blue), 4s linear infinite rotate
- Number cycling: data values update with fade transition every 3s
- Status dot pulse: 2s ease-in-out infinite scale pulse for active status
- Panel hover: border brightens to #2a2a4e, subtle transition
- Nav: fixed, thin bottom border, monospace links, CTA "Access Data"
- HUD crosshair decoration on radar panel (thin lines from edges to center)
- Scanline overlay on panels: repeating linear-gradient for subtle CRT effect
- NO orange/warm tones (constraint #17)
- NO radial glow behind hero (constraint #18)
- NO white→gray gradient text (constraint #19)
- NO 4-column stat grid (constraint #26) — stats in monospace readout format, not grid
- Minimal chrome — content IS the interface, NASA-style functional design

## Section Order
Nav -> Hero (Star Field + Centered Text) -> Dashboard Grid -> Mission Info -> CTA -> Footer

## Background Pattern
#030308 (hero, star field) -> #030308 (dashboard, seamless) -> #0a0a14 (mission info) -> #030308 (CTA) -> #030308 (footer)

## Padding Pattern
hero: py-28 | dashboard: py-16 | mission-info: py-20 | CTA: py-24 | footer: py-12

## Data from eyes.nasa.gov (css-analysis.json)
- h1_font_size: 80px, font_weight: 700
- h1_body_ratio: 5 (strong hierarchy)
- nav_height: ~50px, nav_position: relative
- Fonts: Inter (headings), "Public Sans Web" (body), dm-mono (data)
- Mapped to: Space Grotesk (headings/body), JetBrains Mono (data)
- is_dark_theme: false (their landing page) but dark sections exist
- Accent: #005EA2 (NASA blue) → mapped to #3b82f6 (Tailwind blue-500)
- card_border_radius: 0 (sharp edges, military/HUD style)
- neutral_color_ratio: 0.89 (very restrained palette)
