"use client";

import { UsersPortfolio } from "@/components/users/users-portfolio";
import { useDataSource } from "@/components/crm/use-data-source";

export function UsersPageClient() {
  const dataSource = useDataSource();
  return <UsersPortfolio key={dataSource} />;
}
