'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Rhea Kapoor',
    company: 'Producer, Filmfare Studios',
    quote:
      'They turned our rough vision into something unforgettable. The pace, the emotion, the vibe — pure gold!',
    image: '/profile.png',
  },
  {
    name: 'Kabir Malhotra',
    company: 'Founder, LuxeDesign Events',
    quote:
      'A team that doesn’t just shoot — they *tell stories*. We saw our brand come alive in a way we never imagined.',
    image: '/profile.png',
  },
  {
    name: 'Zoya Fernandes',
    company: 'CMO, NovaWear',
    quote:
      'Creative. Professional. On-point. The campaign went viral. What more could I ask for?',
    image: '/profile.png',
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const { name, company, quote, image } = testimonials[index];

  return (
    <section className="relative py-28 bg-[#FBF7F5] text-gray-900 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
        <h2 className="text-4xl sm:text-5xl font-bold font-[var(--font-audiowide)] tracking-wide">
          Trusted By Visionaries
        </h2>

        {/* Testimonial Card */}
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-xl bg-white border border-gray-200 p-10 shadow-lg"
        >
          <img
            src={image}
            alt={name}
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-gray-300"
          />
          <p className="text-lg italic max-w-2xl mx-auto text-gray-600">“{quote}”</p>
          <div className="mt-6 text-gray-900 font-semibold">{name}</div>
          <div className="text-sm text-gray-500">{company}</div>
        </motion.div>

        {/* Arrows */}
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={prev}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={next}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Optional Background Glow (lighter now) */}
      <div className="absolute w-[500px] h-[500px] top-[20%] left-[10%] bg-purple-300/20 blur-[140px] rounded-full -z-10" />
      <div className="absolute w-[400px] h-[400px] bottom-[10%] right-[5%] bg-yellow-300/20 blur-[140px] rounded-full -z-10" />
    </section>
  );
}
