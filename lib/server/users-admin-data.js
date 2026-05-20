import TeamMember from "@/lib/db/models/team-member";
import User from "@/lib/db/models/user";
import { ACCESS_TIERS } from "@/lib/constants/access-tiers";
import { usersAgencyStatsFromList } from "@/lib/crm/users-utils";
import { connectDb } from "@/lib/db/mongoose";
import { assigneeMemberKeyForDbUser } from "@/lib/server/session-team-member";

/**
 * Auth-brugere fra `User` — kobling til roster via `TeamMember.userId`.
 * Ingen seed-brugere: listen er tom indtil SSO opretter konti.
 *
 * @param {{ session?: unknown }} [opts]
 */
export async function fetchUsersAdminPortfolio(opts = {}) {
  await connectDb();
  const usersRaw = await User.find().sort({ email: 1 }).lean();
  const ids = usersRaw.map((u) => u._id).filter((id) => id != null);

  const members =
    ids.length > 0 ?
      await TeamMember.find({ userId: { $in: ids } })
        .select("key userId")
        .lean()
    : [];
  /** @type {Map<string, string>} */
  const keyByUserId = new Map(
    members.map((m) => [String(m.userId), String(m.key ?? "")]),
  );

  const rows = usersRaw.map((doc) => {
    const oid = String(doc._id);
    const tier = String(doc.accessTier ?? "");
    const platformRole = tier === ACCESS_TIERS.EXTERNAL_LIMITED ? "readonly" : "member";
    const teamMemberId = keyByUserId.get(oid) || null;
    const updated = doc.updatedAt ? new Date(doc.updatedAt).toISOString() : null;
    return {
      id: `u-${oid}`,
      email: String(doc.email ?? ""),
      name: String(doc.name ?? doc.email ?? "?"),
      platformRole,
      status: /** @type {const} */ ("active"),
      teamMemberId,
      mfaEnabled: false,
      lastSeenAt: updated,
      invitedAt: null,
      provisionedVia: String(doc.provisionedVia ?? "workspace_google_sso"),
    };
  });

  /** @type {string | null} */
  let mineTeamMemberKey = null;
  /** @type {string | null} */
  let mineLabel = null;
  if (opts.session != null) {
    mineTeamMemberKey = await assigneeMemberKeyForDbUser(opts.session);
    const match = rows.find((r) => r.teamMemberId && mineTeamMemberKey && r.teamMemberId === mineTeamMemberKey);
    mineLabel = match?.name ?? null;
  }

  return {
    source: "database",
    users: rows,
    stats: usersAgencyStatsFromList(rows),
    mineTeamMemberKey,
    mineLabel,
  };
}
