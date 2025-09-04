'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  VideoIcon,
  PencilIcon,
  ScissorsIcon,
  RocketIcon,
  CameraIcon,
  FilmIcon,
  AudioLinesIcon,
  ClapperboardIcon,
} from 'lucide-react';

const services = [
  {
    title: 'Pre-Production',
    icon: ClapperboardIcon,
    desc: 'We handle everything before the camera rolls — concepting, scripting, casting, and planning for impact.',
  },
  {
    title: 'Filming & Direction',
    icon: CameraIcon,
    desc: 'On-site or remote shoots with professional equipment, crew, and crystal-clear vision.',
  },
  {
    title: 'Video Production',
    icon: VideoIcon,
    desc: 'From corporate to cinematic, we create high-quality visuals that elevate your brand presence.',
  },
  {
    title: 'Creative Direction',
    icon: PencilIcon,
    desc: 'Inject soul into your story. Our team builds a bold visual strategy and aesthetic to match.',
  },
  {
    title: 'Post Production',
    icon: ScissorsIcon,
    desc: 'Editing, transitions, motion graphics, and color grading that bring everything together seamlessly.',
  },
  {
    title: 'Sound Design',
    icon: AudioLinesIcon,
    desc: 'Voiceovers, custom soundtracks, sound effects, and audio polish that amplify your message.',
  },
  {
    title: 'Campaign Launch',
    icon: RocketIcon,
    desc: 'We don’t stop at delivery — we help strategize, schedule, and execute your video rollout across platforms.',
  },
  {
    title: 'Cinematic Edits',
    icon: FilmIcon,
    desc: 'Story-driven edits designed to evoke emotion and hold viewer attention to the very last second.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, type: 'spring', stiffness: 70 },
  }),
};

export default function ServicesSnapshotClient() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative py-24 px-6 bg-black/90 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16 text-center relative z-10">
        {/* Section Heading */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[var(--font-audiowide)] drop-shadow-md">
            Our Creative Arsenal
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            From idea to viral launch, here’s how we craft videos that stick, sell, and scale.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2 sm:px-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={cardVariants}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative group p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300
                  hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]`}
              >
                {isHovered && (
                  <motion.div
                    layoutId="glow"
                    className="absolute inset-0 rounded-3xl bg-white/5 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <div className="mb-4 flex justify-center">
  <Icon className="w-10 h-10 text-yellow-400 transition-transform group-hover:rotate-2 group-hover:scale-110" />
</div>

                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-300">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Ambient background orbs */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute w-96 h-96 top-[-20%] left-[-10%] rounded-full  blur-3xl animate-pulse-slow" />
        <div className="absolute w-64 h-64 bottom-[-15%] right-[-5%] rounded-full  blur-3xl animate-pulse-slow delay-1000" />
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
