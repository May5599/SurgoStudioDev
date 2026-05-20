"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function BlogClient({ posts }) {
  return (
    <section className="bg-black text-white px-6 sm:px-12 py-28 max-w-7xl mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl bg-zinc-950 border border-gray-800 hover:border-yellow-400 hover:shadow-[0_0_40px_-10px_rgba(250,204,21,0.3)] transition-all duration-500 h-full"
            >
              {/* Cover image */}
              <div className="overflow-hidden rounded-t-3xl">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading={i < 3 ? "eager" : "lazy"}
                />
              </div>

              {/* Text */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-gray-500 text-xs mb-2">{post.date}</p>
                  <h2 className="text-xl font-bold leading-snug mb-3 group-hover:text-yellow-400 transition-all">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm line-clamp-3">{post.description}</p>
                </div>
                <span className="inline-block mt-5 text-yellow-400 text-sm font-semibold group-hover:underline">
                  Read More →
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
