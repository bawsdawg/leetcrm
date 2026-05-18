import { ClientsPortfolio } from "@/components/clients/clients-portfolio";
import { shellMainStudio } from "@/config/shell";
import { cn } from "@/lib/utils";

export const metadata = { title: "Kunder · 1337-crm by Searchmind" };

export default function ClientsPage() {
  return (
    <main className={cn(shellMainStudio)}>
      <ClientsPortfolio />
    </main>
  );
}
