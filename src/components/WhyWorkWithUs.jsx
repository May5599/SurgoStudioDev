'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function WhyWorkWithUs() {
  const points = [
    'Creative Storytelling',
    'End-to-End Video Production',
    'Cinematic Visual Direction',
    'Collaborative & Transparent Workflow',
    'Trusted by Leading Brands',
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#16324f] via-[#16324f] to-[#FBF7F5] text-white py-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center z-10 relative">

        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="w-16 h-1 bg-yellow-400 rounded-full mb-4"></div>
          <h2 className="text-4xl sm:text-5xl font-bold font-[var(--font-audiowide)] leading-tight">
            Why Work With Us
          </h2>
          <p className="text-gray-300 text-lg">
            We're not just editors and shooters. We're visual strategists who shape emotion, narrative, and brand identity — frame by frame.
          </p>

          <ul className="space-y-3 mt-6">
            {points.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 bg-yellow-400 rounded-full" />
                <span className="text-white text-base">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right Image or Visual */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-xl group-hover:scale-105 transition-transform duration-500">
            <Image
              src="/videopic.jpg" // Replace with your real image
              alt="Creative Studio"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Glow behind image */}
          <div className="absolute -z-10 inset-0 flex justify-center items-center">
            <div className="w-72 h-72 bg-yellow-400/10 rounded-full blur-[120px]" />
          </div>
        </motion.div>
      </div>

      {/* Decorative Gradient Circles */}
      <div className="absolute top-[10%] left-[-10%] w-[300px] h-[300px] bg-purple-500/10 blur-[160px] rounded-full -z-10" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-yellow-500/10 blur-[140px] rounded-full -z-10" />
    </section>
  );
}
