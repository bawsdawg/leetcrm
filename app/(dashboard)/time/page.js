import { TimeEntriesDirectory } from "@/components/time/time-entries-directory";
import { TimePageHeader } from "@/components/time/time-page-header";
import { TimeQuickLogPanel } from "@/components/time/time-quick-log-panel";
import { TimeSummaryStrip } from "@/components/time/time-summary-strip";
import { TimeWeekStrip } from "@/components/time/time-week-strip";
import { shellMainStudio } from "@/config/shell";
import { TIME_DAILY_TARGET_MINUTES, TIME_ENTRIES_TODAY, TIME_WEEK_OVERVIEW } from "@/lib/crm/static-data";
import { resolveTimeWeekOverview, timeWeekGoalMinutes } from "@/lib/crm/time-utils";
import { cn } from "@/lib/utils";

export const metadata = { title: "Tidsregistrering · 1337-crm by Searchmind" };

export default function TimePage() {
  const weekDays = resolveTimeWeekOverview(TIME_WEEK_OVERVIEW, TIME_ENTRIES_TODAY);
  const todayTotalMin = TIME_ENTRIES_TODAY.reduce((s, e) => s + (Number(e.dur) || 0), 0);
  const billableMin = TIME_ENTRIES_TODAY.filter((e) => e.client != null && e.client !== "").reduce(
    (s, e) => s + (Number(e.dur) || 0),
    0,
  );
  const internalMin = Math.max(0, todayTotalMin - billableMin);
  const weekLoggedMin = weekDays.reduce((s, d) => s + d.minutes, 0);
  const weekGoalMin = timeWeekGoalMinutes(TIME_DAILY_TARGET_MINUTES);

  return (
    <main className={cn(shellMainStudio)}>
      <TimePageHeader />

      <TimeSummaryStrip
        todayTotalMin={todayTotalMin}
        billableMin={billableMin}
        internalMin={internalMin}
        entryCount={TIME_ENTRIES_TODAY.length}
        weekLoggedMin={weekLoggedMin}
        weekGoalMin={weekGoalMin}
      />

      <div className="grid gap-[length:var(--ds-studio-stack)] lg:grid-cols-[minmax(0,1.42fr)_minmax(280px,1fr)] lg:items-start">
        <div className="flex min-w-0 flex-col gap-[length:var(--ds-studio-stack)]">
          <TimeWeekStrip
            days={weekDays}
            dailyTargetMinutes={TIME_DAILY_TARGET_MINUTES}
            weekCaption="Uge 19 · 4.–10. maj 2026"
          />
          <TimeEntriesDirectory />
        </div>
        <TimeQuickLogPanel />
      </div>

      <p className="font-sans text-[12px] text-fg-quiet">
        Demo: <code className="font-mono text-[11px] text-fg-muted">TIME_ENTRIES_TODAY</code>,{" "}
        <code className="font-mono text-[11px] text-fg-muted">TIME_WEEK_OVERVIEW</code> og mål{" "}
        <code className="font-mono text-[11px] text-fg-muted">TIME_DAILY_TARGET_MINUTES</code> i{" "}
        <code className="font-mono text-[11px] text-fg-muted">lib/crm/static-data.js</code> — kobles til TimeEntry API +
        godkendelseskø.
      </p>
    </main>
  );
}
