import { notFound } from "next/navigation";

import { ClientDetailAlertsCard } from "@/components/clients/client-detail-alerts-card";
import { ClientDetailTasksCard } from "@/components/clients/client-detail-tasks-card";
import { ContractDetailFinanceSnapshotCard } from "@/components/contracts/contract-detail-finance-snapshot-card";
import { ContractDetailHeader } from "@/components/contracts/contract-detail-header";
import { ContractDetailKpiStrip } from "@/components/contracts/contract-detail-kpi-strip";
import { ContractDetailLinkedClientCard } from "@/components/contracts/contract-detail-linked-client-card";
import { ContractDetailRevisionsCard } from "@/components/contracts/contract-detail-revisions-card";
import { ContractDetailTermsCard } from "@/components/contracts/contract-detail-terms-card";
import { shellMainStudio } from "@/config/shell";
import { contractDaysUntilRenewal } from "@/lib/crm/contract-utils";
import {
  CLIENTS,
  CONTRACT_REVISION_LOG,
  CONTRACTS,
  RETAINER_HISTORY,
  SMART_ALERTS,
  TASKS,
  TEAM,
} from "@/lib/crm/static-data";
import { cn } from "@/lib/utils";

/** @param {{ params: Promise<{ contractId: string }> }} props */
export async function generateMetadata({ params }) {
  const { contractId } = await params;
  const ctr = CONTRACTS.find((c) => c.id === contractId);
  if (!ctr) return { title: "Kontrakt · 1337-crm by Searchmind" };
  return { title: `${ctr.clientName} · Kontrakt · 1337-crm by Searchmind` };
}

/** @param {{ params: Promise<{ contractId: string }> }} props */
export default async function ContractDetailPage({ params }) {
  const { contractId } = await params;
  const ctr = CONTRACTS.find((c) => c.id === contractId);
  if (!ctr) notFound();

  const client = CLIENTS.find((c) => c.id === ctr.clientId);
  if (!client) notFound();

  const owner = TEAM.find((t) => t.id === ctr.ownerId);
  const revisions = CONTRACT_REVISION_LOG[ctr.id] ?? [];
  const clientTasks = TASKS.filter((t) => t.clientId === ctr.clientId);
  const retainerHist = RETAINER_HISTORY[ctr.clientId] ?? [];

  const daysUntilRenewal = contractDaysUntilRenewal(ctr.renewalAt);

  return (
    <main className={cn(shellMainStudio)}>
      <ContractDetailHeader
        contract={{
          id: ctr.id,
          kind: ctr.kind,
          clientName: ctr.clientName,
          clientLogo: ctr.clientLogo,
          clientHue: ctr.clientHue,
          accountStatus: ctr.accountStatus,
          health: ctr.health,
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
        daysUntilRenewal={daysUntilRenewal}
        industry={client.industry}
      />

      <ContractDetailKpiStrip contract={ctr} />

      <section className="grid gap-[length:var(--ds-studio-stack)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col gap-[length:var(--ds-studio-stack)]">
          <ContractDetailTermsCard contract={ctr} />
          <ContractDetailFinanceSnapshotCard history={retainerHist} />
          <ContractDetailRevisionsCard entries={revisions} />
        </div>
        <div className="flex min-w-0 flex-col gap-[length:var(--ds-studio-stack)]">
          <ContractDetailLinkedClientCard client={client} contract={ctr} />
          <ClientDetailTasksCard tasks={clientTasks} clientLabel={client.name} />
          <ClientDetailAlertsCard clientId={client.id} alerts={SMART_ALERTS} />
        </div>
      </section>

      <p className="font-sans text-[12px] text-fg-quiet">
        Enkeltkontrakt-view baseret på <code className="font-mono text-[11px] text-fg-muted">CONTRACTS</code>,{" "}
        <code className="font-mono text-[11px] text-fg-muted">CONTRACT_REVISION_LOG</code> og tilknyttet kunde — erstattes
        med dokument-lager + API.
      </p>
    </main>
  );
}
