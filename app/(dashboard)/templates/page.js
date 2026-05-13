import { WorkspacePlaceholder } from "@/components/crm/workspace-placeholder";

export const metadata = { title: "Task templates · 1337-crm by Searchmind" };

export default function TemplatesPage() {
  return (
    <WorkspacePlaceholder
      title="Task templates"
      description="Standardiserede opgave-skabeloner — bygges oven på Task + TaskTemplate (når de lander i databasen)."
    />
  );
}
