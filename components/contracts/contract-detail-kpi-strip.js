import { PulseKpiCard } from "@/components/pulse/pulse-kpi-card";
import { contractDaysUntilRenewal, CONTRACT_DEMO_REF_DATE } from "@/lib/crm/contract-utils";
import { formatCurrencyCompact } from "@/lib/crm/format-da";

/**
 * @param {{ contract: import('@/lib/crm/static-data').CONTRACTS[number] }} props
 */
export function ContractDetailKpiStrip({ contract }) {
  const days =
    contract.accountStatus === "active"
      ? contractDaysUntilRenewal(contract.renewalAt)
      : null;

  const renewalTone =
    contract.accountStatus !== "active"
      ? "brand"
      : days === null || !Number.isFinite(days)
        ? "brand"
        : days < 0
          ? "bad"
          : days <= 30
            ? "warn"
            : "ok";

  const renewalValue =
    contract.accountStatus !== "active"
      ? "Ikke aktiv konto"
      : days === null
        ? "—"
        : days < 0
          ? `${days} d (overskredet)`
          : days === 0
            ? "I dag"
            : `${days} d`;

  return (
    <section className="grid gap-[length:var(--ds-studio-stack)] sm:grid-cols-2 xl:grid-cols-4">
      <PulseKpiCard
        label="Aftalt beløb / md"
        value={formatCurrencyCompact(contract.monthlyValue, contract.currency)}
        tone="brand"
      />
      <PulseKpiCard label="Fornyelse (fra ref.)" value={renewalValue} tone={renewalTone} />
      <PulseKpiCard
        label="Opsigelsesvarsling"
        value={`${contract.noticeDays} d`}
        tone="warn"
      />
      <PulseKpiCard label="Mock-reference" value={CONTRACT_DEMO_REF_DATE} tone="ok" />
    </section>
  );
}
