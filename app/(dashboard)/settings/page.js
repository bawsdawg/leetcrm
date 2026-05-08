import { auth } from "@/auth";
import { ACCESS_TIERS } from "@/lib/constants/access-tiers";

export const metadata = { title: "Settings · 1337-crm by Searchmind" };

export default async function SettingsPage() {
  const session = await auth();

  const tierRaw =
    typeof session?.user?.accessTier === "string"
      ? session.user.accessTier
      : ACCESS_TIERS.INTERNAL_FULL;
  const tier =
    tierRaw === ACCESS_TIERS.EXTERNAL_LIMITED
      ? `${ACCESS_TIERS.EXTERNAL_LIMITED} — external collaborators (future invites)`
      : `${ACCESS_TIERS.INTERNAL_FULL} — Searchmind workspace`;

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 md:p-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-[#f0f0f0]">Settings</h1>
        <p className="max-w-prose font-sans text-sm text-[#a1a4a5]">
          Account details come from your session; deeper controls (team, billing) can
          stack on this page.
        </p>
      </div>

      <ul className="max-w-lg list-inside list-disc space-y-2 font-sans text-sm text-[#a1a4a5]">
        <li>
          <span className="text-[#464a4d]">Access model:</span> {tier}
        </li>
        <li>
          Profile fields are mirrored from Google on each sign-in and stored in MongoDB
          for reporting and future roles.
        </li>
      </ul>
    </main>
  );
}
