import { PulseKpiCard } from "@/components/pulse/pulse-kpi-card";
import { contractNeedsRenewalSoon } from "@/lib/crm/contract-utils";
import { formatCurrencyCompact } from "@/lib/crm/format-da";

/**
 * @param {{
 *   contracts: Array<{
 *     accountStatus: string;
 *     renewalAt: string;
 *     monthlyValue: number;
 *     currency: string;
 *   }>;
 *   summary?: {
 *     total: number;
 *     activeCount: number;
 *     mrrOverlapActiveDkk: number;
 *     renewalSoonCount: number;
 *   } | null;
 *   renewalReferenceIso: string;
 * }} props
 */
export function ContractsSummaryStrip({ contracts = [], summary = null, renewalReferenceIso }) {
  const renewalSoon =
    summary?.renewalSoonCount ??
    contracts.filter((c) => contractNeedsRenewalSoon(c, 90, renewalReferenceIso)).length;

  const total = summary?.total ?? contracts.length;
  const activeCount =
    summary?.activeCount ?? contracts.filter((c) => c.accountStatus === "active").length;

  const mrrOverlap =
    summary?.mrrOverlapActiveDkk ??
    contracts.reduce((sum, c) => {
      if (c.accountStatus !== "active" || c.currency !== "DKK") return sum;
      return sum + c.monthlyValue;
    }, 0);

  return (
    <section className="grid gap-[length:var(--ds-studio-stack)] sm:grid-cols-2 xl:grid-cols-4">
      <PulseKpiCard label="Kontrakter i alt" value={String(total)} tone="brand" />
      <PulseKpiCard label="Aktive aftaler" value={String(activeCount)} tone="ok" />
      <PulseKpiCard
        label="MRR — valgt md. (aktive)"
        value={formatCurrencyCompact(mrrOverlap)}
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
