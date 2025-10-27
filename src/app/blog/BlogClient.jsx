"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

export default function BlogClient({ posts }) {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <main className="relative min-h-screen bg-black text-white px-6 sm:px-12 py-20 font-[--font-merriweather-sans]">
      <div className="max-w-6xl mx-auto">
        {/* 🏷️ Hero */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Surgo Studios Journal
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Capturing the art of motion, voice, and story — where Ottawa’s
            creative pulse meets cinematic expression.
          </p>
        </motion.section>

        {/* 📰 Blog grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.length > 0 ? (
            posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative border border-gray-800 hover:border-blue-500 transition-all rounded-2xl p-8 bg-zinc-950/60 hover:bg-zinc-900 cursor-pointer overflow-hidden"
                onClick={() => setSelectedPost(post)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-all"></div>
                <h2 className="text-2xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-all leading-snug">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm mb-4">{post.date}</p>
                <p className="text-gray-300 line-clamp-3">
                  {post.description}
                </p>
                <span className="inline-block mt-4 text-blue-400 text-sm font-semibold group-hover:underline">
                  Read more →
                </span>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-full">
              No posts yet — the AI blog agent will publish soon.
            </p>
          )}
        </div>
      </div>

      {/* 🎬 Popup Reader */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 overflow-y-auto"
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative max-w-5xl mx-auto mt-20 mb-20 bg-neutral-900 rounded-2xl p-10 border border-gray-800 shadow-2xl"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-6 text-gray-400 hover:text-white text-3xl font-bold"
                aria-label="Close"
              >
                ×
              </button>

              <article className="prose prose-invert prose-lg max-w-none">
                <h1 className="text-4xl font-extrabold mb-3 text-blue-400 leading-snug">
                  {selectedPost.title}
                </h1>
                <p className="text-gray-500 text-sm mb-8">
                  {selectedPost.date}
                </p>

                <div
  className="prose prose-invert prose-lg max-w-none"
  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
/>


                <div className="mt-12 border-t border-gray-800 pt-8 text-gray-400 text-sm">
                  Written by{" "}
                  <span className="text-blue-400">Surgo Studios</span> — your
                  creative media partner in Ottawa.
                </div>
              </article>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✨ Footer */}
      <footer className="mt-32 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://surgostudios.com"
            target="_blank"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Surgo Studios
          </a>{" "}
          — Cinematic Video Production & Creative Media Agency in Ottawa.
        </p>
        <p className="mt-1">
          Follow our journey in creative storytelling and visual innovation.
        </p>
      </footer>
    </main>
  );
}
