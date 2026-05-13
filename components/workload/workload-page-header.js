"use client";

import { useState } from "react";

import { IconChart } from "@/components/crm/icons";
import { PulseIconDownload } from "@/components/pulse/pulse-icons";
import { PulseSegmentedControl } from "@/components/pulse/pulse-segmented-control";
import { TASK_DEMO_REF_DATE, TASK_DEMO_USER_ID } from "@/lib/crm/task-utils";
import { TEAM } from "@/lib/crm/static-data";

export function WorkloadPageHeader() {
  const [horizon, setHorizon] = useState("month");
  const meName = TEAM.find((m) => m.id === TASK_DEMO_USER_ID)?.name ?? "Medarbejder";

  return (
    <div className="flex flex-col gap-3">
      <header className="flex flex-col gap-4 border-b border-border/70 pb-6 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">
            <IconChart size={14} className="text-agency-brand" aria-hidden />
            Kapacitet & belægning
          </p>
          <h1 className="font-sans text-[22px] font-semibold tracking-tight text-fg md:text-[22px]">
            Workload
          </h1>
          <p className="mt-1 max-w-prose font-sans text-[13px] leading-snug text-fg-muted">
            Disciplin-matrix, team-heat og efterspørgsel fra boardet — effektiv planlægning i Agency OS. Ref.{" "}
            <span className="font-mono tabular-nums text-fg-quiet">{TASK_DEMO_REF_DATE}</span>
            {" · "}
            Visning som <span className="font-semibold text-fg">{meName}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <PulseSegmentedControl
            size="sm"
            active={horizon}
            onChange={setHorizon}
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

      {horizon !== "month" ? (
        <p className="rounded-xl border border-border-soft bg-surface-muted/50 px-3 py-2.5 font-sans text-[12px] leading-snug text-fg-muted">
          <span className="font-medium text-fg">Uge-/kvartals</span> kapacitetsgitter og forecast findes i fuld Agency OS — demo
          harmoniserer KPI&apos;er omkring <span className="font-medium text-fg">månedssnittet</span> (samme som Pulse).
        </p>
      ) : null}
    </div>
  );
}
