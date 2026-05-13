import { PulseKpiCard } from "@/components/pulse/pulse-kpi-card";
import { formatHoursDecimalDa, formatMinutesDa } from "@/lib/crm/format-da";

/**
 * @param {{
 *   todayTotalMin: number;
 *   billableMin: number;
 *   internalMin: number;
 *   entryCount: number;
 *   weekLoggedMin: number;
 *   weekGoalMin: number;
 * }} props
 */
export function TimeSummaryStrip({
  todayTotalMin,
  billableMin,
  internalMin,
  entryCount,
  weekLoggedMin,
  weekGoalMin,
}) {
  const weekRatio = weekGoalMin > 0 ? weekLoggedMin / weekGoalMin : 0;
  const weekTone = weekRatio > 1 ? "bad" : weekRatio > 0.92 ? "warn" : weekRatio > 0.7 ? "ok" : "brand";
  const internalShare = todayTotalMin > 0 ? internalMin / todayTotalMin : 0;
  const mixTone = internalShare > 0.25 ? "warn" : "ok";

  const mixValue =
    internalMin <= 0
      ? formatMinutesDa(billableMin)
      : `${formatMinutesDa(billableMin)} · ${formatMinutesDa(internalMin)} intern`;

  return (
    <section className="grid gap-[length:var(--ds-studio-stack)] sm:grid-cols-2 xl:grid-cols-4">
      <PulseKpiCard label="Registreret i dag" value={formatMinutesDa(todayTotalMin)} tone="brand" />
      <PulseKpiCard label="Billable · intern" value={mixValue} tone={mixTone} />
      <PulseKpiCard label="Poster i dag" value={String(entryCount)} tone="ok" />
      <PulseKpiCard
        label="Uge vs. mål (5 × 7,5 t)"
        value={`${formatHoursDecimalDa(weekLoggedMin)} / ${formatHoursDecimalDa(weekGoalMin)}`}
        tone={weekTone}
      />
    </section>
  );
}
