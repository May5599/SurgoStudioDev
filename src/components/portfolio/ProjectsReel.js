"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * CINEMATIC REEL HUB
 * - Scalable: handles many items via pagination + lazy video
 * - Expanding strips with center-focus, dimmed neighbors
 * - Infinite-feel nav (prev/next), dots, swipe/scroll, arrow keys
 * - Category pills to filter collections
 * - Accessible (roles, labels), mobile-first
 */

// ----- demo data (replace) -----
const ALL_ITEMS = Array.from({ length: 16 }).map((_, i) => ({
  id: i + 1,
  title: [
    "Canadian Film Collection",
    "Education",
    "Reel Opportunities",
    "National Canadian Film Day",
  ][i % 4] + ` ${Math.floor(i / 4) + 1}`,
  src: ["/demo1.mp4", "/demo2.mp4", "/demo3.mp4"][i % 3],
  poster: ["/posters/p1.jpg", "/posters/p2.jpg", "/posters/p3.jpg"][i % 3],
  tag: ["Features", "Student", "Industry", "Events"][i % 4],
}));

const CATEGORIES = ["All", "Features", "Student", "Industry", "Events"];

// ----- helpers -----
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
        ${active ? "bg-white text-black border-white" : "border-white/30 text-white/80 hover:bg-white/10"}`}
    >
      {label}
    </button>
  );
}

function Dot({ active, onClick }) {
  return (
    <button
      aria-label={active ? "Current slide" : "Go to slide"}
      onClick={onClick}
      className={`h-2 w-2 rounded-full transition ${active ? "bg-white" : "bg-white/30 hover:bg-white/60"}`}
    />
  );
}

function Strip({ item, active, onHover, onClick }) {
  const vRef = useVideoAuto(active);
  return (
    <motion.div
      layout
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={item.title}
      style={{ flexBasis: 0 }}
      animate={{ flexGrow: active ? 5 : 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
      className="relative h-[78vh] min-w-0 overflow-hidden rounded-3xl shadow-2xl cursor-pointer select-none"
    >
      <video
        ref={vRef}
        src={item.src}
        poster={item.poster}
        muted
        playsInline
        loop
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover transition
          ${active ? "brightness-100" : "brightness-[0.65] grayscale-[8%]"}`}
      />

      {/* Active glow */}
      <div className={`absolute inset-0 pointer-events-none ${active ? "ring-2 ring-white/30" : "ring-0"}`} />

      {/* Label */}
      <div className="absolute left-6 bottom-6 right-6 pointer-events-none">
        <div className="flex items-end justify-between gap-2">
          <h3 className={`uppercase font-extrabold leading-tight tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]
            ${active ? "text-white text-4xl md:text-5xl" : "text-white/90 text-3xl md:text-4xl"}`}>
            {item.title}
          </h3>
          <span className="px-3 py-1 text-xs rounded-full bg-white/15 backdrop-blur text-white/90">
            {item.tag}
          </span>
        </div>
      </div>

      {/* gradients for legibility */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </motion.div>
  );
}

export default function CinematicReelHub() {
  // filter state
  const [cat, setCat] = useState("All");
  const filtered = useMemo(
    () => (cat === "All" ? ALL_ITEMS : ALL_ITEMS.filter((i) => i.tag === cat)),
    [cat]
  );

  // pagination (to avoid rendering 20+ strips at once)
  const PAGE_SIZE = 6; // strips per page
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = page * PAGE_SIZE;
  const items = filtered.slice(start, start + PAGE_SIZE);

  // active index inside a page
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    // reset when page or filter changes
    setActiveIdx(0);
  }, [page, cat]);

  // keyboard nav across page bounds
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        if (activeIdx < items.length - 1) setActiveIdx((i) => i + 1);
        else if (page < pageCount - 1) setPage((p) => p + 1);
      }
      if (e.key === "ArrowLeft") {
        if (activeIdx > 0) setActiveIdx((i) => i - 1);
        else if (page > 0) setPage((p) => p - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx, items.length, page, pageCount]);

  // mobile snap center → pick active by proximity
  const wrapRef = useRef(null);
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let t;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const rect = wrap.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        let best = 0;
        let bestDist = Infinity;
        [...wrap.children].forEach((child, idx) => {
          const r = child.getBoundingClientRect();
          const c = r.left + r.width / 2;
          const d = Math.abs(c - cx);
          if (d < bestDist) (bestDist = d), (best = idx);
        });
        setActiveIdx(best);
      }, 40);
    };
    wrap.addEventListener("scroll", onScroll, { passive: true });
    return () => wrap.removeEventListener("scroll", onScroll);
  }, [items.length]);

  // helpers
// helpers
const gotoPrevPage = useCallback(
  () => setPage((p) => Math.max(0, p - 1)),
  []
);

const gotoNextPage = useCallback(
  () => setPage((p) => Math.min(pageCount - 1, p + 1)),
  [pageCount]
);
  return (
    <section className="relative bg-[#0a0b11] py-16 md:py-20 px-4 md:px-10 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
        <div>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">Explore Our Work</h2>
          <p className="mt-3 text-white/70 max-w-2xl">
            Hover (desktop) or swipe/scroll (mobile) to reveal. Use the filters to browse large catalogs without
            overwhelming the layout.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Pill key={c} label={c} active={c === cat} onClick={() => { setCat(c); setPage(0); }} />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={gotoPrevPage}
            className="px-3 py-2 rounded-lg border border-white/30 hover:bg-white/10"
            aria-label="Previous page"
          >
            ◀
          </button>
          <button
            onClick={gotoNextPage}
            className="px-3 py-2 rounded-lg border border-white/30 hover:bg-white/10"
            aria-label="Next page"
          >
            ▶
          </button>
          <span className="ml-3 text-sm text-white/70">Page {page + 1} / {pageCount}</span>
        </div>
        <div className="flex items-center gap-2">
          {Array.from({ length: pageCount }).map((_, i) => (
            <Dot key={i} active={i === page} onClick={() => setPage(i)} />
          ))}
        </div>
      </div>

      {/* Strips wrapper (horizontal) */}
      <div
        ref={wrapRef}
        className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory px-1 rounded-3xl"
        style={{ scrollPadding: "20px" }}
      >
        {items.map((item, idx) => (
          <div key={item.id} className="snap-center shrink-0 w-[75vw] md:w-auto flex-[1] min-w-0">
            <Strip
              item={item}
              active={idx === activeIdx}
              onHover={() => setActiveIdx(idx)}
              onClick={() => setActiveIdx(idx)}
            />
          </div>
        ))}
      </div>

      {/* Optional caption / CTA for active strip */}
      <AnimatePresence mode="wait">
        {items[activeIdx] && (
          <motion.div
            key={items[activeIdx].id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-6 flex items-center justify-between gap-4"
          >
            <div className="text-white/80 text-sm md:text-base">
              <strong className="text-white">{items[activeIdx].title}</strong> — {items[activeIdx].tag}
            </div>
            <a
              href="#"
              className="px-4 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:opacity-90"
            >
              View Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
