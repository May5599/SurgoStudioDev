import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import BlogClient from "./BlogClient";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

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
      "Explore behind-the-scenes stories, cinematic trends, and production insights from Ottawa and Toronto’s most forward-thinking video studio.",
    url: "https://surgostudios.com/blog",
    images: [
      {
        url: "/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "Surgo Studios Journal - Creative Blog",
      },
    ],
  },
};

export default async function BlogPage() {
  const blogDir = path.join(process.cwd(), "content", "blogs");
  if (!fs.existsSync(blogDir)) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <Navbar />
        <h1 className="text-3xl font-semibold mt-10">No posts yet.</h1>
        <Footer />
      </main>
    );
  }

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
  const posts = await Promise.all(
    files.map(async (file) => {
      const content = fs.readFileSync(path.join(blogDir, file), "utf8");
      const { data, content: markdown } = matter(content);

      const processed = await remark()
        .use(remarkGfm)
        .use(html, { sanitize: false })
        .process(markdown);
      const contentHtml = processed.toString();

      return {
        slug: file.replace(".mdx", ""),
        title: data.title || "Untitled Post",
        date: data.date
          ? new Date(data.date).toLocaleDateString("en-CA", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "",
        description: data.description || "",
        content: contentHtml,
        coverImage: data.coverImage || "/default-blog-cover.jpg",
      };
    })
  );

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <Navbar />
      {/* 🎬 HERO */}
      <section className="relative bg-black text-white text-center py-32 md:py-48 overflow-hidden">
        <h1 className="text-6xl md:text-[8rem] font-extrabold tracking-tight uppercase leading-none">
          Surgo Journal
        </h1>
        <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
          Stories. Ideas. Frames.  
          The cinematic voice of Ottawa & Toronto’s creative studio.
        </p>
      </section>

      {/* 📰 Blog posts */}
      <BlogClient posts={posts} />

      {/* 🦶 Footer */}
      <Footer />
    </>
  );
}
