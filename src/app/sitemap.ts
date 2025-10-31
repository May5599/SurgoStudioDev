import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://surgostudios.com",
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0, // homepage gets max priority
    },
    {
      url: "https://surgostudios.com/about",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://surgostudios.com/services",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://surgostudios.com/portfolio",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://surgostudios.com/podcast",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://surgostudios.com/blog", // 📰 your Surgo Journal or blog section
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://surgostudios.com/contact",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://surgostudios.com/studio", // optional, if you plan to add
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://surgostudios.com/careers", // optional future-proof SEO
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
