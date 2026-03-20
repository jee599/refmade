"use client";

import {
  Zap,
  Shield,
  BarChart3,
  Layers,
  Globe,
  Lock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built on edge infrastructure for sub-50ms response times globally. No cold starts, no waiting.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified with end-to-end encryption and role-based access control.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Track every metric that matters with live dashboards and custom alerts.",
  },
  {
    icon: Layers,
    title: "Composable Architecture",
    description:
      "Mix and match modules to build exactly what you need. Nothing more.",
  },
  {
    icon: Globe,
    title: "Global CDN",
    description:
      "Deployed across 200+ edge locations for instant content delivery worldwide.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "GDPR and CCPA compliant out of the box. Your users' data stays protected.",
  },
];

export default function FeaturesGrid() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to ship
          </h2>
          <p
            className="mt-4 text-base"
            style={{ color: "var(--muted)" }}
          >
            A complete platform with all the tools your team needs from day one.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isLarge = i === 0;

            return (
              <article
                key={feature.title}
                className={`group rounded-lg border p-6 transition-all duration-200 hover:shadow-md ${
                  isLarge ? "sm:col-span-2" : ""
                }`}
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--bg)",
                }}
              >
                <div
                  className="mb-4 inline-flex rounded-lg p-2"
                  style={{ backgroundColor: "var(--subtle-bg)" }}
                >
                  <Icon
                    size={20}
                    style={{ color: "var(--accent)" }}
                  />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  {feature.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
