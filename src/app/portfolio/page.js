import PortfolioHero from '../../components/portfolio/PortfolioHero';
import Navbar from "../../components/Navbar";
import ProjectsReel from '../../components/portfolio/ProjectsReel';
import CreativeCommentary from '../../components/portfolio/CreativeCommentary';
import ShowcaseGrid from '../../components/portfolio/ShowcaseGrid';
import ImpactSection from '../../components/portfolio/ImpactSection';
import TestimonialsSection from '../../components/portfolio/TestimonialsSection';
import TrustedBySection from '../../components/TrustedBySection';
import CallToActionSection from '../../components/portfolio/CallToActionSection';
import Footer from '../../components/Footer';
import SurgoBanner from '../../components/portfolio/SurgoBanner';
import SurgoReelsShowcase from '../../components/portfolio/SurgoReelsShowcase';

export const metadata = {
  title: "Portfolio | Surgo Studios - Ottawa Video Production Company",
  description:
    "Explore Surgo Studios’ portfolio of cinematic video productions. Based in Ottawa, we create storytelling that inspires audiences and builds trust across Canada.",
  openGraph: {
    title: "Portfolio | Surgo Studios - Ottawa Video Production Company",
    description:
      "See Surgo Studios' creative portfolio: reels, brand films, campaigns, and testimonials. Trusted by Canadian businesses for cinematic storytelling.",
    url: "https://yoursite.com/portfolio",
    siteName: "Surgo Studios",
    images: [
      {
        url: "https://res.cloudinary.com/duwtym7w7/image/upload/v1757345952/Dark-Logo_o0u2xj.png",
        width: 1200,
        height: 630,
        alt: "Surgo Studios Logo - Ottawa Video Production Company",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
};


export default function PortfolioPage() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <PortfolioHero />
      <ProjectsReel />
      <ShowcaseGrid />
      <TrustedBySection />
      <SurgoReelsShowcase />
      <TestimonialsSection />
      <ImpactSection />
      <CreativeCommentary />
      <CallToActionSection />
      <SurgoBanner />
      <Footer />
    </main>
  );
}
