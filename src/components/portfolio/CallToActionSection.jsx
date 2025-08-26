"use client";

import { useState } from "react";
import BookCallModal from "../BookCallModal";
import { motion } from "framer-motion";

export default function CallToActionSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative bg-[#0f0a37] text-white py-28 px-6 text-center overflow-hidden"
    >
      {/* Glowing Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1c115c] via-[#0f0a37] to-[#1c115c] opacity-70 pointer-events-none z-0" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[var(--font-mozilla-headline)] ">
          Let’s Make Something Memorable
        </h2>

        <p className="text-lg text-white/80 mb-10 leading-relaxed">
          From concept to viral launch, we help brands tell stories that stick.  
          Whether you're a startup or a creator, let’s bring your vision to life.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => setShowModal(true)}
          className="inline-block bg-white text-[#0f0a37] px-8 py-4 rounded-full font-semibold text-base hover:scale-105 transition shadow-lg hover:shadow-xl"
        >
          🚀 Book a Call with Us
        </button>

        <p className="mt-6 text-sm text-white/50">
          Prefer email? Drop us a note at{" "}
          <a href="mailto:hello@surgostudios.com" className="underline">
            hello@surgostudios.com
          </a>
        </p>
      </div>

      {/* Modal */}
      <BookCallModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </motion.section>
  );
}
