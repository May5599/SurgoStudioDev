import Navbar from "../../components/Navbar";
import AboutUs from "../../components/about/Aboutus";
import Footer from "../../components/Footer";

export const metadata = {
  title: "About Us | Surgo Studios - Ottawa Video Production Company",
  description:
    "Meet the founders and leadership team behind Surgo Studios, an Ottawa-based video production company trusted by brands across Canada.",
  openGraph: {
    title: "About Us | Surgo Studios - Ottawa Video Production Company",
    description:
      "Discover Surgo Studios' story, values, and leadership team. Based in Ottawa, we create cinematic video productions for brands across Canada.",
    url: "https://yoursite.com/about",
    siteName: "Surgo Studios",
    images: [
      {
        url: "https://res.cloudinary.com/dvqibrc9d/image/upload/v1757010350/VAF02794_copy_fv8vur.jpg",
        width: 1200,
        height: 630,
        alt: "Surgo Studios Founders",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <AboutUs />
      <Footer />
    </main>
  );
}
