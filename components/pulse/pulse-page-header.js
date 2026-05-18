"use client";

import { useState } from "react";

import { PulseIconDownload } from "@/components/pulse/pulse-icons";
import { PulseSegmentedControl } from "@/components/pulse/pulse-segmented-control";
import { usePulseData } from "@/components/pulse/pulse-data-context";

export function PulsePageHeader() {
  const [period, setPeriod] = useState("month");
  const { agencyMetrics: m } = usePulseData();

  return (
    <header className="flex flex-col gap-4 border-b border-border/70 pb-6 md:flex-row md:items-start md:justify-between">
      <div className="min-w-0">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">
          Overblik
        </p>
        <h1 className="font-sans text-[22px] font-semibold tracking-tight text-fg md:text-[22px]">
          Agency Pulse
        </h1>
        <p className="mt-1 max-w-prose font-sans text-[13px] leading-snug text-fg-muted">
          April 2026 · {m.activeClients} aktive kunder · {m.billableHoursMonth} billable timer denne
          måned
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <PulseSegmentedControl
          size="sm"
          active={period}
          onChange={setPeriod}
          tabs={[
            { id: "week", label: "Uge" },
            { id: "month", label: "Måned" },
            { id: "quarter", label: "Kvartal" },
          ]}
        />
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
