import { shellMainStudio } from "@/config/shell";
import { cn } from "@/lib/utils";

/**
 * @param {{ title: string; description?: string; className?: string; children?: import('react').ReactNode }} props
 */
export function WorkspacePlaceholder({ title, description, className, children }) {
  return (
    <main className={cn(shellMainStudio, className)}>
      <header className="flex flex-col gap-2">
        <h2 className="font-sans text-xl font-semibold tracking-tight text-fg md:text-2xl">{title}</h2>
        {description ? (
          <p className="max-w-prose font-sans text-sm text-fg-muted">{description}</p>
        ) : null}
      </header>
      {children ? <section className="text-sm text-fg-muted">{children}</section> : null}
    </main>
  );
}
