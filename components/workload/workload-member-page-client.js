"use client";

import { WorkloadMemberPortfolio } from "@/components/workload/workload-member-portfolio";
import { useDataSource } from "@/components/crm/use-data-source";

export function WorkloadMemberPageClient() {
  const dataSource = useDataSource();
  return <WorkloadMemberPortfolio key={dataSource} />;
}
