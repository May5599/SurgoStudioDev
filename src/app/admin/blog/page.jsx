"use client";

import { useState } from "react";

export default function BlogAdminPage() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setStatus("⚠️ Please enter a topic first.");
      return;
    }

    setLoading(true);
    setStatus("🧠 Generating blog... please wait 10–15 seconds.");

    try {
      const res = await fetch("/api/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus(`✅ Blog created successfully: ${data.filename}`);
        setTopic("");
      } else {
        setStatus("❌ Something went wrong. Check server logs or token.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Network error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-950 text-gray-100 px-6 py-10">
      {/* Hero Section */}
      <div className="max-w-2xl text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          🧠 Surgo AI Blog Generator
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          Automatically generate SEO-optimized blog posts for{" "}
          <span className="text-blue-400 font-semibold">Surgo Studios</span> — 
          covering Ottawa’s latest media, video production, and creative trends.
        </p>
      </div>

      {/* Input + Button */}
      <div className="flex flex-col w-full max-w-md bg-zinc-900/60 p-6 rounded-2xl shadow-lg border border-zinc-800">
        <label
          htmlFor="topic"
          className="text-gray-300 mb-2 font-medium tracking-wide"
        >
          Blog Topic
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter blog topic (e.g. Ottawa's Creative Media Trends 2025)"
          className="w-full px-4 py-3 text-white bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`mt-5 px-6 py-3 font-semibold rounded-lg transition-all ${
            loading
              ? "bg-blue-700 cursor-not-allowed opacity-70"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
          }`}
        >
          {loading ? "Generating..." : "Generate Blog"}
        </button>
      </div>

      {/* Status Message */}
      {status && (
        <p
          className={`mt-8 text-center text-base tracking-wide ${
            status.startsWith("✅")
              ? "text-green-400"
              : status.startsWith("❌")
              ? "text-red-400"
              : "text-gray-300"
          }`}
        >
          {status}
        </p>
      )}

      {/* Footer */}
      <p className="mt-16 text-gray-500 text-sm">
        © {new Date().getFullYear()}{" "}
        <a
          href="https://surgostudios.com"
          target="_blank"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          Surgo Studios
        </a>{" "}
        — Cinematic Video Production & Media Agency in Ottawa.
      </p>
    </div>
  );
}
