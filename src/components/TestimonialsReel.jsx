"use client";

import { useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

const videos = [
  { src: "/ben.mov", name: "Ben Azadi" },
  { src: "/hina.mp4", name: "Hina Khan" },
  { src: "/majeed.mp4", name: "Majeed" },
  { src: "/neha.mov", name: "Neha" },
  { src: "/surgo.mov", name: "Client Story" },
];

export default function TestimonialsReel() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [mutedMap, setMutedMap] = useState({});
  const videoRefs = useRef([]);

  const handlePlay = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) {
        video.pause();
        video.muted = true;
      }
    });

    const video = videoRefs.current[index];

    if (video) {
      video.muted = false;
      video.play();
      setActiveIndex(index);
      setMutedMap((prev) => ({ ...prev, [index]: false }));
    }
  };

  const toggleSound = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    video.muted = !video.muted;

    setMutedMap((prev) => ({
      ...prev,
      [index]: video.muted,
    }));
  };

  return (
    <section
      className="w-full bg-black text-white py-20"
      aria-label="Client testimonial videos from Ottawa video production company"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* SEO HEADER */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
            Ottawa Video Production Real Stories. Real Results.
          </h2>

          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm md:text-base">
            See how businesses in Ottawa grow with high-quality video production,
            storytelling, and creative branding from Surgo Studios.
          </p>
        </div>

        {/* MOBILE-FIRST REEL SCROLLER */}
        <div className="flex justify-center">
          <div className="
            flex gap-4 md:gap-6
            overflow-x-auto
            pb-4
            snap-x snap-mandatory
            scrollbar-hide
          ">

            {videos.map((video, index) => (
              <div
                key={index}
                className="
                  relative flex-shrink-0
                  w-[75vw] sm:w-[260px]
                  aspect-[9/16]
                  snap-center
                  rounded-2xl
                  overflow-hidden
                  bg-neutral-900
                  shadow-xl
                "
              >
                {/* VIDEO */}
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.src}
                  className="w-full h-full object-cover"
                  playsInline
                  preload="metadata"
                />

                {/* PLAY BUTTON */}
                {activeIndex !== index && (
                  <div
                    onClick={() => handlePlay(index)}
                    className="absolute inset-0 flex items-center justify-center bg-black/40"
                  >
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
                      <Play size={20} />
                    </div>
                  </div>
                )}

                {/* SOUND BUTTON */}
                {activeIndex === index && (
                  <button
                    onClick={() => toggleSound(index)}
                    className="absolute top-3 right-3 bg-black/60 p-2 rounded-full"
                  >
                    {mutedMap[index] ? (
                      <VolumeX size={18} />
                    ) : (
                      <Volume2 size={18} />
                    )}
                  </button>
                )}

                {/* NAME */}
                <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-sm font-medium">{video.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA (SEO BOOST) */}
        <div className="text-center mt-10">
          <p className="text-gray-400 text-sm mb-4">
            Looking for video production services in Ottawa?
          </p>

          <a
            href="/contact"
            className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:bg-yellow-300 transition"
          >
            Book a Call
          </a>
        </div>
      </div>
    </section>
  );
}