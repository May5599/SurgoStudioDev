"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, Waves, Mic2, Sparkles } from "lucide-react";
import {
  CheckCircle2,
  Video,
  Wand2,
  Rocket,
  AudioLines,
  Timer,
} from "lucide-react";

import BookCallModal from "@/components/BookCallModal";            // you already have this
import BookCallSection from "@/components/podcast/BookCallSection"; // from earlier message

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
    poster="/og/ottawa-podcast-studio.jpg"
    src="reel2.mp4"
  />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
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
          <button
            onClick={onOpenModal}
            className="group inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-black shadow-lg shadow-black/20 transition hover:translate-y-[-1px] hover:shadow-xl"
          >
            <Mic2 className="h-5 w-5" /> Book your session
          </button>
          <a
            href="#samples"
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
      src: "https://cdn.coverr.co/videos/coverr-recording-studio-people-adjusting-microphone-7487/1080p.mp4",
      caption: "Studio grade sound and clean dialog",
      alt: "Ottawa podcast studio microphones and recording in progress",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop",
      caption: "Multi camera video ready for reels and YouTube",
      alt: "Multi camera podcast production setup in Ottawa studio",
    },
  ];

  return (
    <section id="samples" className="relative w-full bg-[#0F0E0E] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.h2 id="ottawa-podcast-recording"
          className="text-balance bg-gradient-to-b from-white to-white/70 bg-clip-text text-3xl font-extrabold uppercase tracking-tight text-transparent sm:text-4xl md:text-5xl"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }} variants={fadeUp}
        >
          Professional podcast recording in Ottawa
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:gap-8 md:grid-cols-2">
          {cards.map((card, idx) => (
            <motion.article
              key={idx}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 shadow-2xl"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                {card.type === "video" ? (
                  <video
                    src={card.src} autoPlay muted loop playsInline
                    className="h-full w-full object-cover transition duration-700 will-change-transform group-hover:scale-[1.03]"
                  />
                ) : (
                  <img
                    src={card.src} alt={card.alt}
                    className="h-full w-full object-cover transition duration-700 will-change-transform group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
                <motion.div
                  className="absolute inset-x-0 bottom-0 p-4 sm:p-6" variants={fadeUp}
                  initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }}
                >
                  <p className="text-lg font-semibold text-white sm:text-xl">{card.caption}</p>
                </motion.div>
              </div>
            </motion.article>
          ))}

          <motion.article
            className="md:col-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 shadow-2xl"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[21/9] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=2000&auto=format&fit=crop"
                alt="Surgo Studio Ottawa podcast control desk and monitors"
                className="h-full w-full object-cover" loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/70" />
              <div className="absolute inset-0 flex items-center px-6 sm:px-10">
                <h3 className="text-balance text-2xl font-extrabold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                  Clean recording. Cinematic visuals. Editing and delivery included.
                </h3>
              </div>
            </div>
          </motion.article>
        </div>
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
function PackagesCTA({ onOpenModal }) {
  const bullets = [
    "Concept and show positioning",
    "Studio recording with 2 to 4 microphones and remote guests",
    "Video podcast with multi camera and social clips",
    "Editing, mastering, artwork, and distribution",
  ];
  const tiers = [
    {
      name: "Audio Only",
      desc: "In studio recording, professional microphones, editing, music, and mastering. Distribution to major platforms.",
    },
    {
      name: "Video and Clips",
      desc: "Everything in Audio Only plus multi camera video, color, and social clips for growth.",
    },
    {
      name: "Premium Full Service",
      desc: "Custom concept, full video and audio production, artwork, distribution, and ongoing content strategy.",
    },
  ];

  return (
    <section id="packages" className="relative w-full bg-[#0F0E0E]">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-8 md:py-28 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" /> Surgo Studio packages
          </p>
          <h2 className="text-balance text-4xl font-black uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl">
            Choose how you want to record
          </h2>
          <p className="mt-4 text-pretty text-white/85 sm:text-lg">
            Every package includes our Ottawa studio, microphones, cameras as needed, an engineer, and post production. Pricing is tailored to your length and needs.
          </p>

          <ul className="mt-6 grid gap-3 text-white/90 sm:grid-cols-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-white" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenModal}
              className="rounded-2xl bg-white px-6 py-3 font-semibold text-black shadow-lg shadow-black/20 transition hover:translate-y-[-1px] hover:shadow-xl"
            >
              Book a call
            </button>
            <button
              onClick={onOpenModal}
              className="rounded-2xl border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Get a custom quote
            </button>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.06 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-6 shadow-2xl backdrop-blur-md sm:p-8"
            >
              <div className="absolute inset-0 opacity-20 [background:radial-gradient(50%_60%_at_10%_0%,#fff,transparent)]" />
              <div className="relative">
                <h3 className="text-xl font-bold text-white sm:text-2xl">{tier.name}</h3>
                <p className="mt-2 text-white/85">{tier.desc}</p>
                <button
                  onClick={onOpenModal}
                  className="mt-6 inline-block rounded-xl bg-white px-5 py-3 font-semibold text-black shadow-md transition hover:translate-y-[-1px]"
                >
                  Choose {tier.name}
                </button>
              </div>
            </motion.div>
          ))}
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
