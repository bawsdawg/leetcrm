import Link from "next/link";

import { routes } from "@/config/routes";
import { site } from "@/config/site";
import { shellPaddingX } from "@/config/shell";
import { cn } from "@/lib/utils";

const primaryLinkClass =
  "inline-flex items-center justify-center rounded-full bg-solid-cta-bg px-7 py-2.5 text-center text-sm font-semibold tracking-tight text-solid-cta-fg transition-colors hover:bg-solid-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const ghostLinkClass =
  "inline-flex items-center justify-center rounded-full border border-border px-7 py-2.5 text-sm font-medium text-fg hover:bg-surface-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className={cn(
        "relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24 md:pt-28",
        shellPaddingX,
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="flex max-w-5xl flex-col gap-8">
          <div className="flex flex-wrap gap-3 gap-y-3 text-[0.6875rem] font-medium uppercase tracking-[0.06em] text-fg-muted">
            <span className="inline-flex rounded-full border border-border-pill px-4 py-1 text-fg/90">
              Agency CRM
            </span>
            <span className="inline-flex rounded-full border border-border-pill px-4 py-1 text-fg/90">
              {site.branding}
            </span>
          </div>
          <div className="flex flex-col gap-6">
            <h1
              id="hero-heading"
              className="text-display-hero font-normal leading-[1] tracking-[-0.035em] text-fg"
            >
              One workspace for clients, delivery, and capacity.
            </h1>
            <p className="max-w-xl font-sans text-xl leading-relaxed text-fg-muted md:text-[1.125rem]">
              Pulse overview, clients and contracts, tasks with reusable templates, time entries, workload by
              discipline, team roster, NPS, and reports — one design-system UI. Sign in with Google; your data lives in
              MongoDB.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link className={primaryLinkClass} href={routes.login}>
            Continue with Google
          </Link>
          <Link className={ghostLinkClass} href={routes.privacy}>
            Read privacy
          </Link>
        </div>
      </div>
    </section>
  );
}
