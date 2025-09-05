"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const showcaseItems = [
  {
    title: "Cinematic Brand Films",
    description:
      "Long-form storytelling that captures your brand’s vision, crafted to inspire and build emotional resonance.",
    image:
      "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto,w_1920/v1757093756/pexels-ekam-juneja-61080223-28867101_vqd4ew.jpg",
  },
  {
    title: "Launch & Promo Videos",
    description:
      "High-energy promos and launch videos designed to grab attention, build hype, and fuel conversions.",
    image:
      "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto,w_1920/v1757086218/pexels-kyleloftusstudios-11745675_p3zmhz.jpg",
  },
  {
    title: "Social Media Edits",
    description:
      "Short-form vertical content engineered for TikTok, Instagram Reels, and YouTube Shorts that stops the scroll.",
    image:
      "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto,w_1920/v1757094337/pexels-rccbtn-15406294_iqapsc.jpg",
  },
  {
    title: "Ad Spots & Commercials",
    description:
      "Performance-focused ads for TV and digital platforms. Crisp visuals and hooks tailored to convert.",
    image:
      "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto,w_1920/v1757094295/pexels-anntarazevich-7466999_ym5yr3.jpg",
  },
  {
    title: "Podcasts & Talk Shows",
    description:
      "End-to-end podcast production with pro audio, multi-cam video, editing, and distribution-ready assets.",
    image:
      "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto,w_1920/v1757094339/VAF02914_copy_lshzoq.jpg",
  },
  {
    title: "Event Highlights",
    description:
      "Immersive recap videos for conferences, festivals, and brand activations—capturing energy and moments that matter.",
    image:
      "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto,w_1920/v1757094298/pexels-bertellifotografia-2608513_juejb0.jpg",
  },
];

export default function CardShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = showcaseItems[activeIndex];

  return (
    <section
      className="relative w-full h-[90vh] overflow-hidden "
      aria-labelledby="showcase-heading"
    >
      {/* BACKGROUND HERO */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.image}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={active.image}
            alt={active.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* CONTENT LAYER */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* LEFT INFO PANEL */}
        <div className="flex flex-col justify-between px-6 py-10 lg:py-16 text-white">
          <AnimatePresence mode="wait">
            <motion.h2
              id="showcase-heading"
              key={`title-${activeIndex}`}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight 
                         max-w-3xl lg:max-w-4xl -ml-2 lg:-ml-6"
            >
              {active.title}
            </motion.h2>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${activeIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-lg sm:text-xl text-gray-200 max-w-md mt-6"
            >
              {active.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* RIGHT SCROLLABLE DECK */}
        <div className="flex items-end px-6 pb-10">
          <div
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth
                       w-full"
          >
            {showcaseItems.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <motion.article
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`relative shrink-0 rounded-xl overflow-hidden cursor-pointer shadow-xl snap-center transition-all duration-300 
                    ${isActive ? "ring-4 ring-yellow-400 scale-105 z-10" : "opacity-100 hover:opacity-100"}`}
                  style={{
                    width: "clamp(220px, 45vw, 360px)", // responsive widths
                    height: "clamp(320px, 60vh, 460px)",
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
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