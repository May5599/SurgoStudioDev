"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlayIcon } from "@heroicons/react/24/solid";

const videoSources = [
  {
    srcWebm:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,w_1920/v1756914492/port2_wqwih5.webm",
    srcMp4:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,w_1920/v1756914492/port2_wqwih5.mp4",
    poster:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,w_1200,so_0/v1756914492/port2_wqwih5.jpg",
  },
  {
    srcWebm:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,w_1920/v1756914496/port3_knysnd.webm",
    srcMp4:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,w_1920/v1756914496/port3_knysnd.mp4",
    poster:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,w_1200,so_0/v1756914496/port3_knysnd.jpg",
  },
  {
    srcWebm:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,w_1920/v1756914491/port4_bi7uzw.webm",
    srcMp4:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,w_1920/v1756914491/port4_bi7uzw.mp4",
    poster:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,w_1200,so_0/v1756914491/port4_bi7uzw.jpg",
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
            <source src={video.srcWebm} type="video/webm" />
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
          transition={{ duration: 1 }}
          className="relative font-extrabold tracking-tight leading-tight 
                     text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl"
        >
          Our Vision{" "}
          <span className="text-yellow-400 block sm:inline">
            Through the Lens
          </span>
        </motion.h1>

        {/* CTA → Scroll to ProjectsReel */}
        <motion.a
          href="#projects-reel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-6 sm:mt-10 flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 
                     bg-white text-black text-base sm:text-lg font-semibold 
                     rounded-full hover:bg-yellow-400 transition shadow-lg"
        >
          <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6" /> Watch Our Showreel
        </motion.a>

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
