import { Geist, Geist_Mono } from "next/font/google";
import { Audiowide } from "next/font/google";
import { Nothing_You_Could_Do, Special_Elite } from "next/font/google"; // ✅ New fonts
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: "400",
});

const nothingYouCouldDo = Nothing_You_Could_Do({
  variable: "--font-nothing-you-could-do", // ✅
  subsets: ["latin"],
  weight: "400",
});

const specialElite = Special_Elite({
  variable: "--font-special-elite", // ✅
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Surgo Studios",
  description: "Viral video production using AI storytelling",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${audiowide.variable} ${nothingYouCouldDo.variable} ${specialElite.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
