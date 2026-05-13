import { shellMainStudio } from "@/config/shell";
import { cn } from "@/lib/utils";

export const metadata = { title: "Indstillinger · 1337-crm by Searchmind" };

export default function SettingsPage() {
  return (
    <main className={cn(shellMainStudio)}>
      <header className="border-b border-border/70 pb-6">
        <h1 className="font-sans text-[22px] font-semibold tracking-tight text-fg">Indstillinger</h1>
        <p className="mt-2 max-w-prose font-sans text-[13px] leading-snug text-fg-muted">
          Denne side er tømt i demo-build — avancerede præferencer og account-flows kan tilføjes senere.
        </p>
      </header>
    </main>
  );
}
