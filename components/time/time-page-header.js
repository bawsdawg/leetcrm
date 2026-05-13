"use client";

import { useState } from "react";

import { useTimerModal } from "@/components/crm/timer-modal-context";
import { IconClock } from "@/components/crm/icons";
import { PulseIconDownload } from "@/components/pulse/pulse-icons";
import { PulseSegmentedControl } from "@/components/pulse/pulse-segmented-control";
import { TASK_DEMO_REF_DATE, TASK_DEMO_USER_ID } from "@/lib/crm/task-utils";
import { TEAM } from "@/lib/crm/static-data";

export function TimePageHeader() {
  const [period, setPeriod] = useState("week");
  const { openTimer, open: timerModalOpen } = useTimerModal();
  const meName = TEAM.find((m) => m.id === TASK_DEMO_USER_ID)?.name ?? "Medarbejder";

  return (
    <div className="flex flex-col gap-3">
      <header className="flex flex-col gap-4 border-b border-border/70 pb-6 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">
            <IconClock size={14} className="text-agency-brand" aria-hidden />
            Arbejdstid
          </p>
          <h1 className="font-sans text-[22px] font-semibold tracking-tight text-fg md:text-[22px]">
            Tidsregistrering
          </h1>
          <p className="mt-1 max-w-prose font-sans text-[13px] leading-snug text-fg-muted">
            Ugereolen, daglige mål og stempler — mock ref-dato{" "}
            <span className="font-mono tabular-nums text-fg-quiet">{TASK_DEMO_REF_DATE}</span>
            {" · "}
            Ses som <span className="font-semibold text-fg">{meName}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={openTimer}
            aria-haspopup="dialog"
            aria-expanded={timerModalOpen}
            className="inline-flex h-[26px] items-center rounded-md border border-agency-brand-border bg-agency-brand px-3 font-sans text-[11px] font-semibold text-white transition-colors hover:bg-agency-brand/90"
          >
            Timer
          </button>
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

      {period !== "week" ? (
        <p className="rounded-xl border border-border-soft bg-surface-muted/50 px-3 py-2.5 font-sans text-[12px] leading-snug text-fg-muted">
          <span className="font-medium text-fg">
            {period === "month" ? "Måneds" : "Kvartals"}
          </span>
          -rapport og godkendelsesflow findes i fuld Agency OS — her vises kun{" "}
          <span className="font-medium text-fg">ugereolen</span> og dagens stempler i demo.
        </p>
      ) : null}
    </div>
  );
}
