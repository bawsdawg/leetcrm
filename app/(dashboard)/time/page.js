import { TimePageClient } from "@/components/time/time-page-client";
import { shellMainStudio } from "@/config/shell";
import { cn } from "@/lib/utils";

export const metadata = { title: "Tidsregistrering · 1337-crm by Searchmind" };

export default function TimePage() {
  return (
    <main className={cn(shellMainStudio)}>
      <TimePageClient />
    </main>
  );
}
