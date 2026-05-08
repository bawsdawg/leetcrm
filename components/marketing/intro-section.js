import { shellPaddingX } from "@/config/shell";
import { cn } from "@/lib/utils";

/** Intro band — DESIGN Body Large lead + Body supporting text */

export function IntroSection() {
  return (
    <section
      aria-labelledby="intro-heading"
      className={cn(
        "border-y border-[rgba(214,235,253,0.09)] py-20 md:py-28",
        shellPaddingX,
      )}
      style={{
        boxShadow:
          "inset 0 1px 0 0 rgba(176, 199, 217, 0.045), inset 0 -1px 0 0 rgba(176, 199, 217, 0.045)",
      }}
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-24">
        <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
          <p className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.08em] text-[#464a4d]">
            Introduction
          </p>
          <h2
            id="intro-heading"
            className="max-w-[18ch] text-[clamp(2rem,4vw,3rem)] leading-[1.06] tracking-[-0.035em] text-[#f0f0f0]"
          >
            Quiet confidence, loud craft.
          </h2>
        </div>
        <div className="flex flex-col gap-8 font-sans leading-relaxed">
          <p className="text-[1.125rem] leading-[1.65] text-[#f0f0f0] md:text-[1.125rem] md:leading-relaxed">
            Inspired by editorial layouts on a pure black stage: space is intentional,
            hierarchy is unmistakable, and accents stay icy and precise—never noisy.
          </p>
          <p className="leading-relaxed text-[#a1a4a5] md:max-w-prose">
            Searchmind teammates sign in with Google accounts on the{" "}
            <span className="text-[#f0f0f0]">@searchmind.dk</span> domain today. The same
            user record can later represent external collaborators with a reduced access
            tier—swap providers or add invites without changing the model.
          </p>
        </div>
      </div>
    </section>
  );
}
