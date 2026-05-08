import { shellPaddingX } from "@/config/shell";
import { cn } from "@/lib/utils";

export default function AuthLayout({ children }) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center bg-canvas py-10",
        shellPaddingX,
      )}
    >
      {children}
    </div>
  );
}
