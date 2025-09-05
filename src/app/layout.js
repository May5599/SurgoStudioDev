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
import PreloaderWrapper from "@/components/PreLoader";

// Geist Sans (general UI)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Geist Mono (code, numbers, techy look)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Inter (primary headings + body)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Audiowide (futuristic headings / hero)
const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: "400",
});

// Montserrat (secondary headings)
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Outfit (alternative subheadings / CTA)
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Decorative (sparingly used)
const nothingYouCouldDo = Nothing_You_Could_Do({
  variable: "--font-nothing-you-could-do",
  subsets: ["latin"],
  weight: "400",
});

const specialElite = Special_Elite({
  variable: "--font-special-elite",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Surgo Studios | Ottawa Video Production & Creative Content Agency",
  description:
    "Surgo Studios is an Ottawa-based video production agency creating cinematic reels, ads, commercials, podcasts, and social media content that inspires and engages.",
  keywords: [
    "video production Ottawa",
    "cinematic video agency",
    "commercial video production",
    "corporate video services Ottawa",
    "reels and short-form content",
    "Instagram reels production",
    "TikTok content creation",
    "social media management Ottawa",
    "creative storytelling agency",
    "podcast production Ottawa",
    "brand video marketing",
    "Ottawa content generation",
    "film and media agency Canada",
  ],
  openGraph: {
    title: "Surgo Studios | Ottawa Video Production & Content Creation",
    description:
      "From reels to commercials to podcasts, Surgo Studios helps Ottawa brands tell cinematic stories and manage social content that connects.",
    url: "https://surgostudios.com",
    siteName: "Surgo Studios",
    images: [
      {
        url: "https://res.cloudinary.com/dvqibrc9d/image/upload/v1757081567/white-logo_w6xinb.png",
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
      "https://res.cloudinary.com/dvqibrc9d/image/upload/v1757081567/white-logo_w6xinb.png",
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${audiowide.variable} ${montserrat.variable} ${outfit.variable} ${nothingYouCouldDo.variable} ${specialElite.variable} antialiased`}
      >
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Surgo Studios",
              url: "https://surgostudios.com",
              logo: "https://res.cloudinary.com/dvqibrc9d/image/upload/v1757081567/white-logo_w6xinb.png",
              contactPoint: {
                "@type": "ContactPoint",
                email: "hello@surgostudios.com",
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
