"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { TasksCreateForm } from "@/components/tasks/tasks-create-form";
import { TasksDirectory } from "@/components/tasks/tasks-directory";
import { TasksPageHeader } from "@/components/tasks/tasks-page-header";
import { TasksSummaryStrip } from "@/components/tasks/tasks-summary-strip";
import { useDataSource } from "@/components/crm/use-data-source";
import { getTasksDemoBundle } from "@/lib/crm/tasks-demo-bundle";
import { getCurrentReportPeriod, normalizeReportPeriod } from "@/lib/crm/report-period";
import { cn } from "@/lib/utils";

/** @typedef {ReturnType<typeof getTasksDemoBundle>} TasksPortfolioBundle */

export function TasksPortfolio() {
  const dataSource = useDataSource();
  const router = useRouter();
  const [period, setPeriod] = useState(() => getCurrentReportPeriod());
  const [bundle, setBundle] = useState(/** @type {TasksPortfolioBundle | null} */ (null));
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(/** @type {string | null} */ (null));
  const [showCreate, setShowCreate] = useState(false);
  const [createSubmitting, setCreateSubmitting] = useState(false);
  const [createError, setCreateError] = useState(/** @type {string | null} */ (null));
  const hasLoadedRef = useRef(false);

  const handlePeriodChange = useCallback((next) => {
    setPeriod(normalizeReportPeriod(next));
  }, []);

  const load = useCallback(async () => {
    const isInitial = !hasLoadedRef.current;
    if (isInitial) setLoading(true);
    else setRefreshing(true);
    setError(null);
    try {
      const p = normalizeReportPeriod(period);
      if (dataSource === "demo") {
        setBundle(getTasksDemoBundle(p));
        hasLoadedRef.current = true;
      } else {
        const qs = new URLSearchParams({
          includeTest: "1",
          year: String(p.year),
          month: String(p.month),
        });
        const res = await fetch(`/api/tasks?${qs}`, { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error ?? "Kunne ikke hente opgaver");
        setBundle(data);
        hasLoadedRef.current = true;
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Fejl");
      if (isInitial) setBundle(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [dataSource, period]);

  useEffect(() => {
    hasLoadedRef.current = false;
  }, [dataSource]);

  useEffect(() => {
    queueMicrotask(() => {
      void load();
    });
  }, [load]);

  const sourceFootnote =
    dataSource === "database"
      ? "MongoDB (inkl. testdata ved isTest via includeTest)."
      : "Demo (`lib/crm/static-data.js`).";

  const mineLabel =
    bundle && bundle.tasks && bundle.team ?
      bundle.team.find((m) => m.id === bundle.mineAssigneeKey)?.name ??
      (bundle.mineAssigneeKey ? bundle.mineAssigneeKey : "")
    : "";

  const handleCreateSubmit = useCallback(
    async (body) => {
      if (dataSource !== "database") return;
      setCreateSubmitting(true);
      setCreateError(null);
      try {
        const qs = new URLSearchParams({ includeTest: "1" });
        const res = await fetch(`/api/tasks?${qs}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error ?? "Kunne ikke oprette");
        setShowCreate(false);
        await load();
        if (typeof data?.wire?.id === "string" && data.wire.id) {
          router.push(`/tasks/${encodeURIComponent(data.wire.id)}`);
        }
      } catch (e) {
        setCreateError(e instanceof Error ? e.message : "Fejl");
      } finally {
        setCreateSubmitting(false);
      }
    },
    [dataSource, load, router],
  );

  if (loading && !bundle) {
    return (
      <div className="flex flex-col gap-[length:var(--ds-studio-stack)]">
        <TasksPageHeader
          period={period}
          onPeriodChange={handlePeriodChange}
          loading
          summary={null}
          mineLabel={null}
          onToggleCreate={undefined}
          creating={false}
          dataSource={dataSource}
        />
        <div className="grid gap-[length:var(--ds-studio-stack)] sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[88px] animate-pulse rounded-2xl bg-skeleton md:h-[100px]" />
          ))}
        </div>
        <div className="h-[420px] animate-pulse rounded-2xl bg-skeleton" />
      </div>
    );
  }

  if (error || !bundle) {
    return (
      <div className="flex flex-col gap-[length:var(--ds-studio-stack)]">
        <TasksPageHeader
          period={period}
          onPeriodChange={handlePeriodChange}
          summary={null}
          mineLabel={null}
          dataSource={dataSource}
        />
        <p className="rounded-lg border border-agency-bad-border bg-agency-bad-soft px-4 py-3 font-sans text-[13px] text-agency-bad">
          {error ?? "Ingen data"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[length:var(--ds-studio-stack)]">
      <TasksPageHeader
        period={period}
        onPeriodChange={handlePeriodChange}
        refreshing={refreshing}
        summary={bundle.summary}
        mineLabel={mineLabel || bundle.mineAssigneeKey || null}
        onToggleCreate={dataSource === "database" ? () => setShowCreate((v) => !v) : undefined}
        creating={showCreate}
        dataSource={dataSource}
        taskDueReferenceIso={bundle.taskDueReferenceIso}
        periodLabel={bundle.period.label}
      />

      {showCreate && dataSource === "database" ? (
        <TasksCreateForm
          departments={bundle.departments}
          team={bundle.team}
          clientsPicklist={bundle.clientsPicklist}
          submitting={createSubmitting}
          error={createError}
          onSubmit={handleCreateSubmit}
          onCancel={() => {
            setShowCreate(false);
            setCreateError(null);
          }}
        />
      ) : null}

      <div className={cn("flex flex-col gap-[length:var(--ds-studio-stack)] transition-opacity", refreshing && "opacity-65")}>
        <TasksSummaryStrip summary={bundle.summary} />

        <TasksDirectory
          tasks={bundle.tasks}
          departments={bundle.departments}
          team={bundle.team}
          taskDueReferenceIso={bundle.taskDueReferenceIso}
          mineAssigneeKey={bundle.mineAssigneeKey}
        />

        <p className="font-sans text-[12px] text-fg-quiet">
          Datakilde: <span className="text-fg-muted">{sourceFootnote}</span>
          {" · "}
          Forfald vs. periodeslut <span className="font-mono text-[11px] text-fg-muted">{bundle.overdueRefIso}</span>
          {" · "}
          Skift under <span className="font-medium text-fg-muted">Indstillinger → Datakilde</span>.
        </p>
      </div>
    </div>
  );
}
