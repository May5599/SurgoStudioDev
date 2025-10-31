"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function BookCallModal({ isOpen, onClose }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("09:00");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("General Info");
  const [message, setMessage] = useState("");

  const [bookedTimes, setBookedTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Generate all allowed times between 9 AM – 5 PM in 30-min steps
  const allowedTimes = [];
  for (let hour = 9; hour <= 16; hour++) {
    allowedTimes.push(`${hour.toString().padStart(2, "0")}:00`);
    allowedTimes.push(`${hour.toString().padStart(2, "0")}:30`);
  }

  // Disable weekends in the calendar
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  // 🕐 Fetch booked times for the selected date
  useEffect(() => {
    async function fetchBookedTimes() {
      try {
        const res = await fetch("/api/get-booked-times", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date }),
        });

        const data = await res.json();
        if (data.success) {
          setBookedTimes(data.bookedTimes);
        } else {
          console.warn("Failed to fetch booked times:", data.error);
        }
      } catch (err) {
        console.error("Error fetching booked times:", err);
      }
    }

    if (isOpen) fetchBookedTimes();
  }, [date, isOpen]);

  // 🧾 Handle form submit
  const handleSubmit = async () => {
    setError("");

    if (!name || !email || !phone || !date || !time) {
      setError("Please fill in all required fields.");
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
          phone,
          reason,
          message,
          date: date.toISOString(),
          time,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Try another time slot.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setName("");
        setEmail("");
        setPhone("");
        setReason("General Info");
        setMessage("");
        setDate(new Date());
        setTime("09:00");
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
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
          <h3 className="text-lg sm:text-xl font-semibold text-[#0f0a37]">
            Select Date & Time
          </h3>

          <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <Calendar
              value={date}
              onChange={setDate}
              tileDisabled={({ date }) => isWeekend(date)}
              className="!border-none !w-full"
            />
          </div>

          <div>
            <h4 className="font-medium text-gray-700 text-sm mb-1">
              Available Times (9 AM – 5 PM)
            </h4>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f0a37]"
            >
              {allowedTimes.map((t) => (
                <option key={t} value={t} disabled={bookedTimes.includes(t)}>
                  {t} {bookedTimes.includes(t) ? "— Booked" : ""}
                </option>
              ))}
            </select>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Bookings available Monday – Friday | 9:00 AM – 5:00 PM EST
          </p>
        </div>

        {/* Right: Contact Form */}
        <div className="md:w-1/2 w-full p-6 sm:p-8 space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-[#0f0a37]">
            Your Information
          </h3>

          <input
            type="text"
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

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f0a37] text-sm sm:text-base"
          />

          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0f0a37] text-sm sm:text-base"
          >
            <option>General Info</option>
            <option>Podcast Info</option>
            <option>Video Production Info</option>
            <option>Social Media Info</option>
            <option>Other</option>
          </select>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your project..."
            className="w-full border border-gray-300 px-4 py-3 rounded-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-[#0f0a37] text-sm sm:text-base"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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
