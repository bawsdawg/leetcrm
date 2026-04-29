import { Fraunces, Inter } from "next/font/google";

import { SiteHeader } from "@/components/layout/site-header";
import { AppProviders } from "@/components/providers/app-providers";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * DESIGN.md uses Domaine Display for display serif — not on Google Fonts.
 * Fraunces gives a similar editorial / luxury feel until you add Domaine via `next/font/local`.
 */
const displaySerif = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-serif",
});

export const metadata = {
  title: "Design system",
  description: "Resend-inspired design system",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${displaySerif.variable}`}
    >
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-black font-sans text-[#f0f0f0] antialiased`}
      >
        <AppProviders>
          <SiteHeader />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}
