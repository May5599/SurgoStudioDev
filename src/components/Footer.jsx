"use client";

import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return ( <footer className="relative bg-gradient-to-b from-black via-[#0a0a0a] to-black text-gray-300 pt-16 pb-8 px-6 sm:px-12 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 border-b border-white/10 pb-12 relative z-10">
        {/* Logo & Tagline */}
        <div className="text-center sm:text-left">
          <Link href="/" className="inline-block">



          
            <Image
              src="https://res.cloudinary.com/drt92o4ye/image/upload/v1758309720/white-logo_w6xinb_yz8p9u.png"
              alt="Surgo Studios Logo"
              width={240}   // 🔥 increased logo size
              height={80}
              className="mb-4 w-[240px] sm:w-[280px] md:w-[300px] h-auto mx-auto sm:mx-0"
              priority={false}
            />
          </Link>
        </div>
        {/* Quick Links */}
        <div>
          <h2 className="text-white font-mozilla font-bold mb-4 text-lg">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/services" className="hover:text-yellow-400 transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-yellow-400 transition">
                Portfolio
              </Link>
            </li>
             <li>
              <Link href="/podcast" className="hover:text-yellow-400 transition">
                Podcast
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-yellow-400 transition">
                Blog
              </Link>
            </li>
             <li>
              <Link href="/about" className="hover:text-yellow-400 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-yellow-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-white font-mozilla font-bold mb-4 text-lg">
            Contact
          </h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              Email:{" "}
              <a
                href="mailto:Raha@surgomedia.com"
                className="hover:text-yellow-400 transition"
              >
                Raha@surgomedia.com
              </a>
            </li>
            <li>150 Elgin St, Ottawa,ON,Canada K2P 1L4</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-white font-mozilla font-bold mb-4 text-lg">
            Follow Us
          </h2>
          <div className="flex space-x-4">
            {[
              { icon: FaInstagram, href: "https://www.instagram.com/surgo.studios/?hl=en", label: "Instagram" },
              { icon: FaLinkedin, href: "https://www.linkedin.com/company/surgo-media/?originalSubdomain=ca", label: "LinkedIn" },
              { icon: FaYoutube, href: "#", label: "YouTube" },
            ].map(({ icon: Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                aria-label={label}
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-yellow-400 hover:text-black transition shadow-md hover:shadow-yellow-400/30"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 text-center text-xs text-gray-500 relative z-10">
        &copy; {new Date().getFullYear()} Surgo Studios. All rights reserved.
      </div>

      {/* Ambient Glow Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[180px] top-[-10%] left-[10%] animate-pulse-slow" />
        <div className="absolute w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[160px] bottom-[-15%] right-[10%] animate-pulse-slow delay-1000" />
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </footer>
  );
}
