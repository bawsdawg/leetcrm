"use client";

import { TasksPortfolio } from "@/components/tasks/tasks-portfolio";
import { useDataSource } from "@/components/crm/use-data-source";

export function TasksPageClient() {
  const dataSource = useDataSource();
  return <TasksPortfolio key={dataSource} />;
}
