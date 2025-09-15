"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Volume2, VolumeX } from "lucide-react";

// ----- Optimized Data -----
const ALL_ITEMS = [
  {
    id: 1,
    title: "Art Collection",
    src: "https://res.cloudinary.com/duwtym7w7/video/upload/v1757341700/Event_Fashion-TCC_yl6gkk.mov",
    poster:
      "https://res.cloudinary.com/duwtym7w7/video/upload/w_600,f_auto,q_auto,so_2/v1757341700/Event_Fashion-TCC_yl6gkk.jpg",
  },
  {
    id: 2,
    title: "Fitness Dr.Kwadwo",
    src: "https://res.cloudinary.com/duwtym7w7/video/upload/v1757964382/Tabata_Day_01_hqvguu.mp4",
    poster:
      "https://res.cloudinary.com/duwtym7w7/video/upload/w_600,f_auto,q_auto,so_2/v1757964382/Tabata_Day_01_hqvguu.jpg",
  },
  {
    id: 3,
    title: "Financial Education",
    src: "https://res.cloudinary.com/duwtym7w7/video/upload/v1757616375/CHRIS01-02_lq5uvb.mp4",
    poster:
      "https://res.cloudinary.com/duwtym7w7/video/upload/w_600,f_auto,q_auto,so_2/v1757616375/CHRIS01-02_lq5uvb.jpg",
  },
  {
    id: 4,
    title: "Storytelling Example",
    src: "https://res.cloudinary.com/duwtym7w7/video/upload/v1757616526/Storytelling_Example_3_zawxk1.mp4",
    poster:
      "https://res.cloudinary.com/duwtym7w7/video/upload/w_600,f_auto,q_auto,so_2/v1757616526/Storytelling_Example_3_zawxk1.jpg",
  },
];

// Helpers
function useVideoControls(active, muted) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (active) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [active]);

  useEffect(() => {
    if (ref.current) {
      ref.current.muted = muted;
    }
  }, [muted]);

  return ref;
}

// Desktop ReelCard
function ReelCard({ item, active }) {
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(active);
  const vRef = useVideoControls(active && playing, muted);

  const togglePlay = () => {
    if (!vRef.current) return;
    if (vRef.current.paused) {
      vRef.current.play();
      setPlaying(true);
    } else {
      vRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      className={`relative aspect-[9/16] h-[80vh] rounded-2xl overflow-hidden shadow-2xl transition
        ${active ? "scale-100" : "scale-90 opacity-60"}`}
    >
      {active ? (
        <video
          ref={vRef}
          src={item.src}
          poster={item.poster}
          playsInline
          loop
          muted={muted}
          preload="metadata"
          onClick={togglePlay}
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        />
      ) : (
        <img
          src={item.poster}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay info */}
      <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <h3 className="text-lg md:text-2xl font-bold text-white">{item.title}</h3>
      </div>

      {/* Sound Toggle */}
      {active && (
        <button
          onClick={() => setMuted((m) => !m)}
          className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 rounded-full p-2 transition"
        >
          {muted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>
      )}
    </div>
  );
}

// Mobile Grid Thumbnail
function GridCard({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative w-full aspect-[9/16] rounded-xl overflow-hidden cursor-pointer group"
    >
      <img
        src={item.poster}
        alt={item.title}
        loading="lazy"
        className="w-full h-full object-cover transition group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
        <p className="text-white font-semibold text-sm">{item.title}</p>
      </div>
    </div>
  );
}

// Modal for video playback (mobile)
function VideoModal({ item, onClose }) {
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const vRef = useVideoControls(true && playing, muted);

  const togglePlay = () => {
    if (!vRef.current) return;
    if (vRef.current.paused) {
      vRef.current.play();
      setPlaying(true);
    } else {
      vRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white bg-white/20 rounded-full p-2 hover:bg-white/40"
      >
        <X size={24} />
      </button>
      <div className="w-full max-w-sm aspect-[9/16] relative rounded-2xl overflow-hidden shadow-2xl">
        <video
          ref={vRef}
          src={item.src}
          poster={item.poster}
          autoPlay
          playsInline
          loop
          muted={muted}
          onClick={togglePlay}
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        />
        {/* Sound toggle */}
        <button
          onClick={() => setMuted((m) => !m)}
          className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 rounded-full p-2 transition"
        >
          {muted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}

export default function CinematicReelHub() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalItem, setModalItem] = useState(null);

  const goto = (dir) => {
    setActiveIdx((i) => (i + dir + ALL_ITEMS.length) % ALL_ITEMS.length);
  };

  return (
    <section
      id="projects-reel"
      className="relative bg-gradient-to-b from-black via-[#0a0b11] to-black py-16 md:py-20 px-4 md:px-12 text-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
              Explore Our Work
            </h2>
            <p className="mt-3 text-white/70 max-w-2xl">
              Posters load first. Videos autoplay muted, tap for play/pause, toggle sound anytime.
            </p>
          </div>
        </div>

        {/* Desktop Viewer */}
        <div className="hidden md:flex items-center justify-center gap-6">
          <button
            onClick={() => goto(-1)}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <ChevronLeft />
          </button>
          <div className="flex items-center gap-4 w-full justify-center">
            {ALL_ITEMS.map((item, idx) => (
              <motion.div
                key={item.id}
                animate={{
                  scale: idx === activeIdx ? 1 : 0.85,
                  opacity: idx === activeIdx ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
                className={`w-[240px] lg:w-[300px] flex-shrink-0 ${
                  idx === activeIdx ? "z-10" : "z-0"
                }`}
                onClick={() => setActiveIdx(idx)}
              >
                <ReelCard item={item} active={idx === activeIdx} />
              </motion.div>
            ))}
          </div>
          <button
            onClick={() => goto(1)}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Mobile Grid */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {ALL_ITEMS.map((item) => (
            <GridCard
              key={item.id}
              item={item}
              onClick={() => setModalItem(item)}
            />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {modalItem && (
          <VideoModal item={modalItem} onClose={() => setModalItem(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
