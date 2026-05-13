"use client";

import { useState } from "react";

import { IconSparkle } from "@/components/crm/icons";
import { PulseIconDownload } from "@/components/pulse/pulse-icons";
import { PulseSegmentedControl } from "@/components/pulse/pulse-segmented-control";
import { TASK_DEMO_REF_DATE, TASK_DEMO_USER_ID } from "@/lib/crm/task-utils";
import { TEAM } from "@/lib/crm/static-data";

export function NpsPageHeader() {
  const [horizon, setHorizon] = useState("quarter");
  const meName = TEAM.find((m) => m.id === TASK_DEMO_USER_ID)?.name ?? "Medarbejder";

  return (
    <div className="flex flex-col gap-3">
      <header className="flex flex-col gap-4 border-b border-border/70 pb-6 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">
            <IconSparkle size={14} className="text-agency-brand" aria-hidden />
            Loyalitet & kvalitet
          </p>
          <h1 className="font-sans text-[22px] font-semibold tracking-tight text-fg md:text-[22px]">NPS</h1>
          <p className="mt-1 max-w-prose font-sans text-[13px] leading-snug text-fg-muted">
            Wave-planlægning, skabeloner og bureau-trend ud fra kunders NPS‑historik (0–100 score i demo). Reference{" "}
            <span className="font-mono tabular-nums text-fg-quiet">{TASK_DEMO_REF_DATE}</span>
            {" · "}
            Arbejder som <span className="font-semibold text-fg">{meName}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <PulseSegmentedControl
            size="sm"
            active={horizon}
            onChange={setHorizon}
            tabs={[
              { id: "month", label: "Måned" },
              { id: "quarter", label: "Kvartal" },
              { id: "year", label: "År" },
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

      {horizon !== "quarter" ? (
        <p className="rounded-xl border border-border-soft bg-surface-muted/50 px-3 py-2.5 font-sans text-[12px] leading-snug text-fg-muted">
          <span className="font-medium text-fg">Måned/år</span> viser fuld drill-down i produktion — demo-data er
          harmoniseret omkring <span className="font-medium text-fg">kvartalet</span> som standard.
        </p>
      ) : null}
    </div>
  );
}
