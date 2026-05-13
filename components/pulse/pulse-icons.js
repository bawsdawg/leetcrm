import { cn } from "@/lib/utils";

function Svg({ size = 14, className, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function PulseIconSparkle({ className, size = 13 }) {
  return (
    <Svg size={size} className={className}>
      <path
        d="M12 3l1.2 4.2L17 8l-3.8 0.8L12 13l-1.2-4.2L7 8l4.2-0.8L12 3z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PulseIconTrendUp({ className, size = 12 }) {
  return (
    <Svg size={size} className={className}>
      <path
        d="M4 16l6-6 4 4 6-8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 6h6v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </Svg>
  );
}

export function PulseIconDownload({ className, size = 12 }) {
  return (
    <Svg size={size} className={className}>
      <path
        d="M12 4v11m0 0l-4-4m4 4l4-4M6 18h12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PulseIconSearch({ className, size = 14 }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </Svg>
  );
}

export function PulseIconChevronDown({ className, size = 10 }) {
  return (
    <Svg size={size} className={className}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </Svg>
  );
}

export function PulseIconChevronRight({ className, size = 12 }) {
  return (
    <Svg size={size} className={className}>
      <path d="M10 7l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </Svg>
  );
}

export function PulseIconList({ className, size = 12 }) {
  return (
    <Svg size={size} className={className}>
      <path d="M9 7h11M9 12h11M9 17h11M5 7h1M5 12h1M5 17h1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </Svg>
  );
}

export function PulseIconGrid({ className, size = 12 }) {
  return (
    <Svg size={size} className={className}>
      <path
        d="M5 5h6v6H5V5zm8 0h6v6h-6V5zm-8 8h6v6H5v-6zm8 0h6v6h-6v-6z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </Svg>
  );
}
