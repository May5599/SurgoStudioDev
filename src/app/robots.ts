import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      "https://surgostudios.com/sitemap.xml",
      "https://surgostudios.com/video-sitemap.xml",
    ],
  };
}
