"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Clapperboard as ClapperboardIcon,
  Camera as CameraIcon,
  Video as VideoIcon,
  Pencil as PencilIcon,
  Scissors as ScissorsIcon,
  AudioLines as AudioLinesIcon,
  Rocket as RocketIcon,
  Film as FilmIcon,
} from "lucide-react";

export default function SurgoServices({ services: input }) {
  const services = input?.length ? input : DEFAULT_SERVICES;

  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (expanded) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [services.length, expanded]);

  useEffect(() => {
    if (expanded) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [expanded]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
  };

  const active = services[activeIndex];

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24 text-white">
      {/* Featured Card */}
      <motion.article
        key={active.title + (expanded ? "-open" : "-closed")}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 rounded-3xl p-[2px] bg-white/10"
      >
        <div className="relative rounded-3xl overflow-hidden bg-black/60">
          <div className="relative aspect-[16/9]">
            <PosterMedia
              image={active.image}
              icon={active.icon}
              title={active.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>

          {!expanded && (
            <motion.button
              onClick={() => setExpanded(true)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="absolute left-5 bottom-5 md:left-8 md:bottom-8 z-10
                   inline-flex items-start gap-3 rounded-xl bg-white text-black
                   px-4 py-3 md:px-5 md:py-4 shadow-lg/40
                   hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-black/30"
              aria-label="Open details"
              title="Open details"
            >
              <div className="flex-1 text-left">
                <div className="text-base md:text-lg font-semibold leading-tight">
                  {active.title}
                </div>
                <div className="text-xs md:text-sm text-black/70 mt-0.5">
                  {active.subtitle ?? active.desc}
                </div>
              </div>
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 md:w-6 md:h-6 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}

          {/* Expanded White Slab */}
          <motion.div
            initial={false}
            animate={
              expanded
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 20, scale: 0.995 }
            }
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`absolute left-5 md:left-8 bottom-5 md:bottom-8 w-[92%] md:w-[70%]
                  bg-white text-black rounded-xl md:rounded-2xl shadow-xl
                  ${
                    expanded
                      ? "pointer-events-auto"
                      : "pointer-events-none"
                  }`}
            role="dialog"
            aria-label={`${active.title} details`}
          >
            <button
              onClick={() => setExpanded(false)}
              className="absolute right-3 top-3 rounded-md p-2 text-black/60 hover:text-black/90"
              aria-label="Close details"
              title="Close"
            >
              ✕
            </button>

            <div className="p-5 md:p-7">
              <h3 className="text-xl md:text-2xl font-semibold">
                {active.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
                <div>
                  <div className="text-xs tracking-widest text-neutral-500 uppercase">
                    How we help
                  </div>
                  <p className="mt-1 text-sm md:text-base text-neutral-800">
                    {active.help ?? active.desc}
                  </p>
                </div>
                <div>
                  <div className="text-xs tracking-widest text-neutral-500 uppercase">
                    What you get
                  </div>
                  <p className="mt-1 text-sm md:text-base text-neutral-800">
                    {active.outcome ??
                      "Clear creative direction, production plan, and deliverables tailored to your launch."}
                  </p>
                </div>
              </div>

              <div className="mt-5 md:mt-6">
                <a
                  href={active.ctaHref ?? "/contact"}
                  className="inline-flex items-center gap-2 rounded-lg bg-black text-white px-5 py-3 text-sm md:text-base font-medium hover:bg-zinc-800 transition"
                  aria-label={active.ctaLabel ?? "Inquire Now"}
                >
                  {active.ctaLabel ?? "Inquire Now"}
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 -mr-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.article>

      {/* Thumbnails Row */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              onClick={() => {
                setActiveIndex(i);
                setExpanded(false);
              }}
              whileHover={{ scale: 1.05 }}
              className={`shrink-0 w-[280px] rounded-2xl border border-white/10 cursor-pointer transition ${
                activeIndex === i
                  ? "bg-white/10 border-white/30"
                  : "bg-white/[0.02] hover:bg-white/[0.04]"
              }`}
              title={s.title}
            >
              <div className="p-6 flex flex-col items-center text-center gap-3">
                <div className="rounded-xl bg-white/10 p-4">
                  {s.icon ? <s.icon size={32} /> : <Dot />}
                </div>
                <div>
                  <div className="text-lg font-semibold">{s.title}</div>
                  <p className="text-sm text-white/60 line-clamp-2">{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!atEnd && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="bg-gradient-to-l from-black to-transparent p-2 rounded-l-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white/70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.div>
          </div>
        )}
      </div>

      {/* CTA */}
      <CTA className="mt-16 md:mt-24" />
    </section>
  );
}

/* ---------- Helpers ---------- */
function PosterMedia({ image, icon: Icon, title }) {
  return (
    <div className="absolute inset-0">
      {image ? (
        <img
          src={image}
          alt={`${title} service by Surgo Studios`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="h-full w-full grid place-items-center bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.02)_60%,transparent_100%)]">
          {Icon ? <Icon size={56} /> : <FilmIcon size={56} />}
          <span className="sr-only">{title}</span>
        </div>
      )}
    </div>
  );
}

function Dot() {
  return <span className="block w-2 h-2 rounded-full bg-white/70" />;
}

function CTA({ className = "" }) {
  return (
    <div
      className={
        "rounded-3xl p-[2px] bg-gradient-to-r from-white/15 via-white/8 to-white/15 " +
        className
      }
    >
      <div className="rounded-3xl bg-gradient-to-r from-white/[0.06] to-white/[0.02] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold">
            Ready to make it cinematic?
          </h3>
          <p className="text-white/70 mt-2 max-w-xl">
            Brief us in two minutes. We’ll respond with an approach and
            timeline.
          </p>
        </div>
        <a
          href="/contact"
          className="group inline-flex items-center gap-2 rounded-xl bg-white text-black px-5 py-3 font-medium hover:bg-zinc-100 transition"
        >
          Book a Call
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 -mr-1 transition group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ---------- Default Services with Cloudinary Images ---------- */
const DEFAULT_SERVICES = [
  {
    title: "Pre-Production",
    icon: ClapperboardIcon,
    image:
      "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto,w_1200/v1757082735/serv1_jexilu.jpg",
    desc: "Concepting, scripting, casting, and a plan built for impact.",
    help: "We turn loose ideas into a production-ready blueprint—script, boards, schedule, crew.",
    outcome:
      "Locked narrative, creative references, and a day-by-day plan that saves time on set.",
    ctaLabel: "Plan My Shoot",
    ctaHref: "/contact?topic=preproduction",
  },
  {
    title: "Filming & Direction",
    icon: CameraIcon,
    image:
      "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto,w_1200/v1757082736/serv3_x41bmj.jpg",
    desc: "Directors, crew, and light working as one.",
    help: "We design coverage, block talent, and shape performance so every frame serves the edit.",
    outcome: "A tight shoot that captures exactly what post needs—no bloat, no pickups.",
    ctaLabel: "Book a Crew",
    ctaHref: "/contact?topic=filming",
  },
  {
    title: "Video Production",
    icon: VideoIcon,
    image:
      "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto,w_1200/v1757082735/serv2_lix5lg.jpg",
    desc: "End-to-end production with studio polish.",
    help: "We run the pipeline: permits, locations, art, wardrobe, HMU, gear, and set operations.",
    outcome: "A master cut plus platform-native versions ready to launch the same week.",
    ctaLabel: "Produce With Us",
    ctaHref: "/contact?topic=production",
  },
  {
    title: "Creative Direction",
    icon: PencilIcon,
    image:
      "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto,w_1200/v1757082736/serv3_x41bmj.jpg",
    desc: "Define the look. Amplify the feeling.",
    help: "We set tone, palette, typography, motion language, and brand rules that travel across assets.",
    outcome: "A living style kit that keeps every deliverable on-brand and unmistakable.",
    ctaLabel: "Shape the Look",
    ctaHref: "/contact?topic=creative-direction",
  },
  {
    title: "Post Production",
    icon: ScissorsIcon,
    image:
      "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto,w_1200/v1757082736/serv6_ymc23t.jpg",
    desc: "Editing, graphics, color—rhythm that lands the story.",
    help: "Offline/online edit, motion design, VFX touchups, sound sweetening, and calibrated color.",
    outcome: "A final master with clean OMF/AAF, color-managed exports, and captions on request.",
    ctaLabel: "Start Post",
    ctaHref: "/contact?topic=post",
  },
  {
    title: "Sound Design",
    icon: AudioLinesIcon,
    image:
      "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto,w_1200/v1757082944/serv5_j4rxge.jpg",
    desc: "Voice, score, and texture that carry emotion.",
    help: "Casting VO, custom cues, SFX beds, dialogue cleanup, and precise mix for each platform.",
    outcome:
      "Broadcast-safe stems and mixes (stereo/5.1) that make your cut feel bigger.",
    ctaLabel: "Polish the Mix",
    ctaHref: "/contact?topic=sound",
  },
  {
    title: "Campaign Launch",
    icon: RocketIcon,
    image:
      "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto,w_1200/v1757082736/serv4_py1ftl.jpg",
    desc: "Release strategy that builds momentum.",
    help: "Rollout calendars, cutdown matrix, copy hooks, paid placements, and posting ops.",
    outcome: "A timed multi-asset drop with measurable lift—CTR, VTR, and retention upticks.",
    ctaLabel: "Launch It",
    ctaHref: "/contact?topic=launch",
  },
  {
    title: "Cinematic Edits",
    icon: FilmIcon,
    image:
      "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto,w_1200/v1757082737/serv8_wdh3bd.jpg",
    desc: "Story-driven cuts that hold attention.",
    help: "We restructure footage for tension and payoff; micro-beats tuned for scroll stoppage.",
    outcome:
      "Hero film + short-form variants that hook in 3s and keep viewers to the end.",
    ctaLabel: "Cut My Story",
    ctaHref: "/contact?topic=edits",
  },
];
