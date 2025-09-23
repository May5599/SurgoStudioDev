"use client";
import Link from "next/link"
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
import { MEDIA_BASE } from "../../lib/config";

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
  return (
    <section
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#616AEE] overflow-hidden"
      role="region"
      aria-label="Podcast Studio Hero"
    >
      {/* Background video */}
     <video
  className="absolute inset-0 h-full w-full object-cover"
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  poster={`${MEDIA_BASE}/6883837_poster.jpg`}
>
  <source
    src={`${MEDIA_BASE}/6883837_compressed.mp4`}
    type="video/mp4"
  />
  Your browser does not support the video tag.
</video>


      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered Title + Button */}
      <div className="relative z-10 text-center space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-white font-black uppercase leading-[0.9]
                     text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] drop-shadow-2xl"
        >
          Podcast Studio
        </motion.h1>

        {/* Boom your session button */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.3 }}
>
  <Link
    href="/contact"
    className="px-8 py-4 rounded-full bg-yellow-400 text-black font-semibold text-lg sm:text-xl shadow-lg hover:bg-yellow-300 hover:scale-[1.02] transition-all inline-block"
  >
    Book Your Session
  </Link>
</motion.div>
      </div>
    </section>
  );
}


// ---------- SHOWCASE ----------
function Showcase() {
  const cards = [
    {
      type: "video",
      src: `${MEDIA_BASE}/trim_podcast_mx0fqh_compressed.mp4`,
      poster: `${MEDIA_BASE}/trim_podcast_mx0fqh_poster.jpg`,
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/duwtym7w7/image/upload/f_auto,q_auto,w_1200/v1757622720/VAF03240_fzour5.jpg",
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1200/v1757103107/IMG_6606_siaca8.jpg",
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1200/v1757094340/VAF03010_copy_uxkwrn.jpg",
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
          Podcast recording in Ottawa
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
          
        </motion.div>

        

        
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 tracking-tight">
  Why Choose <span className="text-yellow-400">Surgo Studio</span> in Ottawa
</h2>

         <p className="mt-4 text-white/85">
  Book the room. Sit down. Record.  
  Located in Downtown Ottawa, Surgo Studio gives you instant access to a professional studio with broadcast microphones, cinematic cameras, and an on-site engineer   so you can focus on the conversation while we handle production and delivery.
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
              <div className="absolute inset-0 opacity-20 [background:radial-gradient(60%_80%_at_0%_0%,#320A6B,transparent)]" />
              <div className="relative">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
                  {p.icon}
                  <span>Surgo Studio</span>
                </div>
                <h3 className="text-xl font-bold text-white">{p.title}</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 text-white/85">
  <span className="h-2 w-2 rounded-full bg-yellow-400 flex-none" />
  <span>{pt}</span>
</li>

                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

          
        </div>
      </div>
    </section>
  );
}
// ---------- PACKAGES (no prices; still tiered) ----------
function PackagesCTA({ onOpenModal }) {
  const bullets = [
    "Concept development & show positioning",
    "Professional studio with engineer on site",
    "Multi-camera video & broadcast-grade audio",
    "Editing, mastering, artwork, and distribution",
  ];

  const tiers = [
    {
      name: "Standard",
      desc: "A solid foundation for any podcast. Includes in-studio recording, multi-camera setup, professional audio, and basic editing for clean, polished episodes.",
    },
    {
      name: "Explorer",
      desc: "Everything in Standard plus advanced editing, branded graphics, and social media clips designed to boost engagement and grow your audience.",
    },
    {
      name: "Premium",
      desc: "Full-service package: show strategy, cinematic production, editing & mastering, promotional clips, artwork, distribution, and ongoing creative support.",
    },
  ];

  const showcaseImages = [
    "https://res.cloudinary.com/duwtym7w7/image/upload/v1758043388/IMG_8219_ysmzfi.heic",
    
    "https://res.cloudinary.com/duwtym7w7/image/upload/v1758043551/IMG_8223_niakkv.jpg",
    "https://res.cloudinary.com/drt92o4ye/image/upload/v1758309719/IMG_6606_siaca8_gtj6vx.jpg",

    "https://res.cloudinary.com/duwtym7w7/image/upload/v1757624050/VAF02914_copy_ccdwmd.jpg",
  ];

  return (
    <section id="packages" className="relative w-full bg-[#0F0E0E] py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 space-y-16">
        
        {/* ✅ Image Showcase FIRST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseImages.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative overflow-hidden rounded-2xl shadow-lg"
            >
              <img
                src={src}
                alt={`Podcast showcase ${i + 1}`}
                className="w-full h-64 object-cover sm:h-72 md:h-80 lg:h-72 xl:h-80"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" /> Podcast Packages
          </p>
          <h2 className="text-4xl font-black uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl">
            Choose how you want to record
          </h2>
          <p className="mt-5 text-pretty text-white/80 sm:text-lg leading-relaxed">
            Every package includes our Ottawa podcast studio, cameras, microphones, and an engineer. 
            Pricing is tailored to your needs   we’d love to connect and talk about your vision.
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

        {/* Packages grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/60 to-zinc-950/90 p-8 shadow-2xl backdrop-blur-sm"
            >
              <div className="absolute inset-0 opacity-15 [background:radial-gradient(70%_80%_at_50%_-10%,#320A6B,transparent)]" />
              <div className="relative space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white">
                  {tier.name}
                </h3>
                <p className="text-white/80 leading-relaxed">{tier.desc}</p>
              </div>

              {/* Button */}
              <motion.button
                onClick={onOpenModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative mt-6 inline-block rounded-full bg-yellow-400 px-6 py-3 font-semibold text-black shadow-lg hover:bg-yellow-300 transition"
              >
                Connect With Us
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-sm sm:text-base italic text-white/60">
            Let’s build your podcast together   your voice, your story, your audience.
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
    <main className="bg-[#616AEE] text-white">
      <HeroCinematic onOpenModal={() => setIsModalOpen(true)} />
      <Showcase />
      <ValueShowcase />
      <PackagesCTA onOpenModal={() => setIsModalOpen(true)} />
      <BookCallSection onOpenModal={() => setIsModalOpen(true)} />
      <BookCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
