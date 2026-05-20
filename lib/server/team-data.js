import TeamMember from "@/lib/db/models/team-member";
import { teamDeptSnapshotsFromDeptWorkload, teamOverviewKpisFromRoster } from "@/lib/crm/team-utils";
import { connectDb } from "@/lib/db/mongoose";
import { assigneeMemberKeyForDbUser } from "@/lib/server/session-team-member";
import { buildIsTestQuery } from "@/lib/server/test-data-filter";
import { fetchWorkloadPortfolio } from "@/lib/server/workload-data";

/** @param {Record<string, unknown>[]} clauses */
function andQuery(...clauses) {
  const parts = clauses.filter((c) => c && typeof c === "object" && Object.keys(c).length > 0);
  if (!parts.length) return {};
  if (parts.length === 1) return /** @type {Record<string, unknown>} */ (parts[0]);
  return { $and: parts };
}

/**
 * Team hub = workload snapshot (same open tasks & belægning) plus roster-KPIs og disciplin-cards.
 *
 * @param {{ includeTest?: boolean; year?: number; month?: number; session?: unknown }} opts
 */
export async function fetchTeamPortfolio(opts = {}) {
  await connectDb();
  const scope = /** @type {Record<string, unknown>} */ (buildIsTestQuery(Boolean(opts.includeTest) ? "all" : "production"));

  const w = await fetchWorkloadPortfolio(opts);
  const members = w.teamRows.map((r) => r.member);
  const kpis = teamOverviewKpisFromRoster(members, w.teamRows);
  const snapshots = teamDeptSnapshotsFromDeptWorkload(w.deptRows, w.teamRows);
  const departments = w.deptRows.map((dr) => dr.dept);

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
    reportPeriod: w.reportPeriod,
    reportPeriodLabel: w.reportPeriodLabel,
    reportPeriodSubtitle: w.reportPeriodSubtitle,
    departments,
    kpis,
    snapshots,
    teamRows: w.teamRows,
    mineLabel,
  };
}
