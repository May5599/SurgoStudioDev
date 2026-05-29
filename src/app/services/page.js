import Navbar from "../../components/Navbar";
import ServicesPage from "../../components/services/ServicesPage";
import ImpactStrip from "../../components/services/ImpactStrip";
import SurgoServices from "../../components/services/SurgoServices";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Services - Ottawa Video Production Company",
  description:
    "Explore Surgo Studios’ professional video production services in Ottawa. From brand films and corporate campaigns to video podcasts and reels, we deliver cinematic storytelling trusted by businesses across Canada and the U.S.",
  openGraph: {
    title: "Services | Surgo Studios - Ottawa Video Production Company",
    description:
      "Surgo Studios offers full-service video production in Ottawa: brand films, campaigns, video podcasts, reels, and creative storytelling for Canadian and U.S. businesses.",
    url: "https://surgostudios.com/services",
    siteName: "Surgo Studios",
    images: [
      {
        url: "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1757010350/VAF02794_copy_fv8vur.jpg",
        width: 1200,
        height: 630,
        alt: "Surgo Studios - Ottawa Video Production Services",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Surgo Studios - Ottawa Video Production Company",
    description:
      "Discover Surgo Studios' Ottawa video production services: cinematic brand films, corporate campaigns, video podcasts, reels, and creative storytelling.",
    images: [
      "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1757010350/VAF02794_copy_fv8vur.jpg",
    ],
  },
  alternates: {
    canonical: "https://surgostudios.com/services",
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Surgo Studios Video Production Services",
  description: "Professional video production services offered by Surgo Studios in Ottawa, Canada.",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Brand Film Production",
        provider: { "@type": "LocalBusiness", name: "Surgo Studios", url: "https://surgostudios.com" },
        areaServed: [{ "@type": "City", name: "Ottawa" }, { "@type": "City", name: "Toronto" }],
        serviceType: "Video Production",
        description: "Cinematic brand films that tell your company's story and captivate audiences.",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Commercial & Ad Production",
        provider: { "@type": "LocalBusiness", name: "Surgo Studios", url: "https://surgostudios.com" },
        areaServed: [{ "@type": "City", name: "Ottawa" }, { "@type": "City", name: "Toronto" }],
        serviceType: "Commercial Video Production",
        description: "High-impact TV and digital commercials for brands across Ottawa and Canada.",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Video Podcast Production",
        provider: { "@type": "LocalBusiness", name: "Surgo Studios", url: "https://surgostudios.com" },
        areaServed: [{ "@type": "City", name: "Ottawa" }],
        serviceType: "Podcast Studio",
        description: "Full-service video podcast recording, editing, and distribution at our Ottawa studio.",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Service",
        name: "Social Media Reels & Content",
        provider: { "@type": "LocalBusiness", name: "Surgo Studios", url: "https://surgostudios.com" },
        areaServed: [{ "@type": "City", name: "Ottawa" }, { "@type": "City", name: "Toronto" }],
        serviceType: "Social Media Video Production",
        description: "Short-form reels, TikTok videos, and Instagram content engineered for engagement.",
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Service",
        name: "Corporate Video Production",
        provider: { "@type": "LocalBusiness", name: "Surgo Studios", url: "https://surgostudios.com" },
        areaServed: [{ "@type": "City", name: "Ottawa" }, { "@type": "City", name: "Toronto" }],
        serviceType: "Corporate Video",
        description: "Professional corporate videos, training films, and internal communications for Ottawa businesses.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://surgostudios.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://surgostudios.com/services" },
  ],
};

export default function Services() {
  return (
    <main className="bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <ServicesPage />
      <ImpactStrip />
      <SurgoServices />
      <Footer />
    </main>
  );
}
