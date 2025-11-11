import { Merriweather_Sans } from "next/font/google";
import "./globals.css";
import PreloaderWrapper from "../components/PreLoader";
import Script from "next/script";
import Head from "next/head";

// Fonts
const merriweatherSans = Merriweather_Sans({
  variable: "--font-merriweather-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata = {
  title: "Surgo Studios | Ottawa Video Production & Creative Content Agency",
  description:
    "Surgo Studios is an Ottawa-based video production agency creating cinematic reels, ads, commercials, podcasts, and social media content that inspires and engages.",
  icons: {
    icon: [
      {
        url: "https://d1y0fmcrb9qnj1.cloudfront.net/Dark-Logo.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "https://d1y0fmcrb9qnj1.cloudfront.net/Dark-Logo.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "https://d1y0fmcrb9qnj1.cloudfront.net/Dark-Logo.png",
    shortcut: "https://d1y0fmcrb9qnj1.cloudfront.net/Dark-Logo.png",
  },
  alternates: {
    canonical: "https://surgostudios.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* ✅ Makes it behave like an iOS web app */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Surgo" />
        <link
          rel="apple-touch-icon"
          href="https://d1y0fmcrb9qnj1.cloudfront.net/Dark-Logo.png"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <body
        className={`${merriweatherSans.variable} antialiased`}
        style={{ backgroundColor: "#000" }}
      >
        {/* ✅ Google Analytics */}
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

        {/* ✅ Structured Data */}
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
              logo: "https://d1y0fmcrb9qnj1.cloudfront.net/Dark-Logo.png",
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
