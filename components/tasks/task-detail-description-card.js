import { cn } from "@/lib/utils";

/**
 * @param {{
 *   task: {
 *     hint?: string | null;
 *     dept: string;
 *     title: string;
 *     status: string;
 *   };
 *   mode?: "demo" | "database";
 * }} props
 */
export function TaskDetailDescriptionCard({ task, mode = "demo" }) {
  const hint =
    task.hint?.trim() ||
    "Kort beskrivelse ikke sat — fyld CRM-feltet `hint` eller brug aktivitetsloggen til nuancerede noter.";

  const bullets = [
    "Leverancen dokumenteres synligt for account og kunde før lukning.",
    "Mindst ét check-in før forfaldsdato hvis estimation overstiger cirka tre mandagsdages arbejde.",
    mode === "database"
      ? "Ændringer synces direkte mod Mongo-tasken — gem via CRM-panelet eller API."
      : "Mindst ét check-in før forfaldsdato hvis estimation > 3 dages arbejde (stub).",
  ];

  const titleChip = mode === "database" ? "Opgavenote (CRM)" : "Opgavespec (demo)";

  return (
    <div className="rounded-2xl border border-border bg-surface-card p-4 shadow-inset-card md:p-5">
      <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">{titleChip}</h2>
      <p className="mt-3 font-sans text-[13px] leading-relaxed text-fg-muted">{hint}</p>
      <div className="mt-5 border-t border-border-soft pt-4">
        <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">Acceptlinjer</h3>
        <ul
          className={cn(
            "mt-3 flex list-disc flex-col gap-2 pl-[1.05rem] font-sans text-[12.5px] leading-snug text-fg-muted",
          )}
        >
          {bullets.map((b, i) => (
            <li key={String(i)}>
              {b}
              {i === bullets.length - 1 && task.status === "blocked" ?
                <>
                  {" "}
                  <span className="text-agency-warn">
                    Aktiv blokering kræver dokumenteret årsag i kommentar eller log.
                  </span>
                </>
              : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
