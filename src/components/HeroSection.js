"use client";

import { useEffect, useState, useRef } from "react";
import { MEDIA_BASE } from "../lib/config";

export default function HeroSection() {
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [projects, setProjects] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const duration = 1500;
  const startTime = useRef(null);

  // Animate counters once video loads
  useEffect(() => {
    const timeout = setTimeout(() => {
    setShowVideo(true);
  }, 600); // small delay so poster paints first

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
      {/* 🎨 Scoped glitch animation */}
      <style>{`
        .glitch {
          position: relative;
          font-weight: 900;
          cursor: pointer;
          animation: glitch-filter 2s infinite;
        }
        @keyframes glitch-filter {
          0% { filter: none; transform: translate(0); }
          20% { filter: drop-shadow(2px 0 #ff00c8) drop-shadow(-2px 0 #00fff9); transform: translate(-2px, -2px); }
          40% { filter: drop-shadow(1px 0 #ff00c8) drop-shadow(-1px 0 #00fff9); transform: translate(2px, 2px); }
          60% { filter: drop-shadow(3px 0 #ff00c8) drop-shadow(-3px 0 #00fff9); transform: translate(-3px, 1px); }
          80%,100% { filter: none; transform: translate(0); }
        }
      `}</style>

      <section
        className="relative min-h-screen flex items-end justify-center bg-black text-white px-6 pb-20 overflow-hidden"
        aria-label="Hero section with cinematic Surgo Studios video background"
      >
        {/* 🎥 Background Video from CloudFront */}
        {showVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={`${MEDIA_BASE}/poster.jpg`}
            className="absolute top-0 left-0 w-full h-full object-cover"
            aria-hidden="true"
          >
            <source
              src={`${MEDIA_BASE}/hero-optimized.mp4`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        )}

        {/* 🔒 Overlay for contrast */}
        <div className="absolute inset-0 bg-yellow-800/20" />

        {/* 📢 Content */}
       <div className="relative z-10 max-w-screen-xl w-full px-6 text-center font-mozilla">
  {/* Big Editorial Heading */}
  <h1
    className="text-[20vw] sm:text-[8vw] md:text-[6.5vw] lg:text-[5.5vw] xl:text-[5vw]
               font-black uppercase tracking-tighter leading-[0.95] text-white
               drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] mb-5"
  >
    <span className="glitch inline-block overflow-hidden">
      LIGHTS • CAMERA • <span className="text-yellow-400">SURGO</span>
    </span>
  </h1>

  {/* Button / CTA */}
  <div className="flex justify-center mt-8 mb-32">
    <a
      href="/portfolio"
      className="inline-flex items-center px-8 py-4 text-lg tracking-wide 
                 bg-white/10 border border-white/20 text-white font-medium rounded-full
                 hover:bg-yellow-400 hover:text-black hover:border-yellow-400
                 transition-all duration-300 backdrop-blur-md shadow-lg"
      aria-label="Explore Surgo Studios video production portfolio"
    >
      Watch Our Reel
    </a>
  </div>
</div>


      </section>
    </>
  );
}

