import { SiteHeader } from "@/components/layout/site-header";
import { shellPaddingX } from "@/config/shell";
import { cn } from "@/lib/utils";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <SiteHeader />
      <div
        className={cn(
          "flex flex-1 flex-col items-center justify-center bg-canvas py-10",
          shellPaddingX,
        )}
      >
        {children}
      </div>
    </div>
  );
}
