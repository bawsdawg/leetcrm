"use client";

import { ReportPeriodPicker } from "@/components/crm/report-period-picker";
import { usePulseData } from "@/components/pulse/pulse-data-context";
import { usePulsePeriod } from "@/components/pulse/pulse-period-context";
import { cn } from "@/lib/utils";

export function PulsePageHeader() {
  const { agencyMetrics: m, period: bundlePeriod } = usePulseData();
  const { year, month, onChange, refreshing, subtitle } = usePulsePeriod();

  return (
    <header className="flex flex-col gap-4 border-b border-border/70 pb-6 md:flex-row md:items-start md:justify-between">
      <div className="min-w-0">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">
          Overblik
        </p>
        <h1 className="font-sans text-[22px] font-semibold tracking-tight text-fg md:text-[22px]">
          Agency Pulse
        </h1>
        <p
          className={cn(
            "mt-1 max-w-prose font-sans text-[13px] leading-snug text-fg-muted transition-opacity",
            refreshing && "opacity-60",
          )}
        >
          <span className="capitalize">{subtitle}</span>
          {" · "}
          {m.activeClients} aktive kunder · {m.billableHoursMonth} billable timer
          {bundlePeriod.isCurrent ? " denne måned" : ` i ${bundlePeriod.label.toLowerCase()}`}
        </p>
      </div>

      <ReportPeriodPicker year={year} month={month} onChange={onChange} />
    </header>
  );
}
