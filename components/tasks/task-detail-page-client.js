"use client";

import { TaskDetailShell } from "@/components/tasks/task-detail-shell";
import { useDataSource } from "@/components/crm/use-data-source";

/**
 * @param {{ taskId: string }} props
 */
export function TaskDetailPageClient({ taskId }) {
  const dataSource = useDataSource();
  return <TaskDetailShell key={`${taskId}-${dataSource}`} taskId={taskId} />;
}
