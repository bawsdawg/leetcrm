export const metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-6 md:p-10">
      <h1 className="text-[#f0f0f0]">Settings</h1>
      <p className="max-w-prose text-sm text-[#a1a4a5]">
        Profile, team, billing portal — compose from components/features/.
      </p>
    </main>
  );
}
