"use client";

import { TimeEntryDetailShell } from "@/components/time/time-entry-detail-shell";
import { useDataSource } from "@/components/crm/use-data-source";

/**
 * @param {{ entryId: string }} props
 */
export function TimeEntryDetailPageClient({ entryId }) {
  const dataSource = useDataSource();
  return <TimeEntryDetailShell entryId={entryId} key={`${entryId}-${dataSource}`} dataSource={dataSource} />;
}
