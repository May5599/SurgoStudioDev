import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
// import TrustedBySection from "../components/TrustedBySection";
import ServicesSnapshot from "../components/ServicesSnapshot";
import PortfolioPreview from "../components/PortfolioPreview";

import HowItWorksSection from "../components/HowItWorksSection";
import WhyWorkWithUs from "../components/WhyWorkWithUs";
import Footer from "../components/Footer";
import TestimonialsReel from "../components/TestimonialsReel";

export const metadata = {
  title: { absolute: "Surgo Studios | Ottawa Video Production & Creative Content Agency" },
  description:
    "Surgo Studios is an Ottawa-based video production agency crafting cinematic reels, commercials, podcasts, and social media content that inspires and engages audiences across Canada and the U.S.",
  keywords: [
    "video production Ottawa",
    "cinematic video agency Ottawa",
    "commercial production Ottawa",
    "corporate video Ottawa",
    "podcast studio Ottawa",
    "video podcast Ottawa",
    "social media reels Ottawa",
    "TikTok video production Ottawa",
    "brand storytelling agency Ottawa",
    "content marketing Ottawa"
  ],
  openGraph: {
    title: "Surgo Studios | Ottawa Video Production & Content Creation",
    description:
      "From reels to commercials to podcasts, Surgo Studios helps Ottawa brands tell cinematic stories and manage social content that connects.",
    url: "https://surgostudios.com",
    siteName: "Surgo Studios",
    images: [
      {
        url: "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1757010350/VAF02794_copy_fv8vur.jpg",
        width: 1200,
        height: 630,
        alt: "Surgo Studios - Video Production Agency Ottawa",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Surgo Studios | Ottawa Video Production Agency",
    description:
      "Ottawa-based creative video agency for reels, commercials, social media, and podcasts.",
    images: [
      "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1757010350/VAF02794_copy_fv8vur.jpg",
    ],
  },
  alternates: {
    canonical: "https://surgostudios.com",
  },
};


export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Surgo Studios",
            url: "https://surgostudios.com",
            logo: "https://res.cloudinary.com/drt92o4ye/image/upload/v1758309720/white-logo_w6xinb_yz8p9u.png",
            contactPoint: {
              "@type": "ContactPoint",
              email: "raha@surgomedia.com",
              contactType: "customer service",
              areaServed: ["Ottawa", "Toronto", "Canada"],
              availableLanguage: ["English", "French"],
            },
            sameAs: [
              "https://www.instagram.com/surgo.studios/",
              "https://www.linkedin.com/company/surgo-media/",
              "https://www.youtube.com/@surgostudios",
            ],
          }),
        }}
      />

      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Surgo Studios Hero Reel",
      description:
        "Cinematic brand stories, ad commercials, social media reels, and podcasts by Surgo Studios in Ottawa, Canada.",
      thumbnailUrl: [
        "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/v1757010350/VAF02794_copy_fv8vur.jpg"
      ], // ideally replace with an actual still frame from your video
      uploadDate: "2025-09-05",
      contentUrl:
        "https://res.cloudinary.com/drt92o4ye/video/upload/v1757080238/demo_hero_ymacfx.mp4", // ✅ your real Cloudinary video
      embedUrl: "https://surgostudios.com#reel",
      publisher: {
        "@type": "Organization",
        name: "Surgo Studios",
        logo: {
          "@type": "ImageObject",
          url: "https://res.cloudinary.com/drt92o4ye/image/upload/v1757081567/white-logo_w6xinb.png"
        }
      }
    })
  }}
/>


      {/* Page Sections */}
      <Navbar />
      <HeroSection />
      {/* <TrustedBySection /> */}
      <ServicesSnapshot />
      <PortfolioPreview />
      <HowItWorksSection />
      <WhyWorkWithUs />
      <TestimonialsReel />

      <Footer />
    </>
  );
}