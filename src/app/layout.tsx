import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { site } from "@/config/site";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { organisationJsonLd, robotsMeta } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  // Only 600 is used, so 500 is not downloaded.
  weight: ["600"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  // 700 is unused; each extra weight is another font file to download.
  weight: ["400", "500", "600"],
  display: "swap",
});

// Site-wide defaults. Each page adds its own title, description, canonical and Open Graph via pageMetadata().
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: {
    default: `${site.name} | Abu Dhabi`,
    template: `%s | ${site.name}`,
  },
  description:
    "Business management consultancy in Abu Dhabi: administrative consultancy, marketing consultancy and project management services for organisations across the UAE.",
  openGraph: { type: "website", siteName: site.name, locale: "en_AE" },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false, address: false },
  robots: robotsMeta(),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr" className={`${cormorant.variable} ${montserrat.variable}`}>
      <head>
        <noscript>
          <style>{`[data-motion]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-svh flex-col">
        <JsonLd data={organisationJsonLd()} />
        <a
          href="#main"
          className="sr-only z-[60] rounded-ui bg-navy px-4 py-3 text-sm font-semibold text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
