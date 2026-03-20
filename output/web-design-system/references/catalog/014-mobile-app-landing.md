---
id: 014
name: Mobile App Landing
tags: [mobile, app, phone-mockup, download]
tone: light
inspired_by: [revolut.com, wise.com]
status: draft
---

# 014 — Mobile App Landing

## Palette
- Background: #f9fafb
- Text: #111827
- Subtle BG: #f3f4f6
- Border: #d1d5db
- Muted: #6b7280
- Accent: #0ea5e9

## Typography
- Heading: Cal Sans (600, -0.02em)
- Body: DM Sans (400)
- Mono: DM Mono
- h1: text-4xl md:text-6xl (font-weight 600, letter-spacing -0.02em, line-height 1.1)
- h2: text-2xl sm:text-4xl (font-weight 600, letter-spacing -0.015em)
- h3: text-lg (font-weight 500)
- Body: text-base (line-height 1.7)

## Layout
- Hero: center-aligned, phone mockup floating below headline, py-20 md:py-32
- Features: 3-column grid with phone screenshots inside device frames (sm:grid-cols-1 lg:grid-cols-3)
- Cards: bg-white border (1px solid var(--border)), rounded-2xl, phone frame as visual center in larger cards
- Buttons: rounded-xl, accent solid primary (bg-sky-500 text-white px-8 py-4), dark secondary (bg-[#111827] text-white)
- Border-radius: rounded-2xl (cards, phone frames) + rounded-xl (buttons)
- Max width: max-w-6xl

## Key Details
- Phone mockup centerpiece: 3D perspective transform (rotateY -5deg rotateX 5deg), shadow-2xl
- Device frame: rounded-[2.5rem] border-8 border-[#111827] containing app screenshot
- App store badges: Apple + Google Play SVG badges side by side below CTA, hover:opacity-80 transition
- Feature phone screens: three phones in a row, each showing different app screen, center phone slightly larger (scale-110)
- QR code download section: actual QR placeholder with "Scan to download" text
- Social proof: "4.8 star rating" with star icons, "2M+ downloads" badge
- Animated phone: subtle floating animation (translateY -8px to 8px, 3s ease infinite alternate)
- Step-by-step section: numbered circles (1-2-3) connected by dashed line, each with phone screenshot
- All interactive: hover transition-all duration-200, focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2

## Section Order
Nav -> Hero (Phone Mockup + CTA) -> Social Proof (Ratings + Downloads) -> Features (Phone Screenshots) -> How It Works (Steps) -> Testimonials -> Download CTA (QR + Badges) -> Footer

## Background Pattern
#f9fafb (hero) -> #ffffff (social proof) -> #f3f4f6 (features) -> #ffffff (how it works) -> #f9fafb (testimonials) -> #111827 (download CTA) -> #111827 (footer)

## Padding Pattern
hero: py-20 md:py-32 | social: py-10 | features: py-20 md:py-28 | steps: py-16 md:py-24 | testimonials: py-16 md:py-24 | download: py-20 md:py-28 | footer: py-14
