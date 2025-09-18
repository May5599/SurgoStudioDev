import Navbar from "../../components/Navbar";
import ServicesPage from "../../components/services/ServicesPage";
import ImpactStrip from "../../components/services/ImpactStrip";
import SurgoServices from "../../components/services/SurgoServices";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Services | Surgo Studios - Ottawa Video Production Company",
  description:
    "Explore Surgo Studios’ professional video production services in Ottawa. From brand films and corporate campaigns to video podcasts and reels, we deliver cinematic storytelling trusted by businesses across Canada and the U.S.",
  openGraph: {
    title: "Services | Surgo Studios - Ottawa Video Production Company",
    description:
      "Surgo Studios offers full-service video production in Ottawa: brand films, campaigns, video podcasts, reels, and creative storytelling for Canadian and U.S. businesses.",
    url: "https://www.surgostudios.com/services",
    siteName: "Surgo Studios",
    images: [
      {
        url: "https://res.cloudinary.com/duwtym7w7/image/upload/f_auto,q_auto/v1757345952/Dark-Logo_o0u2xj.png",
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
      "https://res.cloudinary.com/duwtym7w7/image/upload/f_auto,q_auto/v1757345952/Dark-Logo_o0u2xj.png",
    ],
  },
  alternates: {
    canonical: "https://www.surgostudios.com/services",
  },
};

export default function Services() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <ServicesPage />
      <ImpactStrip />
      <SurgoServices />
      <Footer />
    </main>
  );
}
