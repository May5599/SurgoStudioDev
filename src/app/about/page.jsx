import Navbar from "../../components/Navbar";
import AboutUs from "../../components/about/Aboutus";
import Footer from "../../components/Footer";

export const metadata = {
  title: "About Us | Surgo Studios - Ottawa Video Production Company",
  description:
    "Surgo Studios is an Ottawa-based video production company specializing in cinematic storytelling. Meet our partners, advisor, and leadership team trusted by brands across Canada and the U.S.",
  openGraph: {
    title: "About Us | Surgo Studios - Ottawa Video Production Company",
    description:
      "Discover Surgo Studios' story, partners, strategic advisor, and leadership team. Based in Ottawa, we produce cinematic video content for brands in Toronto, Montreal, Vancouver, Miami, Los Angeles, and beyond.",
    url: "https://www.surgostudios.com/about",
    siteName: "Surgo Studios",
    images: [
      {
        url: "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto/v1757010350/VAF02794_copy_fv8vur.jpg",
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
      "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto/v1757010350/VAF02794_copy_fv8vur.jpg",
    ],
  },
  alternates: {
    canonical: "https://www.surgostudios.com/about",
  },
};

export default function AboutPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Surgo Studios",
    url: "https://www.surgostudios.com",
    logo: "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto/v1757010350/VAF02794_copy_fv8vur.jpg",
    description:
      "Surgo Studios is an Ottawa-based video production company specializing in cinematic storytelling for brands across Canada and the U.S.",
    foundingLocation: {
      "@type": "Place",
      name: "Ottawa, Canada",
    },
    sameAs: [
      "https://www.facebook.com/yourpage",
      "https://www.instagram.com/yourpage",
      "https://www.linkedin.com/company/yourpage",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "raha@surgomedia.com",
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
