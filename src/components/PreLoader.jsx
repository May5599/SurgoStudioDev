"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const text = ["SURGO", "STUDIOS"]; // split for stacked look

export default function PreloaderWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    window.addEventListener("load", handleLoad);

    const timer = setTimeout(() => setLoading(false), 2500);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFFFF0]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="text-center leading-none">
              {text.map((word, i) => (
                <motion.h1
                  key={word}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -60 }}
                  transition={{
                    duration: 0.9,
                    ease: "easeOut",
                    delay: i * 0.35, // stagger words
                  }}
                  className="font-mozilla font-extrabold uppercase tracking-tight text-black
                             text-[16vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw]"
                >
                  {word}
                </motion.h1>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fade-in for main site */}
      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: loading ? 0 : 1, y: loading ? 15 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.main>
    </>
  );
}
