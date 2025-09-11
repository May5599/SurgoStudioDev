"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Waves, Mic2, Sparkles, Volume2, VolumeX, Play, Pause } from "lucide-react";
import {
  CheckCircle2,
  Video,
  Wand2,
  Rocket,
  AudioLines,
  Timer,
} from "lucide-react";

import BookCallModal from "../../components/BookCallModal";            // you already have this
import BookCallSection from "../../components/podcast/BookCallSection"; // from earlier message

// ---------- Shared animation helpers ----------
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const flyLeft  = { hidden: { x: -200, opacity: 0 }, show: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } };
const flyRight = { hidden: { x:  200, opacity: 0 }, show: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } };
const flyUp    = { hidden: { y:  150, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } };

// ---------- HERO ----------
function HeroCinematic({ onOpenModal }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // lightweight rotating taglines
  const taglines = [
    "Book a professional podcast studio in Ottawa with everything included.",
    "We provide the studio, microphones, cameras, and editing.",
    "Just bring the conversation. We handle the production.",
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % taglines.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section
  ref={ref}
  className="relative min-h-[92vh] w-full overflow-hidden bg-[#0F0E0E]"
  role="region"
  aria-label="Surgo Studio Ottawa podcast recording hero"
>
  <video
    className="absolute inset-0 h-full w-full object-cover"
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    poster="https://res.cloudinary.com/duwtym7w7/image/upload/v1757624050/VAF02914_copy_ccdwmd.jpg"
    src="https://res.cloudinary.com/duwtym7w7/image/upload/v1757624050/VAF02914_copy_ccdwmd.jpg"
  />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_40%_at_50%_10%,rgba(255,255,255,0.12),transparent)]" />

      <motion.div style={{ y, scale }} className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-20 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
          <Waves className="h-4 w-4" />
          <span className="text-xs tracking-wide text-white/80">
            Surgo Studio • Ottawa Podcast Recording and Production
          </span>
        </div>

        <h1 className="mt-6 text-balance font-black uppercase tracking-tight text-white drop-shadow-xl [text-shadow:0_10px_40px_rgba(0,0,0,0.5)] leading-[0.9]">
          <motion.span variants={flyLeft} initial="hidden" animate="show" className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            Surgo Studio
          </motion.span>
          <motion.span variants={flyRight} initial="hidden" animate="show" className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            Ottawa Podcast Studio
          </motion.span>
        </h1>

        <div className="mt-4 h-8 sm:h-9" aria-live="polite" aria-atomic="true">
    <AnimatePresence mode="wait">
      <motion.p
        key={idx}
        className="max-w-2xl text-pretty text-base text-white/85 sm:text-lg"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.45 }}
      >
        {taglines[idx]}
      </motion.p>
    </AnimatePresence>
  </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
  href="/contact"
  className="group inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-black shadow-lg shadow-black/20 transition hover:translate-y-[-1px] hover:shadow-xl"
>
  <Mic2 className="h-5 w-5" /> Book your session
</a>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <Play className="h-5 w-5" /> Watch samples
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// ---------- SHOWCASE ----------
function Showcase() {
  const cards = [
    {
      type: "video",
      src: "https://res.cloudinary.com/duwtym7w7/video/upload/f_auto,q_auto,w_1920/v1757622421/trim_podcast_mx0fqh.mp4",
      poster:
        "https://res.cloudinary.com/duwtym7w7/video/upload/f_auto,q_auto,w_1200,so_1/v1757622421/trim_podcast_mx0fqh.jpg",
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/duwtym7w7/image/upload/f_auto,q_auto,w_1200/v1757622720/VAF03240_fzour5.jpg",
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto,w_1200/v1757103107/IMG_6606_siaca8.jpg",
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto,w_1200/v1757094340/VAF03010_copy_uxkwrn.jpg",
    },
  ];

  // --- Video controls ---
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  const toggleMute = () => {
    setMuted((m) => !m);
    if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <section id="samples" className="relative w-full bg-[#0F0E0E] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 space-y-16">
        <motion.h2
          className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-3xl font-extrabold uppercase tracking-tight text-transparent sm:text-4xl md:text-5xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeUp}
        >
          Professional podcast recording in Ottawa
        </motion.h2>

        {/* Hero video (wide editorial) */}
        <motion.div
          className="relative w-full overflow-hidden rounded-3xl shadow-2xl"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <video
            ref={videoRef}
            src={cards[0].src}
            poster={cards[0].poster}
            autoPlay
            muted={muted}
            loop
            playsInline
            className="w-full h-[70vh] object-cover cursor-pointer"
            onClick={togglePlay}
          />
          {/* Controls */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button
              onClick={toggleMute}
              className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white"
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button
              onClick={togglePlay}
              className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white"
            >
              {playing ? <Pause size={18} /> : <Play size={18} />}
            </button>
          </div>
          <p className="mt-3 text-sm text-white/60">
            A cinematic view inside Surgo Studio.
          </p>
        </motion.div>

        {/* Two side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.slice(1, 3).map((card, idx) => (
            <motion.figure
              key={idx}
              className="relative overflow-hidden rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <img
                src={card.src}
                className="w-full h-[350px] object-cover"
                loading="lazy"
              />
              <figcaption className="mt-2 text-sm text-white/60">
                Editorial detail shot.
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Final wide footer image */}
        <motion.figure
          className="relative w-full overflow-hidden rounded-3xl shadow-xl"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <img
            src={cards[3].src}
            className="w-full h-[60vh] object-cover"
            loading="lazy"
          />
          <figcaption className="mt-2 text-sm text-white/60">
            Closing editorial frame.
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
// ---------- VALUE: provide, fix, help ----------
 function ValueShowcase() {
  const pillars = [
    {
      icon: <Mic2 className="h-5 w-5" />,
      title: "We provide everything",
      points: [
        "Ottawa studio with engineer on site",
        "Broadcast microphones and clean preamps",
        "Multi camera video and lighting",
      ],
    },
    {
      icon: <Wand2 className="h-5 w-5" />,
      title: "We fix common issues",
      points: [
        "Noisy Zoom audio and echo corrected",
        "Levels matched and voice clarified",
        "Flat visuals graded for depth",
      ],
    },
    {
      icon: <Rocket className="h-5 w-5" />,
      title: "We help you grow",
      points: [
        "Edit and master for all platforms",
        "Short clips ready for social",
        "Artwork and distribution included",
      ],
    },
  ];

  const before = [
    { icon: <AudioLines className="h-4 w-4" />, text: "Inconsistent audio" },
    { icon: <Video className="h-4 w-4" />, text: "Single angle video" },
    { icon: <Timer className="h-4 w-4" />, text: "Time lost on setup" },
  ];
  const after = [
    { icon: <CheckCircle2 className="h-4 w-4" />, text: "Studio grade sound" },
    { icon: <CheckCircle2 className="h-4 w-4" />, text: "Multi camera delivery" },
    { icon: <CheckCircle2 className="h-4 w-4" />, text: "Engineer handles workflow" },
  ];

  return (
    <section className="relative w-full bg-[#0F0E0E] py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
        {/* Sticky narrative */}
        <motion.aside
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="lg:col-span-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            Why choose Surgo Studio in Ottawa
          </h2>
          <p className="mt-4 text-white/85">
            Book the room. Sit down. Record. We provide the studio, the microphones, the cameras, and the engineer. You focus on the conversation while we manage production and delivery.
          </p>
        </motion.aside>

        {/* Pillars */}
        <div className="lg:col-span-8 space-y-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.05 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-6 shadow-2xl backdrop-blur-md"
            >
              <div className="absolute inset-0 opacity-20 [background:radial-gradient(60%_80%_at_0%_0%,#fff,transparent)]" />
              <div className="relative">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
                  {p.icon}
                  <span>Surgo Studio</span>
                </div>
                <h3 className="text-xl font-bold text-white">{p.title}</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-white/85">
                      <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-white" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

          {/* Before -> After strip */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="rounded-3xl border border-white/10 bg-zinc-900/40 p-6">
              <p className="text-sm font-semibold text-white/70">Before</p>
              <ul className="mt-3 space-y-2">
                {before.map((b) => (
                  <li key={b.text} className="flex items-center gap-2 text-white/85">
                    {b.icon}
                    <span>{b.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-sm font-semibold text-white">After at Surgo Studio</p>
              <ul className="mt-3 space-y-2">
                {after.map((a) => (
                  <li key={a.text} className="flex items-center gap-2 text-white">
                    {a.icon}
                    <span>{a.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
// ---------- PACKAGES (no prices; still tiered) ----------
function PackagesCTA() {
  const bullets = [
    "Concept and show positioning",
    "Studio recording with 2 to 4 microphones and remote guests",
    "Video podcast with multi-camera and social clips",
    "Editing, mastering, artwork, and distribution",
  ];

  const tiers = [
    {
      name: "Audio Only",
      desc: "In-studio recording with professional microphones, editing, music, and mastering. Perfect for storytellers who want clean audio delivered to all major platforms.",
    },
    {
      name: "Video + Clips",
      desc: "Everything in Audio Only, plus multi-camera video, color-grading, and short-form clips engineered for social media growth.",
    },
    {
      name: "Premium Full Service",
      desc: "From concept to strategy: custom show design, full video + audio production, artwork, distribution, and ongoing content support.",
    },
  ];

  return (
    <section id="packages" className="relative w-full bg-[#0F0E0E] py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 space-y-16">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" /> Surgo Studio Packages
          </p>
          <h2 className="text-4xl font-black uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl">
            Choose how you want to record
          </h2>
          <p className="mt-5 text-pretty text-white/80 sm:text-lg leading-relaxed">
            Every package includes our Ottawa studio, microphones, cameras as needed, an engineer, and post-production. 
            Pricing is tailored once we connect, because every story is different.
          </p>

          <ul className="mt-6 grid gap-3 text-white/90 sm:grid-cols-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-white" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Packages grid editorial style */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/60 to-zinc-950/90 p-8 shadow-2xl backdrop-blur-sm"
            >
              <div className="absolute inset-0 opacity-15 [background:radial-gradient(70%_80%_at_50%_-10%,#fff,transparent)]" />
              <div className="relative space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white">
                  {tier.name}
                </h3>
                <p className="text-white/80 leading-relaxed">{tier.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Editorial footer line */}
        <div className="text-center mt-16">
          <p className="text-sm sm:text-base italic text-white/60">
            Surgo Studio – crafted to capture your voice, your vision, your story.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------- PAGE ----------
export default function PodcastServicePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main className="bg-[#0F0E0E] text-white">
      <HeroCinematic onOpenModal={() => setIsModalOpen(true)} />
      <Showcase />
      <ValueShowcase />
      <PackagesCTA onOpenModal={() => setIsModalOpen(true)} />
      <BookCallSection onOpenModal={() => setIsModalOpen(true)} />
      <BookCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
