"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WhyWorkWithUs() {
  const points = [
    "Creative Storytelling",
    "End-to-End Video Production",
    "Cinematic Visual Direction",
    "Collaborative & Transparent Workflow",
    "Trusted by Leading Brands",
  ];

  return (
    <section
      className="relative bg-black/90 text-white py-20 sm:py-28 overflow-hidden"
      aria-labelledby="why-work-with-us"
    >
      {/* Consistent container wrapper */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 grid md:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="w-16 h-1 bg-yellow-400 rounded-full mb-4" />

          <h2
            id="why-work-with-us"
            className="text-3xl sm:text-4xl lg:text-5xl font-mozilla font-bold leading-tight"
          >
            Why Work With Us
          </h2>

          <p className="text-gray-300 text-base sm:text-lg max-w-prose">
            We’re more than editors and shooters. We’re visual storytellers who
            craft emotion, narrative, and brand identity, frame by frame.
          </p>

          <ul className="space-y-3 mt-6 list-none">
            {points.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="w-2 h-2 mt-2 bg-yellow-400 rounded-full shrink-0"
                  aria-hidden="true"
                />
                <p className="text-white text-sm sm:text-base">{point}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="relative aspect-[4/3] sm:aspect-[3/2] rounded-xl overflow-hidden border border-white/10 shadow-xl group-hover:scale-105 transition-transform duration-500">
            <Image
              src="https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto,w_1200/v1757015205/whyworkwithus_gflpod.jpg"
              alt="Surgo team working on creative studio video production setup"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
              loading="lazy"
            />
          </div>

          {/* Glow behind image */}
          <div
            className="absolute -z-10 inset-0 flex justify-center items-center"
            aria-hidden="true"
          >
            <div className="w-56 sm:w-72 h-56 sm:h-72 bg-yellow-400/10 rounded-full blur-[100px] sm:blur-[120px]" />
          </div>
        </motion.div>
      </div>

      {/* Decorative Background Circles */}
      <div
        className="absolute top-[10%] left-[-15%] w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] bg-purple-500/10 blur-[140px] rounded-full -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-15%] right-[-10%] w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-yellow-500/10 blur-[120px] sm:blur-[140px] rounded-full -z-10"
        aria-hidden="true"
      />
    </section>
  );
}
