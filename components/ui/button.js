import { cn } from "@/lib/utils";

/**
 * @param {{
 *   className?: string
 *   children?: import("react").ReactNode
 *   type?: "button" | "submit"
 * }} props
 */
export function Button({ className, children, type = "button", ...props }) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium",
        "border border-border bg-transparent text-fg",
        "hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
