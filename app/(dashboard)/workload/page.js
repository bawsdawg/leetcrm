import { WorkloadDemandCard } from "@/components/workload/workload-demand-card";
import { WorkloadDeptMatrix } from "@/components/workload/workload-dept-matrix";
import { WorkloadInsightsCard } from "@/components/workload/workload-insights-card";
import { WorkloadMiniTrend } from "@/components/workload/workload-mini-trend";
import { WorkloadPageHeader } from "@/components/workload/workload-page-header";
import { WorkloadSummaryStrip } from "@/components/workload/workload-summary-strip";
import { WorkloadTeamDirectory } from "@/components/workload/workload-team-directory";
import { shellMainStudio } from "@/config/shell";
import { TEAM } from "@/lib/crm/static-data";
import {
  buildDeptWorkloadRows,
  buildTeamWorkloadRows,
  workloadActiveClientCount,
  workloadAgencyBillableHoursRef,
  workloadAgencyTotals,
  workloadOpenTaskStats,
  workloadTaskDemandByDept,
} from "@/lib/crm/workload-utils";
import { cn } from "@/lib/utils";

export const metadata = { title: "Workload · 1337-crm by Searchmind" };

export default function WorkloadPage() {
  const deptRows = buildDeptWorkloadRows();
  const teamRows = buildTeamWorkloadRows();
  const totals = workloadAgencyTotals(deptRows);
  const demand = workloadTaskDemandByDept();
  const openStats = workloadOpenTaskStats();
  const teamWeeklyHours = TEAM.reduce((s, m) => s + m.weeklyHours, 0);

  return (
    <main className={cn(shellMainStudio)}>
      <WorkloadPageHeader />

      <WorkloadSummaryStrip
        assigned={totals.assigned}
        tracked={totals.tracked}
        capacity={totals.capacity}
        openTasks={openStats.total}
        openHigh={openStats.high}
        openOverdue={openStats.overdue}
        activeClients={workloadActiveClientCount()}
        billableHoursMonth={workloadAgencyBillableHoursRef()}
        teamWeeklyHours={teamWeeklyHours}
      />

      <p className="font-sans text-[11px] text-fg-quiet">
        Board-backlog: <span className="font-semibold text-fg">{openStats.high}</span> høj prioritet ·{" "}
        <span className={openStats.overdue > 0 ? "font-semibold text-agency-bad" : "text-fg-muted"}>
          {openStats.overdue} overskridet
        </span>{" "}
        på tværs af discipliner (ref. opgaver).
      </p>

      <WorkloadDeptMatrix rows={deptRows} />

      <div className="grid gap-[length:var(--ds-studio-stack)] lg:grid-cols-2 lg:items-start">
        <div className="flex min-w-0 flex-col gap-[length:var(--ds-studio-stack)]">
          <WorkloadDemandCard demand={demand} />
          <WorkloadMiniTrend />
        </div>
        <WorkloadInsightsCard deptRows={deptRows} teamRows={teamRows} />
      </div>

      <WorkloadTeamDirectory rows={teamRows} />

      <p className="font-sans text-[12px] text-fg-quiet">
        Data: <code className="font-mono text-[11px] text-fg-muted">computeDeptCapacity</code>,{" "}
        <code className="font-mono text-[11px] text-fg-muted">DEPT_PERFORMANCE</code>,{" "}
        <code className="font-mono text-[11px] text-fg-muted">TASKS</code>,{" "}
        <code className="font-mono text-[11px] text-fg-muted">AGENCY_METRICS</code>,{" "}
        <code className="font-mono text-[11px] text-fg-muted">UTIL_TREND</code> — planlægning & forecasting kobles til
        Hiring + Forecast API senere.
      </p>
    </main>
  );
}
