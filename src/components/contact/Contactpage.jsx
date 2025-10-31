"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [animKey, setAnimKey] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  useEffect(() => setAnimKey(Date.now()), []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ prevent reload
    setStatus({ loading: true, success: null, error: null });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setStatus({ loading: false, success: "Message sent successfully!", error: null });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus({ loading: false, success: null, error: null }), 4000);
    } catch (err) {
      setStatus({ loading: false, success: null, error: err.message });
    }
  };

  return (
    <section className="relative min-h-screen bg-[#616AEE]/90 text-white flex flex-col justify-between pb-20 sm:pb-32 md:pb-52">
      {/* Big Poster Typography */}
      <div className="flex justify-end items-start w-full h-[60vh] sm:h-[70vh] pr-4 sm:pr-6 mt-16 sm:mt-20 relative">
        <motion.h1
          key={animKey}
          initial={{ y: -300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-black leading-[0.9] uppercase tracking-tighter font-mozilla
                     text-[14vw] sm:text-[16vw] lg:text-[16vw]"
        >
          Say <br /> Hello <br /> Surgo
        </motion.h1>

        {/* Faint background word */}
        <div className="absolute bottom-8 left-6 text-[20vw] font-black uppercase text-white/5 select-none">
          Contact
        </div>
      </div>

      {/* Subheading / intro */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="text-center text-gray-200 text-lg sm:text-xl mt-16 sm:mt-24 md:mt-32 lg:mt-40 mb-10 px-6"
      >
        We’d love to hear your ideas. Drop us a message and let’s create together.
      </motion.p>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative mx-auto w-full max-w-xl px-6 space-y-8 mt-20 sm:mt-28 md:mt-36 lg:mt-48"
      >
        {["name", "phone", "email"].map((field) => (
          <div key={field}>
            <label className="block text-sm uppercase tracking-wide mb-2 text-gray-200 font-rammetto">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              name={field}
              type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
              placeholder={`Enter your ${field}`}
              value={formData[field]}
              onChange={handleChange}
              required={field !== "phone"}
              className="w-full border-b-2 border-white bg-transparent focus:outline-none py-3 text-lg placeholder-gray-400"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm uppercase tracking-wide mb-2 text-gray-200 font-rammetto">
            Message
          </label>
          <textarea
            name="message"
            rows="4"
            placeholder="Type your message..."
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border-b-2 border-white bg-transparent focus:outline-none py-3 text-lg placeholder-gray-400"
          ></textarea>
        </div>

        {/* Status messages */}
        {status.error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-center font-medium"
          >
            {status.error}
          </motion.p>
        )}
        {status.success && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-400 text-center font-medium"
          >
            ✅ {status.success}
          </motion.p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status.loading}
          className={`text-2xl font-bold hover:tracking-wider transition-all mt-6 font-rammetto ${
            status.loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {status.loading ? "Sending..." : "Send ➝"}
        </button>
      </motion.form>
    </section>
  );
}
