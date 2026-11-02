import type { Metadata } from "next";
import Script from "next/script";
import { ViewTransition } from "react";
import "./globals.css";
import { bodyFont, technicalFont } from "@/lib/fonts";
import { noFlashThemeScript } from "@/components/theme/theme-script";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteJsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";

// OG/Twitter images come from the file-based app/opengraph-image.tsx (and
// per-post overrides), generated at build time — so none are listed here.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | Saikat Roy",
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  alternates: {
    types: { "application/rss+xml": [{ url: "/rss.xml", title: "Saikat Roy · Blog" }] },
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: "@njmsaikat",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
        <SiteJsonLd />
      </head>
      <body className={`${bodyFont.variable} ${technicalFont.variable} font-sans antialiased`}>
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-[var(--color-surface)] focus:px-4 focus:py-2 focus:text-sm"
          >
            Skip to content
          </a>
          <Header />
          {/* Cross-fades page content on client-side navigation; no-op in
              browsers without the View Transitions API. */}
          <ViewTransition>
            <main id="main">{children}</main>
          </ViewTransition>
          <Footer />
        </ThemeProvider>

        {/* Deferred past the initial load: analytics shouldn't compete with
            the main content for bandwidth/main-thread time on first paint. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId}`}
          strategy="lazyOnload"
        />
        <Script id="ga-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${site.gaMeasurementId}');
          `}
        </Script>
      </body>
    </html>
  );
}
