"use client";

import {
  PulseIconDownload,
  PulseIconSparkle,
} from "@/components/pulse/pulse-icons";
import { TASK_TEMPLATES } from "@/lib/crm/static-data";

export function TemplatesPageHeader() {
  const active = TASK_TEMPLATES.filter((t) => t.active).length;

  return (
    <header className="flex flex-col gap-4 border-b border-border/70 pb-6 md:flex-row md:items-start md:justify-between">
      <div className="min-w-0">
        <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">
          <PulseIconSparkle size={13} className="text-agency-brand" aria-hidden /> Bibliotek
        </p>
        <h1 className="font-sans text-[22px] font-semibold tracking-tight text-fg md:text-[22px]">
          Task templates
        </h1>
        <p className="mt-1 max-w-prose font-sans text-[13px] leading-snug text-fg-muted">
          {TASK_TEMPLATES.length} skabeloner · {active} aktive · Provisionering fra aftale-scope (mock —
          erstattes med TaskTemplate API).
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="inline-flex h-[26px] items-center gap-1.5 rounded-md border border-agency-brand-border bg-agency-brand-soft px-3 font-sans text-[11px] font-medium text-agency-brand transition-colors hover:bg-agency-brand/15"
        >
          <PulseIconSparkle size={12} /> Ny skabelon
        </button>
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
