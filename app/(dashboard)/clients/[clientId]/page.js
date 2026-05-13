import { notFound } from "next/navigation";

import { ClientDetailAlertsCard } from "@/components/clients/client-detail-alerts-card";
import { ClientDetailCommercialCard } from "@/components/clients/client-detail-commercial-card";
import { ClientDetailContactsCard } from "@/components/clients/client-detail-contacts-card";
import { ClientDetailDeliveryCard } from "@/components/clients/client-detail-delivery-card";
import { ClientDetailHeader } from "@/components/clients/client-detail-header";
import { ClientDetailInsightsCard } from "@/components/clients/client-detail-insights-card";
import { ClientDetailKpiStrip } from "@/components/clients/client-detail-kpi-strip";
import { ClientDetailMetaCard } from "@/components/clients/client-detail-meta-card";
import { ClientDetailNotesCard } from "@/components/clients/client-detail-notes-card";
import { ClientDetailNpsCard } from "@/components/clients/client-detail-nps-card";
import { ClientDetailRetainerTrendCard } from "@/components/clients/client-detail-retainer-trend-card";
import { ClientDetailServiceMixCard } from "@/components/clients/client-detail-service-mix-card";
import { ClientDetailTasksCard } from "@/components/clients/client-detail-tasks-card";
import { shellMainStudio } from "@/config/shell";
import {
  CLIENTS,
  CONTRACTS,
  NOTES_BY_CLIENT,
  RETAINER_HISTORY,
  SMART_ALERTS,
  TASKS,
  TEAM,
} from "@/lib/crm/static-data";
import { cn } from "@/lib/utils";

/** @param {{ params: Promise<{ clientId: string }> }} props */
export async function generateMetadata({ params }) {
  const { clientId } = await params;
  const client = CLIENTS.find((c) => c.id === clientId);
  if (!client) return { title: "Kunde · 1337-crm by Searchmind" };
  return { title: `${client.name} · Kunder · 1337-crm by Searchmind` };
}

/** @param {{ params: Promise<{ clientId: string }> }} props */
export default async function ClientDetailPage({ params }) {
  const { clientId } = await params;
  const client = CLIENTS.find((c) => c.id === clientId);
  if (!client) notFound();

  const owner = TEAM.find((t) => t.id === client.owner);
  const notes = NOTES_BY_CLIENT[clientId] ?? [];
  const contract = CONTRACTS.find((row) => row.clientId === clientId) ?? null;
  const retainerHistory = RETAINER_HISTORY[clientId] ?? [];
  const clientTasks = TASKS.filter((t) => t.clientId === clientId);

  return (
    <main className={cn(shellMainStudio)}>
      <ClientDetailHeader
        client={{
          id: client.id,
          name: client.name,
          industry: client.industry,
          logo: client.logo,
          hue: client.hue,
          status: client.status,
          health: client.health,
          lastActivity: client.lastActivity,
        }}
        owner={
          owner
            ? {
                name: owner.name,
                role: owner.role,
                avatar: owner.avatar,
                hue: owner.hue,
              }
            : null
        }
      />

      <ClientDetailKpiStrip client={client} />

      <ClientDetailMetaCard client={client} />

      <section className="grid gap-[length:var(--ds-studio-stack)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-[length:var(--ds-studio-stack)]">
          <ClientDetailDeliveryCard client={client} />
          <ClientDetailCommercialCard client={client} contract={contract} />
          <div className="grid gap-[length:var(--ds-studio-stack)] md:grid-cols-2">
            <ClientDetailRetainerTrendCard
              clientId={client.id}
              currency={client.currency}
              history={retainerHistory}
            />
            <ClientDetailNpsCard client={client} />
          </div>
          <ClientDetailServiceMixCard client={client} />
          <ClientDetailInsightsCard client={client} />
          <ClientDetailAlertsCard clientId={client.id} alerts={SMART_ALERTS} />
        </div>

        <div className="flex min-w-0 flex-col gap-[length:var(--ds-studio-stack)]">
          <ClientDetailContactsCard
            primaryContact={client.primaryContact}
            secondaryContact={client.secondaryContact}
          />
          <ClientDetailNotesCard notes={notes} />
          <ClientDetailTasksCard tasks={clientTasks} clientLabel={client.name} />
        </div>
      </section>

      <p className="font-sans text-[12px] text-fg-quiet">
        Kundeprofil fra{" "}
        <code className="font-mono text-[11px] text-fg-muted">lib/crm/static-data.js</code> (kobler{" "}
        <code className="font-mono text-[11px] text-fg-muted">CONTRACTS</code>,{" "}
        <code className="font-mono text-[11px] text-fg-muted">RETAINER_HISTORY</code>,{" "}
        <code className="font-mono text-[11px] text-fg-muted">TASKS</code>,{" "}
        <code className="font-mono text-[11px] text-fg-muted">SMART_ALERTS</code>) — udskiftes med API.
      </p>
    </main>
  );
}
