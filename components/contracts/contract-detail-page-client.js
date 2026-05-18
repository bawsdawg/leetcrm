"use client";

import { ContractDetailShell } from "@/components/contracts/contract-detail-shell";
import { useDataSource } from "@/components/crm/use-data-source";

/**
 * @param {{ contractId: string }} props
 */
export function ContractDetailPageClient({ contractId }) {
  const dataSource = useDataSource();
  return <ContractDetailShell key={`${contractId}-${dataSource}`} contractId={contractId} />;
}
