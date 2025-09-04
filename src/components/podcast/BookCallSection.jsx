"use client";

import { motion } from "framer-motion";
import { PhoneCall, CalendarDays } from "lucide-react";

export default function BookCallSection({ onOpenModal }) {
  return (
    <section
      id="book-call"
      className="relative w-full bg-[#0F0E0E] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl text-center mx-auto"
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
            <CalendarDays className="h-4 w-4" /> Book a Call
          </p>
          <h2 className="text-balance text-4xl font-black uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl">
            Let’s Plan Your Podcast
          </h2>
          <p className="mt-4 text-pretty text-white/85 sm:text-lg">
            Pick a date, lock a time, and tell us your vision. Our producers
            will help you shape it into a show worth bingeing.
          </p>
        </motion.div>

        {/* CTA button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={onOpenModal}
            className="group inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-black shadow-lg shadow-black/20 transition hover:translate-y-[-1px] hover:shadow-xl"
          >
            <PhoneCall className="h-5 w-5" /> Book Your Call
          </button>
        </div>
      </div>
    </section>
  );
}
