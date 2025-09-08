"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Amira Hassan",
    role: "Creative Director",
    quote:
      "Working with Surgo felt effortless. They didn’t just deliver a video, they crafted an experience that moved our audience.",
    image: "/profile1.png",
  },
  {
    name: "Diego Martinez",
    role: "Entrepreneur",
    quote:
      "Dynamic, bold, and cinematic. Every frame felt alive and true to our story. It was more than production — it was storytelling.",
    image: "/profile2.png",
  },
  {
    name: "Sofia Nguyen",
    role: "Content Creator",
    quote:
      "The Surgo team brought so much heart and vision. They made me feel seen as a creator, and the results spoke louder than words.",
    image: "/profile3.png",
  },
  {
    name: "Marcus Johnson",
    role: "Event Producer",
    quote:
      "The process was transparent, collaborative, and inspiring. The final edit captured the energy of the event like nothing else.",
    image: "/profile4.png",
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const { name, role, quote, image } = testimonials[index];

  return (
    <section
      className="relative py-28 px-6 bg-gradient-to-b from-black via-[#0b0b0b] to-black text-white overflow-hidden"
      aria-label="Client testimonials"
    >
      <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
        <h2 className="text-4xl sm:text-5xl font-mozilla font-bold tracking-wide">
          What People Say About Us
        </h2>

        {/* Testimonial Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="relative max-w-3xl mx-auto rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-10 shadow-lg"
          >
            <img
              src={image}
              alt={name}
              className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-2 border-yellow-400/60 shadow-md"
            />
            <p className="text-lg sm:text-xl italic leading-relaxed text-gray-200">
              “{quote}”
            </p>
            <div className="mt-6 text-yellow-400 font-semibold text-lg">
              {name}
            </div>
            <div className="text-sm text-gray-400">{role}</div>
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={prev}
            className="p-3 bg-white/10 hover:bg-yellow-400 hover:text-black rounded-full transition border border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="p-3 bg-white/10 hover:bg-yellow-400 hover:text-black rounded-full transition border border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Cinematic Glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] top-[10%] left-[5%] bg-purple-500/20 blur-[160px] rounded-full animate-pulse-slow" />
        <div className="absolute w-[400px] h-[400px] bottom-[5%] right-[10%] bg-yellow-500/20 blur-[160px] rounded-full animate-pulse-slow delay-1000" />
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
          animation: pulse-slow 10s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}