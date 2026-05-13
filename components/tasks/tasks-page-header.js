"use client";

import { PulseIconDownload } from "@/components/pulse/pulse-icons";
import { TASKS, TEAM } from "@/lib/crm/static-data";
import {
  TASK_DEMO_REF_DATE,
  TASK_DEMO_USER_ID,
  taskIsDone,
  taskIsOverdue,
} from "@/lib/crm/task-utils";

export function TasksPageHeader() {
  const openCount = TASKS.filter((t) => !taskIsDone(t.status)).length;
  const overdueCount = TASKS.filter((t) => taskIsOverdue(t)).length;
  const meName = TEAM.find((m) => m.id === TASK_DEMO_USER_ID)?.name ?? TASK_DEMO_USER_ID;

  return (
    <header className="flex flex-col gap-4 border-b border-border/70 pb-6 md:flex-row md:items-start md:justify-between">
      <div className="min-w-0">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">
          Arbejdsliste
        </p>
        <h1 className="font-sans text-[22px] font-semibold tracking-tight text-fg md:text-[22px]">
          Opgaver
        </h1>
        <p className="mt-1 max-w-prose font-sans text-[13px] leading-snug text-fg-muted">
          {TASKS.length} registrerede opgaver · {openCount} åbne · {overdueCount} overskridet vs.{" "}
          <span className="font-mono tabular-nums text-fg-quiet">{TASK_DEMO_REF_DATE}</span>
          {" · "}
          <span className="text-fg-quiet">Mine</span>
          {": "}
          <span className="text-fg">{meName}</span>
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
