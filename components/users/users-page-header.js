"use client";

import { IconShield } from "@/components/crm/icons";
import { PulseIconDownload } from "@/components/pulse/pulse-icons";
import { PulseSegmentedControl } from "@/components/pulse/pulse-segmented-control";
import { TEAM } from "@/lib/crm/static-data";
import { TASK_DEMO_REF_DATE, TASK_DEMO_USER_ID } from "@/lib/crm/task-utils";
import { useState } from "react";

export function UsersPageHeader() {
  const [view, setView] = useState("all");
  const meName = TEAM.find((m) => m.id === TASK_DEMO_USER_ID)?.name ?? "Medarbejder";

  return (
    <div className="flex flex-col gap-3">
      <header className="flex flex-col gap-4 border-b border-border/70 pb-6 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">
            <IconShield size={14} className="text-agency-brand" aria-hidden />
            Adgang & invitationskø
          </p>
          <h1 className="font-sans text-[22px] font-semibold tracking-tight text-fg md:text-[22px]">Brugerstyring</h1>
          <p className="mt-1 max-w-prose font-sans text-[13px] leading-snug text-fg-muted">
            Provisionering, roller (mock) og kobling til team-roster — demo-liste udskiftes med Mongo{" "}
            <code className="font-mono text-[11px] text-fg-quiet">User</code>{" "}
            <span className="text-fg-quiet">(email, accessTier, caps).</span> Session som{" "}
            <span className="font-semibold text-fg">{meName}</span>. Ref.{" "}
            <span className="font-mono tabular-nums text-fg-quiet">{TASK_DEMO_REF_DATE}</span>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <PulseSegmentedControl
            size="sm"
            active={view}
            onChange={setView}
            tabs={[
              { id: "all", label: "Alle konti" },
              { id: "security", label: "Sikkerhed" },
            ]}
          />
          <button
            type="button"
            className="inline-flex h-[26px] items-center gap-1.5 rounded-md border border-border bg-surface-muted px-3 font-sans text-[11px] font-medium text-fg-muted transition-colors hover:border-agency-brand-border hover:bg-agency-brand-soft hover:text-agency-brand"
          >
            <PulseIconDownload size={12} /> Audit log
          </button>
          <button
            type="button"
            className="inline-flex h-[26px] items-center rounded-md border border-agency-brand-border bg-agency-brand-soft px-3 font-sans text-[11px] font-medium text-agency-brand transition-colors hover:bg-agency-brand/15"
          >
            Inviter bruger
          </button>
        </div>
      </header>

      {view !== "all" ? (
        <p className="rounded-xl border border-border-soft bg-surface-muted/50 px-3 py-2.5 font-sans text-[12px] leading-snug text-fg-muted">
          <span className="font-medium text-fg">Sikkerhedsvisning</span> — policy-tjek og MFA-drift i fuld Agency OS;
          demo viser ingen ekstra kolonner.
        </p>
      ) : null}
    </div>
  );
}
