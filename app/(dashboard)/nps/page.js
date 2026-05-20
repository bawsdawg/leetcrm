import { NpsPageClient } from "@/components/nps/nps-page-client";
import { shellMainStudio } from "@/config/shell";
import { cn } from "@/lib/utils";

export const metadata = { title: "NPS · 1337-crm by Searchmind" };

export default function NpsPage() {
  return (
    <main className={cn(shellMainStudio)}>
      <NpsPageClient />
    </main>
  );
}
