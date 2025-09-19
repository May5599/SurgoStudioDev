import {
  Geist,
  Geist_Mono,
  Inter,
  Audiowide,
  Montserrat,
  Outfit,
  Nothing_You_Could_Do,
  Special_Elite,
} from "next/font/google";
import "./globals.css";
import PreloaderWrapper from "../components/PreLoader";
import Script from "next/script";

// Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "700"] });
const audiowide = Audiowide({ variable: "--font-audiowide", subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], weight: ["400", "600", "700"] });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["400", "500", "700"] });
const nothingYouCouldDo = Nothing_You_Could_Do({ variable: "--font-nothing-you-could-do", subsets: ["latin"], weight: "400" });
const specialElite = Special_Elite({ variable: "--font-special-elite", subsets: ["latin"], weight: "400" });

// Metadata
export const metadata = {
  title: "Surgo Studios | Ottawa Video Production & Creative Content Agency",
  description:
    "Surgo Studios is an Ottawa-based video production agency creating cinematic reels, ads, commercials, podcasts, and social media content that inspires and engages.",
  keywords: [
    "video production Ottawa",
    "cinematic video agency Ottawa",
    "commercial video production",
    "corporate video services Ottawa",
    "reels and short-form content Ottawa",
    "Instagram reels production Ottawa",
    "TikTok content creation Ottawa",
    "social media management Ottawa",
    "creative storytelling agency Ottawa",
    "podcast production Ottawa",
    "brand video marketing Ottawa",
    "Ottawa content generation",
    "film and media agency Canada",
  ],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  openGraph: {
    title: "Surgo Studios | Ottawa Video Production & Content Creation",
    description:
      "From reels to commercials to podcasts, Surgo Studios helps Ottawa brands tell cinematic stories and manage social content that connects.",
    url: "https://surgostudios.com",
    siteName: "Surgo Studios",
    images: [
      {
        url: "https://res.cloudinary.com/drt92o4ye/image/upload/v1758309720/white-logo_w6xinb_yz8p9u.png",
        width: 1200,
        height: 630,
        alt: "Surgo Studios - Video Production Agency Ottawa",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Surgo Studios | Ottawa Video Production Agency",
    description:
      "Ottawa-based creative video agency for reels, ads, commercials, social media, and podcasts.",
    images: [
      "https://res.cloudinary.com/drt92o4ye/image/upload/v1758309720/white-logo_w6xinb_yz8p9u.png",
    ],
  },
  alternates: {
    canonical: "https://surgostudios.com",
  },
};

// Layout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${audiowide.variable} ${montserrat.variable} ${outfit.variable} ${nothingYouCouldDo.variable} ${specialElite.variable} antialiased`}
      >
        {/* Organization + LocalBusiness Schema */}
        <Script
          id="ld-org-localbusiness"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "LocalBusiness"],
              name: "Surgo Studios",
              url: "https://surgostudios.com",
              logo: "https://res.cloudinary.com/drt92o4ye/image/upload/v1758309720/white-logo_w6xinb_yz8p9u.png",
              image: "https://res.cloudinary.com/drt92o4ye/image/upload/v1758309720/white-logo_w6xinb_yz8p9u.png",
              email: "raha@surgomedia.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "150 Elgin Street",
                addressLocality: "Ottawa",
                addressRegion: "ON",
                postalCode: "K2P 2P8",
                addressCountry: "CA",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 45.420449194844615,
                longitude: -75.69341459232902,
              },
              openingHours: ["Mo-Fr 09:00-18:00", "Sa 10:00-16:00"],
              contactPoint: {
                "@type": "ContactPoint",
                email: "raha@surgomedia.com",
                contactType: "customer service",
                areaServed: "CA",
                availableLanguage: "en",
              },
              sameAs: [
                "https://instagram.com/surgostudios",
                "https://linkedin.com/company/surgostudios",
                "https://youtube.com/@surgostudios",
              ],
            }),
          }}
        />

        <PreloaderWrapper>{children}</PreloaderWrapper>
      </body>
    </html>
  );
}
