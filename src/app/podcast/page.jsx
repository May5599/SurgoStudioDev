import Navbar from "../../components/Navbar";
import Section1 from "../../components/podcast/Section1";
import Footer from "../../components/Footer";

// ---------- SEO: App Router Metadata ----------
export const metadata = {
  title: "Ottawa Podcast Recording & Video Podcast Studio",
  description:
    "Record your podcast in Ottawa with Surgo Studios. Our professional podcast recording studio includes microphones, cameras, an engineer, editing, and distribution so you can focus on your conversation.",
  keywords: [
    "podcast studio Ottawa",
    "podcast recording Ottawa",
    "video podcast Ottawa",
    "Ottawa podcast production",
    "record a podcast in Ottawa",
    "podcast studio rental Ottawa",
    "video podcast production Ottawa",
    "podcast editing Ottawa",
    "podcast distribution Ottawa",
  ],
  alternates: { canonical: "https://surgostudios.com/podcast" },
  openGraph: {
    title: "Surgo Studios | Ottawa Podcast Recording & Video Podcast Studio",
    description:
      "Book a professional podcast studio in Ottawa with everything included microphones, cameras, engineer, editing, and distribution. Reserve your session at Surgo Studios.",
    url: "https://surgostudios.com/podcast",
    siteName: "Surgo Studios",
    images: [
      {
        url: "https://res.cloudinary.com/drt92o4ye/image/upload/v1757103107/IMG_6606_siaca8.jpg",
        width: 1200,
        height: 630,
        alt: "Ottawa Podcast Studio - Surgo Studios Recording Room",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Surgo Studios | Ottawa Podcast Recording & Video Podcast Studio",
    description:
      "Record your podcast in Ottawa at Surgo Studios. Full service with engineer, editing, and distribution.",
    images: [
      "https://res.cloudinary.com/drt92o4ye/image/upload/v1757103107/IMG_6606_siaca8.jpg",
    ],
  },
};

// ---------- Page ----------
export default function PodcastPage() {
  return (
    <main className="bg-black text-white">
      {/* LocalBusiness JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Surgo Studios",
            url: "https://surgostudios.com",
            image:
              "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1200/v1757103107/IMG_6606_siaca8.jpg",
            email: "raha@surgomedia.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "150 Elgin Street",
              addressLocality: "Ottawa",
              addressRegion: "ON",
              postalCode: "K2P 1L4",
              addressCountry: "CA",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 45.420449194844615,
              longitude: -75.69341459232902,
            },
            hasMap:
              "https://www.google.com/maps/place/150+Elgin+St,+Ottawa,+ON+K2P+1L4",
            openingHours: ["Mo-Fr 09:00-18:00", "Sa 10:00-16:00"],
            priceRange: "$$",
            description:
              "Ottawa podcast recording studio with microphones, cameras, an engineer, editing, and distribution.",
          }),
        }}
      />

      {/* Service JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Podcast recording and production",
            provider: {
              "@type": "LocalBusiness",
              name: "Surgo Studios",
              url: "https://surgostudios.com",
            },
            areaServed: [
              { "@type": "City", name: "Ottawa" },
              { "@type": "City", name: "Toronto" },
            ],
            serviceType: "Podcast studio rental and production",
            description:
              "Book a professional podcast studio in Ottawa. Microphones, cameras, engineer, editing, mastering, and distribution.",
            url: "https://surgostudios.com/podcast",
          }),
        }}
      />

      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://surgostudios.com" },
              { "@type": "ListItem", position: 2, name: "Podcast Studio", item: "https://surgostudios.com/podcast" },
            ],
          }),
        }}
      />

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Where can I record a podcast in Ottawa?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can record your podcast at Surgo Studios, located at 150 Elgin Street in downtown Ottawa. We provide microphones, cameras, lighting, and an engineer.",
                },
              },
              {
                "@type": "Question",
                name: "Do you handle editing and distribution?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. We edit, master, and deliver your podcast with optional artwork and distribution to Spotify, Apple Podcasts, and other major platforms.",
                },
              },
              {
                "@type": "Question",
                name: "Can I book a video podcast session?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Absolutely. Surgo Studios offers full video podcast production with multi-camera setups, editing, and short-form clips for social media.",
                },
              },
              {
                "@type": "Question",
                name: "How much does it cost to record a podcast in Ottawa?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Surgo Studios offers tiered podcast packages — Standard, Explorer, and Premium — each tailored to different needs and budgets. Pricing is customized to your project. Contact us for a free quote.",
                },
              },
              {
                "@type": "Question",
                name: "Does Surgo Studios provide short-form social media clips from podcast episodes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Every podcast package includes short-form clip creation for Instagram Reels, TikTok, and YouTube Shorts to help you grow your audience across platforms.",
                },
              },
            ],
          }),
        }}
      />

      <Navbar />
      <Section1 />
      <Footer />
    </main>
  );
}
