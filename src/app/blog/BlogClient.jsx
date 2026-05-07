"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

export default function BlogClient({ posts }) {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section className="bg-black text-white px-6 sm:px-12 py-28 max-w-7xl mx-auto">

      {/* Blog Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedPost(post)}
            className="group cursor-pointer flex flex-col overflow-hidden rounded-3xl bg-zinc-950 border border-gray-800 hover:border-purple-400 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)] transition-all duration-500"
          >
            {/* Cover image */}
            <div className="overflow-hidden rounded-t-3xl">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Text */}
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <p className="text-gray-500 text-xs mb-2">{post.date}</p>
                <h2 className="text-xl font-bold leading-snug mb-3 group-hover:text-purple-400 transition-all">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm line-clamp-3">{post.description}</p>
              </div>
              <span className="inline-block mt-5 text-purple-400 text-sm font-semibold group-hover:underline">
                Read More →
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal reader */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-end sm:items-center justify-center sm:p-6 overflow-hidden"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#0d0d0d] border border-zinc-800 w-full sm:max-w-3xl sm:rounded-3xl rounded-t-3xl overflow-y-auto max-h-[92vh] shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-10 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-full p-2 transition"
              >
                <X size={18} />
              </button>

              {/* Cover image */}
              {selectedPost.coverImage && selectedPost.coverImage !== "/default-blog-cover.jpg" && (
                <div className="w-full h-52 sm:h-72 overflow-hidden sm:rounded-t-3xl rounded-t-3xl">
                  <img
                    src={selectedPost.coverImage}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <article className="px-6 sm:px-10 py-8">
                <h1 className="text-2xl sm:text-4xl font-extrabold mb-3 text-purple-400 leading-tight">
                  {selectedPost.title}
                </h1>
                <p className="text-gray-500 text-sm mb-8">{selectedPost.date}</p>

                <div
                  className="text-gray-200 text-[1rem] leading-[1.85] space-y-4
                    [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-8 [&_h1]:mb-3
                    [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-6 [&_h2]:mb-2
                    [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-200 [&_h3]:mt-4
                    [&_p]:text-gray-300 [&_strong]:text-white
                    [&_img]:w-full [&_img]:rounded-xl [&_img]:my-6"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />

                <div className="mt-12 border-t border-zinc-800 pt-6 text-gray-500 text-sm italic">
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
