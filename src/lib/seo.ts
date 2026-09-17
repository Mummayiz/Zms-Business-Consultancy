import type { Metadata } from "next";
import { site } from "@/config/site";
import { serviceHref, services } from "@/data/services";

/** Robots directives. While business details are placeholders, nothing is indexed. */
export function robotsMeta(noindex = false): Metadata["robots"] {
  if (site.isPlaceholder || noindex) {
    return { index: false, follow: false, googleBot: { index: false, follow: false } };
  }
  return { index: true, follow: true };
}

type PageMetaInput = {
  /** Page title; the layout template appends the site name. */
  title?: string;
  /** Full title that bypasses the template (used on Home). */
  absoluteTitle?: string;
  description: string;
  /** Route path, e.g. "/about". Resolved against metadataBase for canonical and og:url. */
  path: string;
  noindex?: boolean;
};

/**
 * Per-page metadata: title, description, canonical URL, Open Graph and Twitter.
 * The Open Graph image comes from app/opengraph-image.tsx.
 */
export function pageMetadata({ title, absoluteTitle, description, path, noindex }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ?? `${title} | ${site.name}`;
  // Nested routes do not inherit app/opengraph-image, so reference it explicitly.
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} logo` };

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_AE",
      url: path,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
    robots: robotsMeta(noindex),
  };
}

/** Every indexable route, for the sitemap. */
export const sitemapRoutes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.7 },
  { path: "/services", priority: 0.9 },
  ...services.map((s) => ({ path: serviceHref(s.slug), priority: 0.9 })),
  { path: "/approach", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

/** Schema.org ProfessionalService description. No street address. */
export function organisationJsonLd() {
  const url = site.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url,
    logo: `${url}/brand/zms-logo-original.png`,
    image: `${url}/brand/zms-logo-original.png`,
    slogan: site.tagline,
    email: site.email,
    telephone: site.phone,
    areaServed: "Abu Dhabi, UAE",
    address: { "@type": "PostalAddress", addressLocality: "Abu Dhabi", addressCountry: "AE" },
    knowsAbout: services.map((s) => s.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Consultancy services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, url: `${url}${serviceHref(s.slug)}` },
      })),
    },
  };
}
