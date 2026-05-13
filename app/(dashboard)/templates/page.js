import { TemplatesDirectory } from "@/components/templates/templates-directory";
import { TemplatesPageHeader } from "@/components/templates/templates-page-header";
import { TemplatesSummaryStrip } from "@/components/templates/templates-summary-strip";
import { shellMainStudio } from "@/config/shell";
import { cn } from "@/lib/utils";

export const metadata = { title: "Task templates · 1337-crm by Searchmind" };

export default function TemplatesPage() {
  return (
    <main className={cn(shellMainStudio)}>
      <TemplatesPageHeader />

      <TemplatesSummaryStrip />

      <TemplatesDirectory />

      <p className="font-sans text-[12px] text-fg-quiet">
        Demo-skabeloner i <code className="font-mono text-[11px] text-fg-muted">TASK_TEMPLATES</code> i{" "}
        <code className="font-mono text-[11px] text-fg-muted">lib/crm/static-data.js</code> — erstattes med versionsstyret
        TaskTemplate-lager + provisioning API.
      </p>
    </main>
  );
}
