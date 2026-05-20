"use client";

import { TemplateDetailShell } from "@/components/templates/template-detail-shell";
import { useDataSource } from "@/components/crm/use-data-source";

/**
 * @param {{ templateId: string }} props
 */
export function TemplateDetailPageClient({ templateId }) {
  const dataSource = useDataSource();
  return <TemplateDetailShell key={`${templateId}-${dataSource}`} templateId={templateId} />;
}
