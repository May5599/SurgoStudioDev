// app/podcast/page.jsx
import Navbar from "@/components/Navbar";
import Section1 from "@/components/podcast/section1";
import Footer from "@/components/Footer";
import Script from "next/script";

// ---------- SEO: App Router Metadata ----------
export const metadata = {
  title: "Surgo Studio | Ottawa Podcast Recording Studio",
  description:
    "Book a professional podcast studio in Ottawa. Surgo Studio provides microphones, cameras, an engineer, editing, and distribution so you can focus on the conversation.",
  alternates: { canonical: "https://www.surgo.ca/podcast" },
  openGraph: {
    title: "Surgo Studio | Ottawa Podcast Recording Studio",
    description:
      "Book a professional podcast studio in Ottawa with everything included. No gear required. Reserve your session at Surgo Studio.",
    url: "https://www.surgo.ca/podcast",
    type: "website",
    locale: "en_CA",
    siteName: "Surgo Studio",
    images: [
      { url: "https://www.surgo.ca/og/ottawa-podcast-studio.jpg", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surgo Studio | Ottawa Podcast Recording Studio",
    description:
      "Book a professional podcast studio in Ottawa with everything included.",
    images: ["https://www.surgo.ca/og/ottawa-podcast-studio.jpg"],
  },
};

// ---------- Page ----------
export default function PodcastPage() {
  return (
    <main className="bg-black text-white">
      {/* LocalBusiness JSON-LD */}
      <Script
        id="ld-localbusiness"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Surgo Studio",
            "url": "https://www.surgo.ca/podcast",
            "image": "https://www.surgo.ca/og/ottawa-podcast-studio.jpg",
            "telephone": "+1-xxx-xxx-xxxx",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Your street address",
              "addressLocality": "Ottawa",
              "addressRegion": "ON",
              "postalCode": "K1X XXX",
              "addressCountry": "CA"
            },
            "priceRange": "$$",
            "description":
              "Ottawa podcast recording studio with microphones, cameras, an engineer, editing, and distribution."
          }),
        }}
      />
      {/* Service JSON-LD */}
      <Script
        id="ld-service"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Podcast recording and production",
            "provider": { "@type": "LocalBusiness", "name": "Surgo Studio" },
            "areaServed": { "@type": "City", "name": "Ottawa" },
            "serviceType": "Podcast studio rental and production",
            "description":
              "Book a professional podcast studio in Ottawa. Microphones, cameras, engineer, editing, mastering, and distribution."
          }),
        }}
      />
      {/* FAQ JSON-LD (also add an on-page FAQ section later to reinforce this) */}
      <Script
        id="ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Do I need to bring microphones or cameras?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Surgo Studio provides microphones, cameras, lighting, and an engineer."
                }
              },
              {
                "@type": "Question",
                "name": "Do you handle editing and distribution?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. We edit, master, and deliver your podcast with optional artwork and distribution to major platforms."
                }
              },
              {
                "@type": "Question",
                "name": "Can I book a custom length session?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Sessions and pricing are tailored to your length and overall needs."
                }
              }
            ]
          }),
        }}
      />

      <Navbar />
      <Section1 />
      <Footer />
    </main>
  );
}
