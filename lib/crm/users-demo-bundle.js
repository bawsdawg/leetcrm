import { TEAM } from "@/lib/crm/static-data";
import { TASK_DEMO_USER_ID } from "@/lib/crm/task-utils";
import { AGENCY_USERS } from "@/lib/crm/users-data";
import { usersAgencyStats } from "@/lib/crm/users-utils";

export function getUsersDemoBundle() {
  return {
    source: "demo",
    users: AGENCY_USERS,
    stats: usersAgencyStats(),
    mineTeamMemberKey: TASK_DEMO_USER_ID,
    mineLabel: TEAM.find((m) => m.id === TASK_DEMO_USER_ID)?.name ?? null,
  };
}
