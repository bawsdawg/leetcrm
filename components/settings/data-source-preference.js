"use client";

import { PulseSegmentedControl } from "@/components/pulse/pulse-segmented-control";
import { setDataSource, useDataSource } from "@/components/crm/use-data-source";
import { cn } from "@/lib/utils";

export function DataSourcePreference() {
  const mode = useDataSource();

  return (
    <section className="rounded-2xl border border-border bg-surface-card p-5 shadow-inset-card md:p-6">
      <h2 className="font-sans text-base font-semibold text-fg">Datakilde</h2>
      <p className="mt-2 max-w-prose font-sans text-[13px] leading-snug text-fg-muted">
        Vælg om Agency Pulse (og senere flere moduler) læser fra{" "}
        <span className="font-medium text-fg">MongoDB</span> eller fra den indbyggede{" "}
        <span className="font-medium text-fg">demo</span>-pakke. Valget gemmes i browseren på denne
        enhed.
      </p>
      <div className="mt-4">
        <PulseSegmentedControl
          size="sm"
          active={mode}
          onChange={(id) => setDataSource(id === "database" ? "database" : "demo")}
          tabs={[
            { id: "demo", label: "Demo-data" },
            { id: "database", label: "Database" },
          ]}
        />
      </div>
      <p
        className={cn(
          "mt-3 font-sans text-[12px]",
          mode === "database" ? "text-agency-ok" : "text-fg-quiet",
        )}
      >
        {mode === "database"
          ? "Aktiv: data fra MongoDB (Pulse inkluderer også rækker med isTest)."
          : "Aktiv: statisk demo fra lib/crm/static-data.js."}
      </p>
    </section>
  );
}
