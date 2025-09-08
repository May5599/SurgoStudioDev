import Navbar from "../../components/Navbar";
import ServicesPage from "../../components/services/ServicesPage";
import ImpactStrip from "../../components/services/ImpactStrip";
import SurgoServices from "../../components/services/SurgoServices";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Services | Surgo Studios - Ottawa Video Production Company",
  description:
    "Discover Surgo Studios’ video production services in Ottawa. From brand films to campaigns, we craft cinematic storytelling that inspires audiences across Canada.",
  openGraph: {
    title: "Services | Surgo Studios - Ottawa Video Production Company",
    description:
      "Explore Surgo Studios’ professional video production services, including brand storytelling, reels, campaigns, and creative content trusted by Canadian businesses.",
    url: "https://yoursite.com/services",
    siteName: "Surgo Studios",
    images: [
      {
        url: "https://res.cloudinary.com/duwtym7w7/image/upload/v1757345952/Dark-Logo_o0u2xj.png",
        width: 1200,
        height: 630,
        alt: "Surgo Studios Logo - Ottawa Video Production Services",
      },
    ],
    locale: "en_CA",
    type: "website",
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
