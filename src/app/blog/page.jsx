import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import BlogClient from "./BlogClient";

export const metadata = {
  title: "Surgo Studios Blog | Ottawa Video Production & Creative Insights",
  description:
    "Cinematic stories and creative insights from Surgo Studios — Ottawa’s leading video production and podcast agency.",
};

export default async function BlogPage() {
  const blogDir = path.join(process.cwd(), "content", "blogs");

  if (!fs.existsSync(blogDir)) {
    console.warn("⚠️ No blog directory found");
    return <div className="text-white text-center py-20">No blog posts yet.</div>;
  }

  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".mdx"));

  const posts = await Promise.all(
    files.map(async (filename) => {
      const fullPath = path.join(blogDir, filename);
      const fileContent = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(fileContent);

      // ✅ Convert Markdown → clean HTML with GFM
      const processedContent = await remark()
        .use(remarkGfm)
        .use(html, { sanitize: false })
        .process(content);
      const contentHtml = processedContent.toString();

      return {
        slug: filename.replace(".mdx", ""),
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
      };
    })
  );

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return <BlogClient posts={posts} />;
}
