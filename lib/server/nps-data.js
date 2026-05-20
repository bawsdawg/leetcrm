import {
  formatReportPeriodLabel,
  formatReportPeriodSubtitle,
  lastCalendarDayIsoOfReportMonth,
  normalizeReportPeriod,
  startOfReportMonth,
} from "@/lib/crm/report-period";
import { NPS_AGENCY_TREND_BASE } from "@/lib/crm/static-data";
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
import Client from "@/lib/db/models/client";
import NpsCampaign from "@/lib/db/models/nps-campaign";
import NpsResponse from "@/lib/db/models/nps-response";
import NpsTemplate from "@/lib/db/models/nps-template";
import TeamMember from "@/lib/db/models/team-member";
import { connectDb } from "@/lib/db/mongoose";
import { normalizeNpsDisplayScore } from "@/lib/server/client-detail-data";
import { assigneeMemberKeyForDbUser } from "@/lib/server/session-team-member";
import { buildIsTestQuery } from "@/lib/server/test-data-filter";

/** @param {Record<string, unknown>[]} clauses */
function andQuery(...clauses) {
  const parts = clauses.filter((c) => c && typeof c === "object" && Object.keys(c).length > 0);
  if (!parts.length) return {};
  if (parts.length === 1) return /** @type {Record<string, unknown>} */ (parts[0]);
  return { $and: parts };
}

/** @param {Date | string | undefined | null} d */
function toIsoDateOnly(d) {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(String(d));
  if (Number.isNaN(date.getTime())) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * @param {number[]} xs
 */
function median(xs) {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

/**
 * @param {{ includeTest?: boolean; year?: number; month?: number; session?: unknown }} opts
 */
export async function fetchNpsPortfolio(opts = {}) {
  await connectDb();
  const scope = /** @type {Record<string, unknown>} */ (buildIsTestQuery(Boolean(opts.includeTest) ? "all" : "production"));

  const period = normalizeReportPeriod({ year: opts.year, month: opts.month });
  const monthStart = startOfReportMonth(period.year, period.month);
  const monthLastIso = lastCalendarDayIsoOfReportMonth(period.year, period.month);
  const monthEnd = new Date(`${monthLastIso}T23:59:59.999Z`);

  const clientDocsRaw = await Client.find(
    /** @type {Record<string, unknown>} */ (
      andQuery(scope, { status: { $in: ["active", "paused"] } })
    ),
  )
    .sort({ name: 1 })
    .lean();

  /** @type {Record<string, unknown>[]} */
  const clientDocs = Array.isArray(clientDocsRaw) ? /** @type {Record<string, unknown>[]} */ (clientDocsRaw) : [];

  const clientOids = clientDocs.map((d) => d._id).filter((x) => x != null);

  const allResponses =
    clientOids.length > 0 ?
      await NpsResponse.find({ clientId: { $in: clientOids } })
        .sort({ respondedAt: -1 })
        .limit(2000)
        .lean()
    : [];

  /** @type {Map<string, Record<string, unknown>[]>} */
  const byClient = new Map();
  for (let ri = 0; ri < allResponses.length; ri += 1) {
    const r = /** @type {Record<string, unknown>} */ (allResponses[ri]);
    const cid = r.clientId != null ? String(r.clientId) : "";
    if (!cid) continue;
    if (!byClient.has(cid)) byClient.set(cid, []);
    byClient.get(cid)?.push(r);
  }

  /** @type {import('@/lib/crm/static-data').CLIENTS} */
  const clientList = /** @type {unknown} */ (clientDocs.map((doc) => {
    const oid = doc._id != null ? String(doc._id) : "";
    const slug = typeof doc.slug === "string" ? doc.slug.trim() : oid;
    const raw = byClient.get(oid) ?? [];
    /** Sort ascending by response time for history */
    const sorted = [...raw].sort((a, b) => {
      const ta = a.respondedAt ? new Date(String(a.respondedAt)).getTime() : 0;
      const tb = b.respondedAt ? new Date(String(b.respondedAt)).getTime() : 0;
      return ta - tb;
    });
    /** @type {{ score: number; sentAt: string; respondedAt: string }[]} */
    const npsHistory = sorted.map((r) => {
      const responded = r.respondedAt ? new Date(String(r.respondedAt)) : null;
      const sent = r.sentAt ? new Date(String(r.sentAt)) : responded;
      return {
        score: normalizeNpsDisplayScore(Number(r.score)),
        sentAt: toIsoDateOnly(sent) || "",
        respondedAt: toIsoDateOnly(responded) || "",
      };
    });

    return {
      id: slug,
      name: String(doc.name ?? "—"),
      industry: doc.industry ? String(doc.industry) : "",
      health: /** @type {'ok' | 'warn' | 'bad'} */ (String(doc.health ?? "ok")),
      status: String(doc.status ?? "active"),
      npsInterval: String(doc.npsInterval ?? "quarterly"),
      npsHistory,
    };
  }));

  const avgLatest = npsAgencyAverageLatest(clientList);
  const buckets = npsLatestDistributionBuckets(clientList);
  const withData = Math.max(1, buckets.withData);
  const promoterRatio = buckets.promoters / withData;
  const passiveRatio = buckets.passive / withData;
  const detractorRatio = buckets.detractors / withData;
  const trend = npsMergeTrendSeries(NPS_AGENCY_TREND_BASE, avgLatest);

  /** Period-scoped response stats (Mongo timestamps) */
  const inPeriod = [];
  for (let pi = 0; pi < allResponses.length; pi += 1) {
    const r = /** @type {Record<string, unknown>} */ (allResponses[pi]);
    const respAt = r.respondedAt ? new Date(String(r.respondedAt)) : null;
    if (!respAt || Number.isNaN(respAt.getTime())) continue;
    if (respAt >= monthStart && respAt <= monthEnd) inPeriod.push(r);
  }

  const invitationsPeriod = allResponses.filter((r) => {
    const t = /** @type {Record<string, unknown>} */ (r);
    const sentAt = t.sentAt ? new Date(String(t.sentAt)) : null;
    return sentAt && !Number.isNaN(sentAt.getTime()) && sentAt >= monthStart && sentAt <= monthEnd;
  }).length;

  /** @type {number[]} */
  const hoursToRespond = [];
  for (let hi = 0; hi < inPeriod.length; hi += 1) {
    const r = /** @type {Record<string, unknown>} */ (inPeriod[hi]);
    const sent = r.sentAt ? new Date(String(r.sentAt)) : null;
    const resp = r.respondedAt ? new Date(String(r.respondedAt)) : null;
    if (sent && resp && !Number.isNaN(sent.getTime()) && !Number.isNaN(resp.getTime())) {
      hoursToRespond.push((resp.getTime() - sent.getTime()) / 3600000);
    }
  }

  const responsesPeriod = inPeriod.length;
  const rr = invitationsPeriod > 0 ? responsesPeriod / invitationsPeriod : 0;
  const medianHoursToRespond = Math.round(median(hoursToRespond) * 10) / 10;

  const tmplDocs = await NpsTemplate.find(/** @type {Record<string, unknown>} */ (andQuery(scope, { active: true })))
    .sort({ name: 1 })
    .lean()
    .then((docs) => (Array.isArray(docs) ? docs : []));

  /** @type {{ id: string; name: string; subject: string; body: string }[]} */
  const templates = tmplDocs.map((t) => {
    const tt = /** @type {Record<string, unknown>} */ (t);
    const k = typeof tt.key === "string" ? tt.key : String(tt._id ?? "");
    return {
      id: k,
      name: String(tt.name ?? k),
      subject: String(tt.subject ?? ""),
      body: String(tt.bodyMd ?? ""),
    };
  });

  const campDocs = await NpsCampaign.find(/** @type {Record<string, unknown>} */ (andQuery(scope)))
    .sort({ scheduledAt: 1 })
    .limit(24)
    .lean()
    .then((docs) => (Array.isArray(docs) ? docs : []));

  /** @type {Record<string, string>} */
  const slugByOid = {};
  for (let ci = 0; ci < clientDocs.length; ci += 1) {
    const d = clientDocs[ci];
    const oid = d._id != null ? String(d._id) : "";
    const slug = typeof d.slug === "string" ? d.slug.trim() : oid;
    if (oid) slugByOid[oid] = slug;
  }

  /** @type {Record<string, string>} */
  const tmplKeyByOid = {};
  for (let ti = 0; ti < tmplDocs.length; ti += 1) {
    const t = /** @type {Record<string, unknown>} */ (tmplDocs[ti]);
    const oid = t._id != null ? String(t._id) : "";
    const k = typeof t.key === "string" ? t.key : oid;
    if (oid) tmplKeyByOid[oid] = k;
  }

  /** @type {{ id: string; clientId: string; wave: string; plannedAt: string; templateId: string; status: string }[]} */
  const upcomingSends = campDocs
    .map((c, idx) => {
      const row = /** @type {Record<string, unknown>} */ (c);
      const id = typeof row._id !== "undefined" ? String(row._id) : `cmp-${idx}`;
      const cids = Array.isArray(row.clientIds) ? row.clientIds : [];
      const firstCid = cids[0] != null ? String(cids[0]) : "";
      const clientSlug = firstCid ? (slugByOid[firstCid] ?? firstCid) : "—";
      const tid = row.templateId != null ? String(row.templateId) : "";
      const templateKey = tid ? tmplKeyByOid[tid] ?? tid : "—";
      const planned = row.scheduledAt ? toIsoDateOnly(row.scheduledAt) : "";
      const st = String(row.status ?? "draft");
      return {
        id,
        clientId: clientSlug,
        wave: String(row.name ?? "Kampagne"),
        plannedAt: planned || toIsoDateOnly(new Date()),
        templateId: templateKey,
        status: st === "sending" ? "scheduled" : st,
      };
    })
    .filter((row) => row.status !== "cancelled" && row.status !== "completed");

  /** @type {string | null} */
  let mineLabel = null;
  if (opts.session != null) {
    const mk = await assigneeMemberKeyForDbUser(opts.session);
    if (mk) {
      const m = await TeamMember.findOne(/** @type {Record<string, unknown>} */ (andQuery(scope, { key: mk })))
        .select("name")
        .lean();
      mineLabel = m && typeof m === "object" && "name" in m && m.name ? String(m.name) : null;
    }
  }

  return {
    source: "database",
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
    responseRate: Number.isFinite(rr) ? rr : 0,
    lastRound: {
      invitations: invitationsPeriod,
      responses: responsesPeriod,
      medianHoursToRespond,
    },
    lastRoundCaptionDemo: false,
    trend,
    pulseAlerts: npsSmartAlertsFiltered(),
    atRisk: npsAtRiskLatestCount(clientList),
    improving: npsImprovingClientsCount(2, clientList),
    clients: npsDashboardClients(clientList),
    templates,
    upcomingSends,
    mineLabel,
  };
}
