"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MEDIA_BASE } from "../../lib/config";

const videoSources = [
  {
    srcMp4: `${MEDIA_BASE}/port2_wqwih5_compressed.mp4`,
    poster: `${MEDIA_BASE}/port2_wqwih5_poster.jpg`,
  },
  {
    srcMp4: `${MEDIA_BASE}/port3_knysnd_compressed.mp4`,
    poster: `${MEDIA_BASE}/port3_knysnd_poster.jpg`,
  },
  {
    srcMp4: `${MEDIA_BASE}/port4_bi7uzw_compressed.mp4`,
    poster: `${MEDIA_BASE}/port4_bi7uzw_poster.jpg`,
  },
];

export default function PortfolioHero() {
  const [currentVideo, setCurrentVideo] = useState(0);

  // cycle every 6s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videoSources.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* 🎥 Background Videos */}
      {videoSources.map((video, index) => {
        const isActive = index === currentVideo;
        const isNext = index === (currentVideo + 1) % videoSources.length;

        return (
          <video
            key={index}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isActive ? "opacity-60" : "opacity-0"
            }`}
            autoPlay={isActive}
            muted
            loop
            playsInline
            preload={isActive || isNext ? "auto" : "none"}
            poster={video.poster}
          >
            <source src={video.srcMp4} type="video/mp4" />
          </video>
        );
      })}

      {/* ✨ Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 sm:px-6">
        {/* Giant faint word */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     text-[18vw] sm:text-[16vw] md:text-[12vw] font-extrabold uppercase tracking-tight 
                     whitespace-nowrap pointer-events-none"
        >
          Portfolio
        </motion.h2>

        {/* Foreground headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-extrabold uppercase tracking-tight leading-[1.05]
                     text-5xl sm:text-6xl md:text-7xl lg:text-8xl max-w-4xl"
        >
          We Make <span className="text-yellow-400">Creativity</span> Contagious.
        </motion.h1>

        {/* ↓ Scroll Cue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-6 sm:bottom-10 animate-bounce text-xl sm:text-2xl"
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
}
