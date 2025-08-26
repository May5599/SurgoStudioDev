"use client";

import { useEffect, useRef } from "react";

export default function CinematicMontage({
  items = DEFAULT_ITEMS,
  speed = 45,
}) {
  const rootRef = useRef(null);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (!rootRef.current) return;
      rootRef.current.style.setProperty("--marquee-play", mq.matches ? "paused" : "running");
    };
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const half = Math.ceil(items.length / 2);
  const rowA = items.slice(0, half);
  const rowB = items.slice(half).concat(items.slice(0, Math.max(0, 6 - (items.length - half))));

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
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-20" />

      <div className="relative max-w-none py-10 md:py-16">
        <MarqueeRow items={rowA} reverse={false} />
        <MarqueeRow items={rowB} reverse className="mt-6 md:mt-10" />
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
        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "var(--marquee-play)")}
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
