---
id: 010
name: SaaS Dashboard
tags: [dashboard, app, sidebar, data]
tone: light
inspired_by: [posthog.com, attio.com]
status: draft
---

# 010 — SaaS Dashboard

## Palette
- Background: #fafafa
- Text: #18181b
- Subtle BG: #f4f4f5
- Border: #e4e4e7
- Muted: #71717a
- Accent: #2563eb

## Typography
- Heading: Geist (600, -0.015em)
- Body: Geist (400)
- Mono: Geist Mono
- h1: text-2xl md:text-3xl (font-weight 600, letter-spacing -0.015em, line-height 1.2)
- h2: text-lg sm:text-xl (font-weight 600, letter-spacing -0.01em)
- h3: text-base (font-weight 500)
- Body: text-sm md:text-base (line-height 1.6)

## Layout
- Hero: app interface — no traditional hero, sidebar nav opens directly to dashboard
- Features: sidebar nav (w-56, bg-white, border-r) + top bar (h-14, border-b) + main content area
- Cards: bg-white border (1px solid var(--border)), rounded-xl, varied sizes (sm stat card vs lg chart card)
- Buttons: rounded-lg, accent solid primary (bg-blue-600 text-white px-4 py-2), ghost secondary (hover:bg-zinc-100)
- Border-radius: rounded-xl (cards, modals) + rounded-lg (buttons, inputs)
- Max width: fluid (w-full within main area)

## Key Details
- Dashboard-first design: sidebar + topbar + card grid, not a marketing page
- Stat cards in top row: 4-column grid, each with label (text-sm muted), value (text-2xl Geist Mono), trend arrow + percentage
- Chart placeholder cards: larger height (h-80), with tab switcher (7d/30d/90d) inside card header
- Data table section: alternating row bg (white / #fafafa), sticky header, sortable column indicators
- Sidebar nav: icon + label items, active state bg-blue-50 text-blue-600, collapsible groups
- Command palette trigger in topbar (Cmd+K), search icon + muted hint text
- Avatar + dropdown in topbar right corner, notification bell with dot indicator
- All interactive: hover:bg-zinc-100 transition-colors duration-150, focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1

## Section Order
Sidebar Nav -> Top Bar -> Stat Cards Row -> Chart Cards (2-col grid) -> Data Table -> Activity Feed -> Settings Panel

## Background Pattern
#ffffff (sidebar) -> #fafafa (main bg) -> #ffffff (cards) -> #fafafa (table alternating) -> #ffffff (modal overlay card)

## Padding Pattern
sidebar: py-4 px-3 | topbar: px-6 py-3 | main: p-6 | stat-card: p-5 | chart-card: p-6 | table: px-4 py-3 per row
