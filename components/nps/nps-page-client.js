"use client";

import { NpsPortfolio } from "@/components/nps/nps-portfolio";
import { useDataSource } from "@/components/crm/use-data-source";

export function NpsPageClient() {
  const dataSource = useDataSource();
  return <NpsPortfolio key={dataSource} />;
}
