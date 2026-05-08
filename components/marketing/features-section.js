import { shellPaddingX } from "@/config/shell";
import { cn } from "@/lib/utils";

/** Three-column feature grid — frosted cards (DESIGN §4) */

const FEATURES = [
  {
    accent: "bg-accent-blue",
    title: "Google workspace SSO",
    description:
      "Internal users authenticate with 1337-crm’s Google integration. Sessions are JWT-based; user profiles sync to MongoDB on every sign-in.",
  },
  {
    accent: "bg-accent-green",
    title: "Performance-minded defaults",
    description:
      "Server components by default, pragmatic utilities, and hooks when you need isolation on the client.",
  },
  {
    accent: "bg-accent-orange",
    title: "Ready for real billing",
    description:
      "API routes for health, webhooks, and cron are stubbed where your provider keys will land.",
  },
];

export function FeaturesSection() {
  return (
    <section
      aria-labelledby="features-heading"
      className={cn("py-20 sm:py-24 md:py-28", shellPaddingX)}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <div className="max-w-3xl">
          <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.08em] text-fg-soft">
            Product
          </p>
          <h2 id="features-heading" className="mt-3 text-fg">
            What you get on day one.
          </h2>
          <p className="mt-5 max-w-2xl font-sans leading-relaxed text-fg-muted">
            Everything here is designed to read as one system—tone, spacing, and surfaces
            pulled from the same rulebook.
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-3 md:gap-8">
          {FEATURES.map(({ accent, title, description }) => (
            <li
              key={title}
              className="flex flex-col rounded-2xl border border-border bg-surface-card p-8 shadow-inset-card"
            >
              <span
                className={`mb-8 h-1 w-8 rounded-full ${accent} opacity-90`}
                aria-hidden
              />
              <h3 className="text-fg">{title}</h3>
              <p className="mt-4 font-sans text-sm leading-relaxed text-fg-muted">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
