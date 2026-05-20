import { Suspense } from "react";

import { TeamMemberPageClient } from "@/components/team/team-member-page-client";
import { shellMainStudio } from "@/config/shell";
import { cn } from "@/lib/utils";

export const metadata = { title: "Team profil · 1337-crm by Searchmind" };

function Fallback() {
  return (
    <div className="flex flex-col gap-[length:var(--ds-studio-stack)]">
      <div className="h-40 animate-pulse rounded-xl bg-skeleton" />
      <div className="h-32 animate-pulse rounded-xl bg-skeleton" />
    </div>
  );
}

export default function TeamMemberPage() {
  return (
    <main className={cn(shellMainStudio)}>
      <Suspense fallback={<Fallback />}>
        <TeamMemberPageClient />
      </Suspense>
    </main>
  );
}
