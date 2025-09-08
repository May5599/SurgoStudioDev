"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
} from "lucide-react";

// Optimized reels data
const reelsData = [
  {
    title: "Story in Motion",
    stat: "+2.4M reach",
    quote: "Momentum you can feel.",
    srcMp4:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,dpr_auto,w_1920/v1756914502/reel2_uy1pjd.mp4",
    srcWebm:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,dpr_auto,w_1920/v1756914502/reel2_uy1pjd.webm",
    poster:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,w_1200,so_2/v1756914502/reel2_uy1pjd.jpg",
  },
  {
    title: "Branch Office Trailer",
    stat: "Fresh Release",
    quote: "A glimpse into the story.",
    srcMp4:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,dpr_auto,w_1920/v1757097186/BranchOfficeTrailerv3_f5ejqb.mp4",
    srcWebm:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,dpr_auto,w_1920/v1757097186/BranchOfficeTrailerv3_f5ejqb.webm",
    poster:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,dpr_auto,w_1200,so_2/v1757097186/BranchOfficeTrailerv3_f5ejqb.jpg",
  },
  {
    title: "Vertical Energy",
    stat: "4x engagement",
    quote: "Hooked in three seconds.",
    srcMp4:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,dpr_auto,w_1920/v1756914498/reel1_ghfwq2.mp4",
    srcWebm:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,dpr_auto,w_1920/v1756914498/reel1_ghfwq2.webm",
    poster:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,dpr_auto,w_1200,so_2/v1756914498/reel1_ghfwq2.jpg",
  },
  {
    title: "Immersive Frames",
    stat: "+800k interactions",
    quote: "Designed for connection.",
    srcMp4:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,dpr_auto,w_1920/v1757094343/website01_bwovoe.mp4",
    srcWebm:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,dpr_auto,w_1920/v1757094343/website01_bwovoe.webm",
    poster:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,dpr_auto,w_1200,so_2/v1757094343/website01_bwovoe.jpg",
  },
  {
    title: "Sequence Impact",
    stat: "Viral reach",
    quote: "Stories that scale.",
    srcMp4:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,dpr_auto,w_1920/v1757094343/Sequence_09_j6obfh.mp4",
    srcWebm:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,dpr_auto,w_1920/v1757094343/Sequence_09_j6obfh.webm",
    poster:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,dpr_auto,w_1200,so_2/v1757094343/Sequence_09_j6obfh.jpg",
  },
];

export default function SurgoReelsShowcase({
  reels = reelsData,
  brandWord = "SURGO IMPACT",
  autoPlay = true,
}) {
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true); // start muted
  const [playing, setPlaying] = useState(true);

  const videoRefHero = useRef(null);
  const videoRefStage = useRef(null);

  // --- Motion values for parallax ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-150, 150], [6, -6]);
  const rotateY = useTransform(x, [-150, 150], [-6, 6]);
  const translateX = useTransform(x, [-150, 150], [-10, 10]);
  const translateY = useTransform(y, [-150, 150], [-6, 6]);

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx);
    y.set(dy);
  };

  const goto = (dir) => {
    setCurrent((c) => (c + dir + reels.length) % reels.length);
  };

  // apply play/pause + mute/unmute
  useEffect(() => {
    const apply = (ref) => {
      if (!ref?.current) return;
      ref.current.pause();
      ref.current.load();
      ref.current.muted = muted;
      if (playing) ref.current.play().catch(() => {});
    };
    apply(videoRefHero);
    apply(videoRefStage);
  }, [muted, playing, current]);

  // auto-unmute on first user interaction
  useEffect(() => {
    const handleFirstClick = () => {
      if (muted) {
        setMuted(false);
      }
      window.removeEventListener("click", handleFirstClick);
    };
    window.addEventListener("click", handleFirstClick);
    return () => window.removeEventListener("click", handleFirstClick);
  }, [muted]);

  return (
    <section
      className="relative w-full bg-black text-white overflow-hidden"
      aria-label="Surgo Studios Reels Showcase"
    >
      {/* HERO */}
      <div
        className="relative h-[60vh] md:h-[75vh]"
        onMouseMove={onMouseMove}
      >
        <video
          key={current}
          ref={videoRefHero}
          className="h-full w-full object-cover"
          autoPlay={autoPlay}
          loop
          muted={muted}
          playsInline
          preload="metadata"
          poster={reels[current].poster}
        >
          <source src={reels[current].srcWebm} type="video/webm" />
          <source src={reels[current].srcMp4} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/70" />

        {/* Brand word */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            style={{ rotateX, rotateY, x: translateX, y: translateY }}
            className="text-center font-black tracking-tight leading-[0.9] select-none"
          >
            <span className="block text-[9vw] md:text-[8vw] lg:text-[7vw] mix-blend-screen text-white/90 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
              {brandWord}
            </span>
          </motion.h1>
        </div>

        {/* Controls */}
        <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
          <button
            onClick={() => setMuted((m) => !m)}
            className="rounded-xl bg-white/10 backdrop-blur px-3 py-2 hover:bg-white/20 transition"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="rounded-xl bg-white/10 backdrop-blur px-3 py-2 hover:bg-white/20 transition"
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </button>
        </div>
      </div>

      {/* Stage Reel */}
      <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-8 -mt-14 md:-mt-20">
        <motion.div
          style={{ rotateX, rotateY, x: translateX, y: translateY }}
          className="relative rounded-2xl overflow-hidden shadow-2xl bg-black"
        >
          <div className="aspect-[16/9] w-full bg-black">
            <video
              key={current}
              ref={videoRefStage}
              className="h-full w-full object-cover"
              autoPlay={autoPlay}
              loop
              muted={muted}
              playsInline
              preload="metadata"
              poster={reels[current].poster}
            >
              <source src={reels[current].srcWebm} type="video/webm" />
              <source src={reels[current].srcMp4} type="video/mp4" />
            </video>
          </div>

          {/* Overlay Info */}
          <div className="absolute inset-0 flex items-end pointer-events-none">
            <div className="w-full p-4 md:p-6 flex items-center justify-between gap-3">
              <div className="backdrop-blur bg-black/40 rounded-xl px-3 py-2 md:px-4 md:py-3 max-w-[70%]">
                <p className="text-xs md:text-sm uppercase tracking-widest text-white/70">
                  {reels[current].title}
                </p>
                <p className="text-base md:text-lg lg:text-xl font-semibold leading-snug">
                  {reels[current].quote}
                </p>
              </div>
              <div className="backdrop-blur bg-white/10 rounded-xl px-3 py-2 md:px-4 md:py-3 text-right">
                <p className="text-[10px] md:text-xs text-white/80">Result</p>
                <p className="text-base md:text-xl lg:text-2xl font-bold">
                  {reels[current].stat}
                </p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between p-3 md:p-5 pointer-events-none">
            <button
              onClick={() => goto(-1)}
              className="pointer-events-auto grid place-items-center h-10 w-10 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 transition"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => goto(1)}
              className="pointer-events-auto grid place-items-center h-10 w-10 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 transition"
            >
              <ChevronRight />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="relative mt-6 md:mt-8 pb-6">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <h3 className="text-base md:text-lg font-semibold mb-3">
            Explore More Reels
          </h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
            {reels.map((r, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`group shrink-0 w-[180px] md:w-[220px] lg:w-[260px] rounded-xl overflow-hidden border transition relative ${
                  i === current
                    ? "border-white/70 ring-1 ring-white/30"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <div className="aspect-[16/9] w-full bg-zinc-900 relative">
                  <img
                    src={r.poster}
                    alt={r.title}
                    className="h-full w-full object-cover transition duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-2 md:p-3 text-left bg-white/5 backdrop-blur">
                  <p className="text-xs md:text-sm font-semibold leading-tight">
                    {r.title}
                  </p>
                  <p className="text-[10px] md:text-xs text-white/70">
                    {r.stat}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
