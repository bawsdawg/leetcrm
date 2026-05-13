import { AGENCY_USERS } from "./users-data";

/** @param {'admin'|'lead'|'finance'|'member'|'readonly'} role */
export function agencyPlatformRoleLabel(role) {
  if (role === "admin") return "Administrator";
  if (role === "lead") return "Lead";
  if (role === "finance") return "Økonomi";
  if (role === "readonly") return "Kun læsning";
  return "Standard";
}

/** @param {string} id */
export function getAgencyUserById(id) {
  return AGENCY_USERS.find((u) => u.id === id) ?? null;
}

export function usersAgencyStats() {
  const active = AGENCY_USERS.filter((u) => u.status === "active").length;
  const invited = AGENCY_USERS.filter((u) => u.status === "invited").length;
  const suspended = AGENCY_USERS.filter((u) => u.status === "suspended").length;
  const adminish = AGENCY_USERS.filter(
    (u) => u.status === "active" && (u.platformRole === "admin" || u.platformRole === "lead"),
  ).length;
  const withMfa = AGENCY_USERS.filter((u) => u.status === "active" && u.mfaEnabled).length;
  const mfaPct = active > 0 ? Math.round((withMfa / active) * 100) : 0;

  return {
    total: AGENCY_USERS.length,
    active,
    invited,
    suspended,
    adminish,
    withMfa,
    mfaPct,
  };
}
