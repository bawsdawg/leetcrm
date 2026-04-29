import Link from "next/link";

import { routes } from "@/config/routes";

export function CtaSection() {
  return (
    <section aria-labelledby="cta-heading" className="px-6 pb-24 pt-4 sm:pb-28 md:pb-32">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[rgba(214,235,253,0.19)] bg-[radial-gradient(120%_140%_at_20%_-20%,rgba(59,158,255,0.06),transparent_52%),linear-gradient(#000,#000)] px-10 py-16 sm:px-14 md:py-20 [box-shadow:rgba(176,199,217,0.085)_0px_0px_0px_1px_inset]">
        <div className="flex max-w-xl flex-col gap-6">
          <h2 id="cta-heading" className="text-[#f0f0f0]">
            Start from a canvas that already feels finished.
          </h2>
          <p className="font-sans leading-relaxed text-[#a1a4a5]">
            Create an account in minutes, iterate in the dashboard, invite your team when
            you&apos;re ready—your product surface grows with the stack you choose.
          </p>
          <Link
            className="mt-4 inline-flex w-fit items-center justify-center rounded-full bg-white px-8 py-2.5 text-sm font-semibold text-black hover:bg-[#e8e9ea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0081fd]"
            href={routes.signUp}
          >
            Create your workspace
          </Link>
        </div>
      </div>
    </section>
  );
}
