"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

const showcaseData = [
  {
    title: "DRYP – 30s Ad",
    stat: "Built audience trust",
    quote: "Momentum you can feel.",
    srcMp4:
      "https://res.cloudinary.com/duwtym7w7/video/upload/v1757613934/DRYP_30_4K_H265_Final_zwxg2r.mp4",
    poster:
      "https://res.cloudinary.com/duwtym7w7/video/upload/f_auto,q_auto,w_1200,so_2/v1757613934/DRYP_30_4K_H265_Final_zwxg2r.jpg",
  },
  {
    title: "Branch Office Trailer",
    stat: "Elevated brand presence",
    quote: "A glimpse into the story.",
    srcMp4:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,w_1920/v1757097186/BranchOfficeTrailerv3_f5ejqb.mp4",
    poster:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,w_1200,so_2/v1757097186/BranchOfficeTrailerv3_f5ejqb.jpg",
  },
  {
    title: "Vertical Energy",
    stat: "Boosted conversions",
    quote: "Hooked in three seconds.",
    srcMp4:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,w_1920/v1756914498/reel1_ghfwq2.mp4",
    poster:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,w_1200,so_2/v1756914498/reel1_ghfwq2.jpg",
  },
  {
    title: "Immersive Frames",
    stat: "Strengthened engagement",
    quote: "Designed for connection.",
    srcMp4:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,w_1920/v1757094343/website01_bwovoe.mp4",
    poster:
      "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto,w_1200,so_2/v1757094343/website01_bwovoe.jpg",
  },
  {
    title: "Cut Showcase",
    stat: "Enhanced corporate identity",
    quote: "Stories that scale.",
    srcMp4:
      "https://res.cloudinary.com/duwtym7w7/video/upload/v1757613934/cut_v1s354.mp4",
    poster:
      "https://res.cloudinary.com/duwtym7w7/video/upload/f_auto,q_auto,w_1200,so_2/v1757613934/cut_v1s354.jpg",
  },
];

export default function SurgoShowcase({
  videos = showcaseData,
  brandWord = "SURGO IMPACT",
}) {
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  const videoRefHero = useRef(null);
  const videoRefStage = useRef(null);

  // Motion values for parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-150, 150], [6, -6]);
  const rotateY = useTransform(x, [-150, 150], [-6, 6]);
  const translateX = useTransform(x, [-150, 150], [-10, 10]);
  const translateY = useTransform(y, [-150, 150], [-6, 6]);

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const goto = (dir) => {
    setCurrent((c) => (c + dir + videos.length) % videos.length);
    setPlaying(true);
  };

  // Sync mute/play
useEffect(() => {
  const apply = (ref) => {
    if (!ref?.current) return;
    ref.current.pause();
    ref.current.load(); // reload new src when current changes
    ref.current.muted = muted;
    if (playing) {
      ref.current.play().catch(() => {});
    }
  };
  apply(videoRefHero);
  apply(videoRefStage);
}, [muted, playing, current]); // <-- include current

  return (
    <section className="relative w-full bg-black text-white overflow-hidden">
      {/* HERO */}
      <div
        className="relative h-[60vh] md:h-[75vh]"
        onMouseMove={onMouseMove}
      >
        <video
          ref={videoRefHero}
          className="h-full w-full object-cover cursor-pointer"
          autoPlay
          loop
          muted={muted}
          playsInline
          preload="auto"
          poster={videos[current].poster}
          onClick={() => setPlaying((p) => !p)}
        >
          <source src={videos[current].srcMp4} type="video/mp4" />
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
      </div>

      {/* Stage Video */}
      <div className="relative w-full max-w-[1400px] mx-auto px-4 md:px-10 -mt-14 md:-mt-20">
        <motion.div
          style={{ rotateX, rotateY, x: translateX, y: translateY }}
          className="relative rounded-2xl overflow-hidden shadow-2xl bg-black"
        >
          <div className="aspect-[16/9] w-full bg-black">
            <video
              ref={videoRefStage}
              className="h-full w-full object-cover cursor-pointer"
              autoPlay
              loop
              muted={muted}
              playsInline
              preload="auto"
              poster={videos[current].poster}
              onClick={() => setPlaying((p) => !p)}
            >
              <source src={videos[current].srcMp4} type="video/mp4" />
            </video>
          </div>

          {/* Info Overlay */}
          <div className="absolute inset-0 flex items-end pointer-events-none">
  <div className="w-full p-3 sm:p-5 md:p-8 flex items-center justify-between gap-2">
    
    {/* Quote Box */}
    <div className="backdrop-blur bg-black/40 rounded-lg px-3 py-2 w-[70%] sm:w-[75%] md:max-w-[70%]">
      <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-widest text-white/70 truncate">
        {videos[current].title}
      </p>
      <p className="text-xs sm:text-sm md:text-lg lg:text-2xl font-semibold leading-snug line-clamp-2">
        {videos[current].quote}
      </p>
    </div>

    {/* Stat Box */}
    <div className="backdrop-blur bg-white/10 rounded-lg px-3 py-2 text-right shrink-0">
      <p className="text-[9px] sm:text-[10px] md:text-xs text-white/80">Result</p>
      <p className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold">
        {videos[current].stat}
      </p>
    </div>
  </div>
</div>


          {/* Controls */}
          <div className="absolute top-3 right-3 flex gap-2 z-20">
            <button
              onClick={() => setMuted((m) => !m)}
              className="pointer-events-auto rounded-full bg-black/50 hover:bg-black/70 p-2 transition"
            >
              {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>

          {/* Nav */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between p-4 md:p-6 pointer-events-none">
            <button
              onClick={() => goto(-1)}
              className="pointer-events-auto grid place-items-center h-12 w-12 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 transition"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => goto(1)}
              className="pointer-events-auto grid place-items-center h-12 w-12 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 transition"
            >
              <ChevronRight />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Thumbnails */}
      <div className="relative mt-8 md:mt-12 pb-8">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <h3 className="text-base md:text-xl font-semibold mb-4">
            Explore More Videos
          </h3>
          <div className="flex gap-5 overflow-x-auto no-scrollbar py-3">
            {videos.map((v, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrent(i);
                  setPlaying(true); // ensure it plays immediately
                }}
                className={`group shrink-0 w-[220px] md:w-[280px] lg:w-[320px] rounded-xl overflow-hidden border transition relative ${
                  i === current
                    ? "border-white/70 ring-1 ring-white/30"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <div className="aspect-[16/9] w-full bg-zinc-900 relative">
                  <img
                    src={v.poster}
                    alt={v.title}
                    className="h-full w-full object-cover transition duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 text-left bg-white/5 backdrop-blur">
                  <p className="text-sm md:text-base font-semibold leading-tight">
                    {v.title}
                  </p>
                  <p className="text-[11px] md:text-sm text-white/70">
                    {v.stat}
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
