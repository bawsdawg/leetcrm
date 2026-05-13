"use client";

import { PulseIconDownload } from "@/components/pulse/pulse-icons";
import { CONTRACT_DEMO_REF_DATE, contractNeedsRenewalSoon } from "@/lib/crm/contract-utils";
import { CONTRACTS } from "@/lib/crm/static-data";

export function ContractsPageHeader() {
  const renewalSoon = CONTRACTS.filter((c) => contractNeedsRenewalSoon(c)).length;
  const paused = CONTRACTS.filter((c) => c.accountStatus === "paused").length;

  return (
    <header className="flex flex-col gap-4 border-b border-border/70 pb-6 md:flex-row md:items-start md:justify-between">
      <div className="min-w-0">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">
          Aftaler
        </p>
        <h1 className="font-sans text-[22px] font-semibold tracking-tight text-fg md:text-[22px]">
          Kontrakter
        </h1>
        <p className="mt-1 max-w-prose font-sans text-[13px] leading-snug text-fg-muted">
          {CONTRACTS.length} kontrakter i registeret · Reference{" "}
          <span className="font-mono tabular-nums text-fg-quiet">{CONTRACT_DEMO_REF_DATE}</span>
          {renewalSoon > 0 ? ` · ${renewalSoon} kræver fornyelsesfokus (≤90 d)` : ""}
          {paused > 0 ? ` · ${paused} pauserede` : ""}
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
