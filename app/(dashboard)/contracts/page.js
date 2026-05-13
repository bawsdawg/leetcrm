import { ContractsDirectory } from "@/components/contracts/contracts-directory";
import { ContractsPageHeader } from "@/components/contracts/contracts-page-header";
import { ContractsSummaryStrip } from "@/components/contracts/contracts-summary-strip";
import { shellMainStudio } from "@/config/shell";
import { cn } from "@/lib/utils";

export const metadata = { title: "Kontrakter · 1337-crm by Searchmind" };

export default function ContractsPage() {
  return (
    <main className={cn(shellMainStudio)}>
      <ContractsPageHeader />

      <ContractsSummaryStrip />

      <ContractsDirectory />

      <p className="font-sans text-[12px] text-fg-quiet">
        Demo-kontrakter afledt fra{" "}
        <code className="font-mono text-[11px] text-fg-muted">CLIENTS</code> i{" "}
        <code className="font-mono text-[11px] text-fg-muted">lib/crm/static-data.js</code> — udskiftes
        med MongoDB Contract-modellen.
      </p>
    </main>
  );
}
