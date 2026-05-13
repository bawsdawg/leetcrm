import { PulseKpiCard } from "@/components/pulse/pulse-kpi-card";
import { PulseClientsPanel } from "@/components/pulse/pulse-clients-panel";
import { PulseHealthDistribution } from "@/components/pulse/pulse-health-distribution";
import { PulsePageHeader } from "@/components/pulse/pulse-page-header";
import { PulseProfitabilityChart } from "@/components/pulse/pulse-profitability-chart";
import { PulseSmartAlertsCard } from "@/components/pulse/pulse-smart-alerts-card";
import { PulseUtilTrendChart } from "@/components/pulse/pulse-util-trend-chart";
import { shellMainStudio } from "@/config/shell";
import { formatCurrencyCompact, formatPercent } from "@/lib/crm/format-da";
import {
  PULSE_KPI_SPARK_MARGIN,
  PULSE_KPI_SPARK_MRR,
  PULSE_KPI_SPARK_OVERHEAD,
  PULSE_KPI_SPARK_UTIL,
} from "@/lib/crm/pulse-fixtures";
import { AGENCY_METRICS } from "@/lib/crm/static-data";
import { cn } from "@/lib/utils";

export const metadata = { title: "Agency Pulse · 1337-crm by Searchmind" };

export default function PulsePage() {
  const m = AGENCY_METRICS;
  const mrrDelta = (m.retainerMRR - m.retainerMRRPrev) / m.retainerMRRPrev;
  const utilDelta = m.utilisation - m.utilisationPrev;
  const overheadDelta = m.overheadPct - m.overheadPctPrev;
  const marginDelta = m.avgMargin - m.avgMarginPrev;

  return (
    <main className={cn(shellMainStudio)}>
      <PulsePageHeader />

      <section className="grid gap-[length:var(--ds-studio-stack)] sm:grid-cols-2 xl:grid-cols-4">
        <PulseKpiCard
          label="Retainer MRR"
          value={formatCurrencyCompact(m.retainerMRR)}
          delta={mrrDelta}
          sparkData={PULSE_KPI_SPARK_MRR}
          tone="brand"
        />
        <PulseKpiCard
          label="Udnyttelse"
          value={formatPercent(m.utilisation)}
          delta={utilDelta}
          deltaFormat={(v) => formatPercent(v)}
          sparkData={PULSE_KPI_SPARK_UTIL}
          tone="ok"
        />
        <PulseKpiCard
          label="Overhead-tid"
          value={formatPercent(m.overheadPct)}
          delta={overheadDelta}
          deltaFormat={(v) => formatPercent(v)}
          deltaInvert
          sparkData={PULSE_KPI_SPARK_OVERHEAD}
          tone="warn"
        />
        <PulseKpiCard
          label="Gns. margin"
          value={formatPercent(m.avgMargin)}
          delta={marginDelta}
          deltaFormat={(v) => formatPercent(v)}
          sparkData={PULSE_KPI_SPARK_MARGIN}
          tone="ok"
        />
      </section>

      <div className="grid gap-[length:var(--ds-studio-stack)] lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <PulseProfitabilityChart />
        <PulseSmartAlertsCard />
      </div>

      <div className="grid gap-[length:var(--ds-studio-stack)] lg:grid-cols-2">
        <PulseHealthDistribution />
        <PulseUtilTrendChart />
      </div>

      <PulseClientsPanel />

      <p className="font-sans text-[12px] text-fg-quiet">
        Demo-data fra <code className="font-mono text-[11px] text-fg-muted">lib/crm/static-data.js</code> —
        udskiftes senere med MongoDB via Mongoose-modellerne.
      </p>
    </main>
  );
}
