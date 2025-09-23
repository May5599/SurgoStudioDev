"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { MEDIA_BASE } from "../../lib/config";

export default function ServicesHero({
  title = "Services",
  bgVideoSrc = `${MEDIA_BASE}/reel1_ghfwq2_compressed.mp4`,
  bgPoster = `${MEDIA_BASE}/reel1_ghfwq2_poster.jpg`,
  cta = { label: "Book a Call", href: "/contact" },
  height = "h-[80vh] md:h-[90vh]",
  useImageFallback = false,
}) {
  const videoRef = useRef(null);

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
      className={`relative ${height} overflow-hidden bg-black text-white`}
      role="banner"
      aria-label={`Surgo Studios ${title} in Ottawa   cinematic video production services`}
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
            alt="Cinematic abstract background for Surgo Studios services"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Foreground */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
        {/* Oversized Full-Width Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2
                     font-extrabold uppercase tracking-[-0.05em] leading-none
                     text-yellow-400 whitespace-nowrap
                     text-[24vw] sm:text-[20vw] md:text-[18vw]"
        >
          {title}
        </motion.h1>

        {/* CTA */}
        {cta?.href && cta?.label && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="absolute bottom-12"
          >
            <Link
              href={cta.href}
              title="Book a call with Surgo Studios for Ottawa video production services"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-lg font-semibold hover:bg-yellow-400 hover:text-black transition shadow-lg"
            >
              {cta.label}
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 -mr-1"
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

      {/* JSON-LD Schema for Video SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: `Surgo Studios ${title}`,
            description:
              "Cinematic video production services by Surgo Studios in Ottawa, including commercials, social media reels, and campaigns.",
            thumbnailUrl: [bgPoster],
            uploadDate: "2025-09-05",
            contentUrl: bgVideoSrc,
            embedUrl: "https://surgostudios.com/services",
            publisher: {
              "@type": "Organization",
              name: "Surgo Studios",
              logo: {
                "@type": "ImageObject",
                url: `${MEDIA_BASE}/white-logo.png`, // upload your logo to S3 for consistency
              },
            },
          }),
        }}
      />
    </section>
  );
}
