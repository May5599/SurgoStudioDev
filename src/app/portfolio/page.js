import PortfolioHero from '@/components/portfolio/PortfolioHero';
import Navbar from "@/components/Navbar";
import ProjectsReel from '@/components/portfolio/ProjectsReel';
import CreativeCommentary from '@/components/portfolio/CreativeCommentary';
import ShowcaseGrid from '@/components/portfolio/ShowcaseGrid';
import ImpactSection from '@/components/portfolio/ImpactSection';
import TestimonialsSection from '@/components/portfolio/TestimonialsSection';
import TrustedBySection from '@/components/TrustedBySection';
import CallToActionSection from '@/components/portfolio/CallToActionSection';
import Footer from '@/components/Footer';
import SurgoBanner from '@/components/portfolio/SurgoBanner';
import SurgoReelsShowcase from '@/components/portfolio/SurgoReelsShowcase';




export default function PortfolioPage() {
  return (
    <main className="bg-black text-white">
        <Navbar/>
        <PortfolioHero />
         
          <SurgoReelsShowcase/>
        
        <CreativeCommentary/>
        <ShowcaseGrid/>
       <ProjectsReel/>
        <TestimonialsSection/>
        <TrustedBySection/> 
       <ImpactSection/>
        <CallToActionSection />
        {/* <SurgoReelsShowcase/> */}
        <SurgoBanner/>
        <Footer/>
        
        
        
     
     
        
        
      
      {/* Other sections will go below as we build them one by one */}
    </main>
  );
}
