"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const showcaseItems = [
  {
    title: "Cinematic Brand Films",
    description:
      "Long-form storytelling that captures your brand’s vision, crafted to inspire and build emotional resonance.",
    image:
      "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1600/v1757093756/pexels-ekam-juneja-61080223-28867101_vqd4ew_e9ez84.jpg",
  },
  {
    title: "Podcasts & Talk Shows",
    description:
      "End-to-end podcast production with pro audio, multi-cam video, editing, and distribution-ready assets.",
    image:
      "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1600/v1758309720/VAF03225_wwpzws_odm81l.jpg",
  },
  {
    title: "Launch & Promo Videos",
    description:
      "High-energy promos and launch videos designed to grab attention, build hype, and fuel conversions.",
    image:
      "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1600/v1758309717/pexels-kyleloftusstudios-11745675_p3zmhz_m3d6vd.jpg",
  },
  {
    title: "Social Media Edits",
    description:
      "Short-form vertical content engineered for TikTok, Instagram Reels, and YouTube Shorts that stops the scroll.",
    image:
      "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1600/v1758309717//pexels-rccbtn-15406294_iqapsc_kqootr.jpg",
  },
  {
    title: "Ad Spots & Commercials",
    description:
      "Performance-focused ads for TV and digital platforms. Crisp visuals and hooks tailored to convert.",
    image:
      "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1600/v1758309718/pexels-anntarazevich-7466999_ym5yr3_rxu9mn.jpg",
  },
  {
    title: "Event Highlights",
    description:
      "Immersive recap videos for conferences, festivals, and brand activations—capturing energy and moments that matter.",
    image:
      "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1600/v1758309718/pexels-bertellifotografia-2608513_juejb0_mw3lty.jpg",
  },
];

export default function CardShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = showcaseItems[activeIndex];

  return (
    <section
      className="relative w-full h-[90vh] overflow-hidden"
      aria-labelledby="showcase-heading"
    >
      {/* BACKGROUND HERO with smooth crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={active.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={active.image}
            alt={active.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENT LAYER */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* LEFT INFO PANEL */}
        <div className="flex flex-col justify-center px-6 py-10 lg:py-16 text-white">
          <motion.h2
            key={`title-${activeIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight
                       max-w-3xl lg:max-w-4xl"
          >
            {active.title}
          </motion.h2>

          <motion.p
            key={`desc-${activeIndex}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl text-gray-200 max-w-md mt-6"
          >
            {active.description}
          </motion.p>
        </div>

        {/* RIGHT CARD DECK */}
        <div className="flex items-end px-6 pb-10 overflow-hidden">
          <div className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth w-full">
            {showcaseItems.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <motion.article
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="relative shrink-0 rounded-xl overflow-hidden cursor-pointer snap-center transition-all duration-500"
                  style={{
                    width: "clamp(220px, 45vw, 360px)",
                    height: "clamp(320px, 60vh, 440px)",
                  }}
                  animate={{
                    scale: isActive ? 1 : 0.95, // keep consistent size
                    y: isActive ? -10 : 0, // active card lifts up
                    boxShadow: isActive
                      ? "0 12px 30px rgba(0,0,0,0.5)"
                      : "0 6px 15px rgba(0,0,0,0.25)",
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  whileHover={{ filter: "brightness(1.1)" }} // subtle hover effect
                >
                  <Image
                    src={item.image.replace("/w_1600", "/w_600")}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 70vw, (max-width: 1200px) 300px, 360px"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2">
                    <h3 className="text-sm sm:text-base font-semibold text-white truncate">
                      {item.title}
                    </h3>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
