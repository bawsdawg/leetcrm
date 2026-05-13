import { WorkspacePlaceholder } from "@/components/crm/workspace-placeholder";

export const metadata = { title: "Workload · 1337-crm by Searchmind" };

export default function WorkloadPage() {
  return (
    <WorkspacePlaceholder
      title="Workload"
      description="Kapacitet pr. afdeling (`computeDeptCapacity` i static data) visualiseres her i næste iteration."
    />
  );
}
