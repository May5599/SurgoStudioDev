import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/", // allow Googlebot & all crawlers to index everything
      disallow: [], // keep empty unless you want to block pages (e.g., /admin)
    },
    sitemap: "https://surgostudios.com/sitemap.xml",
  };
}
