import { shellPaddingX } from "@/config/shell";
import { cn } from "@/lib/utils";

/** Intro band — DESIGN Body Large lead + Body supporting text */

export function IntroSection() {
  return (
    <section
      aria-labelledby="intro-heading"
      className={cn("border-y border-border-muted py-20 md:py-28", shellPaddingX, "edge-inset-lines")}
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-24">
        <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
          <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.08em] text-fg-soft">
            Introduction
          </p>
          <h2
            id="intro-heading"
            className="max-w-[18ch] text-[clamp(2rem,4vw,3rem)] leading-[1.06] tracking-[-0.035em] text-fg"
          >
            Quiet confidence, loud craft.
          </h2>
        </div>
        <div className="flex flex-col gap-8 font-sans leading-relaxed">
          <p className="text-[1.125rem] leading-[1.65] text-fg md:text-[1.125rem] md:leading-relaxed">
            Inspired by editorial layouts on a pure black stage: space is intentional,
            hierarchy is unmistakable, and accents stay icy and precise—never noisy.
          </p>
          <p className="leading-relaxed text-fg-muted md:max-w-prose">
            Searchmind teammates sign in with Google accounts on the{" "}
            <span className="text-fg">@searchmind.dk</span> domain today. The same
            user record can later represent external collaborators with a reduced access
            tier—swap providers or add invites without changing the model.
          </p>
        </div>
      </div>
    </section>
  );
}
