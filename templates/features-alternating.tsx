"use client";

import { Code, Workflow, PieChart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FeatureRow {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: { label: string; href: string };
}

const rows: FeatureRow[] = [
  {
    icon: Code,
    title: "Developer-first API",
    description:
      "Integrate in minutes with our well-documented REST and GraphQL APIs. SDKs available for every major language and framework so your team can hit the ground running.",
    link: { label: "Read the docs", href: "#docs" },
  },
  {
    icon: Workflow,
    title: "Automated Workflows",
    description:
      "Define triggers and actions with a visual builder or code. Automate repetitive tasks, sync data across services, and keep your pipeline flowing without manual intervention.",
    link: { label: "See examples", href: "#examples" },
  },
  {
    icon: PieChart,
    title: "Actionable Insights",
    description:
      "Go beyond vanity metrics. Get deep analytics on user behavior, conversion funnels, and retention — all in real time with zero config.",
  },
];

export default function FeaturesAlternating() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "var(--subtle-bg)", color: "var(--text)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works under the hood
          </h2>
          <p
            className="mt-4 text-base"
            style={{ color: "var(--muted)" }}
          >
            Powerful features designed to fit your workflow, not the other way around.
          </p>
        </div>

        <div className="space-y-20">
          {rows.map((row, i) => {
            const Icon = row.icon;
            const isEven = i % 2 === 1;

            return (
              <div
                key={row.title}
                className={`grid items-center gap-12 sm:grid-cols-2 ${
                  isEven ? "direction-rtl" : ""
                }`}
              >
                {/* Text side */}
                <div className={isEven ? "sm:order-2" : ""}>
                  <div
                    className="mb-4 inline-flex rounded-lg p-2"
                    style={{ backgroundColor: "var(--bg)" }}
                  >
                    <Icon
                      size={20}
                      style={{ color: "var(--accent)" }}
                    />
                  </div>
                  <h3 className="mb-3 text-2xl font-semibold">
                    {row.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {row.description}
                  </p>
                  {row.link && (
                    <a
                      href={row.link.href}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition-colors duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      style={{ color: "var(--accent)" }}
                    >
                      {row.link.label} &rarr;
                    </a>
                  )}
                </div>

                {/* Image placeholder */}
                <div
                  className={`aspect-[4/3] rounded-lg border ${
                    isEven ? "sm:order-1" : ""
                  }`}
                  style={{
                    backgroundColor: "var(--bg)",
                    borderColor: "var(--border)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
