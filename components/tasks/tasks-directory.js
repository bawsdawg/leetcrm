"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { TaskGridCard } from "@/components/tasks/task-grid-card";
import { CrmAvatar } from "@/components/crm/crm-avatar";
import { TaskPriorityChip } from "@/components/crm/task-priority-chip";
import { TaskStatusChip } from "@/components/crm/task-status-chip";
import {
  PulseIconChevronDown,
  PulseIconChevronRight,
  PulseIconGrid,
  PulseIconList,
  PulseIconSearch,
} from "@/components/pulse/pulse-icons";
import { PulseSegmentedControl } from "@/components/pulse/pulse-segmented-control";
import { routes } from "@/config/routes";
import { formatIsoDateDa } from "@/lib/crm/format-da";
import { DEPARTMENTS, TASKS, TEAM } from "@/lib/crm/static-data";
import {
  taskDaysUntilDue,
  TASK_DEMO_USER_ID,
  taskIsDone,
  taskIsOverdue,
  taskPriorityRank,
} from "@/lib/crm/task-utils";
import { cn } from "@/lib/utils";

const GRID =
  "grid-cols-[minmax(200px,2.35fr)_minmax(124px,1.05fr)_minmax(94px,0.95fr)_minmax(40px,0.4fr)_minmax(74px,0.72fr)_minmax(80px,0.78fr)_minmax(82px,0.88fr)_36px]";

/**
 * @param {{ headingId?: string; toolbarTitle?: string }} props
 */
export function TasksDirectory({ headingId = "tasks-directory-heading", toolbarTitle = "Alle opgaver" }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("due");
  const [density, setDensity] = useState("list");

  const openCount = useMemo(() => TASKS.filter((t) => !taskIsDone(t.status)).length, []);
  const overdueCount = useMemo(() => TASKS.filter((t) => taskIsOverdue(t)).length, []);
  const mineCount = useMemo(
    () => TASKS.filter((t) => t.assigneeId === TASK_DEMO_USER_ID).length,
    [],
  );

  const filtered = useMemo(() => {
    const list = TASKS.filter((t) => {
      const ql = q.trim().toLowerCase();
      if (
        ql &&
        !t.title.toLowerCase().includes(ql) &&
        !(t.hint?.toLowerCase().includes(ql)) &&
        !t.clientName.toLowerCase().includes(ql)
      ) {
        return false;
      }
      if (filter === "open" && taskIsDone(t.status)) return false;
      if (filter === "mine" && t.assigneeId !== TASK_DEMO_USER_ID) return false;
      if (filter === "overdue" && !taskIsOverdue(t)) return false;
      return true;
    });

    list.sort((a, b) => {
      if (sort === "due") return a.dueDate.localeCompare(b.dueDate);
      if (sort === "prio") return taskPriorityRank(a.priority) - taskPriorityRank(b.priority);
      if (sort === "title") return a.title.localeCompare(b.title, "da");
      return 0;
    });

    return list;
  }, [q, filter, sort]);

  return (
    <section
      className="overflow-hidden rounded-2xl border border-border bg-surface-card shadow-inset-card"
      aria-labelledby={headingId}
    >
      <div className="flex flex-col gap-3 border-b border-border px-3 py-3 md:flex-row md:flex-wrap md:items-center md:gap-2 md:px-4">
        <h3 id={headingId} className="font-sans text-sm font-semibold text-fg">
          {toolbarTitle}
        </h3>
        <span className="inline-flex h-[22px] items-center rounded-full border border-agency-brand-border bg-agency-brand-soft px-2 font-mono text-[11px] font-medium tabular-nums text-agency-brand">
          {filtered.length} af {TASKS.length}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-2 md:ml-auto md:flex-row md:items-center md:justify-end">
          <label className="relative flex min-w-0 max-w-[220px] flex-1 md:max-w-[280px]">
            <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-fg-quiet">
              <PulseIconSearch size={14} />
            </span>
            <input
              type="search"
              placeholder="Søg opgave eller kunde…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className={cn(
                "h-8 w-full rounded-md border border-border bg-surface-muted py-1 pl-9 pr-3",
                "font-sans text-[13px] text-fg placeholder:text-fg-quiet",
                "outline-none focus-visible:ring-2 focus-visible:ring-agency-brand",
              )}
            />
          </label>

          <PulseSegmentedControl
            size="sm"
            active={filter}
            onChange={setFilter}
            tabs={[
              { id: "all", label: "Alle" },
              { id: "open", label: "Åbne", count: openCount },
              { id: "mine", label: "Mine", count: mineCount },
              { id: "overdue", label: "Overskredet", count: overdueCount },
            ]}
          />

          <PulseSegmentedControl
            size="sm"
            active={density}
            onChange={setDensity}
            tabs={[
              { id: "list", label: "", icon: () => <PulseIconList size={12} /> },
              { id: "cards", label: "", icon: () => <PulseIconGrid size={12} /> },
            ]}
          />
        </div>
      </div>

      {density === "cards" ? (
        <div className="grid gap-3 p-3 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] md:p-4">
          {filtered.map((row) => (
            <TaskGridCard key={row.id} row={row} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[1020px]">
            <div
              className={cn(
                "grid gap-3 border-b border-border bg-surface-muted/90 px-3 py-2",
                "font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-fg-soft md:px-4",
                GRID,
              )}
            >
              <button
                type="button"
                className="text-left font-[inherit] text-[inherit] hover:text-fg"
                onClick={() => setSort("title")}
              >
                Opgave {sort === "title" ? <PulseIconChevronDown className="inline opacity-70" /> : null}
              </button>
              <span>Kunde</span>
              <span>Ansvarlig</span>
              <span className="hidden sm:inline" />
              <button
                type="button"
                className="text-left font-[inherit] text-[inherit] hover:text-fg"
                onClick={() => setSort("prio")}
              >
                Prio {sort === "prio" ? <PulseIconChevronDown className="inline opacity-70" /> : null}
              </button>
              <span>Status</span>
              <button
                type="button"
                className="text-left font-[inherit] text-[inherit] hover:text-fg"
                onClick={() => setSort("due")}
              >
                Forfaldsdato {sort === "due" ? <PulseIconChevronDown className="inline opacity-70" /> : null}
              </button>
              <span />
            </div>

            {filtered.map((row, i) => {
              const assignee = TEAM.find((t) => t.id === row.assigneeId);
              const dep = DEPARTMENTS.find((d) => d.id === row.dept);
              const overdue = taskIsOverdue(row);
              const daysLeft = !taskIsDone(row.status) ? taskDaysUntilDue(row.dueDate) : null;

              return (
                <Link
                  key={row.id}
                  href={`${routes.tasks}/${row.id}`}
                  className={cn(
                    "grid w-full gap-3 px-3 py-2 text-left transition-colors hover:bg-surface-muted md:px-4 md:py-2.5",
                    GRID,
                    i < filtered.length - 1 && "border-b border-border-soft",
                  )}
                >
                  <div className="min-w-0">
                    <div className="font-sans text-[13px] font-medium leading-snug text-fg">{row.title}</div>
                    {row.hint ? (
                      <div className="mt-0.5 line-clamp-1 font-sans text-[11px] text-fg-quiet">{row.hint}</div>
                    ) : null}
                  </div>

                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="flex size-[26px] shrink-0 items-center justify-center rounded-md border border-white/10 font-mono text-[10.5px] font-semibold text-white"
                      style={{ background: `oklch(62% 0.14 ${row.clientHue})` }}
                    >
                      {row.clientLogo}
                    </span>
                    <span className="truncate font-sans text-[12px] text-fg-muted">{row.clientName}</span>
                  </div>

                  <div className="flex min-w-0 items-center gap-1.5">
                    {assignee ? (
                      <>
                        <CrmAvatar label={assignee.avatar} hue={assignee.hue} className="size-5 text-[9px]" />
                        <span className="truncate font-sans text-[12px] text-fg-muted">{assignee.name}</span>
                      </>
                    ) : (
                      <span className="text-fg-quiet">—</span>
                    )}
                  </div>

                  <div className="hidden items-center justify-center sm:flex">
                    <span className="font-mono text-[10px] font-semibold text-fg-muted">{dep?.short ?? "—"}</span>
                  </div>

                  <div className="flex items-center">
                    <TaskPriorityChip priority={row.priority} className="scale-95 origin-left" />
                  </div>

                  <div className="flex items-center">
                    <TaskStatusChip status={row.status} className="scale-95 origin-left" />
                  </div>

                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span
                      className={cn(
                        "font-mono text-[12px] tabular-nums text-fg",
                        overdue && "text-agency-bad",
                        !overdue && daysLeft !== null && daysLeft <= 7 && daysLeft >= 0 && "text-agency-warn",
                        taskIsDone(row.status) && "text-fg-muted",
                      )}
                    >
                      {formatIsoDateDa(row.dueDate)}
                    </span>
                    {!taskIsDone(row.status) ? (
                      <span
                        className={cn(
                          "font-mono text-[10px] tabular-nums",
                          overdue && "text-agency-bad",
                          !overdue && daysLeft !== null && daysLeft <= 7 && daysLeft >= 0 && "text-agency-warn",
                          !overdue && (daysLeft === null || daysLeft > 7) && "text-fg-quiet",
                        )}
                      >
                        {overdue
                          ? `${Math.abs(taskDaysUntilDue(row.dueDate))} d overskredet`
                          : daysLeft === 0
                            ? "I dag"
                            : `Om ${daysLeft} d`}
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] text-fg-quiet">Afsluttet</span>
                    )}
                  </div>

                  <PulseIconChevronRight className="justify-self-end text-fg-quiet" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
