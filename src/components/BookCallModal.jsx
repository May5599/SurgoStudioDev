"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

export default function BookCallModal({ isOpen, onClose }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !date || !time) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          date: date.toISOString(),
          time,
        }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setName("");
        setEmail("");
        setMessage("");
        setDate(new Date());
        setTime("10:00");
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white text-black rounded-2xl w-full max-w-5xl shadow-2xl relative flex flex-col md:flex-row gap-8 md:gap-10 animate-fadeIn max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 text-2xl hover:text-black transition"
        >
          &times;
        </button>

        {/* Left: Calendar + Time Picker */}
        <div className="md:w-1/2 w-full p-6 sm:p-8 space-y-6 flex-shrink-0">
          <h3 className="text-lg sm:text-xl font-semibold text-[#0f0a37]">Select Date & Time</h3>

          <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <Calendar
              value={date}
              onChange={setDate}
              className="!border-none !w-full"
            />
          </div>

          <TimePicker
            onChange={setTime}
            value={time}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0f0a37]"
            disableClock
          />
        </div>

        {/* Right: Contact Form */}
        <div className="md:w-1/2 w-full p-6 sm:p-8 space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-[#0f0a37]">Your Information</h3>

          <input
            type="text"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f0a37] text-sm sm:text-base"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f0a37] text-sm sm:text-base"
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your project..."
            className="w-full border border-gray-300 px-4 py-3 rounded-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-[#0f0a37] text-sm sm:text-base"
          />

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className={`bg-[#0f0a37] text-white w-full py-3 rounded-full transition font-semibold ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#1c115c]"
            }`}
          >
            {success ? "🎉 Booked!" : loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}
