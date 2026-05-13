import { cn } from "@/lib/utils";

/**
 * @param {{
 *   task: {
 *     hint?: string | null;
 *     dept: string;
 *     title: string;
 *     status: string;
 *   };
 * }} props
 */
export function TaskDetailDescriptionCard({ task }) {
  const hint =
    task.hint?.trim() ||
    "Kort beskrivelse ikke sat — udvid feltet `hint` i demo `TASKS` for flere rækker i listen.";

  const bullets = [
    "Leverancen dokumenteres synligt for account + kunde før lukning.",
    "Leverance kan opridses på ét slide i status eller stand-up.",
    task.status === "blocked"
      ? "Blokering: afvent dokumenteret clearance fra ekstern part."
      : "Mindst ét check-in før forfaldsdato hvis estimation > 3 dages arbejde.",
  ];

  return (
    <div className="rounded-2xl border border-border bg-surface-card p-4 shadow-inset-card md:p-5">
      <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">Opgavespec (mock)</h2>
      <p className="mt-3 font-sans text-[13px] leading-relaxed text-fg-muted">{hint}</p>
      <div className="mt-5 border-t border-border-soft pt-4">
        <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-fg-soft">Acceptkriterier (stub)</h3>
        <ul className={cn("mt-3 flex list-disc flex-col gap-2 pl-[1.05rem] font-sans text-[12.5px] leading-snug text-fg-muted")}>
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
