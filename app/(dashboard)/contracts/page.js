import { ContractsPageClient } from "@/components/contracts/contracts-page-client";
import { shellMainStudio } from "@/config/shell";
import { cn } from "@/lib/utils";

export const metadata = { title: "Kontrakter · 1337-crm by Searchmind" };

export default function ContractsPage() {
  return (
    <main className={cn(shellMainStudio)}>
      <ContractsPageClient />
    </main>
  );
}
