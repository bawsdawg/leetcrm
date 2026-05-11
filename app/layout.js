import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

import { SiteHeader } from "@/components/layout/site-header";
import { AppProviders } from "@/components/providers/app-providers";
import { themeInitScriptInnerHtml } from "@/components/theme/theme-init-script";
import { site } from "@/config/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
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
  title: "1337-crm by Searchmind",
  description: site.description,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${displaySerif.variable} ${jetbrainsMono.variable}`}
      data-theme="dark"
      data-density="compact"
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-canvas font-sans text-fg antialiased`}
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScriptInnerHtml() }}
          suppressHydrationWarning
        />
        <AppProviders>
          <SiteHeader />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}
