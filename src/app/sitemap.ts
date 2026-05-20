import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: "https://surgostudios.com",
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://surgostudios.com/services",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://surgostudios.com/about",
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
      priority: 0.9,
    },
    {
      url: "https://surgostudios.com/client-stories",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://surgostudios.com/blog",
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
      url: "https://surgostudios.com/privacy-policy",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://surgostudios.com/terms",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamically include published blog posts so Google indexes each one
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data } = await supabase
      .from("blogs")
      .select("slug, published_at")
      .order("published_at", { ascending: false });

    if (data) {
      blogRoutes = data.map((post) => ({
        url: `https://surgostudios.com/blog/${post.slug}`,
        lastModified: post.published_at ? new Date(post.published_at) : lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    }
  } catch {
    // Supabase unavailable at build time   skip dynamic posts
  }

  return [...staticRoutes, ...blogRoutes];
}
