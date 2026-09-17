import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Block all crawling while contact details and domain are placeholders.
  if (site.isPlaceholder) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  const url = site.url.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${url}/sitemap.xml`,
    host: url,
  };
}
