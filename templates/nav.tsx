"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "#docs" },
    { label: "Blog", href: "#blog" },
  ];

  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        backgroundColor: "color-mix(in srgb, var(--bg) 80%, transparent)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="text-lg font-bold"
            style={{ color: "var(--text)" }}
          >
            Logo
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 sm:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-colors duration-150 hover:opacity-80"
                style={{ color: "var(--muted)" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              className="rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--bg)",
                ringColor: "var(--accent)",
              }}
            >
              Get Started
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden rounded-lg p-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ color: "var(--text)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="border-t pb-4 pt-2 sm:hidden"
            style={{ borderColor: "var(--border)" }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 hover:opacity-80"
                style={{ color: "var(--muted)" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              className="mt-2 block rounded-lg px-3 py-2 text-center text-sm font-medium transition-colors duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--bg)",
              }}
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
