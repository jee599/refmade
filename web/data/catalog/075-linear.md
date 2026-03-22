---
id: 075
name: Linear
tags: [dark, minimal, purple, dev-tool, speed]
tone: dark
inspired_by: [linear.app]
status: draft
---

# 075 — Linear

## Preview
`samples/075-linear.html`

## Palette
- Background: #000000
- Surface: #111111
- Text: #ffffff
- Subtle BG: #0a0a0a
- Border: #1a1a1a
- Muted: #8a8f98
- Accent: #5e6ad2

## Typography
- Heading: Inter (500, -0.04em)
- Body: Inter (400)
- Mono: JetBrains Mono
- h1: text-5xl md:text-7xl (font-weight 500, letter-spacing -0.04em, line-height 1.0)
- h2: text-3xl sm:text-4xl (font-weight 500, letter-spacing -0.03em)
- h3: text-lg (font-weight 500, letter-spacing -0.01em)
- Body: text-base (line-height 1.7, color #8a8f98)

## Layout
- Hero: center-aligned, minimal, py-32 md:py-48
- Features: 2-column grid on desktop, single column mobile
- Cards: bg-[#111111], border 1px #1a1a1a, rounded-lg, hover:border-[#5e6ad2]/30
- Buttons: rounded-md, bg-[#5e6ad2] primary, border secondary
- Border-radius: rounded-lg (cards) + rounded-md (buttons)
- Max width: max-w-5xl

## Key Details
- Ultra-minimal dark design with extreme whitespace
- Center-aligned hero with single-line headline
- Subtle purple accent used sparingly (links, active states, hover borders)
- Keyboard shortcut badges (kbd elements, bg-[#1a1a1a], rounded, mono font)
- Speed-focused messaging ("Built for speed", "Linear is fast")
- Dot grid background pattern (radial-gradient, #1a1a1a dots, 24px spacing)
- Feature cards with subtle product screenshots
- Gradient fade from hero text (white → #8a8f98)
- Minimal nav: logo + links + single CTA, no megamenus
- Scroll-triggered fade-in (0.6s, translateY 20px, threshold 0.1)
- No shadows anywhere — borders only
- Purple gradient line dividers (linear-gradient, transparent→#5e6ad2→transparent)

## Material
- Glass: none
- Shadows: none (deliberately zero shadows)
- Borders: 1px solid #1a1a1a everywhere
- Gradients: text gradient (white→muted), subtle accent line dividers
- Surface: flat matte dark surfaces

## Rhythm
- Hero → Feature Grid → Product Demo → Keyboard Shortcuts → Integration → CTA → Footer
- Single dark tone throughout with border-separated sections

## Anti-patterns
- No gradients on backgrounds — pure flat dark
- No shadows — borders handle separation
- No rounded-full buttons — squared with rounded-md
- No colorful illustrations — monochrome with purple accent only
- No busy layouts — extreme restraint in element count

## Reconstruction Hints
- Black background throughout, no alternating sections
- Hero should feel empty — massive padding, minimal text
- Cards are barely visible — #111 on #000 with #1a1a1a borders
- Purple accent appears only on interactive elements
- Include keyboard shortcut section with kbd tags
- Speed/performance messaging is core to the copy

## Section Order
Nav -> Hero -> Features -> Product Demo -> Shortcuts -> Integrations -> CTA -> Footer

## Background Pattern
#000000 throughout, sections separated by 1px #1a1a1a borders or gradient lines

## Padding Pattern
hero: py-32 md:py-48 | features: py-24 | demo: py-20 | shortcuts: py-20 | integrations: py-20 | CTA: py-24 | footer: py-16
