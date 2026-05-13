"use client";

import { PulseIconDownload } from "@/components/pulse/pulse-icons";
import { CLIENTS } from "@/lib/crm/static-data";

export function ClientsPageHeader() {
  const unhealthy = CLIENTS.filter((c) => c.health !== "ok").length;
  const overBudget = CLIENTS.filter((c) => c.hoursThisMonth > c.hoursBudget).length;

  return (
    <header className="flex flex-col gap-4 border-b border-border/70 pb-6 md:flex-row md:items-start md:justify-between">
      <div className="min-w-0">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">
          Portefølje
        </p>
        <h1 className="font-sans text-[22px] font-semibold tracking-tight text-fg md:text-[22px]">
          Kunder
        </h1>
        <p className="mt-1 max-w-prose font-sans text-[13px] leading-snug text-fg-muted">
          {CLIENTS.length} kunder i porteføljen
          {unhealthy > 0 ? ` · ${unhealthy} med sundhedsadvarsler` : ""}
          {overBudget > 0 ? ` · ${overBudget} over timebudget` : ""}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="inline-flex h-[26px] items-center gap-1.5 rounded-md border border-border bg-surface-muted px-3 font-sans text-[11px] font-medium text-fg-muted transition-colors hover:border-agency-brand-border hover:bg-agency-brand-soft hover:text-agency-brand"
        >
          <PulseIconDownload size={12} /> Eksport
        </button>
      </div>
    </header>
  );
}
