"use client";

import { ArrowRight } from "lucide-react";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#changelog" },
      { label: "Roadmap", href: "#roadmap" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "#docs" },
      { label: "API Reference", href: "#api" },
      { label: "Guides", href: "#guides" },
      { label: "Community", href: "#community" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
      { label: "Security", href: "#security" },
      { label: "GDPR", href: "#gdpr" },
    ],
  },
];

export default function CtaFooter() {
  return (
    <>
      {/* CTA Section */}
      <section
        className="py-24"
        style={{
          backgroundColor: "var(--text)",
          color: "var(--bg)",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: "var(--bg)" }}
            >
              Ready to start building?
            </h2>
            <p
              className="mt-4 text-base"
              style={{ color: "var(--bg)", opacity: 0.7 }}
            >
              Join thousands of teams already shipping faster. Free to start,
              no credit card required.
            </p>
            <a
              href="#signup"
              className="mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-medium transition-colors duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                backgroundColor: "var(--bg)",
                color: "var(--text)",
              }}
            >
              Get Started Free
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-16"
        style={{
          backgroundColor: "var(--text)",
          color: "var(--bg)",
          borderTop: "1px solid",
          borderColor: "color-mix(in srgb, var(--bg) 15%, transparent)",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <span
                className="text-lg font-bold"
                style={{ color: "var(--bg)" }}
              >
                Logo
              </span>
              <p
                className="mt-3 text-sm"
                style={{ color: "var(--bg)", opacity: 0.6 }}
              >
                The modern toolkit for shipping products faster.
              </p>
            </div>

            {/* Link columns */}
            {footerLinks.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <h4
                  className="mb-4 text-sm font-semibold"
                  style={{ color: "var(--bg)", opacity: 0.8 }}
                >
                  {group.heading}
                </h4>
                <ul className="space-y-2" role="list">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm transition-colors duration-150 hover:opacity-100"
                        style={{ color: "var(--bg)", opacity: 0.5 }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="mt-12 border-t pt-8"
            style={{
              borderColor: "color-mix(in srgb, var(--bg) 15%, transparent)",
            }}
          >
            <p
              className="text-center text-sm"
              style={{ color: "var(--bg)", opacity: 0.4 }}
            >
              &copy; {new Date().getFullYear()} YourCompany. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
