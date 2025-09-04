"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
} from "lucide-react";

export default function SurgoReelsShowcase({
  reels: inputReels,
  brandWord = "SURGO IMPACT",
  autoPlay = true,
  onReelChange,
}) {
  const defaultReels = useMemo( () => [ { src: "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto/v1756914502/reel2_uy1pjd.mp4", thumb: "https://res.cloudinary.com/dvqibrc9d/video/upload/w_600,f_auto,q_auto,so_2/v1756914502/reel2_uy1pjd.jpg", title: "Story in Motion", stat: "+2.4M reach", quote: "Momentum you can feel.", }, { src: "https://res.cloudinary.com/dvqibrc9d/video/upload/v1756914498/reel1_ghfwq2.mp4", thumb: "https://res.cloudinary.com/dvqibrc9d/video/upload/v1756914498/reel1_ghfwq2.mp4", title: "Vertical Energy", stat: "4x engagement", quote: "Hooked in three seconds.", }, { src: "https://res.cloudinary.com/dvqibrc9d/video/upload/f_auto,q_auto/v1756914496/reel3_gfb9d0.mp4", thumb: "https://images.unsplash.com/photo-1520975922284-9f53e3cf335b?q=80&w=800&auto=format&fit=crop", title: "Human Focus", stat: "+1.1M plays", quote: "Every frame, intention.", }, ], [] ); 


  const reels = inputReels?.length ? inputReels : defaultReels;

  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

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
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx);
    y.set(dy);
  };

  // Swipe controls
  const touchStart = useRef({ x: 0, y: 0 });
  const onTouchStart = (e) => {
    const t = e.changedTouches?.[0];
    if (!t) return;
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    const t = e.changedTouches?.[0];
    if (!t) return;
    const dx = t.clientX - touchStart.current.x;
    if (Math.abs(dx) > 40) goto(dx < 0 ? 1 : -1);
  };

  // Keyboard
  const goto = useCallback(
    (dir) => {
      setCurrent((c) => (c + dir + reels.length) % reels.length);
    },
    [reels.length]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goto(1);
      else if (e.key === "ArrowLeft") goto(-1);
      else if (e.code === "Space") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goto]);

  // Intro reel flash
  useEffect(() => {
    if (!showIntro) return;
    let idx = 0;
    const id = setInterval(() => {
      setCurrent((p) => (p + 1) % Math.min(3, reels.length));
      idx += 1;
      if (idx > 4) {
        clearInterval(id);
        setShowIntro(false);
        setCurrent(0);
      }
    }, 600);
    return () => clearInterval(id);
  }, [showIntro, reels.length]);

  // Sync play/pause + mute
  useEffect(() => {
    const apply = (v) => {
      if (!v) return;
      v.muted = muted;
      if (playing) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    };
    apply(videoRefHero.current);
    apply(videoRefStage.current);
    onReelChange?.(current);
  }, [playing, muted, current, onReelChange]);

  // Hide scrollbars globally
  useEffect(() => {
    const css =
      ".no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}";
    const el = document.createElement("style");
    el.innerHTML = css;
    document.head.appendChild(el);
    return () => {
      if (el && document.head.contains(el)) document.head.removeChild(el);
    };
  }, []);

  return (
    <section className="relative w-full bg-black text-white overflow-hidden">
      {/* HERO */}
      <div
        className="relative h-[60vh] md:h-[75vh]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="absolute inset-0">
          <video
            key={reels[current]?.src + (showIntro ? "-intro" : "-main")}
            ref={videoRefHero}
            className="h-full w-full object-cover"
            src={reels[current]?.src}
            autoPlay={autoPlay}
            loop
            muted={muted}
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/70" />
        </div>

        {/* Headline */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          onMouseMove={onMouseMove}
        >
          <motion.h1
            style={{ rotateX, rotateY, x: translateX, y: translateY }}
            className="text-center font-black tracking-tight leading-[0.9] select-none"
            aria-hidden
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

      {/* Featured Reel */}
      <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-8 -mt-14 md:-mt-20">
        <motion.div
          onMouseMove={onMouseMove}
          style={{ rotateX, rotateY, x: translateX, y: translateY }}
          className="relative rounded-2xl overflow-hidden shadow-2xl bg-black"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="aspect-[16/9] w-full bg-black">
            <video
              key={reels[current]?.src + "-stage"}
              ref={videoRefStage}
              className="h-full w-full object-cover"
              src={reels[current]?.src}
              autoPlay={autoPlay}
              loop
              muted={muted}
              playsInline
              preload="metadata"
            />
          </div>

          {/* Overlay Info */}
          <div className="absolute inset-0 pointer-events-none flex items-end">
            <div className="w-full p-4 md:p-6 flex items-center justify-between gap-3">
              <div className="backdrop-blur bg-black/40 rounded-xl px-3 py-2 md:px-4 md:py-3 max-w-[70%]">
                <p className="text-xs md:text-sm uppercase tracking-widest text-white/70">
                  {reels[current]?.title}
                </p>
                <p className="text-base md:text-lg lg:text-xl font-semibold leading-snug">
                  {reels[current]?.quote}
                </p>
              </div>
              <div className="backdrop-blur bg-white/10 rounded-xl px-3 py-2 md:px-4 md:py-3 text-right">
                <p className="text-[10px] md:text-xs text-white/80">Result</p>
                <p className="text-base md:text-xl lg:text-2xl font-bold">
                  {reels[current]?.stat}
                </p>
              </div>
            </div>
          </div>

          {/* Nav Arrows */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between p-3 md:p-5 pointer-events-none">
            <button
              onClick={() => goto(-1)}
              className="pointer-events-auto grid place-items-center h-10 w-10 md:h-11 md:w-11 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 transition"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => goto(1)}
              className="pointer-events-auto grid place-items-center h-10 w-10 md:h-11 md:w-11 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 transition"
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
              <TimelineThumb
                key={i + r.src}
                active={i === current}
                reel={r}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineThumb({ reel, active, onClick }) {
  // Generate thumb from video: use 2s mark (adjust as needed)
  const thumbFromVideo = reel.src.replace("/upload/", "/upload/so_2,f_auto,q_auto/") + ".jpg";

  return (
    <button
      onClick={onClick}
      className={`group shrink-0 w-[180px] md:w-[220px] lg:w-[260px] rounded-xl overflow-hidden border transition relative ${
        active
          ? "border-white/70 ring-1 ring-white/30"
          : "border-white/10 hover:border-white/30"
      }`}
    >
      <div className="aspect-[16/9] w-full bg-zinc-900 relative">
        <img
          src={thumbFromVideo}
          alt={reel.title}
          className={`h-full w-full object-cover transition duration-500 ${
            active ? "scale-105" : "group-hover:scale-105"
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/90 grid place-items-center shadow ${
              active ? "scale-110" : "group-hover:scale-105"
            } transition`}
          >
            <Play size={14} className="ml-0.5" />
          </div>
        </div>
      </div>
      <div className="p-2 md:p-3 text-left bg-white/5 backdrop-blur">
        <p className="text-xs md:text-sm font-semibold leading-tight">
          {reel.title}
        </p>
        <p className="text-[10px] md:text-xs text-white/70">{reel.stat}</p>
      </div>
    </button>
  );
}
