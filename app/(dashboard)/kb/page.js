import { WorkspacePlaceholder } from "@/components/crm/workspace-placeholder";

export const metadata = { title: "Knowledge base · 1337-crm by Searchmind" };

export default function KnowledgeBasePage() {
  return (
    <WorkspacePlaceholder
      title="Knowledge base"
      description="Artikler lagres som `KnowledgeArticle` (slug, markdown, publikation) — søgning kommer senere."
    />
  );
}
