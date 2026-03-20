---
id: 003
name: Developer Terminal
tags: [developer, green, code, dark, terminal, api-first]
tone: dark
inspired_by: [linear.app, vercel.com, railway.app]
status: verified
---

# 003 — Developer Terminal

## Preview
`samples/003-developer-terminal.html`

## Palette
- Background: #09090b
- Text: #fafafa
- Subtle BG: #18181b
- Border: #27272a
- Muted: #a1a1aa
- Accent: #10b981
- Accent Dim: rgba(16, 185, 129, 0.08)
- Accent Glow: rgba(16, 185, 129, 0.15)

## Syntax Highlighting
- Keyword: #c084fc (purple)
- String: #10b981 (green/accent)
- Comment: #52525b (zinc-600)
- Function: #60a5fa (blue)
- Constant: #e879f9 (fuchsia)
- Type: #2dd4bf (teal)
- Punctuation: #71717a (zinc-500)
- Number: #f472b6 (pink)
- Key: #93c5fd (light blue)
- Boolean: #fbbf24 (amber)

## Typography
- Heading: Space Grotesk (700, tracking-tight)
- Body: Inter (400)
- Mono: JetBrains Mono
- h1: text-4xl sm:text-5xl md:text-6xl (font-weight 700, tracking-tight)
- h2: text-3xl sm:text-4xl (font-weight 700, tracking-tight)
- h3: text-lg (font-weight 600)
- Body: text-base (leading-relaxed)

## Layout
- Hero: split layout (lg:grid-cols-2), left text + right terminal mockup, grid-pattern background
- Features: bento grid (sm:grid-cols-2 lg:grid-cols-3, first card sm:col-span-2)
- Code Section: side-by-side code blocks (lg:grid-cols-2), api-example.ts + response.json
- Cards: border style, subtle-bg background, hover:border-emerald-500/50
- Buttons: rounded-lg, accent-green solid primary, border outline secondary
- Border-radius: rounded-lg (cards, buttons, terminals)
- Max width: max-w-6xl

## Key Details
- Terminal mockup in hero (title bar with colored dots, monospace output with green checkmarks)
- Grid pattern background (linear-gradient lines at 64px intervals, rgba(16,185,129,0.04))
- Grid scan line animation (8s linear infinite, subtle green glow sweep)
- Cursor blink animation (1.2s step-end infinite)
- Pulse dot animation on status indicators (2s ease-in-out infinite)
- Install command inline: "$ npx create-taskflow@latest" with copy button
- Version badge with pulse dot: "v2.0 now available"
- Full syntax-highlighted code examples (TypeScript + JSON)
- Terminal title bar: colored dots (red/yellow/green) + monospace path
- Terminal chrome bg: #141416
- Terminal content bg: #0c0c0e with green glow shadow (box-shadow: 0 0 80px rgba(16,185,129,0.06))
- Feature cards have mini terminal snippets inside
- Pricing tier headers use mono uppercase with wider tracking
- CTA section uses solid accent bg (#10b981) with dark text (#09090b)
- "Star on GitHub" secondary CTA button
- Highlighted pricing: border-2 border-accent, sm:scale-105
- How It Works connector line: gradient with accent color
- Step 01 circle has accent border, steps 02-03 have default border
- Scroll fade-up (IntersectionObserver, threshold 0.1, rootMargin -40px, translateY 24px, 0.6s ease)
- Sticky nav: rgba(9,9,11,0.85) bg with blur(16px)
- Logo: green square icon with checkmark SVG + "TaskFlow" text
- Footer heading labels: mono, uppercase, wider tracking

## Section Order
Nav -> Hero (Split + Terminal) -> Social Proof -> Features -> Code Example (API Docs) -> How It Works -> Pricing -> CTA -> Footer

## Background Pattern
#09090b (hero, grid-pattern) -> #18181b (social proof) -> #09090b (features) -> #18181b (code example) -> #09090b (how it works) -> #18181b (pricing) -> #10b981 (CTA, solid accent) -> #09090b (footer)

## Padding Pattern
hero: py-28 | social: py-12 | features: py-20 | code-example: py-20 | how-it-works: py-20 | pricing: py-20 | CTA: py-24 | footer: py-16
