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
    <section className="px-6 py-20 bg-[#FBF7F5]">
      <div className="max-w-7xl mx-auto text-center space-y-4">
        <h2 className="text-4xl text-[#0f0761] font-semibold tracking-tight">
          {heading}
        </h2>
        <p className="text-lg text-gray-600">
          A curated mix of formats, each crafted for clarity, impact, and style.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 perspective-[1000px]">
        {showcaseItems.map(({ title, description, image, bg, text }, index) => (
          <Tilt
            key={title}
            tiltMaxAngleX={6}
            tiltMaxAngleY={6}
            scale={1.02}
            transitionSpeed={700}
            className="w-full"
          >
            <motion.div
              className={`rounded-xl overflow-hidden shadow-xl transform-gpu transition-all duration-500 ${bg} ${text} group hover:shadow-2xl hover:-translate-y-2 hover:rotate-[0.6deg]`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
             <div className="w-full h-[260px] relative overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    width={800}
                    height={600}
                    priority
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                </div>

              <div className="p-5 space-y-2">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-sm opacity-90">{description}</p>
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>
    </section>
  );
}
