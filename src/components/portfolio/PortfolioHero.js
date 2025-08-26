"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlayIcon } from "@heroicons/react/24/solid";

const videoSources = ["/port1.mp4", "/port2.mp4", "/port3.mp4", "/port4.mp4"];

export default function PortfolioHero() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Cycle through videos every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videoSources.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* 🎥 Background Video */}
      {videoSources.map((src, index) => (
        <video
          key={src}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentVideo ? "opacity-60" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))}

      {/* ✨ Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl"
        >
          Our Vision Through the Lens
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          onClick={() => setShowModal(true)}
          className="mt-8 flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition"
        >
          <PlayIcon className="w-5 h-5" /> Watch Our Showreel
        </motion.button>

        {/* ↓ Scroll Cue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 animate-bounce text-xl"
        >
          ↓
        </motion.div>
      </div>

      {/* 📽️ Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="relative w-full max-w-4xl px-4">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-4 text-white text-2xl font-bold"
            >
              ×
            </button>
            <video controls className="w-full h-auto rounded-lg shadow-lg">
              <source src="/showreel-full.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
