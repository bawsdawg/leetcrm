"use client";

import { ContractsPortfolio } from "@/components/contracts/contracts-portfolio";
import { useDataSource } from "@/components/crm/use-data-source";

export function ContractsPageClient() {
  const dataSource = useDataSource();
  return <ContractsPortfolio key={dataSource} />;
}
