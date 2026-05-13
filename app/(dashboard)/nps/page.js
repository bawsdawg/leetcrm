import { NpsCampaignQueueCard } from "@/components/nps/nps-campaign-queue-card";
import { NpsClientsDirectory } from "@/components/nps/nps-clients-directory";
import { NpsInsightsCard } from "@/components/nps/nps-insights-card";
import { NpsPageHeader } from "@/components/nps/nps-page-header";
import { NpsPlaybookCard } from "@/components/nps/nps-playbook-card";
import { NpsSummaryStrip } from "@/components/nps/nps-summary-strip";
import { NpsTemplatesDirectory } from "@/components/nps/nps-templates-directory";
import { NpsTrendAndDistributionCard } from "@/components/nps/nps-trend-distribution-card";
import { shellMainStudio } from "@/config/shell";
import { NPS_AGENCY_TREND_BASE, NPS_LAST_ROUND } from "@/lib/crm/static-data";
import {
  npsActiveClientsMeasured,
  npsAgencyAverageLatest,
  npsAgencyAveragePrevious,
  npsAtRiskLatestCount,
  npsDashboardClients,
  npsImprovingClientsCount,
  npsLatestDistributionBuckets,
  npsMergeTrendSeries,
  npsSmartAlertsFiltered,
} from "@/lib/crm/nps-utils";
import { cn } from "@/lib/utils";

export const metadata = { title: "NPS · 1337-crm by Searchmind" };

export default function NpsPage() {
  const avgLatest = npsAgencyAverageLatest();
  const avgPrev = npsAgencyAveragePrevious();
  const measured = npsActiveClientsMeasured().length;
  const rollupTotal = npsDashboardClients().length;
  const buckets = npsLatestDistributionBuckets();
  const promoterRatio = buckets.withData > 0 ? buckets.promoters / buckets.withData : 0;
  const passiveRatio = buckets.withData > 0 ? buckets.passive / buckets.withData : 0;
  const detractorRatio = buckets.withData > 0 ? buckets.detractors / buckets.withData : 0;
  const rr = NPS_LAST_ROUND.invitations > 0 ? NPS_LAST_ROUND.responses / NPS_LAST_ROUND.invitations : 0;
  const trend = npsMergeTrendSeries(NPS_AGENCY_TREND_BASE, avgLatest);
  const pulseAlerts = npsSmartAlertsFiltered();

  return (
    <main className={cn(shellMainStudio)}>
      <NpsPageHeader />

      <NpsSummaryStrip
        avgLatest={avgLatest}
        avgPrev={avgPrev}
        measured={measured}
        rollupTotal={rollupTotal}
        atRisk={npsAtRiskLatestCount()}
        improving={npsImprovingClientsCount()}
        promoterRatio={promoterRatio}
        passiveRatio={passiveRatio}
        detractorRatio={detractorRatio}
        responseRate={rr}
        invitations={NPS_LAST_ROUND.invitations}
        responses={NPS_LAST_ROUND.responses}
        medianHoursToRespond={NPS_LAST_ROUND.medianHoursToRespond}
        pulseAlertCount={pulseAlerts.length}
      />

      <NpsTrendAndDistributionCard
        trend={trend}
        promoters={buckets.promoters}
        passive={buckets.passive}
        detractors={buckets.detractors}
        withData={buckets.withData}
      />

      <div className="grid gap-[length:var(--ds-studio-stack)] xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] xl:items-start">
        <NpsCampaignQueueCard />
        <div className="flex min-w-0 flex-col gap-[length:var(--ds-studio-stack)]">
          <NpsInsightsCard alerts={pulseAlerts} />
          <NpsPlaybookCard />
        </div>
      </div>

      <NpsClientsDirectory />

      <NpsTemplatesDirectory />

      <p className="font-sans text-[12px] text-fg-quiet">
        Data: kundernes <code className="font-mono text-[11px] text-fg-muted">npsHistory</code>,{" "}
        <code className="font-mono text-[11px] text-fg-muted">NPS_TEMPLATES</code>,{" "}
        <code className="font-mono text-[11px] text-fg-muted">NPS_UPCOMING_SENDS</code>,{" "}
        <code className="font-mono text-[11px] text-fg-muted">NPS_LAST_ROUND</code>,{" "}
        <code className="font-mono text-[11px] text-fg-muted">SMART_ALERTS</code> — synk til{" "}
        <code className="font-mono text-[11px] text-fg-muted">NpsResponse</code> ved go-live.
      </p>
    </main>
  );
}
