"use client";
import { motion } from "framer-motion";

export default function SurgoBanner() {
  return (
    <section className="w-full bg-black text-white py-16 px-6 sm:px-10 md:px-20 text-center">
      <motion.div
        className="max-w-4xl mx-auto space-y-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          1B+ <span className="text-yellow-400">Views Generated</span>
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-300">
          High-impact video productions for brands that dare to stand out.
        </p>
      </motion.div>
    </section>
  );
}
