import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { sitemapRoutes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = site.url.replace(/\/$/, "");
  return sitemapRoutes.map(({ path, priority }) => ({
    url: path === "/" ? url : `${url}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
