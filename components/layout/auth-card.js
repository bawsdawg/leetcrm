"use client";

import { cn } from "@/lib/utils";

/**
 * Focused centered card chrome for login / sign-up flows.
 */
export function AuthCard({ title, subtitle, children, className }) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-6">
      <header>
        <h1 className="text-xl font-medium tracking-tight text-[#f0f0f0]">{title}</h1>
        {subtitle ? (
          <p className="mt-2 text-sm text-[#a1a4a5]">{subtitle}</p>
        ) : null}
      </header>
      <section
        className={cn(
          "rounded-2xl border border-[rgba(214,235,253,0.19)] bg-black p-8",
          "[box-shadow:rgba(176,199,217,0.145)_0px_0px_0px_1px]",
          className,
        )}
      >
        {children}
      </section>
    </div>
  );
}
