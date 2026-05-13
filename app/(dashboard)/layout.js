import { CrmShell } from "@/components/crm/crm-shell";

/** Authenticated workspace — Agency OS shell (sidebar + top bar). */
export default function DashboardRouteGroupLayout({ children }) {
  return <CrmShell>{children}</CrmShell>;
}
