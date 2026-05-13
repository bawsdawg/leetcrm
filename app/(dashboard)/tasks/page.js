import { TasksDirectory } from "@/components/tasks/tasks-directory";
import { TasksPageHeader } from "@/components/tasks/tasks-page-header";
import { TasksSummaryStrip } from "@/components/tasks/tasks-summary-strip";
import { shellMainStudio } from "@/config/shell";
import { cn } from "@/lib/utils";

export const metadata = { title: "Opgaver · 1337-crm by Searchmind" };

export default function TasksPage() {
  return (
    <main className={cn(shellMainStudio)}>
      <TasksPageHeader />

      <TasksSummaryStrip />

      <TasksDirectory />

      <p className="font-sans text-[12px] text-fg-quiet">
        Demo-opgaver i <code className="font-mono text-[11px] text-fg-muted">lib/crm/static-data.js</code> —
        udskiftes med MongoDB Task-/WorkItem-model. Rækker linker til kundekort.
      </p>
    </main>
  );
}
