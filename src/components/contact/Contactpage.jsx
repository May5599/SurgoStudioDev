"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation"; // Next.js router

export default function ContactPage() {
  const pathname = usePathname();

  return (
    <section className="relative min-h-screen bg-black/90 text-white overflow-hidden flex flex-col justify-between pb-52">
      {/* Big Poster Typography */}
      <div className="flex justify-end items-start w-full h-[70vh] pr-6 mt-30">
        <motion.h1
          key={pathname} // ensures re-animation after loader/nav
          initial={{ y: -300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-[16vw] font-black leading-[0.9] text-white uppercase tracking-tighter font-mozilla"
        >
          Say <br /> Hello <br /> Surgo
        </motion.h1>
      </div>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative mx-auto w-full max-w-xl px-6 space-y-8 mt-60"
      >
        <div>
          <label className="block text-sm uppercase tracking-wide mb-2 text-gray-200 font-rammetto">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border-b-2 border-white bg-transparent focus:outline-none py-3 text-lg placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm uppercase tracking-wide mb-2 text-gray-200 font-rammetto">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border-b-2 border-white bg-transparent focus:outline-none py-3 text-lg placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm uppercase tracking-wide mb-2 text-gray-200 font-rammetto">
            Message
          </label>
          <textarea
            rows="4"
            placeholder="Type your message..."
            className="w-full border-b-2 border-white bg-transparent focus:outline-none py-3 text-lg placeholder-gray-400"
          ></textarea>
        </div>
        <button
          type="submit"
          className="text-2xl font-bold hover:tracking-wider transition-all mt-6 font-rammetto"
        >
          Send ➝
        </button>
      </motion.form>
    </section>
  );
}
