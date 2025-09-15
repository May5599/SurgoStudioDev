"use client";

import { motion } from "framer-motion";

export const metadata = {
  title: "About Surgo Studios | Ottawa Video Production Company",
  description:
    "Learn about Surgo Studios, a Canadian video production company based in Ottawa. Founded by Daniyal Zafar and Sashien Godakandae, trusted nationwide for cinematic storytelling.",
  openGraph: {
    title: "About Surgo Studios | Ottawa Video Production Company",
    description:
      "Discover Surgo Studios' founders, leadership team, values, and expertise. Trusted by brands across Canada for creative video production.",
    url: "https://yoursite.com/about",
    siteName: "Surgo Studios",
    images: [
      {
        url: "https://res.cloudinary.com/dvqibrc9d/image/upload/v1757010350/VAF02794_copy_fv8vur.jpg",
        width: 1200,
        height: 630,
        alt: "Surgo Studios Co-Founders",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
};

export default function AboutPage() {
  const leadership = [
    {
      name: "Raha",
      role: "Creative Director and Manager",
      img: "https://res.cloudinary.com/dvqibrc9d/image/upload/v1757094295/IMG_7875_copy_zpkjoh.jpg",
      bio: "Raha serves as Surgo’s Creative Director and Manager, leading projects with clarity, creativity, and emotional impact.",
    },
    {
      name: "Vahid",
      role: "Head of Production",
      img: "https://res.cloudinary.com/dvqibrc9d/image/upload/v1757094344/VAF03130_B_W_dwq9i1.jpg",
      bio: "Vahid oversees the production process, bringing Surgo’s creative vision to life with precision and excellence.",
    },
  ];

  return (
    <div className="bg-white text-black">
      {/* HERO */}
      <section className="relative bg-[#FFFDF6] text-gray-800 px-8 py-32 md:px-20">
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-[#FFFDF6] to-white"></div>

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-mozilla text-center mb-12 leading-tight relative z-10"
        >
          Surgo Studios
        </motion.h1>

        <p className="max-w-4xl mx-auto text-center text-xl text-gray-600 mb-20 relative z-10">
          Surgo Studios is a Canadian video production company{" "}
          based in Ottawa, trusted by brands across{" "}
          Ontario, and Canada.{" "}
          We create cinematic stories that inspire trust and captivate
          audiences across Canada.
        </p>
      </section>

      {/* FOUNDERS */}
      <section className="px-8 py-24 md:px-20">
        <h2 className="text-5xl font-mozilla text-center mb-16">
          Founders & Visionaries
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            src="https://res.cloudinary.com/dvqibrc9d/image/upload/v1757010350/VAF02794_copy_fv8vur.jpg"
            alt="Daniyal Zafar & Sashien Godakandae - Co-Founders of Surgo Studios, Ottawa video production"
            loading="lazy"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl shadow-xl object-cover object-top w-full h-[600px]"
          />
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-mozilla mb-2">
              Daniyal Zafar & Sashien Godakandae
            </h3>
            <p className="text-xl font-rammetto text-gray-600 mb-6">
              Co-Founders
            </p>
            <p className="text-gray-700 text-lg">
              As co-founders of Surgo Studios, Daniyal Zafar and Sashien
              Godakandae bring leadership, strategy, and a commitment to
              building lasting relationships with clients and partners in{" "}
              <strong>video production across Ottawa and beyond</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="px-8 md:px-20">
        <h2 className="text-5xl font-mozilla text-center mb-16">
          Leadership Team
        </h2>
        <div className="grid sm:grid-cols-2 gap-12 mb-32">
          {leadership.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="text-center"
            >
              <img
                src={p.img}
                alt={`${p.name} - ${p.role} at Surgo Studios, Ottawa video production company`}
                loading="lazy"
                className="rounded-2xl shadow-lg object-contain w-full aspect-[3/4] mb-6"
              />
              <h3 className="text-2xl font-mozilla">{p.name}</h3>
              <p className="text-lg font-rammetto text-gray-600">{p.role}</p>
              <p className="mt-3 text-gray-700">{p.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="px-8 md:px-20">
        <h2 className="text-5xl font-mozilla text-center mt-32 mb-16">
          Our Values
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 text-center mb-32">
          {[
            {
              title: "Creativity",
              desc: "Designing cinematic stories that resonate and inspire.",
            },
            {
              title: "Trust",
              desc: "Collaborating transparently with clients and partners.",
            },
            {
              title: "Innovation",
              desc: "Exploring bold ideas and redefining possibilities.",
            },
            {
              title: "Impact",
              desc: "Crafting content that moves people and builds loyalty.",
            },
          ].map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="space-y-2"
            >
              <h3 className="text-2xl font-bold">{val.title}</h3>
              <p className="text-gray-600">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY CANADA CHOOSES SURGO */}
      <section className="px-8 md:px-20">
        <h2 className="text-5xl font-mozilla text-center mb-12">
          Why Brands Across Canada Choose Surgo
        </h2>
        <p className="max-w-3xl mx-auto text-center text-lg text-gray-700 mb-20">
          From <strong>Ottawa</strong> to <strong>Montreal</strong>, Surgo
          Studios has partnered with Canadian businesses to deliver cinematic
          productions that resonate. Whether it’s a startup in Ontario or an
          established brand in Quebec, our team understands the cultural and
          creative pulse of Canada — and we amplify it on screen.
        </p>
      </section>

      {/* EXPERTISE */}
      <section className="px-8 md:px-20">
        <h2 className="text-5xl font-mozilla text-center mb-12">Our Expertise</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center mb-32">
          {["Confrences & Events ", "Fashion", "Music", "E-commerce"].map((field, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="p-6 border rounded-2xl shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold">{field}</h3>
              <p className="text-sm text-gray-600 mt-2">
                Surgo has created memorable campaigns in {field}, partnering
                with brands across Ottawa, Montreal, and Ontario.{" "}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-20 text-center mb-50">
        <a
          href="/contact"
          className="inline-block text-2xl font-bold font-rammetto underline hover:tracking-wider transition mb-30"
        >
          Ready to amplify your story? Contact us ➝
        </a>
      </section>
    </div>
  );
}
