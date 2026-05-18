import { SettingsWorkspace } from "@/components/settings/settings-workspace";
import { shellMainStudio } from "@/config/shell";
import { cn } from "@/lib/utils";

export const metadata = { title: "Indstillinger · 1337-crm by Searchmind" };

export default function SettingsPage() {
  return (
    <main className={cn(shellMainStudio)}>
      <SettingsWorkspace />
    </main>
  );
}
