import { PulseKpiCard } from "@/components/pulse/pulse-kpi-card";

/**
 * @param {{
 *   loadIndex: number;
 *   openCount: number;
 *   highCount: number;
 *   overdueCount: number;
 * }} props
 */
export function TeamMemberKpiStrip({ loadIndex, openCount, highCount, overdueCount }) {
  const loadTone =
    loadIndex >= 92 ? "bad" : loadIndex >= 82 ? "warn" : loadIndex >= 70 ? "ok" : "brand";

  return (
    <section className="grid gap-[length:var(--ds-studio-stack)] sm:grid-cols-2 xl:grid-cols-4">
      <PulseKpiCard label="Belægningsindex" value={`${loadIndex}%`} tone={loadTone} />
      <PulseKpiCard label="Åbne opgaver (board)" value={String(openCount)} tone="brand" />
      <PulseKpiCard
        label="Høj prio"
        value={String(highCount)}
        tone={highCount > 1 ? "warn" : "ok"}
      />
      <PulseKpiCard
        label="Overskredne"
        value={String(overdueCount)}
        tone={overdueCount > 0 ? "bad" : "ok"}
      />
    </section>
  );
}
