import PortfolioHero from '../../components/portfolio/PortfolioHero';
import Navbar from "../../components/Navbar";
import ProjectsReel from '../../components/portfolio/ProjectsReel';
import ShowcaseGrid from '../../components/portfolio/ShowcaseGrid';
import ImpactSection from '../../components/portfolio/ImpactSection';
// import TestimonialsSection from '../../components/portfolio/TestimonialsSection';
// import TrustedBySection from '../../components/TrustedBySection';
import CallToActionSection from '../../components/portfolio/CallToActionSection';
import Footer from '../../components/Footer';
import SurgoBanner from '../../components/portfolio/SurgoBanner';
import SurgoReelsShowcase from '../../components/portfolio/SurgoReelsShowcase';
import SurgoLogo from "../../components/portfolio/SurgoLogo";

export const metadata = {
  title: "Portfolio - Ottawa Video Production Company",
  description:
    "Explore Surgo Studios’ portfolio of cinematic video productions. Based in Ottawa, we specialize in brand films, reels, campaigns, and video podcasts for businesses across Canada and the U.S.",
  openGraph: {
    title: "Portfolio | Surgo Studios - Ottawa Video Production Company",
    description:
      "See Surgo Studios' creative portfolio: brand films, corporate campaigns, reels, and testimonials. Trusted by businesses in Ottawa, Toronto, Montreal, Vancouver, and beyond for cinematic storytelling.",
    url: "https://surgostudios.com/portfolio",
    siteName: "Surgo Studios",
    images: [
      {
        url: "https://res.cloudinary.com/duwtym7w7/image/upload/f_auto,q_auto/v1757345952/Dark-Logo_o0u2xj.png",
        width: 1200,
        height: 630,
        alt: "Surgo Studios Portfolio - Ottawa Video Production Company",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Surgo Studios - Ottawa Video Production Company",
    description:
      "Explore the Surgo Studios portfolio: cinematic brand films, reels, campaigns, and video podcasts for Canadian and U.S. businesses.",
    images: [
      "https://res.cloudinary.com/duwtym7w7/image/upload/f_auto,q_auto/v1757345952/Dark-Logo_o0u2xj.png",
    ],
  },
  alternates: {
    canonical: "https://surgostudios.com/portfolio",
  },
};

const CF = "https://d1y0fmcrb9qnj1.cloudfront.net";

const videoObjectSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Surgo Studios Portfolio Videos",
  itemListElement: [
    {
      "@type": "ListItem", position: 1,
      item: {
        "@type": "VideoObject",
        name: "NGY Yachting",
        description: "Cinematic brand film for NGY Yachting by Surgo Studios Ottawa.",
        thumbnailUrl: `${CF}/poster.jpg`,
        contentUrl: `${CF}/FINAL_12_01_2026.mp4`,
        uploadDate: "2026-01-12",
        publisher: { "@type": "Organization", name: "Surgo Studios", url: "https://surgostudios.com" },
      },
    },
    {
      "@type": "ListItem", position: 2,
      item: {
        "@type": "VideoObject",
        name: "Branch AV Music Video",
        description: "Music video production for Branch AV by Surgo Studios Ottawa.",
        thumbnailUrl: `${CF}/projector-poster.jpg`,
        contentUrl: `${CF}/projector.mp4`,
        uploadDate: "2025-11-01",
        publisher: { "@type": "Organization", name: "Surgo Studios", url: "https://surgostudios.com" },
      },
    },
    {
      "@type": "ListItem", position: 3,
      item: {
        "@type": "VideoObject",
        name: "Kevin Pearce",
        description: "Brand storytelling film for Kevin Pearce by Surgo Studios Ottawa.",
        thumbnailUrl: `${CF}/EP003_poster.jpg`,
        contentUrl: `${CF}/hero.mp4`,
        uploadDate: "2025-10-01",
        publisher: { "@type": "Organization", name: "Surgo Studios", url: "https://surgostudios.com" },
      },
    },
    {
      "@type": "ListItem", position: 4,
      item: {
        "@type": "VideoObject",
        name: "Branch AV Trailer",
        description: "Brand trailer for Branch AV produced by Surgo Studios Ottawa.",
        thumbnailUrl: `${CF}/BranchOfficeTrailerv3_f5ejqb_poster.jpg`,
        contentUrl: `${CF}/BranchOfficeTrailerv3_f5ejqb_compressed.mp4`,
        uploadDate: "2025-09-01",
        publisher: { "@type": "Organization", name: "Surgo Studios", url: "https://surgostudios.com" },
      },
    },
    {
      "@type": "ListItem", position: 5,
      item: {
        "@type": "VideoObject",
        name: "Vertical Energy",
        description: "Short-form social media reel by Surgo Studios Ottawa.",
        thumbnailUrl: `${CF}/reel1_ghfwq2_poster.jpg`,
        contentUrl: `${CF}/reel1_ghfwq2_compressed.mp4`,
        uploadDate: "2025-08-01",
        publisher: { "@type": "Organization", name: "Surgo Studios", url: "https://surgostudios.com" },
      },
    },
    {
      "@type": "ListItem", position: 6,
      item: {
        "@type": "VideoObject",
        name: "Immersive Frames",
        description: "Cinematic brand content by Surgo Studios Ottawa.",
        thumbnailUrl: `${CF}/website01_bwovoe_poster.jpg`,
        contentUrl: `${CF}/website01_bwovoe_compressed.mp4`,
        uploadDate: "2025-07-01",
        publisher: { "@type": "Organization", name: "Surgo Studios", url: "https://surgostudios.com" },
      },
    },
    {
      "@type": "ListItem", position: 7,
      item: {
        "@type": "VideoObject",
        name: "Event Showcase",
        description: "Corporate event highlight reel by Surgo Studios Ottawa.",
        thumbnailUrl: `${CF}/cut_v1s354_poster.jpg`,
        contentUrl: `${CF}/cut_v1s354_compressed.mp4`,
        uploadDate: "2025-06-01",
        publisher: { "@type": "Organization", name: "Surgo Studios", url: "https://surgostudios.com" },
      },
    },
  ],
};

export default function PortfolioPage() {
  return (
    <main className="bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjectSchema) }}
      />
      <Navbar />
      <PortfolioHero />
      <SurgoBanner />
      <SurgoReelsShowcase />

      <ImpactSection />
      <ProjectsReel />
      <ShowcaseGrid />
      {/* <TrustedBySection /> */}
      
      <SurgoLogo />
      {/* <TestimonialsSection /> */}
      <CallToActionSection />
      {/* <SurgoBanner /> */}
      <Footer />
    </main>
  );
}
