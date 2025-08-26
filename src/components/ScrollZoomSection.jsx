'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollZoomSection({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <section
      ref={ref}
      className="w-full h-screen overflow-hidden bg-black" // add bg to avoid gaps
    >
      <motion.div
        style={{ scale }}
        className="w-full h-full flex items-center justify-center"
      >
        <div className="w-full h-full">{children}</div>
      </motion.div>
    </section>
  );
}
