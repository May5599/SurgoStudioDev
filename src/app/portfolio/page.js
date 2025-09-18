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
  title: "Portfolio | Surgo Studios - Ottawa Video Production Company",
  description:
    "Explore Surgo Studios’ portfolio of cinematic video productions. Based in Ottawa, we specialize in brand films, reels, campaigns, and video podcasts for businesses across Canada and the U.S.",
  openGraph: {
    title: "Portfolio | Surgo Studios - Ottawa Video Production Company",
    description:
      "See Surgo Studios' creative portfolio: brand films, corporate campaigns, reels, and testimonials. Trusted by businesses in Ottawa, Toronto, Montreal, Vancouver, and beyond for cinematic storytelling.",
    url: "https://www.surgostudios.com/portfolio",
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
    canonical: "https://www.surgostudios.com/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <PortfolioHero />
      <SurgoBanner />
      <ProjectsReel />
      <ShowcaseGrid />
      {/* <TrustedBySection /> */}
      <SurgoReelsShowcase />
      <ImpactSection />
      <SurgoLogo />
      {/* <TestimonialsSection /> */}
      <CallToActionSection />
      {/* <SurgoBanner /> */}
      <Footer />
    </main>
  );
}
