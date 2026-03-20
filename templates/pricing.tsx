"use client";

import { Check } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "For individuals and small side projects.",
    features: [
      "Up to 3 projects",
      "1,000 API calls/month",
      "Community support",
      "Basic analytics",
    ],
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing teams shipping real products.",
    features: [
      "Unlimited projects",
      "100,000 API calls/month",
      "Priority support",
      "Advanced analytics",
      "Custom domains",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For organizations with advanced needs.",
    features: [
      "Everything in Pro",
      "Unlimited API calls",
      "Dedicated support",
      "SLA guarantee",
      "SSO & SAML",
      "Audit logs",
      "Custom contracts",
    ],
    cta: "Contact Sales",
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-20"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p
            className="mt-4 text-base"
            style={{ color: "var(--muted)" }}
          >
            No hidden fees. No surprise charges. Cancel anytime.
          </p>
        </div>

        <div className="grid items-start gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`group rounded-lg border p-8 transition-all duration-200 hover:shadow-md ${
                plan.highlighted ? "sm:scale-105" : ""
              }`}
              style={{
                borderColor: plan.highlighted
                  ? "var(--accent)"
                  : "var(--border)",
                backgroundColor: "var(--bg)",
              }}
            >
              {/* Popular badge */}
              {plan.highlighted && (
                <span
                  className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--bg)",
                  }}
                >
                  Popular
                </span>
              )}

              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p
                className="mt-1 text-sm"
                style={{ color: "var(--muted)" }}
              >
                {plan.description}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span
                  className="text-sm"
                  style={{ color: "var(--muted)" }}
                >
                  {plan.period}
                </span>
              </div>

              <ul className="mt-8 space-y-3" role="list">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm"
                  >
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--accent)" }}
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#signup"
                className="mt-8 block rounded-lg border px-6 py-3 text-center text-sm font-medium transition-colors duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={
                  plan.highlighted
                    ? {
                        backgroundColor: "var(--accent)",
                        color: "var(--bg)",
                        borderColor: "var(--accent)",
                      }
                    : {
                        borderColor: "var(--border)",
                        color: "var(--text)",
                      }
                }
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
