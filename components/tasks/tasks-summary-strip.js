import { PulseKpiCard } from "@/components/pulse/pulse-kpi-card";

/**
 * @param {{
 *   summary: {
 *     total: number;
 *     openCount: number;
 *     overdueCount: number;
 *     mineCount: number;
 *     highOpen: number;
 *   };
 * }} props
 */
export function TasksSummaryStrip({ summary }) {
  return (
    <section className="grid gap-[length:var(--ds-studio-stack)] sm:grid-cols-2 xl:grid-cols-4">
      <PulseKpiCard label="Opgaver i alt" value={String(summary.total)} tone="brand" />
      <PulseKpiCard label="Åbne" value={String(summary.openCount)} tone="ok" />
      <PulseKpiCard
        label="Overskredet"
        value={String(summary.overdueCount)}
        tone={summary.overdueCount > 0 ? "bad" : "ok"}
      />
      <PulseKpiCard
        label="Høj prio (åbne)"
        value={String(summary.highOpen)}
        tone={summary.highOpen > 0 ? "warn" : "ok"}
      />
    </section>
  );
}
