import { PulseKpiCard } from "@/components/pulse/pulse-kpi-card";
import { contractNeedsRenewalSoon } from "@/lib/crm/contract-utils";
import { formatCurrencyCompact } from "@/lib/crm/format-da";
import { CONTRACTS } from "@/lib/crm/static-data";

export function ContractsSummaryStrip() {
  const activeRows = CONTRACTS.filter((c) => c.accountStatus === "active");
  const activeMrrDkk = activeRows.reduce((sum, c) => sum + (c.currency === "DKK" ? c.monthlyValue : 0), 0);
  const renewalSoon = CONTRACTS.filter((c) => contractNeedsRenewalSoon(c)).length;

  return (
    <section className="grid gap-[length:var(--ds-studio-stack)] sm:grid-cols-2 xl:grid-cols-4">
      <PulseKpiCard label="Kontrakter i alt" value={String(CONTRACTS.length)} tone="brand" />
      <PulseKpiCard label="Aktive aftaler" value={String(activeRows.length)} tone="ok" />
      <PulseKpiCard
        label="MRR (aktive, DKK)"
        value={formatCurrencyCompact(activeMrrDkk)}
        tone="brand"
      />
      <PulseKpiCard
        label="Fornyelse ≤90 d"
        value={String(renewalSoon)}
        tone={renewalSoon > 0 ? "warn" : "ok"}
      />
    </section>
  );
}
