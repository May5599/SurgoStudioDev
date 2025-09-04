"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function ServicesHero({
  title = "Services",
  tagline = "Strategy, storytelling, and execution—built like a campaign, delivered like a product.",
  bgVideoSrc = "https://res.cloudinary.com/dvqibrc9d/video/upload/v1756914498/reel1_ghfwq2.mp4",
  bgPoster = "https://res.cloudinary.com/dvqibrc9d/image/upload/v1756913780/cld-sample-2.jpg",
  cta = { label: "Book a Call", href: "/contact" },
  height = "h-[70vh] md:h-[85vh]",

  /** New options */
  useImageFallback = false, // force static image background
  brightness = 0.33, // overall darkness (0–1; lower = darker)
  saturation = 1.15, // color richness
  vignetteEndOpacity = 0.6, // how dark the outer vignette ends
}) {
  const videoRef = useRef(null);

  // Pause video if user prefers reduced motion
  useEffect(() => {
    if (!videoRef.current) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) videoRef.current?.pause();
      else videoRef.current?.play().catch(() => {});
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <section
      className={`relative ${height} overflow-hidden bg-black/90 text-white`}
      role="img"
      aria-label={`${title} — ${tagline}`}
    >
      {/* Background */}
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
          <img
            src={bgPoster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
        )}

        {/* Color wash */}
        <div
          className="absolute inset-0"
          style={{
            filter: `brightness(${brightness}) saturate(${saturation})`,
          }}
        />

        {/* Vignette & gradients */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center,
              rgba(0,0,0,0) 0%,
              rgba(0,0,0,0.24) 55%,
              rgba(0,0,0,${vignetteEndOpacity}) 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Film grain */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.08] grain" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-black leading-[0.9] tracking-tight"
        >
          <span className="block text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] mix-blend-screen text-white/90 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            {title}
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 sm:mt-6 max-w-lg sm:max-w-2xl text-sm sm:text-base md:text-lg text-white/80 px-2"
        >
          {tagline}
        </motion.p>

        {/* CTA */}
        {cta?.href && cta?.label && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 sm:mt-8"
          >
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2.5 sm:px-5 sm:py-3 font-medium hover:bg-zinc-100 transition text-sm sm:text-base"
              aria-label={cta.label}
            >
              {cta.label}
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 sm:w-5 sm:h-5 -mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
