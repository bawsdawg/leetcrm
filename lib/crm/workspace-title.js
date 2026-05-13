import { routes } from "@/config/routes";

import { CLIENTS, CONTRACTS, TASKS } from "./static-data";

const ENTRIES = [
  [routes.pulse, "Agency Pulse"],
  [routes.clients, "Kunder"],
  [routes.contracts, "Kontrakter"],
  [routes.tasks, "Opgaver"],
  [routes.templates, "Task templates"],
  [routes.time, "Tidsregistrering"],
  [routes.workload, "Workload"],
  [routes.nps, "NPS"],
  [routes.kb, "Knowledge base"],
  [routes.team, "Team"],
  [routes.users, "Brugerstyring"],
  [routes.reports, "Rapporter"],
  [routes.settings, "Indstillinger"],
  [routes.dashboard, "Oversigt"],
];

/**
 * Title shown in CRM top bar for a pathname.
 * @param {string} pathname
 */
export function getWorkspaceTitle(pathname) {
  const clientMatch = pathname.match(/^\/clients\/([^/]+)/);
  if (clientMatch) {
    const c = CLIENTS.find((x) => x.id === clientMatch[1]);
    return c ? c.name : "Kunde";
  }

  const contractMatch = pathname.match(/^\/contracts\/([^/]+)/);
  if (contractMatch) {
    const ctr = CONTRACTS.find((x) => x.id === contractMatch[1]);
    return ctr ? `${ctr.clientName} · Aftale` : "Kontrakt";
  }

  const taskMatch = pathname.match(/^\/tasks\/([^/]+)/);
  if (taskMatch) {
    const tsk = TASKS.find((x) => x.id === taskMatch[1]);
    return tsk ? `${tsk.title} · Opgave` : "Opgave";
  }

  for (const [prefix, title] of ENTRIES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return title;
    }
  }

  return "Agency OS";
}
