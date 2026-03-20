"use client";

import { ArrowRight } from "lucide-react";

export default function HeroCenter() {
  return (
    <section
      className="py-24"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <span
            className="mb-6 inline-block rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: "var(--subtle-bg)",
              color: "var(--muted)",
              border: "1px solid var(--border)",
            }}
          >
            Now in Public Beta
          </span>

          {/* Heading */}
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
            Build faster.{" "}
            <span style={{ color: "var(--accent)" }}>Ship sooner.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="mx-auto mt-6 max-w-2xl text-xl"
            style={{ color: "var(--muted)" }}
          >
            The modern toolkit that helps you go from idea to production in
            record time. No boilerplate, no busywork.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-medium transition-colors duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--bg)",
              }}
            >
              Get Started Free
              <ArrowRight size={16} />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-base font-medium transition-colors duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              See Demo
            </a>
          </div>
        </div>

        {/* Browser mockup */}
        <div
          className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-lg border shadow-sm"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--subtle-bg)",
          }}
        >
          {/* Browser chrome */}
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
              yourapp.com
            </div>
          </div>
          {/* Screenshot placeholder */}
          <div className="aspect-video w-full" />
        </div>
      </div>
    </section>
  );
}
