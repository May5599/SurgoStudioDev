import { Merriweather_Sans } from "next/font/google";
import "./globals.css";
import PreloaderWrapper from "../components/PreLoader";
import Script from "next/script";

const merriweatherSans = Merriweather_Sans({
  variable: "--font-merriweather-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL("https://surgostudios.com"),
  title: {
    default: "Surgo Studios | Ottawa Video Production & Creative Content Agency",
    template: "%s | Surgo Studios",
  },
  description:
    "Surgo Studios is Ottawa's cinematic video production agency. We create brand films, commercials, video podcasts, and social media reels that drive results for businesses across Canada and the U.S.",
  keywords: [
    "video production Ottawa",
    "Ottawa video production company",
    "cinematic video agency Ottawa",
    "commercial video production Ottawa",
    "corporate video Ottawa",
    "podcast studio Ottawa",
    "video podcast Ottawa",
    "brand storytelling Ottawa",
    "social media video Ottawa",
    "video production Toronto",
  ],
  authors: [{ name: "Surgo Studios", url: "https://surgostudios.com" }],
  creator: "Surgo Studios",
  publisher: "Surgo Studios",
  category: "Video Production",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Surgo",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://surgostudios.com",
    siteName: "Surgo Studios",
    title: "Surgo Studios | Ottawa Video Production & Creative Content Agency",
    description:
      "Ottawa's cinematic video production agency. Brand films, commercials, video podcasts, and social media reels that drive results.",
    images: [
      {
        url: "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1200/v1757081567/white-logo_w6xinb.png",
        width: 1200,
        height: 630,
        alt: "Surgo Studios - Ottawa Video Production Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@surgostudios",
    creator: "@surgostudios",
    title: "Surgo Studios | Ottawa Video Production Agency",
    description:
      "Ottawa-based cinematic video agency for brand films, commercials, podcasts, and social media reels.",
    images: [
      "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto,w_1200/v1757081567/white-logo_w6xinb.png",
    ],
  },
  alternates: {
    canonical: "https://surgostudios.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-CA">
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/mozilla-headline"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${merriweatherSans.variable} antialiased`}
        style={{ backgroundColor: "#000" }}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6S8XCDSFMS"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6S8XCDSFMS');
            `,
          }}
        />

        {/* Global Organization + LocalBusiness Structured Data */}
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
              logo: {
                "@type": "ImageObject",
                url: "https://res.cloudinary.com/drt92o4ye/image/upload/v1758309720/white-logo_w6xinb_yz8p9u.png",
                width: 240,
                height: 80,
              },
              image: "https://res.cloudinary.com/drt92o4ye/image/upload/f_auto,q_auto/v1757010350/VAF02794_copy_fv8vur.jpg",
              email: "raha@surgomedia.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "150 Elgin Street",
                addressLocality: "Ottawa",
                addressRegion: "ON",
                postalCode: "K2P 1L4",
                addressCountry: "CA",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 45.420449194844615,
                longitude: -75.69341459232902,
              },
              hasMap: "https://www.google.com/maps/place/150+Elgin+St,+Ottawa,+ON+K2P+1L4",
              openingHours: ["Mo-Fr 09:00-18:00", "Sa 10:00-16:00"],
              priceRange: "$$",
              contactPoint: {
                "@type": "ContactPoint",
                email: "raha@surgomedia.com",
                contactType: "customer service",
                areaServed: ["Ottawa", "Toronto", "Canada"],
                availableLanguage: ["English", "French"],
              },
              sameAs: [
                "https://www.instagram.com/surgo.studios/",
                "https://www.linkedin.com/company/surgo-media/",
                "https://www.youtube.com/@surgostudios",
              ],
            }),
          }}
        />

        <Script
          id="clever-search-tracker"
          src="https://backend.cleversearch.ai/tracker/v1/tracker.js"
          data-config={JSON.stringify({ SITE_ID: "be0d550e-a732-455f-a7a8-d041a9ca2efd" })}
          strategy="afterInteractive"
        />

        <PreloaderWrapper>{children}</PreloaderWrapper>
      </body>
    </html>
  );
}
