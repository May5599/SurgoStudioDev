"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function ServicesHero({
  title = "Services",
  tagline = "Strategy, storytelling, and execution—built like a campaign, delivered like a product.",
  bgVideoSrc = "/reel1.mp4",
  bgPoster = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  cta = { label: "Book a Call", href: "/contact" },
  height = "h-[70vh] md:h-[85vh]",

  /** New options */
  useImageFallback = false,          // force static image background
  brightness = 0.33,                 // overall darkness (0–1; lower = darker)
  saturation = 1.15,                 // color richness
  vignetteEndOpacity = 0.6,          // how dark the outer vignette ends
}) {
  const videoRef = useRef(null);

  // Respect user “reduced motion” preference: pause bg video automatically.
  useEffect(() => {
    if (!videoRef.current) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) videoRef.current.pause?.();
      else videoRef.current.play?.().catch(() => {});
    };
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  return (
    <section
      className={`relative ${height} overflow-hidden bg-black text-white`}
      role="img"
      aria-label={`${title} — ${tagline}`}
    >
      {/* Background video / image */}
      <div className="absolute inset-0" aria-hidden>
        {!useImageFallback ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={bgVideoSrc}
            poster={bgPoster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          // Static poster fallback
          <img
            src={bgPoster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
        )}

        {/* Color wash (no grey) */}
        <div
          className="absolute inset-0"
          style={{ filter: `brightness(${brightness}) saturate(${saturation})` }}
        />

        {/* Vignette + top gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              `radial-gradient(ellipse at center,
                rgba(0,0,0,0) 0%,
                rgba(0,0,0,0.24) 55%,
                rgba(0,0,0,${vignetteEndOpacity}) 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Fine film grain */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.08] grain" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-black leading-[0.9] tracking-tight"
        >
          <span className="block text-[12vw] md:text-[8vw] mix-blend-screen text-white/90 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            {title}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-2xl text-white/80"
        >
          {tagline}
        </motion.p>

        {cta?.href && cta?.label && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-8"
          >
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-5 py-3 font-medium hover:bg-zinc-100 transition"
              aria-label={cta.label}
            >
              {cta.label}
              <svg viewBox="0 0 24 24" className="w-4 h-4 -mr-1" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
