"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function BlogClient({ posts }) {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section className="bg-black text-white px-6 sm:px-12 py-28 max-w-7xl mx-auto">
      {/* Blog Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-16">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedPost(post)}
            className="group cursor-pointer flex flex-col overflow-hidden rounded-3xl bg-zinc-950 border border-gray-800 hover:border-purple-400 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)] transition-all duration-500"
          >
            {/* 📸 Image */}
            <div className="overflow-hidden rounded-t-3xl">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* 📝 Text content */}
            <div className="p-8 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-2xl font-bold leading-snug mb-3 group-hover:text-purple-400 transition-all">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm mb-4">{post.date}</p>
                <p className="text-gray-300 text-base line-clamp-3">
                  {post.description}
                </p>
              </div>

              <span className="inline-block mt-6 text-purple-400 font-semibold group-hover:underline">
                Read More →
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🎬 Popup Reader */}
      {/* 🎬 Popup Reader */}
<AnimatePresence>
  {selectedPost && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-50 flex items-start justify-center overflow-y-auto pt-20 px-4 sm:px-6"
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        className="relative bg-[#0d0d0d] border border-gray-800 max-w-3xl w-full mx-auto rounded-3xl p-10 shadow-2xl leading-relaxed"
      >
        <button
          onClick={() => setSelectedPost(null)}
          className="absolute top-5 right-6 text-gray-500 hover:text-white text-3xl font-light"
        >
          ×
        </button>

        <article className="max-w-none prose prose-invert prose-lg">
          {/* 🏷 Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-purple-400 leading-tight tracking-tight">
            {selectedPost.title}
          </h1>

          {/* 📅 Date */}
          <p className="text-gray-500 text-sm mb-10">{selectedPost.date}</p>

          {/* 🧾 Cleaned Blog Content */}
          {/* 🧾 Cleaned Blog Content */}
<div
  className="text-gray-200 text-[1.05rem] leading-[1.9] space-y-5"
  dangerouslySetInnerHTML={{
    __html: selectedPost.content
      // ✅ Step 1: remove markdown tokens but keep real HTML tags
      .replace(/(^|\s)([#*_`>-]+)(?=\s|$)/g, "")
      // ✅ Step 2: remove double hashes or weird leftover markdown headings
      .replace(/#+\s?/g, "")
      // ✅ Step 3: ensure paragraphs have spacing
      .replace(/<\/p><p>/g, "</p><br/><p>")
      // ✅ Step 4: trim excessive <br/>s
      .replace(/(<br\s*\/?>\s*){3,}/g, "<br/><br/>"),
  }}
/>


          {/* 🖊 Footer */}
          <div className="mt-14 border-t border-gray-800 pt-6 text-gray-400 text-sm italic">
            Written by <span className="text-purple-400 not-italic">Surgo Studios</span> —  
            Crafting stories that move Ottawa, Toronto, and beyond.
          </div>
        </article>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </section>
  );
}
