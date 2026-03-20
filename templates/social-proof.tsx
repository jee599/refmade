"use client";

const logos = [
  { name: "Acme Corp", width: 120 },
  { name: "Globex", width: 100 },
  { name: "Initech", width: 110 },
  { name: "Hooli", width: 90 },
  { name: "Pied Piper", width: 130 },
  { name: "Stark Industries", width: 140 },
];

export default function SocialProof() {
  return (
    <section
      className="py-12"
      style={{
        backgroundColor: "var(--subtle-bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p
          className="mb-8 text-center text-sm font-medium uppercase tracking-wider"
          style={{ color: "var(--muted)" }}
        >
          Trusted by teams at
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center opacity-60 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0"
              style={{ color: "var(--muted)" }}
            >
              {/* Replace with actual logo images */}
              <span
                className="text-lg font-semibold"
                style={{ color: "var(--muted)" }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
