---
id: 015
name: Enterprise B2B
tags: [enterprise, b2b, trust, demo]
tone: light
inspired_by: [workos.com, auth0.com, intercom.com]
status: draft
---

# 015 — Enterprise B2B

## Palette
- Background: #ffffff
- Text: #0f172a
- Subtle BG: #f8fafc
- Border: #e2e8f0
- Muted: #64748b
- Accent: #4f46e5

## Typography
- Heading: Roobert (600, -0.02em)
- Body: Inter (400)
- Mono: IBM Plex Mono
- h1: text-4xl md:text-6xl (font-weight 600, letter-spacing -0.02em, line-height 1.1)
- h2: text-2xl sm:text-4xl (font-weight 600, letter-spacing -0.015em)
- h3: text-lg (font-weight 600)
- Body: text-base (line-height 1.7)

## Layout
- Hero: split (text + CTA left, product screenshot or illustration right), py-20 md:py-32
- Features: icon-top 3-column grid (lg:grid-cols-3), then alternating split sections for deep dives
- Cards: bg-white border (1px solid var(--border)), rounded-xl, no shadow, hover:border-indigo-300 transition-colors duration-200
- Buttons: rounded-lg, accent solid primary (bg-indigo-600 text-white px-6 py-3), outline secondary (border-slate-300), "Book a Demo" as primary CTA
- Border-radius: rounded-xl (cards, screenshots) + rounded-lg (buttons, badges)
- Max width: max-w-7xl

## Key Details
- Logo bar: 2 rows of grayscale client logos (8-12 logos), opacity-40 hover:opacity-70, "Trusted by" label above
- Case study cards: large client logo, quote excerpt, "Read case study ->" link, varied card widths (featured wider)
- Security/compliance badge row: SOC2 Type II, GDPR, HIPAA, ISO 27001 icons in a horizontal strip
- "Book a Demo" CTA repeated: nav, hero, mid-page, final CTA section — always indigo solid
- Enterprise feature grid: SSO, SCIM, Audit Logs, RBAC — each with Lucide icon + 2-line description
- ROI/metrics section: 3 large numbers (Roobert 600, text-5xl) with descriptions, grid-cols-3
- Comparison table: "Us vs. Alternatives", checkmarks in accent, x-marks in muted
- Integration logos grid: 4x4 grid of partner/integration logos with hover:scale-105
- All interactive: hover transition-all duration-200, focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2

## Section Order
Nav (with "Book a Demo" CTA) -> Hero -> Logo Bar -> Features Grid -> Feature Deep Dive 1 (Split) -> Feature Deep Dive 2 (Split) -> Case Studies -> Security Badges -> Metrics -> Comparison Table -> Integrations -> Final CTA -> Footer

## Background Pattern
#ffffff (hero) -> #f8fafc (logos) -> #ffffff (features) -> #f8fafc (deep dive 1) -> #ffffff (deep dive 2) -> #f8fafc (case studies) -> #0f172a (security, dark) -> #ffffff (metrics) -> #f8fafc (comparison) -> #ffffff (integrations) -> #0f172a (CTA) -> #0f172a (footer)

## Padding Pattern
hero: py-20 md:py-32 | logos: py-12 | features: py-20 md:py-28 | deepdive1: py-16 md:py-24 | deepdive2: py-16 md:py-24 | cases: py-20 md:py-28 | security: py-16 | metrics: py-16 md:py-20 | comparison: py-14 md:py-20 | integrations: py-16 md:py-24 | CTA: py-20 md:py-28 | footer: py-14
