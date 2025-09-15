"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, X } from "lucide-react";

const portfolioItems = [
  {
    title: "DRYP",
    video: "https://res.cloudinary.com/duwtym7w7/video/upload/f_auto,q_auto/v1757613934/DRYP_30_4K_H265_Final_zwxg2r.mp4",
    poster: "https://res.cloudinary.com/duwtym7w7/video/upload/f_auto,q_auto,w_960/v1757613934/DRYP_30_4K_H265_Final_zwxg2r.jpg",
  },
  {
    title: "Westmount Capital",
    video: "https://res.cloudinary.com/duwtym7w7/video/upload/f_auto,q_auto/v1757613934/New_Logo_1_e8hhzs.mp4",
    poster: "https://res.cloudinary.com/duwtym7w7/video/upload/f_auto,q_auto,w_960/v1757613934/New_Logo_1_e8hhzs.jpg",
  },
  {
    title: "The Green Knight",
    video: "https://res.cloudinary.com/duwtym7w7/video/upload/f_auto,q_auto/v1757613937/THE_GREEN_KNIGHT_-__PROMO_5__HERO_16x9_gsscrh.mov",
    poster: "https://res.cloudinary.com/duwtym7w7/video/upload/f_auto,q_auto,w_960/v1757613937/THE_GREEN_KNIGHT_-__PROMO_5__HERO_16x9_gsscrh.jpg",
  },
  {
    title: "Event Conference",
    video: "https://res.cloudinary.com/duwtym7w7/video/upload/f_auto,q_auto/v1757613934/cut_v1s354.mp4",
    poster: "https://res.cloudinary.com/duwtym7w7/video/upload/f_auto,q_auto,w_960/v1757613934/cut_v1s354.jpg",
  },
];

export default function PortfolioPreview() {
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = useRef([]);

  // Intersection Observer for lazy video loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.load(); // load only when visible
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    videoRefs.current.forEach((v) => v && observer.observe(v));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative py-20 px-4 sm:px-6 bg-black text-white overflow-hidden"
      aria-label="Portfolio showcase of Surgo Studios"
    >
      <div className="max-w-7xl mx-auto space-y-12 text-center relative z-10">
        {/* Heading */}
        <motion.header
          initial={{ x: 150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-3"
        >
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Our Work in Motion
          </h2>
          <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto">
            Cinematic campaigns and brand stories crafted by Surgo Studios.
          </p>
        </motion.header>

        {/* Grid – 2x2 on desktop, full width on mobile */}
        <motion.div
  initial={{ y: 100, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
  viewport={{ once: true }}
  className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 px-2 sm:px-4"
>
  {portfolioItems.map((item, i) => (
    <motion.div
      key={i}
      className="relative group overflow-hidden 
                 shadow-[0_20px_60px_-15px_rgba(255,255,255,0.08)] 
                 rounded-[25%_8%_35%_12%/15%_35%_25%_8%] 
                 bg-[#121212] transition duration-500 hover:scale-[1.02]"
      whileHover={{ scale: 1.03 }}
    >
      <div className="relative w-full aspect-video overflow-hidden">
        {/* Video preview */}
        <video
          src={item.video}
          poster={item.poster}
          preload="none"
          muted
          playsInline
          loop
          className="w-full h-full object-cover transition-transform duration-500 
                     group-hover:scale-105 group-hover:rotate-[0.5deg]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-20" />

        {/* Title */}
        <div className="absolute top-3 left-3 bg-black/70 text-[10px] sm:text-sm text-white px-2 sm:px-3 py-0.5 sm:py-1 
                        rounded-full font-semibold tracking-wide shadow-lg backdrop-blur-sm">
          {item.title}
        </div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setActiveVideo(item)}
            className="relative z-10 p-2 sm:p-3 rounded-full border-2 border-white/30 
                       hover:border-white/70 bg-white/10 backdrop-blur-md transition"
          >
            <PlayCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md" />
            <div className="absolute inset-0 rounded-full border border-white/20 animate-ping" />
          </button>
        </div>
      </div>
    </motion.div>
  ))}
</motion.div>

      </div>

      {/* Modal Video Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-2"
          >
            <div className="relative w-full max-w-5xl h-[70vh] rounded-xl overflow-hidden shadow-2xl border border-white/20">
              <video
                src={activeVideo.video}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Close video"
                className="absolute top-3 right-3 p-2 bg-black/60 rounded-full hover:bg-black/80"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <div className="absolute bottom-2 left-3 text-xs sm:text-sm bg-black/60 px-2 py-1 rounded">
                {activeVideo.title}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
