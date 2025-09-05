import Navbar from "@/components/Navbar";
import ServicesPage from "@/components/services/ServicesPage";
import ImpactStrip from "@/components/services/ImpactStrip";

import SurgoServices from "@/components/services/SurgoServices";
import Footer from "@/components/Footer";

export default function PortfolioPage() {
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
