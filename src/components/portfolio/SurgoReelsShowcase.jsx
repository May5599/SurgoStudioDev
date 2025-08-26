"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Play, Pause } from "lucide-react";

/**
 * SurgoReelsShowcase
 *
 * A hyper-impact, full-width reels section with:
 * - Hero intro with quick montage
 * - Oversized masked-typography intro (fallbacks gracefully)
 * - Edge-to-edge featured reel with parallax
 * - Interactive timeline (thumbnails) to swap reels
 * - Minimal overlay captions & stats
 *
 * TailwindCSS + Framer Motion. Drop into any Next.js page.
 *
 * Usage:
 * <SurgoReelsShowcase reels={[
 *   { src:"/reels/reel1.mp4", thumb:"/reels/thumb1.jpg", title:"Campaign A", stat:"+3.2M views", quote:"Shifted the conversation." },
 *   { src:"/reels/reel2.mp4", thumb:"/reels/thumb2.jpg", title:"Campaign B", stat:"4x engagement", quote:"Hooked in 3 seconds." },
 * ]} brandWord="SURGO IMPACT" />
 */
export default function SurgoReelsShowcase({
  reels: inputReels,
  brandWord = "SURGO IMPACT",
  autoPlay = true,
  onReelChange, // optional callback(index)
}) {
  const defaultReels = useMemo(
    () => [
      {
        src: "/reel1.mp4",
        thumb:
          "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1200&auto=format&fit=crop",
        title: "Story in Motion",
        stat: "+2.4M reach",
        quote: "Momentum you can feel.",
      },
      {
        src: "reel2.mp4",
        thumb:
          "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop",
        title: "Vertical Energy",
        stat: "4x engagement",
        quote: "Hooked in three seconds.",
      },
      {
        src: "reel3.mp4",
        thumb:
          "https://images.unsplash.com/photo-1520975922284-9f53e3cf335b?q=80&w=1200&auto=format&fit=crop",
        title: "Human Focus",
        stat: "+1.1M plays",
        quote: "Every frame, intention.",
      },
    ],
    []
  );

  const reels = inputReels?.length ? inputReels : defaultReels;

  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  const videoRefHero = useRef(null);
  const videoRefStage = useRef(null);

  // Parallax controls
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
    const dy = t.clientY - touchStart.current.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      goto(dx < 0 ? 1 : -1);
    }
  };

  // Keyboard controls
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

  // Quick montage intro (flash through first 3 reels)
  useEffect(() => {
    if (!showIntro) return;
    let idx = 0;
    const id = setInterval(() => {
      setCurrent((p) => (p + 1) % Math.min(3, Math.max(1, reels.length)));
      idx += 1;
      if (idx > 4) {
        clearInterval(id);
        setShowIntro(false);
        setCurrent(0);
      }
    }, 650);
    return () => clearInterval(id);
  }, [showIntro, reels.length]);

  // Ensure play/pause state applies to both videos reliably after src changes
  useEffect(() => {
    const apply = (v) => {
      if (!v) return;
      v.muted = muted;
      if (playing) {
        const p = v.play();
        if (p?.catch) p.catch(() => {});
      } else {
        v.pause();
      }
    };
    apply(videoRefHero.current);
    apply(videoRefStage.current);
    onReelChange?.(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, muted, current]);

  // Inject no-scrollbar CSS once (client-only)
  useEffect(() => {
    const css = `.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`;
    const el = document.createElement("style");
    el.setAttribute("data-surgo-reels", "true");
    el.innerHTML = css;
    document.head.appendChild(el);
    return () => {
      if (el && document.head.contains(el)) document.head.removeChild(el);
    };
  }, []);

  return (
    <section
      className="relative w-full bg-black text-white overflow-hidden"
      aria-label="Surgo Reels Showcase"
    >
      {/* Background soft glow based on current thumb */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/70" />


      {/* HERO: Masked Typography over video (with graceful fallback) */}
      <div
        className="relative h-[60vh] md:h-[80vh]"
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
          {/* Darken for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/70" />
        </div>

        {/* Mask-style headline (blend-mode fallback) */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          onMouseMove={onMouseMove}
        >
          <motion.h1
            style={{ rotateX, rotateY, x: translateX, y: translateY }}
            className="text-center font-black tracking-tight leading-[0.9] select-none"
            aria-hidden
          >
            <span className="block text-[9vw] md:text-[10vw] mix-blend-screen text-white/90 drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]">
              {brandWord}
            </span>
          </motion.h1>
        </div>

        {/* Minimal top-right controls */}
        <div className="absolute top-5 right-5 z-10 flex items-center gap-3">
          <button
            onClick={() => setMuted((m) => !m)}
            className="rounded-2xl bg-white/10 backdrop-blur px-3 py-2 hover:bg-white/20 transition"
            aria-label={muted ? "Unmute" : "Mute"}
            title={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="rounded-2xl bg-white/10 backdrop-blur px-3 py-2 hover:bg-white/20 transition"
            aria-label={playing ? "Pause" : "Play"}
            title={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </button>
        </div>
      </div>

     {/* Featured Reel Stage with Parallax frame */}
<div className="relative w-full max-w-[1400px] mx-auto px-4 md:px-8 -mt-16 md:-mt-24">
  {/* NEW: animated shooting star border wrapper */}
  <div className="shooting-border rounded-3xl p-[2px]">
    <motion.div
      onMouseMove={onMouseMove}
      style={{ rotateX, rotateY, x: translateX, y: translateY }}
      className="relative rounded-3xl overflow-hidden shadow-2xl bg-black" // removed static border
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

      {/* Overlay content */}
      <div className="absolute inset-0 pointer-events-none flex items-end">
        <div className="w-full p-5 md:p-7 flex items-center justify-between">
          <div className="backdrop-blur bg-black/35 rounded-2xl px-4 py-3 max-w-[70%]">
            <p className="text-sm md:text-base uppercase tracking-widest text-white/70">
              {reels[current]?.title}
            </p>
            <p className="text-lg md:text-2xl font-semibold">
              {reels[current]?.quote}
            </p>
          </div>
          <div className="backdrop-blur bg-white/10 rounded-2xl px-4 py-3 text-right">
            <p className="text-xs md:text-sm text-white/80">Result</p>
            <p className="text-xl md:text-2xl font-bold">
              {reels[current]?.stat}
            </p>
          </div>
        </div>
      </div>

      {/* Nav Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between p-3 md:p-5 pointer-events-none">
        <button
          onClick={() => goto(-1)}
          className="pointer-events-auto grid place-items-center h-11 w-11 md:h-12 md:w-12 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 transition"
          aria-label="Previous reel"
          title="Previous"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => goto(1)}
          className="pointer-events-auto grid place-items-center h-11 w-11 md:h-12 md:w-12 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 transition"
          aria-label="Next reel"
          title="Next"
        >
          <ChevronRight />
        </button>
      </div>
    </motion.div>
  </div>
</div>


      {/* Timeline / Reel Selector */}
      <div className="relative mt-10 md:mt-12 pb-10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg md:text-xl font-semibold tracking-tight">
              Explore More Reels
            </h3>
          </div>

          <div className="relative">
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
      </div>
    </section>
  );
}

function TimelineThumb({ reel, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group shrink-0 w-[220px] md:w-[260px] rounded-2xl overflow-hidden border transition relative ${
        active
          ? "border-white/70 ring-2 ring-white/30"
          : "border-white/10 hover:border-white/30"
      }`}
      aria-label={`Open reel ${reel.title}`}
      title={reel.title}
    >
      <div className="aspect-[16/9] w-full bg-zinc-900 relative">
        {/* Thumb */}
        <img
          src={reel.thumb}
          alt={reel.title}
          className={`h-full w-full object-cover transition duration-500 ${
            active ? "scale-105" : "group-hover:scale-105"
          }`}
          loading="lazy"
        />
        {/* Overlay play pulse */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`h-10 w-10 rounded-full bg-white/90 grid place-items-center shadow ${
              active ? "scale-110" : "group-hover:scale-105"
            } transition`}
          >
            <Play size={16} className="ml-0.5" />
          </div>
        </div>
      </div>
      <div className="p-3 text-left bg-white/5 backdrop-blur">
        <p className="text-sm font-semibold leading-tight">{reel.title}</p>
        <p className="text-xs text-white/70">{reel.stat}</p>
      </div>
      {/* Active underline */}
      <div
        className={`absolute bottom-0 left-0 h-1 bg-white transition-all ${
          active ? "w-full" : "w-0 group-hover:w-1/2"
        }`}
      />
    </button>
  );
}
