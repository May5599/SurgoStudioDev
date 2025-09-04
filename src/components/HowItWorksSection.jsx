'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const steps = [
  {
    title: 'Step 1: The Spark',
    desc: 'We sit down with you to understand your brand, vision, and the emotion you want to evoke. This is where the narrative begins.',
  },
  {
    title: 'Step 2: The Script',
    desc: 'Our team builds hooks, voice, moodboards, and storyboards — shaping your idea into a powerful visual script.',
  },
  {
    title: 'Step 3: Lights, Camera, Action',
    desc: 'From camera rigs to set design — we direct and shoot with precision, style, and cinematic flair.',
  },
  {
    title: 'Step 4: Post & Polish',
    desc: 'We edit, grade, design sound, and finalize every frame until it feels *just right*. Then we deliver for all platforms.',
  },
];

export default function HowItWorksSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="relative py-28 px-6 bg-black/90 text-white overflow-hidden">

      <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
        <h2 className="text-4xl sm:text-5xl font-bold font-[var(--font-audiowide)] tracking-wide">
          How We Bring Your Story to Life
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          It’s not just a process — it’s a journey. Crafted with vision, told with emotion, finished with style.
        </p>

        <div className="text-left space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="border-b border-white/10 pb-4">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between text-left text-lg sm:text-xl font-semibold text-white hover:text-yellow-300 transition"
              >
                {step.title}
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-gray-400 mt-2 text-base sm:text-lg leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle glowing background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-purple-500/10 rounded-full top-[10%] left-[-10%] blur-[160px] animate-pulse-slow" />
        <div className="absolute w-[400px] h-[400px] bg-yellow-500/10 rounded-full bottom-[-10%] right-[-5%] blur-[140px] animate-pulse-slow delay-1000" />
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
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
