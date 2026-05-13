import { WorkspacePlaceholder } from "@/components/crm/workspace-placeholder";

export const metadata = { title: "Team · 1337-crm by Searchmind" };

export default function TeamPage() {
  return (
    <WorkspacePlaceholder
      title="Team"
      description="Roster fra `TEAM` (mock) → `TeamMember`-collection med `departmentKey` og evt. link til User."
    />
  );
}
