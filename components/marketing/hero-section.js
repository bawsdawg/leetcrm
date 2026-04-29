import Link from "next/link";

import { routes } from "@/config/routes";

const primaryLinkClass =
  "inline-flex items-center justify-center rounded-full bg-white px-7 py-2.5 text-center text-sm font-semibold tracking-tight text-black transition-colors hover:bg-[#e8e9ea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0081fd]";

const ghostLinkClass =
  "inline-flex items-center justify-center rounded-full border border-[rgba(214,235,253,0.19)] px-7 py-2.5 text-sm font-medium text-[#f0f0f0] hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0081fd]";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden px-6 pb-20 pt-16 sm:pb-28 sm:pt-24 md:pt-28"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="flex max-w-5xl flex-col gap-8">
          <div className="flex flex-wrap gap-3 gap-y-3 text-[0.6875rem] font-medium uppercase tracking-[0.06em] text-[#a1a4a5]">
            <span className="inline-flex rounded-full border border-[rgba(214,235,253,0.13)] px-4 py-1 text-[#f0f0f0]/90">
              Design-first SaaS scaffold
            </span>
          </div>
          <div className="flex flex-col gap-6">
            <h1
              id="hero-heading"
              className="text-display-hero font-normal leading-[1] tracking-[-0.035em] text-[#f0f0f0]"
            >
              Ship products that feel inevitable.
            </h1>
            <p className="max-w-xl font-sans text-xl leading-relaxed text-[#a1a4a5] md:text-[1.125rem]">
              A cinematic dark canvas, crisp typography, and primitives ready for auth,
              billing, and whatever you ship next—all aligned to a single design voice.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link className={primaryLinkClass} href={routes.signUp}>
            Get started free
          </Link>
          <Link className={ghostLinkClass} href={routes.login}>
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
}
