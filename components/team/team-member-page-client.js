"use client";

import { TeamMemberPortfolio } from "@/components/team/team-member-portfolio";
import { useDataSource } from "@/components/crm/use-data-source";

export function TeamMemberPageClient() {
  const dataSource = useDataSource();
  return <TeamMemberPortfolio key={dataSource} />;
}
