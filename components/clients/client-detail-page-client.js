"use client";

import { ClientDetailShell } from "@/components/clients/client-detail-shell";
import { useDataSource } from "@/components/crm/use-data-source";

/**
 * @param {{ clientSlug: string }} props
 */
export function ClientDetailPageClient({ clientSlug }) {
  const dataSource = useDataSource();
  return <ClientDetailShell key={`${clientSlug}-${dataSource}`} clientSlug={clientSlug} />;
}
