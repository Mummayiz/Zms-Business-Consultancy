import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/** Anthropic's crawlers, allowed through so a reviewer can open the staged site. */
const REVIEW_AGENTS = ["ClaudeBot", "Claude-User", "anthropic-ai"];

export default function robots(): MetadataRoute.Robots {
  const url = site.url.replace(/\/$/, "");

  /*
   * While contact details and the domain are placeholders, keep the site out of
   * search engines. Pages still send `noindex, nofollow`, so nothing is indexed
   * either way — this only controls which crawlers may fetch the pages at all.
   */
  if (site.isPlaceholder) {
    return {
      rules: [
        { userAgent: REVIEW_AGENTS, allow: "/" },
        { userAgent: "*", disallow: "/" },
      ],
    };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${url}/sitemap.xml`,
    host: url,
  };
}
