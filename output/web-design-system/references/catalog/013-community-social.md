---
id: 013
name: Community Social
tags: [community, social, avatars, feed]
tone: light
inspired_by: [disquiet.io, producthunt.com]
status: draft
---

# 013 — Community Social

## Palette
- Background: #ffffff
- Text: #1e1e1e
- Subtle BG: #f8f8f8
- Border: #e6e6e6
- Muted: #888888
- Accent: #ef4444

## Typography
- Heading: Outfit (600, -0.015em)
- Body: Outfit (400)
- Mono: Fira Code
- h1: text-3xl md:text-5xl (font-weight 600, letter-spacing -0.015em, line-height 1.15)
- h2: text-xl sm:text-3xl (font-weight 600, letter-spacing -0.01em)
- h3: text-base (font-weight 600)
- Body: text-sm md:text-base (line-height 1.6)

## Layout
- Hero: minimal, center-aligned tagline + search/filter bar below, py-16 md:py-24
- Features: single-column feed (max-w-2xl center) with sidebar (hidden md:block w-72)
- Cards: bg-white border (1px solid var(--border)), rounded-xl, varied: compact feed item vs expanded feature card
- Buttons: rounded-lg, accent solid primary (bg-red-500 text-white), ghost secondary (hover:bg-gray-100)
- Border-radius: rounded-xl (cards) + rounded-lg (buttons, avatars use rounded-full)
- Max width: max-w-6xl (layout), max-w-2xl (feed column)

## Key Details
- Avatar-heavy design: 32px rounded-full avatars on every feed item, user name + handle pattern
- Feed items: upvote button (left), product thumbnail (48x48), title + description + tags, engagement metrics (right)
- Engagement metrics: upvote count, comment count, with Lucide icons (ChevronUp, MessageCircle)
- Tag pills: bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs
- Trending section in sidebar: numbered list (01-10) with small thumbnails
- Leaderboard widget: avatar stack (overlapping -ml-2), contributor names, weekly score
- Filter tabs: Today / This Week / This Month, active state border-b-2 border-red-500
- Real-time activity indicator: green dot pulse animation on active users
- All interactive: hover:bg-gray-50 transition-colors duration-150, focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2

## Section Order
Nav (with avatar + post button) -> Hero + Filter Bar -> Feed Column + Sidebar -> Trending -> Top Makers -> Newsletter CTA -> Footer

## Background Pattern
#ffffff (nav) -> #f8f8f8 (hero) -> #ffffff (feed) -> #f8f8f8 (sidebar bg) -> #ffffff (trending) -> #1e1e1e (newsletter) -> #1e1e1e (footer)

## Padding Pattern
hero: py-16 md:py-24 | feed-item: px-4 py-4 | sidebar: p-5 | trending: py-12 md:py-16 | makers: py-14 md:py-20 | newsletter: py-16 | footer: py-10
