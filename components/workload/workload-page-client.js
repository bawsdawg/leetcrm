"use client";

import { WorkloadPortfolio } from "@/components/workload/workload-portfolio";
import { useDataSource } from "@/components/crm/use-data-source";

export function WorkloadPageClient() {
  const dataSource = useDataSource();
  return <WorkloadPortfolio key={dataSource} />;
}
