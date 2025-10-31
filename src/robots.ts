import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"], // Allow everything by default
        disallow: [
          "/api/", // prevent indexing API routes
          "/admin", // reserved admin area (if added later)
          "/drafts", // protect unpublished content
          "/_next/", // internal Next.js build routes
        ],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/"], // allow all images for Google Images
      },
      {
        userAgent: "AdsBot-Google",
        allow: ["/"], // allow Google Ads crawler
      },
    ],
    sitemap: "https://surgostudios.com/sitemap.xml",
    host: "https://surgostudios.com",
  };
}
