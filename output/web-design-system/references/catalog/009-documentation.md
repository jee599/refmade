---
id: 009
name: Documentation
tags: [docs, framework, sidebar, code]
tone: light
inspired_by: [react.dev, nextjs.org, tailwindcss.com]
status: draft
---

# 009 — Documentation

## Palette
- Background: #ffffff
- Text: #171717
- Subtle BG: #fafafa
- Border: #e5e5e5
- Muted: #737373
- Accent: #2563eb

## Typography
- Heading: Inter Tight (600, -0.02em)
- Body: Inter (400)
- Mono: JetBrains Mono
- h1: text-3xl md:text-4xl (font-weight 600, letter-spacing -0.02em, line-height 1.15)
- h2: text-xl sm:text-2xl (font-weight 600, letter-spacing -0.01em)
- h3: text-lg (font-weight 600)
- Body: text-base (line-height 1.8)

## Layout
- Hero: minimal, center-aligned for landing; sidebar + content for docs pages
- Features: sidebar TOC (w-64, sticky top-16) + main content (max-w-3xl) + right mini-TOC (w-48, hidden lg:block)
- Cards: border (1px solid var(--border)), bg-white, no shadow, hover:border-blue-300 transition-colors duration-150
- Buttons: rounded-lg, accent solid primary (bg-blue-600 text-white), ghost secondary (text-gray-600 hover:text-black)
- Border-radius: rounded-lg (cards, code blocks) + rounded-md (buttons, inline code)
- Max width: max-w-screen-xl (full layout), max-w-3xl (content column)

## Key Details
- Three-column layout: sidebar nav (sticky) + content + on-this-page mini-TOC
- Code blocks with JetBrains Mono, bg-[#fafafa] border rounded-lg, syntax highlighting, copy button top-right
- Inline code: bg-gray-100 text-[#171717] px-1.5 py-0.5 rounded-md text-sm font-mono
- Sidebar nav: collapsible sections, active item with bg-blue-50 text-blue-600 left-border accent
- Breadcrumb navigation above h1 in muted text with / separators
- Callout blocks: info (blue left border), warning (yellow left border), tip (green left border), with Lucide icons
- Tab components for code examples (npm/yarn/pnpm switcher)
- Search bar in nav: rounded-lg border, kbd shortcut hint (Ctrl+K), backdrop-blur on results overlay
- All interactive: hover transition-colors duration-150, focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2

## Section Order
Nav (with search) -> Sidebar TOC -> Content Area (h1 -> prose -> code blocks -> h2 sections) -> On-This-Page TOC -> Prev/Next Navigation -> Footer

## Background Pattern
#ffffff (nav) -> #fafafa (sidebar) -> #ffffff (content) -> #fafafa (code blocks inline) -> #ffffff (footer)

## Padding Pattern
nav: py-3 px-6 | sidebar: py-8 pl-6 pr-4 | content: py-10 px-8 md:px-12 | code-block: p-4 | footer: py-10 px-6
