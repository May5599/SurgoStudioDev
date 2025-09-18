"use client";

import { motion } from "framer-motion";

export const metadata = {
  title: "About Surgo Studios | Ottawa Video Production Company",
  description:
    "Learn about Surgo Studios, a Canadian video production company based in Ottawa. Led by partners Daniyal Zafar & Sashien Godakandae with Strategic Advisor Carl Anthony, trusted nationwide for cinematic storytelling.",
  openGraph: {
    title: "About Surgo Studios | Ottawa Video Production Company",
    description:
      "Discover Surgo Studios' partners, advisor, leadership team, values, and expertise. Trusted by brands across Canada for creative video production.",
    url: "https://yoursite.com/about",
    siteName: "Surgo Studios",
    images: [
      {
        url: "https://res.cloudinary.com/dvqibrc9d/image/upload/v1757010350/VAF02794_copy_fv8vur.jpg",
        width: 1200,
        height: 630,
        alt: "Surgo Studios Partners and Advisor",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
};

export default function AboutPage() {
  const leadership = [
    {
      name: "Raha, MBA",
      role: "Growth Operations Manager",
      img: "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto/v1757094295/IMG_7875_copy_zpkjoh.jpg",
      bio: "A global creative force, Raha brings tri-lingual expertise and cross-industry experience to every project. Having led campaigns across continents, she now drives Surgo’s creative edge, ensuring projects are delivered with clarity, precision, and impact.",
    },
    {
      name: "Vahid",
      role: "Head of Production",
      img: "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto/v1757094344/VAF03130_B_W_dwq9i1.jpg",
      bio: "With over a decade of cinematic production experience, Vahid combines vision with technical mastery. From global brands to local campaigns, he ensures Surgo delivers world-class visuals and storytelling on every project.",
    },
  ];

  return (
    <div className="bg-white text-black">
      {/* HERO */}
      <section className="relative bg-white text-gray-800 px-8 py-32 md:px-20">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-mozilla text-center mb-12 leading-tight"
        >
          Surgo Studios
        </motion.h1>

        <p className="max-w-4xl mx-auto text-center text-xl text-gray-600 mb-20">
          Surgo Studios is a Canadian video production company based in Ottawa, 
          trusted by brands across Ontario and Canada. We create cinematic stories 
          that inspire trust and captivate audiences nationwide.
        </p>
      </section>

      {/* PARTNERS & ADVISOR */}
<section className="px-8 py-24 md:px-20 bg-white">
  <h2 className="text-5xl font-mozilla text-center mb-16">
    Partners & Advisor
  </h2>
  <div className="grid gap-20">
    {/* Partners */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid md:grid-cols-2 gap-12 items-center"
    >
      <img
        src="https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto/v1757010350/VAF02794_copy_fv8vur.jpg"
        alt="Daniyal Zafar and Sashien Godakandae, Partners of Surgo Studios in Ottawa"
        loading="lazy"
        className="rounded-2xl shadow-xl object-cover object-top w-full h-[500px]"
      />
      <div className="text-center md:text-left">
        <h3 className="text-3xl font-mozilla mb-2">
          Daniyal Zafar & Sashien Godakandae
        </h3>
        <p className="text-xl font-rammetto text-gray-600 mb-6">Partners</p>
        <p className="text-gray-700 text-lg">
          Daniyal Zafar and Sashien Godakandae are the partners behind Surgo Studios, 
          an Ottawa video production company trusted for cinematic storytelling. 
          They work with businesses in Ottawa, Toronto, Montreal, and Vancouver, 
          while expanding into the U.S. with projects in Miami and Los Angeles—helping 
          brands create powerful content that inspires and drives growth.
        </p>
      </div>
    </motion.div>

    {/* Carl */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid md:grid-cols-2 gap-12 items-center"
    >
      <img
        src="https://res.cloudinary.com/duwtym7w7/image/upload/f_auto,q_auto/v1758205208/VAF03346_copy-2_a0rq2b.jpg"
        alt="Carl Anthony, Strategic Advisor at Surgo Studios"
        loading="lazy"
        className="rounded-2xl shadow-lg object-cover w-full h-[500px]"
      />
      <div className="text-center md:text-left">
        <h3 className="text-3xl font-mozilla mb-2">Carl Anthony</h3>
        <p className="text-xl font-rammetto text-gray-600 mb-6">Strategic Advisor</p>
        <p className="text-gray-700 text-lg">
          Carl provides strategic guidance to Surgo Studios, shaping long-term growth 
          and partnerships. With deep experience in scaling creative businesses, he 
          ensures Surgo’s strategies align with both creative ambition and market opportunity.
        </p>
      </div>
    </motion.div>
  </div>
</section>


      {/* LEADERSHIP */}
      <section className="px-8 md:px-20 bg-white">
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
                alt={`${p.name}, ${p.role} at Surgo Studios in Ottawa`}
                loading="lazy"
                className="rounded-2xl shadow-lg object-cover w-full aspect-[3/4] mb-6"
              />
              <h3 className="text-2xl font-mozilla">{p.name}</h3>
              <p className="text-lg font-rammetto text-gray-600">{p.role}</p>
              <p className="mt-3 text-gray-700">{p.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="px-8 md:px-20 bg-white">
        <h2 className="text-5xl font-mozilla text-center mt-32 mb-16">
          Our Values
        </h2>
        <div className="flex md:grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center mb-32 overflow-x-auto no-scrollbar">
          {[
            {
              title: "Creativity",
              desc: "Crafting cinematic stories that resonate and inspire.",
            },
            {
              title: "Trust",
              desc: "Collaborating openly and building strong partnerships.",
            },
            {
              title: "Innovation",
              desc: "Exploring bold ideas and redefining possibilities.",
            },
            {
              title: "Impact",
              desc: "Creating content that moves people and builds loyalty.",
            },
          ].map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="shrink-0 w-[240px] md:w-auto space-y-2 p-4 border rounded-2xl"
            >
              <h3 className="text-2xl font-bold">{val.title}</h3>
              <p className="text-gray-600">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY CANADA CHOOSES SURGO */}
      <section className="px-8 md:px-20 bg-white">
        <h2 className="text-5xl font-mozilla text-center mb-12">
          Why Brands Across Canada Choose Surgo
        </h2>
        <p className="max-w-3xl mx-auto text-center text-lg text-gray-700 mb-20">
          Surgo Studios is an Ottawa-based video production company creating cinematic 
          content that connects with audiences. We work closely with local businesses 
          in Ottawa while also serving clients nationwide in cities like Montreal, Toronto, 
          and Vancouver. Our reach also extends into the United States, with projects in 
          Miami and Los Angeles. Whether you are a small business looking to stand out in 
          Ottawa or a brand expanding across North America, Surgo Studios delivers 
          compelling productions designed to inspire, engage, and grow your audience.
        </p>
      </section>

      {/* EXPERTISE */}
      <section className="px-8 md:px-20 bg-white">
        <h2 className="text-5xl font-mozilla text-center mb-12">Our Expertise</h2>
        <div className="flex md:grid md:grid-cols-4 gap-8 text-center mb-32 overflow-x-auto no-scrollbar">
          {["Conferences & Events", "Fashion", "Music", "E-commerce"].map((field, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="shrink-0 w-[260px] md:w-auto p-6 border rounded-2xl shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold">{field}</h3>
              <p className="text-sm text-gray-600 mt-2">
                Surgo has created memorable campaigns in {field}, partnering 
                with brands across Ottawa, Montreal, and Ontario.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-20 text-center mb-48 bg-white">
        <a
          href="/contact"
          className="inline-block text-2xl font-bold font-rammetto underline hover:tracking-wider transition"
        >
          Ready to amplify your story? Contact us ➝
        </a>
      </section>
    </div>
  );
}
