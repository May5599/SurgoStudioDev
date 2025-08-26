"use client";

import { motion } from "framer-motion";

export default function ImpactStrip({
  items = DEFAULT_ITEMS,
  className = "",
}) {
  return (
    <section className={`relative ${className}`}>
      {/* Soft spotlight background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.08)_0%,transparent_70%)]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {items.map((it, i) => (
            <StatCell key={it.label} index={i} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCell({ label, value, note, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: 0.15 * index, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-8 px-6 text-center"
    >
      {/* Value */}
      <div className="text-[11vw] sm:text-[6vw] md:text-[3.5vw] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 drop-shadow-[0_0_20px_rgba(255,215,0,0.35)]">
        {value}
      </div>

      {/* Label */}
      <div className="mt-3 uppercase tracking-[0.15em] text-[0.7rem] md:text-xs text-white/70">
        {label}
      </div>

      {/* Optional note */}
      {note && (
        <div className="mt-1 text-xs text-white/50 italic">
          {note}
        </div>
      )}
    </motion.div>
  );
}

const DEFAULT_ITEMS = [
  { label: "Avg Retention", value: "62%" },
  { label: "Launch Window", value: "21 Days" },
  { label: "CTR Uplift", value: "+38%" },
  { label: "Campaigns Shipped", value: "120+" },
];
