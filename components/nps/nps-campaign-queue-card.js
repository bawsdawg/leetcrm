import Link from "next/link";

import { formatIsoDateDa } from "@/lib/crm/format-da";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

const STATUS_DA = {
  scheduled: { label: "Planlagt", className: "border-agency-ok-border text-agency-ok bg-agency-ok-soft" },
  draft: { label: "Kladde", className: "border-border text-fg-muted bg-surface-muted" },
  review: { label: "Review", className: "border-agency-warn-border text-agency-warn bg-agency-warn-soft/30" },
  sending: { label: "Afsendelse", className: "border-agency-brand-border text-agency-brand bg-agency-brand-soft/30" },
};

/**
 * @param {{
 *   upcomingSends: { id: string; clientId: string; wave: string; plannedAt: string; templateId: string; status: string }[];
 *   clients: { id: string; name: string }[];
 * }} props
 */
export function NpsCampaignQueueCard({ upcomingSends, clients }) {
  return (
    <section className="rounded-2xl border border-border bg-surface-card p-4 shadow-inset-card md:p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
        <div>
          <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">Udsendelseskø</h2>
          <p className="mt-1 max-w-xl font-sans text-[11px] leading-snug text-fg-muted">
            Planlagte eller kladder — fra demo-fixtures eller dine <code className="font-mono text-[10px]">NpsCampaign</code>
            -poster i MongoDB.
          </p>
        </div>
      </div>

      {upcomingSends.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-border px-3 py-8 text-center font-sans text-[13px] text-fg-muted">
          Ingen rækker i køen for denne datakilde — opret en skabelon og kampagne i CRM, eller skift til demo.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-[12px]">
            <thead>
              <tr className="border-b border-border font-mono text-[10px] font-semibold uppercase tracking-wide text-fg-soft">
                <th className="py-2 pr-3 font-medium">Konto</th>
                <th className="py-2 pr-3 font-medium">Bølge</th>
                <th className="py-2 pr-3 font-medium">Plan</th>
                <th className="py-2 pr-3 font-medium">Skabelon</th>
                <th className="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingSends.map((row) => {
                const client = clients.find((c) => c.id === row.clientId);
                const cfg = STATUS_DA[/** @type {keyof typeof STATUS_DA} */ (row.status)] ?? STATUS_DA.draft;

                return (
                  <tr key={row.id} className="border-b border-border-soft last:border-0">
                    <td className="py-2.5 pr-3">
                      {client ?
                        <Link
                          href={`${routes.clients}/${client.id}`}
                          className="font-sans text-[13px] font-semibold text-fg hover:text-agency-brand hover:underline"
                        >
                          {client.name}
                        </Link>
                      : <span className="font-mono text-[11px] text-fg-muted">{row.clientId}</span>}
                    </td>
                    <td className="py-2.5 pr-3 font-mono text-[11px] text-fg-muted">{row.wave}</td>
                    <td className="py-2.5 pr-3 font-mono tabular-nums text-fg">{formatIsoDateDa(row.plannedAt)}</td>
                    <td className="py-2.5 pr-3 font-sans text-[12px] text-fg-muted">{row.templateId}</td>
                    <td className="py-2.5">
                      <span
                        className={cn(
                          "inline-flex rounded-md border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide",
                          cfg.className,
                        )}
                      >
                        {cfg.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
