"use client";
import React from "react";

const TrustedBySection = () => {
  return (
    <section className="relative bg-[#edf0f8] text-white py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        {/* Section Title */}
        <div className="relative inline-block">
          <h3 className="text-[0.5rem] sm:text-[1rem] md:text-2xl tracking-widest uppercase text-[#3f4043] font-mono z-10 relative">
            — TRUSTED BY —
          </h3>
          <div className="absolute inset-x-0 -bottom-1 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent blur-sm" />
        </div>

        {/* Logos Row */}
        <div className="relative w-full overflow-hidden mt-4">
          {/* Left gradient fade */}
          <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#edf0f8] via-[#edf0f8]-200/80 to-transparent z-20 pointer-events-none" />
          {/* Right gradient fade */}
          <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#edf0f8] via-[#edf0f8]-200/80 to-transparent z-20 pointer-events-none" />

          {/* Scrolling logo container */}
          <div className="flex animate-scroll whitespace-nowrap space-x-[7.5rem] opacity-90">
            {Array(2)
              .fill(0)
              .map((_, loopIndex) => (
                <React.Fragment key={loopIndex}>
                  {[...Array(12)].map((_, i) => (
                    <img
                      key={`brand-${loopIndex}-${i}`}
                      src="/search.png"
                      alt={`Brand ${i + 1}`}
                      className="h-8 sm:h-10 transition-transform duration-300 hover:scale-105 hover:brightness-110"
                    />
                  ))}
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>

      {/* ✨ Subtle Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl top-10 left-[10%] animate-pulse-slow" />
        <div className="absolute w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl bottom-10 right-[10%] animate-pulse-slow" />
      </div>

      {/* Custom animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 25s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default TrustedBySection;
