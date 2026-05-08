import { shellPaddingX } from "@/config/shell";
import { cn } from "@/lib/utils";

export const metadata = { title: "Privacy · 1337-crm by Searchmind" };

export default function PrivacyPage() {
  return (
    <main
      className={cn(
        "mx-auto flex flex-1 max-w-prose flex-col gap-4 py-24",
        shellPaddingX,
      )}
    >
      <h1 className="text-fg">Privacy</h1>
      <p className="text-sm text-fg-muted">Policy content goes here.</p>
    </main>
  );
}
