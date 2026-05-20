import { supabase } from "../../../lib/supabase";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

function calcReadingTime(html) {
  const words = (html || "").replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await supabase
    .from("blogs")
    .select("title, meta_title, description, cover_image_url, published_at, slug, tags, focus_keyphrase")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "Post Not Found" };

  const seoTitle = data.meta_title || data.title;
  const ogImage =
    data.cover_image_url ||
    "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1200/v1757081567/white-logo_w6xinb.png";

  return {
    title: seoTitle,
    description: data.description || `${data.title} — Surgo Studios Ottawa`,
    keywords: [
      ...(data.focus_keyphrase ? [data.focus_keyphrase] : []),
      ...(data.tags || []),
      "video production Ottawa",
      "Surgo Studios",
    ],
    openGraph: {
      title: seoTitle,
      description: data.description || "",
      url: `https://surgostudios.com/blog/${data.slug}`,
      siteName: "Surgo Studios",
      images: [{ url: ogImage, width: 1200, height: 630, alt: data.title }],
      type: "article",
      publishedTime: data.published_at,
      authors: ["Surgo Studios"],
      tags: data.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: data.description || "",
      images: [ogImage],
    },
    alternates: {
      canonical: `https://surgostudios.com/blog/${data.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const { data: post, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !post) notFound();

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const readingMin = calcReadingTime(post.content);

  // ── Structured data ────────────────────────────────────────────────────────
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta_title || post.title,
    description: post.description || "",
    image: post.cover_image_url || "",
    datePublished: post.published_at,
    dateModified: post.published_at,
    wordCount: (post.content || "").replace(/<[^>]+>/g, " ").trim().split(/\s+/).length,
    timeRequired: `PT${readingMin}M`,
    author: {
      "@type": "Organization",
      name: "Surgo Studios",
      url: "https://surgostudios.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Surgo Studios",
      logo: {
        "@type": "ImageObject",
        url: "https://res.cloudinary.com/drt92o4ye/image/upload/v1758309720/white-logo_w6xinb_yz8p9u.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://surgostudios.com/blog/${post.slug}`,
    },
    keywords: (post.tags || []).join(", "),
    ...(post.focus_keyphrase && { about: { "@type": "Thing", name: post.focus_keyphrase } }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://surgostudios.com" },
      { "@type": "ListItem", position: 2, name: "Journal", item: "https://surgostudios.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://surgostudios.com/blog/${post.slug}` },
    ],
  };

  // FAQPage schema — powered by AI-generated faq_items stored in Supabase
  const faqItems = Array.isArray(post.faq_items) ? post.faq_items : [];
  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <main className="bg-black text-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Navbar />

      {/* Hero cover image */}
      {post.cover_image_url && (
        <div className="relative w-full h-[42vh] sm:h-[58vh] overflow-hidden">
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black" />
        </div>
      )}

      {/* Article */}
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-16">

        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-600 mb-10">
          <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-yellow-400 transition-colors">Journal</Link>
          <span>/</span>
          <span className="text-gray-500 truncate max-w-xs">{post.title}</span>
        </nav>

        <header className="mb-10">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-5 text-white">
            {post.title}
          </h1>

          {/* Byline */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span>By <span className="text-gray-300">Surgo Studios</span></span>
            {publishedDate && (
              <time dateTime={post.published_at}>{publishedDate}</time>
            )}
            <span>{readingMin} min read</span>
          </div>
        </header>

        {/* Body */}
        <article
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-headings:font-bold prose-headings:leading-snug
            prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:text-gray-200
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:my-4
            prose-strong:text-white
            prose-a:text-yellow-400 prose-a:no-underline hover:prose-a:underline
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-li:my-1
            prose-img:rounded-xl prose-img:w-full prose-img:my-8
            prose-blockquote:border-yellow-400 prose-blockquote:text-gray-400 prose-blockquote:italic
            prose-code:text-yellow-300 prose-code:bg-zinc-900 prose-code:px-1 prose-code:rounded
            [&_.faq-item]:mt-6 [&_.faq-item_h3]:text-white [&_.faq-item_h3]:text-lg [&_.faq-item_h3]:font-semibold [&_.faq-item_h3]:mb-2
            [&_.faq-item_p]:text-gray-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer byline */}
        <footer className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">
                Written by <span className="text-yellow-400 font-medium">Surgo Studios</span> — Ottawa&apos;s cinematic video production agency
              </p>
              {post.focus_keyphrase && (
                <p className="text-xs text-gray-700 mt-1">Tagged: {post.focus_keyphrase}</p>
              )}
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center px-5 py-2.5 bg-yellow-400 text-black text-sm font-semibold rounded-full hover:bg-yellow-300 transition-colors"
            >
              Book a Free Call
            </Link>
          </div>

          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-yellow-400 text-sm transition-colors"
            >
              ← Back to the Journal
            </Link>
          </div>
        </footer>
      </div>

      <Footer />
    </main>
  );
}
