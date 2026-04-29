export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-6 md:p-10">
      <h1 className="text-lg font-medium text-[#f0f0f0]">Dashboard</h1>
      <p className="max-w-prose text-sm text-[#a1a4a5]">
        Protected app area — add charts, workspaces, onboarding here.
      </p>
    </main>
  );
}
