"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  PulseIconChevronDown,
  PulseIconGrid,
  PulseIconList,
  PulseIconSearch,
} from "@/components/pulse/pulse-icons";
import { PulseSegmentedControl } from "@/components/pulse/pulse-segmented-control";
import { routes } from "@/config/routes";
import { CLIENTS, DEPARTMENTS, TASKS, TIME_ENTRIES_TODAY } from "@/lib/crm/static-data";
import { cn } from "@/lib/utils";

const GRID =
  "grid-cols-[minmax(54px,0.42fr)_minmax(42px,0.32fr)_minmax(128px,0.92fr)_minmax(118px,0.92fr)_minmax(38px,0.3fr)_minmax(160px,1.25fr)_minmax(80px,0.58fr)]";

/** @param {{ client: string | null | undefined }} e */
function entryBillable(e) {
  return e.client != null && e.client !== "";
}

/**
 * @param {{ headingId?: string }} props
 */
export function TimeEntriesDirectory({ headingId = "time-entries-heading" }) {
  const [q, setQ] = useState("");
  const [scope, setScope] = useState("all");
  const [sort, setSort] = useState("time");
  const [density, setDensity] = useState("list");

  const billableCount = useMemo(() => TIME_ENTRIES_TODAY.filter((e) => entryBillable(e)).length, []);

  const rows = useMemo(() => {
    const list = TIME_ENTRIES_TODAY.map((e) => {
      const client = e.client ? CLIENTS.find((c) => c.id === e.client) : null;
      const task = e.task ? TASKS.find((t) => t.id === e.task) : null;
      const bill = entryBillable(e);
      return { e, client, task, bill };
    }).filter(({ e, client, task }) => {
      const ql = q.trim().toLowerCase();
      if (ql) {
        const hay = [
          e.desc,
          e.at,
          client?.name,
          task?.title,
          e.id,
          e.client,
          e.task,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(ql)) return false;
      }
      if (scope === "billable" && !entryBillable(e)) return false;
      if (scope === "internal" && entryBillable(e)) return false;
      return true;
    });

    list.sort((a, b) => {
      if (sort === "time") return a.e.at.localeCompare(b.e.at);
      if (sort === "dur") return b.e.dur - a.e.dur;
      if (sort === "client") {
        const an = a.client?.name ?? "ÅÅÅ";
        const bn = b.client?.name ?? "ÅÅÅ";
        return an.localeCompare(bn, "da");
      }
      return 0;
    });

    return list;
  }, [q, scope, sort]);

  return (
    <section
      className="overflow-hidden rounded-2xl border border-border bg-surface-card shadow-inset-card"
      aria-labelledby={headingId}
    >
      <div className="flex flex-col gap-3 border-b border-border px-3 py-3 md:flex-row md:flex-wrap md:items-center md:gap-2 md:px-4">
        <h2 id={headingId} className="font-sans text-sm font-semibold text-fg">
          Stempler i dag
        </h2>
        <span className="inline-flex h-[22px] items-center rounded-full border border-agency-brand-border bg-agency-brand-soft px-2 font-mono text-[11px] font-medium tabular-nums text-agency-brand">
          {rows.length} af {TIME_ENTRIES_TODAY.length}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-2 md:ml-auto md:flex-row md:items-center md:justify-end">
          <label className="relative flex min-w-0 max-w-[220px] flex-1 md:max-w-[280px]">
            <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-fg-quiet">
              <PulseIconSearch size={14} />
            </span>
            <input
              type="search"
              placeholder="Søg note, kunde, opgave…"
              value={q}
              onChange={(ev) => setQ(ev.target.value)}
              className={cn(
                "h-8 w-full rounded-md border border-border bg-surface-muted py-1 pl-9 pr-3",
                "font-sans text-[13px] text-fg placeholder:text-fg-quiet",
                "outline-none focus-visible:ring-2 focus-visible:ring-agency-brand",
              )}
            />
          </label>

          <PulseSegmentedControl
            size="sm"
            active={scope}
            onChange={setScope}
            tabs={[
              { id: "all", label: "Alle" },
              { id: "billable", label: "Billable", count: billableCount },
              {
                id: "internal",
                label: "Intern",
                count: TIME_ENTRIES_TODAY.length - billableCount,
              },
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
        <div className="grid gap-3 p-3 sm:grid-cols-2 md:p-4 lg:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
          {rows.map(({ e, client, task, bill }) => {
            const dep = e.dept ? DEPARTMENTS.find((d) => d.id === e.dept) : null;
            return (
              <article
                key={e.id}
                className={cn(
                  "flex flex-col rounded-2xl border border-border-soft bg-surface-muted/35 p-3.5",
                  bill ? "" : "border-dashed opacity-95",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-[11px] tabular-nums text-fg-muted">{e.at}</p>
                    <p className="mt-1 font-mono text-[18px] font-semibold tabular-nums text-agency-brand">
                      {e.dur} <span className="text-[12px] font-medium text-fg-soft">min</span>
                    </p>
                  </div>
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide",
                      bill ? "border border-agency-ok-border bg-agency-brand-soft text-agency-ok" : "border border-border text-fg-quiet",
                    )}
                  >
                    {bill ? "Billable" : "Intern"}
                  </span>
                </div>
                {client ? (
                  <Link
                    href={`${routes.clients}/${client.id}`}
                    className="mt-3 truncate font-sans text-[13px] font-semibold text-fg hover:text-agency-brand hover:underline"
                  >
                    {client.name}
                  </Link>
                ) : (
                  <p className="mt-3 font-sans text-[13px] font-medium text-fg-muted">— Intern / overhead</p>
                )}
                {task ? (
                  <Link
                    href={`${routes.tasks}/${task.id}`}
                    className="mt-1 line-clamp-2 font-sans text-[12px] text-agency-brand hover:underline"
                  >
                    {task.title}
                  </Link>
                ) : (
                  <p className="mt-1 font-sans text-[12px] text-fg-quiet">Ingen opgave linket</p>
                )}
                {dep ? (
                  <p className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-wide" style={{ color: dep.color }}>
                    {dep.short}
                  </p>
                ) : null}
                <p className="mt-2 border-t border-border-soft pt-2 font-sans text-[12px] leading-snug text-fg-muted">{e.desc}</p>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[920px]">
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
                onClick={() => setSort("time")}
              >
                Kl. {sort === "time" ? <PulseIconChevronDown className="inline opacity-70" /> : null}
              </button>
              <button
                type="button"
                className="text-left font-[inherit] text-[inherit] hover:text-fg"
                onClick={() => setSort("dur")}
              >
                Min {sort === "dur" ? <PulseIconChevronDown className="inline opacity-70" /> : null}
              </button>
              <button
                type="button"
                className="text-left font-[inherit] text-[inherit] hover:text-fg"
                onClick={() => setSort("client")}
              >
                Kunde {sort === "client" ? <PulseIconChevronDown className="inline opacity-70" /> : null}
              </button>
              <span>Opgave</span>
              <span className="text-center">Afd.</span>
              <span>Beskrivelse</span>
              <span>Type</span>
            </div>

            {rows.map(({ e, client, task, bill }, i) => {
              const dep = e.dept ? DEPARTMENTS.find((d) => d.id === e.dept) : null;
              return (
                <div
                  key={e.id}
                  className={cn(
                    "grid w-full gap-3 px-3 py-2 md:px-4 md:py-2.5",
                    GRID,
                    i < rows.length - 1 && "border-b border-border-soft",
                    !bill && "bg-surface-muted/15",
                  )}
                >
                  <span className="font-mono text-[12px] tabular-nums text-fg">{e.at}</span>
                  <span className="font-mono text-[12px] font-semibold tabular-nums text-agency-brand">{e.dur}</span>
                  <div className="min-w-0">
                    {client ? (
                      <Link
                        href={`${routes.clients}/${client.id}`}
                        className="truncate font-sans text-[12px] font-medium text-fg hover:text-agency-brand hover:underline"
                      >
                        {client.name}
                      </Link>
                    ) : (
                      <span className="font-sans text-[12px] text-fg-muted">Intern</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    {task ? (
                      <Link
                        href={`${routes.tasks}/${task.id}`}
                        className="line-clamp-2 font-sans text-[12px] text-agency-brand hover:underline"
                      >
                        {task.title}
                      </Link>
                    ) : (
                      <span className="font-sans text-[12px] text-fg-quiet">—</span>
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    {dep ? (
                      <span className="font-mono text-[10px] font-semibold" style={{ color: dep.color }}>
                        {dep.short}
                      </span>
                    ) : (
                      <span className="text-fg-quiet">—</span>
                    )}
                  </div>
                  <p className="line-clamp-2 min-w-0 font-sans text-[12px] leading-snug text-fg-muted">{e.desc}</p>
                  <div className="flex items-center">
                    <span
                      className={cn(
                        "inline-flex rounded-md border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide",
                        bill ? "border-agency-ok-border text-agency-ok" : "border-border text-fg-quiet",
                      )}
                    >
                      {bill ? "Fakt." : "Int."}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
