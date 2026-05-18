import { PulseDashboard } from "@/components/pulse/pulse-dashboard";
import { shellMainStudio } from "@/config/shell";
import { cn } from "@/lib/utils";

export const metadata = { title: "Agency Pulse · 1337-crm by Searchmind" };

export default function PulsePage() {
  return (
    <main className={cn(shellMainStudio)}>
      <PulseDashboard />
    </main>
  );
}
