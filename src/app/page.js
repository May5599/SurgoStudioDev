import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TrustedBySection from '../components/TrustedBySection';
import ServicesSnapshot from '../components/ServicesSnapshot';
import PortfolioPreview from '../components/PortfolioPreview';
import ClientTestimonials from '@/components/ClientTestimonials';
import HowItWorksSection from '@/components/HowItWorksSection';
import WhyWorkWithUs from '@/components/WhyWorkWithUs';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrustedBySection/>
      <ServicesSnapshot/>
      <PortfolioPreview/>
      <HowItWorksSection/>
      <WhyWorkWithUs/>
      <ClientTestimonials/>
      <Footer/>
      

      
    </>
  );
}
