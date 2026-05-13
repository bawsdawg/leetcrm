/**
 * @param {{ title: string; sub?: string }} props
 */
export function PulseCardHeader({ title, sub }) {
  return (
    <header>
      <h3 className="font-sans text-base font-semibold tracking-tight text-fg">{title}</h3>
      {sub ? <p className="mt-1 max-w-prose font-sans text-[13px] leading-snug text-fg-muted">{sub}</p> : null}
    </header>
  );
}
