"use client";

import { TeamPortfolio } from "@/components/team/team-portfolio";
import { useDataSource } from "@/components/crm/use-data-source";

export function TeamPageClient() {
  const dataSource = useDataSource();
  return <TeamPortfolio key={dataSource} />;
}
