"use client";

import { useEffect, useState, useRef } from "react";

export default function HeroSection() {
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [projects, setProjects] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const duration = 1500;
  const startTime = useRef(null);

  useEffect(() => {
    setShowVideo(true);

    function animate(timestamp) {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);

      setViews(Math.floor(progress * 1_000_000_000));
      setLikes(Math.floor(progress * 22_000_000));
      setProjects(Math.floor(progress * 800));

      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1_000_000_000) return Math.round(num / 1_000_000_000) + "B";
    if (num >= 1_000_000) return Math.round(num / 1_000_000) + "M";
    return num;
  };

  return (
    <>
      {/* ✅ Scoped glitch animation */}
      <style>{`
        .glitch {
          position: relative;
          font-weight: 900;
          cursor: pointer;
          animation: glitch-filter 2s infinite;
        }
        @keyframes glitch-filter {
          0% { filter: none; clip-path: inset(0 0 0 0); transform: translate(0); }
          20% { filter: drop-shadow(2px 0 #ff00c8) drop-shadow(-2px 0 #00fff9); clip-path: inset(10% 0 85% 0); transform: translate(-2px, -2px); }
          40% { filter: drop-shadow(1px 0 #ff00c8) drop-shadow(-1px 0 #00fff9); clip-path: inset(40% 0 43% 0); transform: translate(2px, 2px); }
          60% { filter: drop-shadow(3px 0 #ff00c8) drop-shadow(-3px 0 #00fff9); clip-path: inset(30% 0 54% 0); transform: translate(-3px, 1px); }
          80%,100% { filter: none; clip-path: inset(0 0 0 0); transform: translate(0); }
        }
      `}</style>

      <section
        className="relative min-h-screen flex items-end justify-center bg-black text-white px-6 pb-20 overflow-hidden"
        aria-label="Hero section with cinematic video background"
      >
        {/* ✅ Cloudinary background video */}
        {showVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,w_1920/v1757080238/demo_hero_ymacfx.jpg"
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source
              src="https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto/v1757080238/demo_hero_ymacfx.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        )}

        {/* ✅ Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* ✅ Content */}
        <div className="relative z-10 max-w-screen-lg w-full px-4 text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mozilla font-bold tracking-tight leading-snug drop-shadow-xl break-words mb-2">
            <span className="glitch inline-block overflow-hidden">
              LIGHTS • CAMERA • SURGO
            </span>
          </h1>

          {/* Subheading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-rammetto font-semibold tracking-tight leading-snug drop-shadow-xl">
            PLUG US IN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WATCH IT PLAY
          </h2>

          {/* Stats (optional – uncomment if you want visible counters) */}
          {/*
          <p className="mt-8 tracking-wide font-mozilla text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-lg text-[#37fa82]">
            {formatNumber(views)}+ Views · {formatNumber(likes)}+ Likes · {formatNumber(projects)}+ Projects
          </p>
          */}

          {/* CTA */}
          <div className="flex justify-center mt-6">
            <a
              href="/portfolio"
              className="inline-flex items-center px-6 py-3 bg-white/10 border border-white/20 text-white font-mozilla font-medium rounded-full hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition backdrop-blur-md"
            >
              Watch Our Reel
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
