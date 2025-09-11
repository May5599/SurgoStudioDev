"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation"; // ensures re-animating on route load

export default function SurgoEditorialLogo() {
  const pathname = usePathname();

  return (
    <section className="relative w-full min-h-screen bg-white text-black overflow-hidden flex flex-col justify-between">
      {/* Top Logo */}
      <div className="pt-24 sm:pt-32 pl-6 sm:pl-16 lg:pl-24">
        <motion.h1
          key={pathname} // 🔑 ensures it re-animates after loader/nav
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-black uppercase tracking-tight 
                     text-[14vw] sm:text-[12vw] md:text-[10vw] 
                     leading-[0.9]"
        >
          SURGO <br />
          <span className="font-light">STUDIOS</span>
        </motion.h1>
      </div>

      {/* Bottom Tagline + Line */}
      <div className="relative w-full px-6 sm:px-16 lg:px-24 pb-16 sm:pb-24">
        <motion.p
          key={pathname + "-tag"} // 🔑 re-animate tagline
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="font-medium tracking-wider uppercase 
                     text-base sm:text-lg md:text-xl mb-6"
        >
          Crafting Motion. <span className="italic">Shaping Vision.</span>
        </motion.p>

        <motion.div
          key={pathname + "-line"} // 🔑 re-animate line
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
          className="h-[2px] w-[55%] bg-black"
        />
      </div>
    </section>
  );
}
