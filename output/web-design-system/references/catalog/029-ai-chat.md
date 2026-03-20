---
id: 029
name: AI Chat Interface
tags: [ai, chat, consumer, product, purple]
tone: clean-minimal
inspired_by: [commandbar.com, jasper.ai, wegic.ai]
status: draft
---

# 029 — AI Chat Interface

## Preview
`samples/029-ai-chat.html`

## Palette
- Background: #fafafa (very light gray)
- Surface: #ffffff (white)
- Card BG: #f9fafb (gray-50)
- Card Border: #e5e7eb (default), #ede9fe (hover — violet-100)
- Text Primary: #1f2937
- Text Muted: #6b7280
- Accent: #7c3aed (violet-600 — soft purple)
- Accent Light: #ede9fe (violet-100)
- User Message BG: #7c3aed (violet-600)
- AI Message BG: #ffffff with #e5e7eb border

## Typography
- Heading: Inter (700)
- Body: Inter (400)
- Code: JetBrains Mono (400)
- h1: text-5xl md:text-6xl (font-weight 700, no letter-spacing manipulation)
- h2: text-3xl md:text-4xl (font-weight 700)
- h3: text-xl (font-weight 600)
- Body: text-base (leading-relaxed)
- Code blocks: text-xs, JetBrains Mono, dark theme (#1e1e2e bg)

## Layout
- Hero: centered text + mock chat bubble UI below (user message -> AI response with code block -> user follow-up -> typing indicator)
- Features: 1 large card (left, row-span-2) + 2 smaller cards (right) — constraint #2
- Conversation Examples: 3 stacked chat examples (debugging, data, creative) — centered
- Testimonials: 2-column grid, placeholder quotes
- Try It: mock chat input with send button
- Pricing: 2-column (Free vs Pro), Pro has violet bg — constraint #9
- Max width: max-w-5xl
- Border-radius: rounded-xl (cards), rounded-lg (buttons) — 2 types only

## Key Details
- Chat messages slide in from sides (user from right, AI from left) via IntersectionObserver
- Typing indicator: 3 bouncing dots (bounce-dot keyframe, staggered 0.15s delay)
- Code block inside AI response: dark theme with syntax highlighting classes (.keyword, .string, .comment, .func)
- CTA pulse animation on hover (box-shadow expanding)
- Nav: fixed, bg-white/80 backdrop-blur-md, CTA "Try Free" violet button — constraint #16
- All interactive elements have transitions — constraint #14
- NO orange/warm tones — constraint #17
- NO radial glow behind hero — constraint #18
- NO gradient text — constraint #19
- NO 4-column stat grid — constraint #26
- NO big corp placeholder names — constraint #22
- NO generic praise in testimonials — constraint #23
- All animations repeat on scroll (IntersectionObserver removes 'visible' class on exit)
- Consumer AI feel, NOT developer API feel (different from 006)

## Section Order
Nav (light glass) -> Hero (centered text + chat mockup) -> Features (1+2 cards) -> Conversation Examples (3 stacked) -> Testimonials (2-col) -> Try It (mock input) -> Pricing (2-col) -> Footer

## Background Pattern
#fafafa (hero) -> #ffffff (features) -> #fafafa (examples) -> #ffffff (testimonials) -> #fafafa (try it) -> #ffffff (pricing) -> #fafafa (footer)

## Padding Pattern
hero: pt-32 pb-20 | features: py-24 | examples: py-20 | testimonials: py-24 | try-it: py-28 | pricing: py-24 | footer: py-12

## Data from crawled sites
- commandbar.com: consumer AI chat interface patterns
- jasper.ai: AI content creation, purple branding
- wegic.ai: AI-native product design
- Mapped: soft purple accent, chat-centric hero, conversational UI patterns
