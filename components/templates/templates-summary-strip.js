import { PulseKpiCard } from "@/components/pulse/pulse-kpi-card";
import { DEPARTMENTS, TASK_TEMPLATES } from "@/lib/crm/static-data";

export function TemplatesSummaryStrip() {
  const active = TASK_TEMPLATES.filter((t) => t.active);
  const deptsHit = new Set(TASK_TEMPLATES.map((t) => t.dept)).size;
  const provisions = TASK_TEMPLATES.reduce((s, t) => s + t.usedCount, 0);

  return (
    <section className="grid gap-[length:var(--ds-studio-stack)] sm:grid-cols-2 xl:grid-cols-4">
      <PulseKpiCard label="Skabeloner i alt" value={String(TASK_TEMPLATES.length)} tone="brand" />
      <PulseKpiCard label="Aktive" value={String(active.length)} tone="ok" />
      <PulseKpiCard
        label="Discipliner repræsenteret"
        value={`${deptsHit} / ${DEPARTMENTS.length}`}
        tone={deptsHit >= DEPARTMENTS.length ? "ok" : "warn"}
      />
      <PulseKpiCard
        label="Mock provisioneringer (Σ brug)"
        value={String(provisions)}
        tone="brand"
      />
    </section>
  );
}
