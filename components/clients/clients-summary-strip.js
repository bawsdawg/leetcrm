import { PulseKpiCard } from "@/components/pulse/pulse-kpi-card";
import { formatCurrencyCompact } from "@/lib/crm/format-da";
import { CLIENTS } from "@/lib/crm/static-data";

export function ClientsSummaryStrip() {
  const activeClients = CLIENTS.filter((c) => c.status === "active");
  const activeRetainerDkk = activeClients.reduce((sum, c) => sum + (c.currency === "DKK" ? c.retainer : 0), 0);
  const needsAttention = CLIENTS.filter(
    (c) => c.health !== "ok" || c.hoursThisMonth > c.hoursBudget,
  ).length;

  return (
    <section className="grid gap-[length:var(--ds-studio-stack)] sm:grid-cols-2 xl:grid-cols-4">
      <PulseKpiCard label="Kunder i alt" value={String(CLIENTS.length)} tone="brand" />
      <PulseKpiCard label="Aktive konti" value={String(activeClients.length)} tone="ok" />
      <PulseKpiCard
        label="Retainer (aktive, DKK)"
        value={formatCurrencyCompact(activeRetainerDkk)}
        tone="brand"
      />
      <PulseKpiCard
        label="Kræver handling"
        value={String(needsAttention)}
        tone={needsAttention > 0 ? "warn" : "ok"}
      />
    </section>
  );
}
