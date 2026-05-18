"use client";

import { DataSourcePreference } from "@/components/settings/data-source-preference";
import { SettingsAdminSection } from "@/components/settings/settings-admin-section";

export function SettingsWorkspace() {
  return (
    <div className="flex flex-col gap-8">
      <header className="border-b border-border/70 pb-6">
        <h1 className="font-sans text-[22px] font-semibold tracking-tight text-fg">Indstillinger</h1>
        <p className="mt-2 max-w-prose font-sans text-[13px] leading-snug text-fg-muted">
          Datakilde for dashboards og administration af stamdata i databasen.
        </p>
      </header>

      <DataSourcePreference />

      <SettingsAdminSection />
    </div>
  );
}
