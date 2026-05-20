"use client";

import { TimePortfolio } from "@/components/time/time-portfolio";
import { useDataSource } from "@/components/crm/use-data-source";

export function TimePageClient() {
  const dataSource = useDataSource();
  return <TimePortfolio key={dataSource} />;
}
