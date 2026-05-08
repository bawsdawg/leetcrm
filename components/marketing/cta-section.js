import Link from "next/link";

import { routes } from "@/config/routes";
import { shellPaddingX } from "@/config/shell";
import { cn } from "@/lib/utils";

export function CtaSection() {
  return (
    <section aria-labelledby="cta-heading" className={cn("pb-24 pt-4 sm:pb-28 md:pb-32", shellPaddingX)}>
      <div
        className={cn(
          "relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-cta-panel px-10 py-16 sm:px-14 md:py-20 shadow-inset-cta",
        )}
      >
        <div className="flex max-w-xl flex-col gap-6">
          <h2 id="cta-heading" className="text-fg">
            Start from a canvas that already feels finished.
          </h2>
          <p className="font-sans leading-relaxed text-fg-muted">
            Authenticate with your Searchmind Google account, land in the dashboard, and
            iterate with the same frosted UI system everywhere.
          </p>
          <Link
            className="mt-4 inline-flex w-fit items-center justify-center rounded-full bg-solid-cta-bg px-8 py-2.5 text-sm font-semibold text-solid-cta-fg transition-colors hover:bg-solid-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            href={routes.login}
          >
            Go to sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
