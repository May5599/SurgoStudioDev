"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// ----- demo data (Cloudinary posters + videos) -----
const ALL_ITEMS = [
  {
    id: 1,
    title: "Canadian Film Collection",
    src: "https://res.cloudinary.com/dvqibrc9d/video/upload/v1756916330/12221991_1080_1920_24fps_tpil3a.mp4",
    poster:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/w_600,f_auto,q_auto,so_2/v1756916330/12221991_1080_1920_24fps_tpil3a.jpg",
    tag: "Features",
  },
  {
    id: 2,
    title: "Education",
    src: "https://res.cloudinary.com/dvqibrc9d/video/upload/v1756916330/12221991_1080_1920_24fps_tpil3a.mp4",
    poster:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/w_600,f_auto,q_auto,so_3/v1756916330/12221991_1080_1920_24fps_tpil3a.jpg",
    tag: "Student",
  },
  {
    id: 3,
    title: "Reel Opportunities",
    src: "https://res.cloudinary.com/dvqibrc9d/video/upload/v1756916330/12221991_1080_1920_24fps_tpil3a.mp4",
    poster:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/w_600,f_auto,q_auto,so_4/v1756916330/12221991_1080_1920_24fps_tpil3a.jpg",
    tag: "Industry",
  },
  {
    id: 4,
    title: "National Canadian Film Day",
    src: "https://res.cloudinary.com/dvqibrc9d/video/upload/v1756916330/12221991_1080_1920_24fps_tpil3a.mp4",
    poster:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/w_600,f_auto,q_auto,so_5/v1756916330/12221991_1080_1920_24fps_tpil3a.jpg",
    tag: "Events",
  },
];

const CATEGORIES = ["All", "Features", "Student", "Industry", "Events"];

// Helpers
function useVideoAuto(active) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (active) el.play().catch(() => {});
    else el.pause();
  }, [active]);
  return ref;
}

function Pill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-sm transition
        ${
          active
            ? "bg-white text-black border-white"
            : "border-white/30 text-white/80 hover:bg-white/10"
        }`}
    >
      {label}
    </button>
  );
}

// Desktop ReelCard (video only for active reel)
function ReelCard({ item, active }) {
  const vRef = useVideoAuto(active);
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
          muted
          playsInline
          loop
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <img
          src={item.poster}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <h3 className="text-lg md:text-2xl font-bold text-white">{item.title}</h3>
        <span className="mt-2 inline-block px-3 py-1 text-xs md:text-sm rounded-full bg-white/20 backdrop-blur text-white/90">
          {item.tag}
        </span>
      </div>
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

// Modal for video playback
function VideoModal({ item, onClose }) {
  const vRef = useVideoAuto(true);
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
          muted
          playsInline
          loop
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default function CinematicReelHub() {
  const [cat, setCat] = useState("All");
  const filtered = useMemo(
    () => (cat === "All" ? ALL_ITEMS : ALL_ITEMS.filter((i) => i.tag === cat)),
    [cat]
  );

  const [activeIdx, setActiveIdx] = useState(0);
  const [modalItem, setModalItem] = useState(null);

  const goto = (dir) => {
    setActiveIdx((i) => (i + dir + filtered.length) % filtered.length);
  };

  return (
    <section className="relative bg-gradient-to-b from-black via-[#0a0b11] to-black py-16 md:py-20 px-4 md:px-12 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
              Explore Our Work
            </h2>
            <p className="mt-3 text-white/70 max-w-2xl">
              Browse reels by category. Optimized for speed: posters first, videos only on demand.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <Pill
                key={c}
                label={c}
                active={c === cat}
                onClick={() => {
                  setCat(c);
                  setActiveIdx(0);
                }}
              />
            ))}
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
            {filtered.map((item, idx) => (
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

        {/* Mobile Grid (Instagram Explore style) */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {filtered.map((item) => (
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
          <VideoModal
            item={modalItem}
            onClose={() => setModalItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
