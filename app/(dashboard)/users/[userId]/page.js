import { notFound } from "next/navigation";

import { UsersAccountHeader, UsersAccountMetaCard } from "@/components/users/users-account-detail";
import { shellMainStudio } from "@/config/shell";
import { getAgencyUserById } from "@/lib/crm/users-utils";
import { cn } from "@/lib/utils";

/** @param {{ params: Promise<{ userId: string }> }} props */
export async function generateMetadata({ params }) {
  const { userId } = await params;
  const u = getAgencyUserById(userId);
  if (!u) return { title: "Brugerstyring · 1337-crm by Searchmind" };
  return { title: `${u.name} · Brugerstyring · 1337-crm by Searchmind` };
}

/** @param {{ params: Promise<{ userId: string }> }} props */
export default async function UserAccountPage({ params }) {
  const { userId } = await params;
  const user = getAgencyUserById(userId);
  if (!user) notFound();

  return (
    <main className={cn(shellMainStudio)}>
      <UsersAccountHeader user={user} />
      <UsersAccountMetaCard user={user} />
      <p className="font-sans text-[12px] text-fg-quiet">
        Redigering, session revoke og rolle-skift er ikke tilsluttet — kun Agency OS shell (demo).
      </p>
    </main>
  );
}
