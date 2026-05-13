import Link from "next/link";

import { PulseIconSparkle } from "@/components/pulse/pulse-icons";
import { routes } from "@/config/routes";
import { CLIENTS, SMART_ALERTS } from "@/lib/crm/static-data";
import { cn } from "@/lib/utils";

export function PulseSmartAlertsCard() {
  const alerts = SMART_ALERTS;
  const counts = {
    bad: alerts.filter((a) => a.severity === "bad").length,
    warn: alerts.filter((a) => a.severity === "warn").length,
  };

  return (
    <section
      className="overflow-hidden rounded-2xl border border-border bg-surface-card shadow-inset-card"
      aria-labelledby="pulse-alerts-heading"
    >
      <div className="border-b border-border px-4 py-3 md:px-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3
              id="pulse-alerts-heading"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-fg"
            >
              <PulseIconSparkle className="text-agency-brand" size={14} />
              Smart Alerts
            </h3>
            <p className="mt-1 font-sans text-[11.5px] text-fg-muted">
              <span className="font-medium text-agency-bad">● {counts.bad} kritiske</span>
              <span className="mx-1.5 text-fg-quiet">·</span>
              <span className="font-medium text-agency-warn">● {counts.warn} advarsler</span>
            </p>
          </div>
          <button
            type="button"
            className="h-[26px] shrink-0 rounded-md border border-border bg-transparent px-3 font-sans text-[11px] font-medium text-fg-muted transition-colors hover:bg-surface-muted hover:text-fg"
          >
            Konfigurér
          </button>
        </div>
      </div>

      <ul className="max-h-[420px] overflow-y-auto overscroll-contain">
        {alerts.map((a, i) => {
          const c = a.client ? CLIENTS.find((x) => x.id === a.client) : null;
          const href = c ? `${routes.clients}/${c.id}` : null;

          const inner = (
            <>
              <div
                className={cn(
                  "w-1 shrink-0 rounded-full",
                  a.severity === "bad" ? "bg-agency-bad" : "bg-agency-warn",
                )}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {c ? (
                    <span
                      className="flex size-[18px] shrink-0 items-center justify-center rounded border border-white/15 font-mono text-[9px] font-semibold text-white shadow-sm"
                      style={{
                        background: `oklch(62% 0.14 ${c.hue})`,
                      }}
                    >
                      {c.logo}
                    </span>
                  ) : null}
                  <span className="font-sans text-[12.5px] font-medium text-fg">{a.title}</span>
                </div>
                <p className="mt-0.5 font-sans text-[11.5px] leading-snug text-fg-muted">{a.body}</p>
              </div>
              <span className="shrink-0 whitespace-nowrap font-mono text-[10.5px] text-fg-quiet">
                {a.age}
              </span>
            </>
          );

          const rowCls =
            "flex w-full gap-3 px-4 py-2.5 text-left transition-colors hover:bg-surface-muted md:px-5";

          return (
            <li
              key={a.id}
              className={cn("border-b border-border-soft last:border-0", !href && "cursor-default")}
            >
              {href ? (
                <Link href={href} className={cn(rowCls, "cursor-pointer")}>
                  {inner}
                </Link>
              ) : (
                <div className={rowCls}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
