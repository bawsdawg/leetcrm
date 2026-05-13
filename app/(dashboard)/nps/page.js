import { WorkspacePlaceholder } from "@/components/crm/workspace-placeholder";

export const metadata = { title: "NPS · 1337-crm by Searchmind" };

export default function NpsPage() {
  return (
    <WorkspacePlaceholder
      title="NPS"
      description="Kampagne-send og svarhistorik mappes til `NpsResponse` — skabeloner findes som `NPS_TEMPLATES` i static data."
    />
  );
}
