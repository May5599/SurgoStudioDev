"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const steps = [
  {
    title: "Step 1: The Spark",
    desc: "We sit down with you to understand your brand, vision, and the emotion you want to evoke. This is where the narrative begins.",
  },
  {
    title: "Step 2: The Script",
    desc: "Our team builds hooks, voice, moodboards, and storyboards, shaping your idea into a powerful visual script.",
  },
  {
    title: "Step 3: Lights, Camera, Action",
    desc: "We capture your story with expert direction, dynamic shots, and world-class cinematography",
  },
  {
    title: "Step 4: Post & Polish",
    desc: "We edit, color-grade, design sound, and refine every frame until it feels perfect,ready to shine across all platforms.",
  },
];


export default function HowItWorksSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      className="relative py-28 px-6 bg-black/90 text-white overflow-hidden"
      aria-labelledby="how-it-works"
    >
      <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
        <h2
          id="how-it-works"
          className="text-4xl sm:text-5xl font-mozilla font-bold tracking-wide"
        >
          How We Bring Your Story to Life
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          It’s not just a process — it’s a journey. Crafted with vision, told
          with emotion, finished with style.
        </p>

        <dl className="text-left space-y-4">
          {steps.map((step, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`border-b pb-4 ${
                  isOpen ? "border-yellow-400/40" : "border-white/10"
                }`}
              >
                <dt>
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between text-left text-lg sm:text-xl font-semibold text-white hover:text-yellow-400 transition"
                    aria-expanded={isOpen}
                    aria-controls={`step-panel-${i}`}
                    id={`step-button-${i}`}
                  >
                    {step.title}
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </dt>

                <AnimatePresence>
                  {isOpen && (
                    <motion.dd
                      id={`step-panel-${i}`}
                      aria-labelledby={`step-button-${i}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-gray-400 mt-2 text-base sm:text-lg leading-relaxed">
                        {step.desc}
                      </p>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </dl>
      </div>

      {/* Subtle glowing background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-purple-500/10 rounded-full top-[10%] left-[-10%] blur-[160px] animate-pulse-slow" />
        <div className="absolute w-[400px] h-[400px] bg-yellow-500/10 rounded-full bottom-[-10%] right-[-5%] blur-[140px] animate-pulse-slow delay-1000" />
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
