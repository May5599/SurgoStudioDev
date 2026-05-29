import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TestimonialsReel from "../../components/TestimonialsReel";
import Link from "next/link";

export const metadata = {
  title: "Client Testimonials Ottawa - Video Production Results",
  description:
    "See real video testimonials from Ottawa businesses who chose Surgo Studios for video production, brand films, and podcast production. Serving Kanata, Barrhaven, Orleans, Nepean, Westboro, and all of Ottawa.",
  keywords: [
    "video production Ottawa testimonials",
    "Surgo Studios reviews Ottawa",
    "Ottawa video agency client stories",
    "corporate video production Ottawa",
    "brand film Ottawa",
    "podcast production Ottawa",
  ],
  openGraph: {
    title: "Client Stories | Ottawa Video Production | Surgo Studios",
    description:
      "Real video testimonials from Ottawa brands. Surgo Studios produces cinematic brand films, corporate videos, and podcasts for businesses across Ottawa.",
    url: "https://surgostudios.com/client-stories",
    siteName: "Surgo Studios",
    images: [
      {
        url: "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1200/v1757081567/white-logo_w6xinb.png",
        width: 1200,
        height: 630,
        alt: "Client Stories - Surgo Studios Ottawa Video Production",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Stories | Ottawa Video Production | Surgo Studios",
    description:
      "Real video testimonials from Ottawa businesses. Surgo Studios   cinematic video production at 150 Elgin Street.",
    images: [
      "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1200/v1757081567/white-logo_w6xinb.png",
    ],
  },
  alternates: {
    canonical: "https://surgostudios.com/client-stories",
  },
};

const stats = [
  { value: "50+", label: "Brands Served" },
  { value: "300+", label: "Videos Produced" },
  { value: "4.9★", label: "Average Client Rating" },
  { value: "CA + US", label: "Canada & United States" },
];

const industries = [
  { name: "Technology & SaaS", icon: "⚡", desc: "Product launches, investor decks, and team culture films for Kanata's tech corridor." },
  { name: "Health & Wellness", icon: "🩺", desc: "Brand storytelling for clinics, coaches, and wellness brands across Ottawa and nationally." },
  { name: "Real Estate", icon: "🏙️", desc: "Property films, broker brand videos, and market update series for Ottawa's top agents." },
  { name: "Restaurants & Hospitality", icon: "🍽️", desc: "Cinematic menu reels, brand story films, and event highlight packages." },
  { name: "Nonprofits & Government", icon: "🤝", desc: "Impact documentaries and campaign films for Ottawa's public sector and charities." },
  { name: "Events & Entertainment", icon: "🎬", desc: "Live event coverage, highlight reels, and launch campaign videos." },
];

const areas = [
  "Ottawa", "Toronto", "Montreal", "Miami",
  "Kanata", "Barrhaven", "Orleans", "Westboro",
  "Vancouver", "Calgary", "New York", "Los Angeles",
];

const faqs = [
  {
    q: "What types of video content does Surgo Studios produce?",
    a: "We produce brand films, corporate videos, product launch films, documentary-style campaigns, video podcasts, social media reels, event coverage, and investor pitch videos. Every project is built around your specific goals and audience   we don't do templates.",
  },
  {
    q: "How does the production process work from start to finish?",
    a: "We start with a free discovery call to understand your brand, audience, and goals. From there we handle creative strategy, scripting, location scouting, filming, and post-production   all under one roof. You're involved at every stage, but we take care of the heavy lifting.",
  },
  {
    q: "Does Surgo Studios travel for shoots outside of Ottawa?",
    a: "Absolutely. While our studio is based at 150 Elgin Street in Ottawa, our crew regularly travels to Toronto, Montreal, Miami, and across Canada and the United States. If your story needs to be told somewhere else, we go there.",
  },
  {
    q: "What makes Surgo Studios different from other video agencies?",
    a: "We approach every project with a cinematic, storytelling-first mindset   not just a camera and a checklist. We're a full-service creative agency, which means strategy, production, and post are handled by the same team. The result is a final product that's visually consistent, brand-accurate, and built to perform.",
  },
  {
    q: "How do I get started with a project?",
    a: "Book a free 30-minute discovery call through our contact page. We'll talk through your goals, share relevant examples of our work, and outline a creative direction. No commitment, no pressure   just a real conversation about what video can do for your brand.",
  },
];

export default function ClientStoriesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://surgostudios.com" },
      { "@type": "ListItem", position: 2, name: "Client Stories", item: "https://surgostudios.com/client-stories" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Surgo Studios",
    url: "https://surgostudios.com",
    image: "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1200/v1757081567/white-logo_w6xinb.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "150 Elgin Street",
      addressLocality: "Ottawa",
      addressRegion: "ON",
      postalCode: "K2P 1L4",
      addressCountry: "CA",
    },
    geo: { "@type": "GeoCoordinates", latitude: 45.4201, longitude: -75.6931 },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 47,
      bestRating: 5,
    },
    areaServed: [
      { "@type": "City", name: "Ottawa" },
      { "@type": "City", name: "Toronto" },
      { "@type": "City", name: "Montreal" },
      { "@type": "City", name: "Miami" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "United States" },
    ],
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-yellow-400/8 blur-[140px] rounded-full" />
          <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-purple-500/6 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[8%] w-[250px] h-[250px] bg-yellow-400/6 blur-[100px] rounded-full" />
        </div>

        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-600 mb-12">
          <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-500">Client Stories</span>
        </nav>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/8 text-yellow-400 text-xs tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
            Ottawa&apos;s Premier Video Production Agency
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight mb-6">
            The Proof is in
            <br />
            <span className="text-yellow-400">the Frame</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            From Kanata tech startups to Centretown nonprofits   Ottawa businesses of every kind have
            trusted Surgo Studios to tell their story on camera. Watch what they had to say.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-colors"
            >
              Start Your Story
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-3.5 border border-white/20 text-white font-medium rounded-full hover:border-yellow-400/60 hover:text-yellow-400 transition-colors"
            >
              View Our Work
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-gray-700 to-transparent" />
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <section className="border-y border-white/8 py-12" aria-label="Surgo Studios at a glance">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-4xl sm:text-5xl font-extrabold text-yellow-400">{value}</p>
              <p className="text-sm text-gray-500 mt-1 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── VIDEO TESTIMONIALS ───────────────────────────────────────────── */}
      <div className="pt-4">
        <TestimonialsReel />
      </div>

      {/* ── INDUSTRIES ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6" aria-labelledby="industries-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-12 h-0.5 bg-yellow-400 mx-auto mb-6" />
            <h2 id="industries-heading" className="text-3xl sm:text-4xl font-bold mb-4">
              Ottawa Video Production Across Every Industry
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Surgo Studios has produced video content for businesses across Ottawa&apos;s most
              competitive sectors   we understand your audience because we&apos;ve filmed for them.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind) => (
              <div
                key={ind.name}
                className="group border border-white/8 rounded-2xl p-7 hover:border-yellow-400/30 hover:bg-white/3 transition-all duration-300"
              >
                <span className="text-3xl mb-4 block" role="img" aria-label={ind.name}>{ind.icon}</span>
                <h3 className="text-white font-semibold text-base mb-2">{ind.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AREAS WE SERVE ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white/[0.02] border-y border-white/6" aria-labelledby="areas-heading">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-12 h-0.5 bg-yellow-400 mx-auto mb-6" />
          <h2 id="areas-heading" className="text-3xl sm:text-4xl font-bold mb-4">
            Ottawa-Based. Canada and US-Ready.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-12">
            Our studio is in downtown Ottawa, but our crew travels anywhere your story needs to
            be told   from Kanata to Toronto to Miami to Los Angeles. Great video knows no borders.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {areas.map((area) => (
              <span
                key={area}
                className="px-5 py-2.5 rounded-full border border-white/10 text-gray-300 text-sm hover:border-yellow-400/40 hover:text-yellow-400 transition-colors cursor-default"
              >
                {area}
              </span>
            ))}
          </div>

          <p className="text-gray-700 text-xs mt-10">
            Headquartered at 150 Elgin Street, Ottawa ON   filming across Canada and the United States.
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-12 h-0.5 bg-yellow-400 mx-auto mb-6" />
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold mb-4">
              Common Questions About Working With Surgo Studios
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Everything brands across Canada and the US want to know before starting their first video project with us.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-white/8 rounded-2xl p-7 hover:border-yellow-400/20 transition-colors duration-200"
              >
                <h3 className="text-white font-semibold text-base mb-3">{faq.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-28 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-yellow-400/8 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="w-12 h-0.5 bg-yellow-400 mx-auto mb-8" />
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
            Ready to Be Our Next
            <br />
            <span className="text-yellow-400">Ottawa Success Story?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Book a free 30-minute discovery call with the Surgo Studios team. We&apos;ll talk about
            your goals, your audience, and exactly what kind of video will move the needle for your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-10 py-4 bg-yellow-400 text-black font-bold rounded-full text-lg hover:bg-yellow-300 transition-colors"
            >
              Book a Free Discovery Call
            </Link>
            <Link
              href="/services"
              className="px-10 py-4 border border-white/20 text-white font-medium rounded-full hover:border-yellow-400/40 hover:text-yellow-400 transition-colors"
            >
              Explore Services
            </Link>
          </div>
          <p className="text-gray-700 text-xs mt-8">
            150 Elgin Street, Ottawa ON   free call, no commitment.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
