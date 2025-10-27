import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export const metadata = {
  title: "Surgo Studios Blog | Ottawa Video Production & Media Insights",
  description:
    "Explore insights from Surgo Studios — Ottawa’s cinematic video production agency. Discover local media trends, creative storytelling, podcast production, and event coverage strategies.",
  openGraph: {
    title: "Surgo Studios Blog | Ottawa Video Production & Media Insights",
    description:
      "Explore Surgo Studios' creative thoughts and industry updates. From video production and podcasting to event storytelling — we capture Ottawa’s creative pulse.",
    url: "https://surgostudios.com/blog",
    siteName: "Surgo Studios",
    images: [
      {
        url: "https://res.cloudinary.com/drt92o4ye/image/upload/v1758309720/white-logo_w6xinb_yz8p9u.png",
        width: 1200,
        height: 630,
        alt: "Surgo Studios - Ottawa Video Production Blog",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
};

export default function BlogPage() {
  const blogDir = path.join(process.cwd(), "content", "blogs");
  const files = fs.readdirSync(blogDir);

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((filename) => {
      const fileContent = fs.readFileSync(path.join(blogDir, filename), "utf-8");
      const { data } = matter(fileContent);
      return {
        slug: filename.replace(".mdx", ""),
        title: data.title || "Untitled Post",
        date: new Date(data.date).toLocaleDateString("en-CA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        description: data.description || "",
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first

  return (
    <main className="min-h-screen bg-black text-white px-6 sm:px-12 py-20">
      <div className="max-w-5xl mx-auto">
        {/* 🏷️ Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Surgo Studios Blog
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Exploring Ottawa’s creative heartbeat — from video production and
            podcasting to cinematic storytelling.  
            <br />
            Created by{" "}
            <Link
              href="https://surgostudios.com"
              className="text-blue-400 hover:text-blue-300 underline transition-all"
              target="_blank"
            >
              Surgo Studios
            </Link>
            , your local media agency for cinematic content that connects.
          </p>
        </section>

        {/* 📰 Blog Listing */}
        <div className="grid md:grid-cols-2 gap-10">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="group block border border-gray-800 hover:border-blue-500 transition-all rounded-2xl p-8 bg-zinc-950/60 hover:bg-zinc-900"
              >
                <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-400 transition-all">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm mb-2">{post.date}</p>
                <p className="text-gray-300 text-base line-clamp-3">
                  {post.description}
                </p>
                <span className="inline-block mt-4 text-blue-400 text-sm font-semibold group-hover:underline">
                  Read more →
                </span>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-2">
              No posts yet. The AI blog agent will generate new articles soon.
            </p>
          )}
        </div>

        {/* ✨ Footer */}
        <footer className="mt-24 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()}{" "}
            <Link
              href="https://surgostudios.com"
              target="_blank"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Surgo Studios
            </Link>{" "}
            — Cinematic Video Production & Media Agency in Ottawa.
          </p>
          <p className="mt-1">
            Follow our journey in creative storytelling and brand transformation.
          </p>
        </footer>
      </div>
    </main>
  );
}
