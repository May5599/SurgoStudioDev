import { supabase } from "../../lib/supabase";
import BlogClient from "./BlogClient";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Surgo Studios Journal | Ottawa & Toronto Video Production Insights",
  description:
    "Creative insights, stories, and cinematic breakdowns from Surgo Studios — the leading video and podcast production agency in Ottawa and Toronto.",
  keywords: [
    "Ottawa video production",
    "Toronto video agency",
    "film production Ontario",
    "creative storytelling Canada",
    "corporate video",
    "podcast studio Ottawa",
  ],
  openGraph: {
    title: "Surgo Studios Journal | Creative Video Production Blog",
    description:
      "Explore behind-the-scenes stories, cinematic trends, and production insights from Ottawa and Toronto's most forward-thinking video studio.",
    url: "https://surgostudios.com/blog",
    siteName: "Surgo Studios",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1200/v1757010350/VAF02794_copy_fv8vur.jpg",
        width: 1200,
        height: 630,
        alt: "Surgo Studios Journal - Ottawa Video Production Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@surgostudios",
    creator: "@surgostudios",
    title: "Surgo Studios Journal | Ottawa Video Production Insights",
    description:
      "Behind-the-scenes stories, cinematic trends, and production insights from Ottawa's leading video studio.",
    images: [
      "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1200/v1757010350/VAF02794_copy_fv8vur.jpg",
    ],
  },
  alternates: {
    canonical: "https://surgostudios.com/blog",
  },
};

export default async function BlogPage() {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Failed to load blogs:", error.message);
  }

  const posts = (data || []).map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.published_at
      ? new Date(post.published_at).toLocaleDateString("en-CA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "",
    description: post.description || "",
    content: post.content || "",
    coverImage: post.cover_image_url || "/default-blog-cover.jpg",
    tags: post.tags || [],
  }));

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative bg-black text-white text-center py-32 md:py-48 overflow-hidden">
        <h1 className="text-6xl md:text-[8rem] font-extrabold tracking-tight uppercase leading-none">
          Surgo Journal
        </h1>
        <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
          Stories. Ideas. Frames.
          <br />
          The cinematic voice of Ottawa &amp; Toronto&apos;s creative studio.
        </p>
      </section>

      {posts.length === 0 ? (
        <section className="bg-black text-white text-center py-32">
          <p className="text-gray-500 text-lg">No posts yet   check back soon.</p>
        </section>
      ) : (
        <BlogClient posts={posts} />
      )}

      <Footer />
    </>
  );
}
