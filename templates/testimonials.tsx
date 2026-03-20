"use client";

import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  highlighted?: boolean;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "We cut our deployment time from 45 minutes to under 3. The team actually enjoys shipping now.",
    name: "Sarah Chen",
    role: "CTO, Acme Corp",
  },
  {
    quote:
      "This replaced four tools in our stack. The unified dashboard alone saved us 10 hours a week across the engineering team.",
    name: "Marcus Rivera",
    role: "VP Engineering, Globex",
    highlighted: true,
  },
  {
    quote:
      "The developer experience is unmatched. Great docs, responsive support, and the API just works.",
    name: "Aisha Patel",
    role: "Lead Developer, Initech",
  },
];

export default function Testimonials() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "var(--subtle-bg)", color: "var(--text)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by engineering teams
          </h2>
          <p
            className="mt-4 text-base"
            style={{ color: "var(--muted)" }}
          >
            Don&apos;t take our word for it — hear from teams who ship with us every day.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className={`group rounded-lg border p-6 transition-all duration-200 hover:shadow-md ${
                t.highlighted ? "sm:scale-105" : ""
              }`}
              style={{
                borderColor: t.highlighted
                  ? "var(--accent)"
                  : "var(--border)",
                backgroundColor: "var(--bg)",
              }}
            >
              <Quote
                size={20}
                className="mb-4"
                style={{ color: "var(--accent)", opacity: 0.5 }}
                aria-hidden="true"
              />

              <p
                className="mb-6 text-base leading-relaxed"
                style={{ color: "var(--text)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <footer className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: "var(--subtle-bg)",
                    color: "var(--muted)",
                    border: "1px solid var(--border)",
                  }}
                  aria-hidden="true"
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <cite className="block text-sm font-semibold not-italic">
                    {t.name}
                  </cite>
                  <span
                    className="text-xs"
                    style={{ color: "var(--muted)" }}
                  >
                    {t.role}
                  </span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
