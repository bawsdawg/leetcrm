import { WorkspacePlaceholder } from "@/components/crm/workspace-placeholder";

export const metadata = { title: "Rapporter · 1337-crm by Searchmind" };

export default function ReportsPage() {
  return (
    <WorkspacePlaceholder
      title="Rapporter"
      description="Eksport og planlagte rapporter — starter med read-only views på Mongo-aggregates."
    />
  );
}
