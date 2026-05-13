import { WorkspacePlaceholder } from "@/components/crm/workspace-placeholder";

export const metadata = { title: "Tidsregistrering · 1337-crm by Searchmind" };

export default function TimePage() {
  return (
    <WorkspacePlaceholder
      title="Tidsregistrering"
      description="Ugereolen og rapporter kobles på `TimeEntry` med billable-flag — demo: `TIME_ENTRIES_TODAY` i static data."
    />
  );
}
