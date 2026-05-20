"use client";

import { TemplatesPortfolio } from "@/components/templates/templates-portfolio";
import { useDataSource } from "@/components/crm/use-data-source";

export function TemplatesPageClient() {
  const dataSource = useDataSource();
  return <TemplatesPortfolio key={dataSource} />;
}
