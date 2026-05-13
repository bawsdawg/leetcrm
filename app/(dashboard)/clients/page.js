import { ClientsDirectory } from "@/components/clients/clients-directory";
import { ClientsPageHeader } from "@/components/clients/clients-page-header";
import { ClientsSummaryStrip } from "@/components/clients/clients-summary-strip";
import { shellMainStudio } from "@/config/shell";
import { cn } from "@/lib/utils";

export const metadata = { title: "Kunder · 1337-crm by Searchmind" };

export default function ClientsPage() {
  return (
    <main className={cn(shellMainStudio)}>
      <ClientsPageHeader />

      <ClientsSummaryStrip />

      <ClientsDirectory variant="full" />

      <p className="font-sans text-[12px] text-fg-quiet">
        Demo-data fra <code className="font-mono text-[11px] text-fg-muted">lib/crm/static-data.js</code> —
        udskiftes senere med MongoDB via Mongoose-modellerne.
      </p>
    </main>
  );
}
