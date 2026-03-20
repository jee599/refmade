"use client";

import { ArrowRight } from "lucide-react";

export default function HeroSplit() {
  return (
    <section
      className="py-24"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 sm:grid-cols-2">
          {/* Left: text */}
          <div>
            <span
              className="mb-6 inline-block rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: "var(--subtle-bg)",
                color: "var(--muted)",
                border: "1px solid var(--border)",
              }}
            >
              New Release
            </span>

            <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
              The smarter way to{" "}
              <span style={{ color: "var(--accent)" }}>launch</span>
            </h1>

            <p
              className="mt-6 text-xl"
              style={{ color: "var(--muted)" }}
            >
              Stop wasting time on infrastructure. Focus on what matters —
              building the product your users love.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#cta"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-medium transition-colors duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--bg)",
                }}
              >
                Start Building
                <ArrowRight size={16} />
              </a>
              <a
                href="#learn"
                className="inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 text-base font-medium transition-colors duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right: browser mockup */}
          <div
            className="overflow-hidden rounded-lg border shadow-sm"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--subtle-bg)",
            }}
          >
            <div
              className="flex items-center gap-2 border-b px-4 py-3"
              style={{ borderColor: "var(--border)" }}
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: "var(--border)" }}
              />
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: "var(--border)" }}
              />
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: "var(--border)" }}
              />
              <div
                className="ml-2 flex-1 rounded-lg px-3 py-1 text-xs"
                style={{
                  backgroundColor: "var(--bg)",
                  color: "var(--muted)",
                }}
              >
                yourapp.com/dashboard
              </div>
            </div>
            <div className="aspect-video w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
