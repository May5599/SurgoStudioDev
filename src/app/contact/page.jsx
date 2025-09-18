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
    url: "https://www.surgostudios.com/contact",
    siteName: "Surgo Studios",
    images: [
      {
        url: "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto/v1757010350/VAF02794_copy_fv8vur.jpg",
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
      "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto/v1757010350/VAF02794_copy_fv8vur.jpg",
    ],
  },
  alternates: {
    canonical: "https://www.surgostudios.com/contact",
  },
};

export default function Contact() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Surgo Studios",
    url: "https://www.surgostudios.com",
    logo: "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto/v1757010350/VAF02794_copy_fv8vur.jpg",
    image:
      "https://res.cloudinary.com/dvqibrc9d/image/upload/f_auto,q_auto/v1757010350/VAF02794_copy_fv8vur.jpg",
    description:
      "Surgo Studios is Ottawa’s leading podcast studio and video production company. We help creators, entrepreneurs, and businesses record, produce, and launch professional podcasts with cinematic quality.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Example St", // replace with real address
      addressLocality: "Ottawa",
      addressRegion: "ON",
      postalCode: "K1A 0A1", // replace with real postal code
      addressCountry: "Canada",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-XXX-XXX-XXXX", // replace with real number
      contactType: "Customer Service",
      email: "info@surgostudios.com", // replace with real email
      areaServed: "Ottawa, Ontario, Canada",
      availableLanguage: ["English", "French"],
    },
    sameAs: [
      "https://www.facebook.com/yourpage",
      "https://www.instagram.com/yourpage",
      "https://www.linkedin.com/company/yourpage",
    ],
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-18:00",
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
