import {
  formatReportPeriodLabel,
  formatReportPeriodSubtitle,
  normalizeReportPeriod,
} from "@/lib/crm/report-period";
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
import { CLIENTS, NPS_AGENCY_TREND_BASE, NPS_LAST_ROUND, NPS_TEMPLATES, NPS_UPCOMING_SENDS, TEAM } from "@/lib/crm/static-data";
import { TASK_DEMO_USER_ID } from "@/lib/crm/task-utils";

/**
 * @param {{ year?: number; month?: number }} [opts]
 */
export function getNpsDemoBundle(opts = {}) {
  const period = normalizeReportPeriod({ year: opts.year, month: opts.month });
  const clientList = CLIENTS;

  const avgLatest = npsAgencyAverageLatest(clientList);
  const buckets = npsLatestDistributionBuckets(clientList);
  const withData = buckets.withData > 0 ? buckets.withData : 1;
  const promoterRatio = buckets.promoters / withData;
  const passiveRatio = buckets.passive / withData;
  const detractorRatio = buckets.detractors / withData;
  const rr =
    NPS_LAST_ROUND.invitations > 0 ? NPS_LAST_ROUND.responses / NPS_LAST_ROUND.invitations : 0;
  const trend = npsMergeTrendSeries(NPS_AGENCY_TREND_BASE, avgLatest);

  return {
    source: "demo",
    reportPeriod: { year: period.year, month: period.month },
    reportPeriodLabel: formatReportPeriodLabel(period.year, period.month),
    reportPeriodSubtitle: formatReportPeriodSubtitle(period.year, period.month),
    avgLatest,
    avgPrev: npsAgencyAveragePrevious(clientList),
    measured: npsActiveClientsMeasured(clientList).length,
    rollupTotal: npsDashboardClients(clientList).length,
    distribution: buckets,
    promoterRatio,
    passiveRatio,
    detractorRatio,
    responseRate: rr,
    lastRound: {
      invitations: NPS_LAST_ROUND.invitations,
      responses: NPS_LAST_ROUND.responses,
      medianHoursToRespond: NPS_LAST_ROUND.medianHoursToRespond,
    },
    lastRoundCaptionDemo: true,
    trend,
    pulseAlerts: npsSmartAlertsFiltered(),
    atRisk: npsAtRiskLatestCount(clientList),
    improving: npsImprovingClientsCount(2, clientList),
    clients: npsDashboardClients(clientList),
    templates: NPS_TEMPLATES,
    upcomingSends: NPS_UPCOMING_SENDS,
    mineLabel: TEAM.find((m) => m.id === TASK_DEMO_USER_ID)?.name ?? null,
  };
}
