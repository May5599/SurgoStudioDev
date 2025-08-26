'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, X } from 'lucide-react';

const portfolioItems = [
  { title: 'Brand Ad for Nylo', video: '/demo1.mp4' },
  { title: 'Surge Fitness Launch', video: '/demo2.mp4' },
  { title: 'Luxury Interiors Teaser', video: '/demo3.mp4' },
  { title: 'Resort Promo Clip', video: '/demo1.mp4' },
  { title: 'Designer Shoes Spot', video: '/demo2.mp4' },
  { title: 'Event Highlights Reel', video: '/demo3.mp4' },
];

export default function PortfolioPreview() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="relative py-28 px-6 bg-[#09141d] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16 text-center relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-[var(--font-audiowide)] tracking-wide drop-shadow-md">
            Our Work in Motion
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            A cinematic glimpse into the campaigns and stories we’ve shaped.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-2 sm:px-4"
        >
          {portfolioItems.map((item, i) => (
            <motion.div
              key={i}
              className="relative group overflow-hidden shadow-[0_20px_80px_-15px_rgba(255,255,255,0.05)] rounded-[30%_10%_40%_20%/20%_40%_30%_10%] bg-[#121212] transition duration-500 hover:scale-[1.015] hover:rotate-[-0.3deg]"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-full h-64 overflow-hidden">

                {/* Video */}
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:skew-y-1"
                />

                {/* Optional Grain Layer */}
                {/* <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" /> */}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />

                {/* Floating Title Tag */}
                <div className="absolute top-3 left-3 bg-[#0f0f0f]/80 text-xs text-white px-3 py-1 rounded-full font-semibold tracking-wide shadow-lg backdrop-blur-sm">
                  {item.title}
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setActiveVideo(item)}
                    className="relative z-10 p-3 rounded-full border-2 border-white/30 hover:border-white/70 bg-white/10 backdrop-blur-md transition"
                  >
                    <PlayCircle className="w-10 h-10 text-white drop-shadow-md" />
                    <div className="absolute inset-0 rounded-full border border-white/20 animate-ping" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating Video Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[92%] sm:w-[800px] h-[450px] bg-[#111827] rounded-xl shadow-2xl border border-white/10 overflow-hidden"
          >
            <div className="relative w-full h-full">
              <video
                src={activeVideo.video}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70"
              >
                <X className="text-white w-5 h-5" />
              </button>
              <div className="absolute bottom-2 left-4 text-white font-medium text-sm bg-black/50 px-2 py-1 rounded">
                {activeVideo.title}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] top-[-10%] left-[-10%] rounded-full bg-pink-500/10 blur-3xl animate-pulse-slow" />
        <div className="absolute w-[400px] h-[400px] bottom-[-20%] right-[-5%] rounded-full bg-yellow-400/10 blur-3xl animate-pulse-slow delay-1000" />
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
