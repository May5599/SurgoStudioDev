"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const showcaseItems = [
  {
    title: "Cinematic Brand Films",
    description:
      "Powerful storytelling that captures your brand’s soul. From founder journeys to vision pieces crafted to move, inspire, and connect.",
    image: "/story.jpg",
    bg: "bg-[#102d27]",
    text: "text-white",
  },
  {
    title: "Launch & Promo Videos",
    description:
      "Polished launch films, snappy promos, and punchy visuals that build hype and drive results made for product drops and feature reveals.",
    image: "/story.jpg",
    bg: "bg-[#d6ebff]",
    text: "text-black",
  },
  {
    title: "Social Media Edits",
    description:
      "Scroll-stopping vertical videos for Reels, TikTok, and Shorts. Bold cuts, crisp pacing, and built-in hooks to boost engagement.",
    image: "/story.jpg",
    bg: "bg-[#efffd7]",
    text: "text-black",
  },
  {
    title: "Ad Spots & Commercials",
    description:
      "Performance-driven visuals for paid media. Whether cinematic or kinetic, we craft ad creatives that convert and captivate.",
    image: "/story.jpg",
    bg: "bg-[#1a0d25]",
    text: "text-white",
  },
];

export default function ShowcaseGrid({ heading = "What We Create" }) {
  return (
    <section
      className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-[#FBF7F5]"
      aria-labelledby="showcase-heading"
    >
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
        <h2
          id="showcase-heading"
          className="text-2xl sm:text-3xl lg:text-4xl text-[#0f0761] font-semibold tracking-tight"
        >
          {heading}
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          A curated mix of formats, each crafted for clarity, impact, and style.
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 perspective-[1000px]">
        {showcaseItems.map(({ title, description, image, bg, text }, index) => (
          <Tilt
            key={title}
            tiltMaxAngleX={6}
            tiltMaxAngleY={6}
            scale={1.02}
            transitionSpeed={700}
            className="w-full"
          >
            <motion.article
              className={`rounded-xl overflow-hidden shadow-lg transform-gpu transition-all duration-500 ${bg} ${text} group hover:shadow-2xl hover:-translate-y-2 hover:rotate-[0.6deg]`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }} // preload slightly before visible
            >
              {/* Image */}
              <div className="w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px] relative overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw,
                         (max-width: 1024px) 50vw,
                         25vw"
                  priority={index === 0} // only preload hero image
                  placeholder="blur"
                  blurDataURL="/tiny-blur.jpg" // ✅ add a tiny placeholder for perf
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 space-y-1.5 sm:space-y-2">
                <h3 className="text-lg sm:text-xl font-bold leading-snug">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base opacity-90 leading-relaxed">
                  {description}
                </p>
              </div>
            </motion.article>
          </Tilt>
        ))}
      </div>
    </section>
  );
}
