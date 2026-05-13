import { SiteHeader } from "@/components/layout/site-header";

export default function MarketingLayout({ children }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <SiteHeader />
      {children}
    </div>
  );
}
