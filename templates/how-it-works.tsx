"use client";

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Connect your tools",
    description:
      "Link your existing stack in a few clicks. We support 50+ integrations out of the box with OAuth and API key auth.",
  },
  {
    number: "02",
    title: "Configure your workflow",
    description:
      "Use the visual builder or write code to define triggers, conditions, and actions. Test everything in sandbox before going live.",
  },
  {
    number: "03",
    title: "Ship with confidence",
    description:
      "Deploy to production with one click. Monitor performance, catch errors early, and iterate based on real user data.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Up and running in 3 steps
          </h2>
          <p
            className="mt-4 text-base"
            style={{ color: "var(--muted)" }}
          >
            No lengthy onboarding. No week-long setup. Just results.
          </p>
        </div>

        <div className="relative grid gap-8 sm:grid-cols-3">
          {/* Connecting line (desktop only) */}
          <div
            className="absolute left-0 right-0 top-10 hidden h-px sm:block"
            style={{ backgroundColor: "var(--border)" }}
            aria-hidden="true"
          />

          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              {/* Step number */}
              <div
                className="relative z-10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold"
                style={{
                  backgroundColor: "var(--subtle-bg)",
                  color: "var(--accent)",
                  border: "2px solid var(--border)",
                }}
              >
                {step.number}
              </div>

              <h3 className="mb-3 text-lg font-semibold">{step.title}</h3>
              <p
                className="mx-auto max-w-xs text-base leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
