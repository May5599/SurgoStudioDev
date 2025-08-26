import Navbar from "@/components/Navbar";
import ServicesPage from "@/components/services/ServicesPage";
import ImpactStrip from "@/components/services/ImpactStrip";
import CinematicMontage from "@/components/services/CinematicMontage";
import SurgoServices from "@/components/services/SurgoServices";

export default function PortfolioPage() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <ServicesPage />
      <ImpactStrip />
      <CinematicMontage />
      <SurgoServices />
    </main>
  );
}
