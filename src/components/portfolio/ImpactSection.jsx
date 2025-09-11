"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useState, useEffect } from "react";
import { FaHeart, FaUserFriends, FaVideo } from "react-icons/fa";

const stats = [
  {
    icon: <FaHeart className="text-green-400 text-2xl" />,
    label: "Likes",
    value: 22,
    suffix: "M+",
    delay: 0.2,
  },
  {
    icon: <FaUserFriends className="text-green-400 text-2xl" />,
    label: "Followers",
    value: 5,
    suffix: "M+",
    delay: 0.5,
  },
  {
    icon: <FaVideo className="text-green-400 text-2xl" />,
    label: "Views",
    value: 150,
    suffix: "M+",
    delay: 0.8,
  },
];

export default function ImpactSection() {
  return (
    <section className="bg-black/90 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Text + Stats */}
        <div className="lg:w-1/2 space-y-6">
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-semibold leading-snug"
          >
            The power of{" "}
            <span className="text-green-400 italic">storytelling</span>
          </motion.h2>

          <p className="text-gray-300 text-base leading-relaxed">
            In today’s dynamic social landscape, just creating videos isn’t
            enough. Exceptional storytelling is everything, it’s what turns
            casual scrolls into meaningful moments.
          </p>
          <p className="text-gray-300 text-base leading-relaxed">
            We blend Hollywood-grade cinematography with viral content
            strategies to create short-form magic, built to connect, built to
            perform.
          </p>

          <p className="mt-10 text-sm text-gray-400 italic">
            Storytelling that moves. Metrics that matter.
          </p>

          {/* Animated Metric Strips */}
          <div className="mt-6 space-y-3">
            {stats.map(({ icon, label, value, suffix, delay }) => (
              <AnimatedStrip
                key={label}
                icon={icon}
                label={label}
                value={value}
                suffix={suffix}
                delay={delay}
              />
            ))}
          </div>

          <a
            href="#project-reel"
            className="inline-block mt-10 bg-green-400 text-black px-6 py-3 rounded-full text-sm font-semibold hover:scale-105 transition"
          >
            View Our Work
          </a>
        </div>

        {/* Right: Single Phone Mockup */}
        <div className="lg:w-1/2 w-full flex justify-center relative">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}

/* 📱 Single Phone Mockup Component */
/* 📱 Single Phone Mockup Component */
function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-[260px] sm:w-[280px] md:w-[300px] lg:w-[340px] h-[520px] 
                 bg-black rounded-[2.5rem] shadow-2xl overflow-hidden 
                 relative border-4 border-gray-800"
    >
      <video
        src="https://res.cloudinary.com/duwtym7w7/video/upload/f_auto,q_auto,w_720/v1757620080/final_05-_25_8_Architecture_bsjtsz.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="https://res.cloudinary.com/duwtym7w7/video/upload/f_auto,q_auto,w_600,so_1/v1757620080/final_05-_25_8_Architecture_bsjtsz.jpg"
        className="w-full h-full object-cover object-top"
      />
    </motion.div>
  );
}

/* 📊 Stats Strip Animation */
function AnimatedStrip({ icon, label, value, suffix, delay }) {
  const [startCount, setStartCount] = useState(false);
  const [animatePulse, setAnimatePulse] = useState(false);

  useEffect(() => {
    if (startCount) {
      const timeout = setTimeout(() => setAnimatePulse(true), 2500);
      return () => clearTimeout(timeout);
    }
  }, [startCount]);

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      onViewportEnter={() => setStartCount(true)}
      className={`flex items-center w-full border-l-4 border-green-400 pl-4 pr-6 py-3 bg-[#1c1b3d] ${
        animatePulse ? "ring-2 ring-green-400 ring-opacity-30" : ""
      }`}
    >
      {icon}
      <div className="ml-4 text-left">
        <div className="text-2xl font-bold text-green-300">
          {startCount ? (
            <CountUp end={value} duration={2.5} suffix={suffix} />
          ) : (
            "0" + suffix
          )}
        </div>
        <div className="text-sm text-gray-400">{label}</div>
      </div>
    </motion.div>
  );
}
