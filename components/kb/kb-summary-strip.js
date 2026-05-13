import { PulseKpiCard } from "@/components/pulse/pulse-kpi-card";
import { formatIsoDateDa } from "@/lib/crm/format-da";

/**
 * @param {{
 *   totalPublished: number;
 *   drafts: number;
 *   categoriesUsed: number;
 *   tagCount: number;
 *   lastUpdatedIso: string | null;
 * }} props
 */
export function KbSummaryStrip({ totalPublished, drafts, categoriesUsed, tagCount, lastUpdatedIso }) {
  return (
    <section className="grid gap-[length:var(--ds-studio-stack)] sm:grid-cols-2 xl:grid-cols-5">
      <PulseKpiCard label="Publicerede artikler" value={String(totalPublished)} tone="brand" />
      <PulseKpiCard label="Kladder" value={String(drafts)} tone={drafts > 0 ? "warn" : "ok"} />
      <PulseKpiCard label="Aktive kategorier" value={String(categoriesUsed)} tone="ok" />
      <PulseKpiCard label="Unikke tags" value={String(tagCount)} tone="ok" />
      <PulseKpiCard label="Senest opdateret" value={formatIsoDateDa(lastUpdatedIso ?? "")} tone="ok" />
    </section>
  );
}
