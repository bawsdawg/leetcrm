"use client";

import { cn } from "@/lib/utils";

/**
 * Focused centered card chrome for sign-in flows.
 */
export function AuthCard({ title, subtitle, children, className }) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8">
      <header>
        <h1 data-heading="compact" className="text-fg">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 text-sm text-fg-muted">{subtitle}</p>
        ) : null}
      </header>
      <section
        className={cn(
          "rounded-2xl border border-border bg-surface-card p-8 shadow-inset-card-strong",
          className,
        )}
      >
        {children}
      </section>
    </div>
  );
}
