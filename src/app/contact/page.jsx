import Navbar from "../../components/Navbar";
import ContactPage from "../../components/contact/Contactpage";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Contact Surgo Studios | Ottawa Video Production Company",
  description:
    "Get in touch with Surgo Studios, an Ottawa-based video production company trusted across Canada. Contact us today to start your cinematic project.",
  openGraph: {
    title: "Contact Surgo Studios | Ottawa Video Production Company",
    description:
      "Reach out to Surgo Studios for creative video production services in Ottawa and nationwide. Let's bring your story to life.",
    url: "https://yoursite.com/contact",
    siteName: "Surgo Studios",
    images: [
      {
        url: "https://res.cloudinary.com/dvqibrc9d/image/upload/v1757010350/VAF02794_copy_fv8vur.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Surgo Studios - Ottawa Video Production",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
};

export default function Contact() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <ContactPage />
      <Footer />
    </main>
  );
}
