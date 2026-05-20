import Navbar from "../../components/Navbar";
import ContactPage from "../../components/contact/Contactpage";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Contact Surgo Studios | Ottawa Podcast & Video Production Company",
  description:
    "Looking to start a podcast in Ottawa? Surgo Studios is your trusted local podcast studio and video production company. Contact us today to record, produce, and launch your podcast with professional quality.",
  openGraph: {
    title: "Contact Surgo Studios | Ottawa Podcast & Video Production Company",
    description:
      "Make your podcast in Ottawa with Surgo Studios. We provide professional podcast recording, editing, and video production services for creators, businesses, and brands across Ottawa and Canada.",
    url: "https://surgostudios.com/contact",
    siteName: "Surgo Studios",
    images: [
      {
        url: "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto/v1757010350/VAF02794_copy_fv8vur.jpg",
        width: 1200,
        height: 630,
        alt: "Ottawa Podcast Studio - Surgo Studios",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Surgo Studios | Ottawa Podcast Studio & Video Production",
    description:
      "Book your podcast session in Ottawa with Surgo Studios. We offer podcast recording, video podcast production, editing, and distribution for creators and businesses.",
    images: [
      "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto/v1757010350/VAF02794_copy_fv8vur.jpg",
    ],
  },
  alternates: {
    canonical: "https://surgostudios.com/contact",
  },
};

export default function Contact() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Surgo Studios",
    url: "https://surgostudios.com",
    logo: {
      "@type": "ImageObject",
      url: "https://res.cloudinary.com/drt92o4ye/image/upload/v1758309720/white-logo_w6xinb_yz8p9u.png",
    },
    image: "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto/v1757010350/VAF02794_copy_fv8vur.jpg",
    description:
      "Surgo Studios is Ottawa’s leading video production and podcast studio. We help creators, entrepreneurs, and businesses record, produce, and launch professional video content and podcasts with cinematic quality.",
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
    hasMap: "https://www.google.com/maps/place/150+Elgin+St,+Ottawa,+ON+K2P+1L4",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "raha@surgomedia.com",
      areaServed: ["Ottawa", "Toronto", "Ontario", "Canada"],
      availableLanguage: ["English", "French"],
    },
    sameAs: [
      "https://www.instagram.com/surgo.studios/",
      "https://www.linkedin.com/company/surgo-media/",
      "https://www.youtube.com/@surgostudios",
    ],
    priceRange: "$$",
    openingHours: ["Mo-Fr 09:00-18:00", "Sa 10:00-16:00"],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Where can I record a podcast in Ottawa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can record your podcast at Surgo Studios, a professional podcast and video production company in Ottawa. We provide recording, editing, and distribution services.",
        },
      },
      {
        "@type": "Question",
        name: "Does Surgo Studios provide video podcasts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Surgo Studios offers full video podcast production with multi-camera setups, editing, and social media clips.",
        },
      },
      {
        "@type": "Question",
        name: "Can businesses create branded podcasts with Surgo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. We work with local Ottawa businesses and national brands to produce branded podcasts that engage audiences and build authority.",
        },
      },
    ],
  };

  return (
    <main className="bg-black text-white">
      <Navbar />
      <ContactPage />
      <Footer />

      {/* LocalBusiness Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
