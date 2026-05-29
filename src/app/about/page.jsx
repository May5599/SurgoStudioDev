import Navbar from "../../components/Navbar";
import AboutUs from "../../components/about/Aboutus";
import Footer from "../../components/Footer";

export const metadata = {
  title: "About Us - Ottawa Video Production Company",
  description:
    "Surgo Studios is an Ottawa-based video production company specializing in cinematic storytelling. Meet our partners, advisor, and leadership team trusted by brands across Canada and the U.S.",
  openGraph: {
    title: "About Us | Surgo Studios - Ottawa Video Production Company",
    description:
      "Discover Surgo Studios' story, partners, strategic advisor, and leadership team. Based in Ottawa, we produce cinematic video content for brands in Toronto, Montreal, Vancouver, Miami, Los Angeles, and beyond.",
    url: "https://surgostudios.com/about",
    siteName: "Surgo Studios",
    images: [
      {
        url: "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1757010350/VAF02794_copy_fv8vur.jpg",
        width: 1200,
        height: 630,
        alt: "Surgo Studios Partners and Leadership Team",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Surgo Studios - Ottawa Video Production Company",
    description:
      "Meet the partners and leadership team of Surgo Studios, Ottawa’s trusted video production company for cinematic storytelling across Canada and the U.S.",
    images: [
      "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1757010350/VAF02794_copy_fv8vur.jpg",
    ],
  },
  alternates: {
    canonical: "https://surgostudios.com/about",
  },
};

export default function AboutPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Surgo Studios",
    url: "https://surgostudios.com",
    logo: {
      "@type": "ImageObject",
      url: "https://res.cloudinary.com/drt92o4ye/image/upload/v1758309720/white-logo_w6xinb_yz8p9u.png",
      width: 240,
      height: 80,
    },
    image: "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1757010350/VAF02794_copy_fv8vur.jpg",
    description:
      "Surgo Studios is an Ottawa-based video production company specializing in cinematic storytelling for brands across Canada and the U.S.",
    foundingLocation: {
      "@type": "Place",
      name: "Ottawa, Ontario, Canada",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "150 Elgin Street",
      addressLocality: "Ottawa",
      addressRegion: "ON",
      postalCode: "K2P 1L4",
      addressCountry: "CA",
    },
    sameAs: [
      "https://www.instagram.com/surgo.studios/",
      "https://www.linkedin.com/company/surgo-media/",
      "https://www.youtube.com/@surgostudios",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "raha@surgomedia.com",
      areaServed: ["Ottawa", "Toronto", "Canada"],
      availableLanguage: ["English", "French"],
    },
  };

  return (
    <main className="bg-black text-white">
      <Navbar />
      <AboutUs />
      <Footer />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    </main>
  );
}
