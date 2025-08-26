"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const headingText = " Creative Commentary ";
const bodyText = `Every frame we craft tells a deeper story not just what’s seen, but what’s felt.

We blend raw emotion with cinematic vision to evoke memories, moods, and meaning.`;

export default function CreativeCommentary() {
  const [displayedHeading, setDisplayedHeading] = useState("");
  const [displayedBody, setDisplayedBody] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView && !hasStarted) {
      setHasStarted(true);

      let headingIndex = 0;
      let bodyIndex = 0;

      const headingInterval = setInterval(() => {
        setDisplayedHeading((prev) => prev + headingText[headingIndex]);
        headingIndex++;
        if (headingIndex >= headingText.length) {
          clearInterval(headingInterval);

          const bodyInterval = setInterval(() => {
            setDisplayedBody((prev) => prev + bodyText[bodyIndex]);
            bodyIndex++;
            if (bodyIndex >= bodyText.length) {
              clearInterval(bodyInterval);
              setShowCursor(false);
            }
          }, 35); // body speed
        }
      }, 90); // heading speed
    }
  }, [inView, hasStarted]);

  return (
    <section
      ref={ref}
      className="relative bg-[#FBF7F5] text-black py-32 px-6 md:px-20 overflow-hidden"
    >
      {/* 🎞️ Subtle Film Grain Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/grain.mp4"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ✍️ Typing Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <h2
          className="text-4xl md:text-6xl text-[#0f0761] mb-10 tracking-wider"
          style={{ fontFamily: "'Nothing You Could Do', cursive" }}
        >
          {displayedHeading}
        </h2>

        <p
          className="text-lg md:text-2xl leading-relaxed text-Black whitespace-pre-line px-2"
          style={{ fontFamily: "'Special Elite', monospace", minHeight: "200px" }}
        >
          {displayedBody}s
          {showCursor && <span className="text-[#0f0761] animate-pulse ml-1">|</span>}
        </p>
      </motion.div>
    </section>
  );
}
