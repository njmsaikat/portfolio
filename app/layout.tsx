import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { bodyFont, technicalFont } from "@/lib/fonts";
import { noFlashThemeScript } from "@/components/theme/theme-script";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MessengerChat } from "@/components/MessengerChat";
import { SiteJsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | Saikat Roy",
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [{ url: site.defaultOgImage }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.defaultOgImage],
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
          <Header />
          <main>{children}</main>
          <Footer />
          <MessengerChat />
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
