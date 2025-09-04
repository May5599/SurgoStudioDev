"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CinematicMontage({
  items = DEFAULT_ITEMS,
  speed = 45,
  mobileFlipInterval = 4000, // 4s per flip
}) {
  const rootRef = useRef(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  // Handle reduced motion (desktop marquee)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (!rootRef.current) return;
      rootRef.current.style.setProperty(
        "--marquee-play",
        mq.matches ? "paused" : "running"
      );
    };
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // Handle mobile auto-flip
  useEffect(() => {
    const interval = setInterval(() => {
      setMobileIndex((i) => (i + 1) % items.length);
    }, mobileFlipInterval);
    return () => clearInterval(interval);
  }, [items.length, mobileFlipInterval]);

  const half = Math.ceil(items.length / 2);
  const rowA = items.slice(0, half);
  const rowB = items
    .slice(half)
    .concat(items.slice(0, Math.max(0, 6 - (items.length - half))));

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden bg-[#FBF7F5] text-black"
      style={{
        ["--marquee-duration"]: `${speed}s`,
        ["--marquee-play"]: "running",
      }}
      aria-label="Cinematic montage"
    >
      {/* --- Desktop / Tablet: Marquee Rows --- */}
      <div className="hidden sm:block relative max-w-none py-10 md:py-16">
        <MarqueeRow items={rowA} reverse={false} />
        <MarqueeRow items={rowB} reverse className="mt-6 md:mt-10" />
      </div>

      {/* --- Mobile: Flip Animation --- */}
      <div className="sm:hidden relative flex flex-col items-center py-12">
        <div className="relative w-[85vw] aspect-[16/9]">
          <AnimatePresence mode="wait">
            <motion.video
              key={mobileIndex}
              src={items[mobileIndex].src}
              poster={items[mobileIndex].poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl border border-white/10 shadow-xl"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>
        <div className="mt-3 text-sm text-black/70 text-center max-w-[80vw]">
          {items[mobileIndex].caption}
        </div>
      </div>
    </section>
  );
}

function MarqueeRow({ items, reverse = false, className = "" }) {
  const loop = [...items, ...items];
  return (
    <div className={`relative ${className}`}>
      <div
        className="flex items-stretch gap-6 md:gap-8 will-change-transform animate-marquee"
        style={{
          animationDirection: reverse ? "reverse" : "normal",
          animationDuration: "var(--marquee-duration)",
          animationPlayState: "var(--marquee-play)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.animationPlayState = "paused")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.animationPlayState = "var(--marquee-play)")
        }
      >
        {loop.map((it, idx) => (
          <Tile key={idx} {...it} />
        ))}
      </div>
    </div>
  );
}

function Tile({ src, poster, caption }) {
  return (
    <figure className="group relative shrink-0 w-[68vw] sm:w-[48vw] md:w-[36vw] lg:w-[28vw] aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
      <video
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      {caption && (
        <figcaption className="absolute bottom-2 left-2 right-2 text-xs md:text-sm text-white/80">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

const DEFAULT_ITEMS = [
  { src: "reel1.mp4", poster: "...", caption: "Brand Films — Studio Light" },
  { src: "reel2.mp4", poster: "...", caption: "Social Reels — Aerial Energy" },
  { src: "reel3.mp4", poster: "...", caption: "Campaign Story — Human Focus" },
  { src: "reel1.mp4", poster: "...", caption: "Launch Film — City Motion" },
];
