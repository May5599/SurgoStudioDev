"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import BookCallModal from "../components/BookCallModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  const isAboutPage = pathname === "/about";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Podcast", href: "/podcast" },
    
    { label: "About Us", href: "/about" },
        { label: "Blogs", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const textColor = isAboutPage
    ? isScrolled
      ? "text-white"
      : "text-black"
    : "text-white";

  return (
    <>
      <nav
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
    ${
      isScrolled
        ? "md:top-3 md:left-1/2 md:w-[94%] md:max-w-6xl md:transform md:-translate-x-1/2 md:bg-black/70 md:backdrop-blur-md md:shadow-lg md:rounded-full px-4 py-2"
        : "bg-transparent px-4 py-4"
    }
  `}
>
        <div className="flex items-center justify-between">
          {/* Logo */}
<Link href="/" className="flex items-start md:items-center">
  <div
    className={`
      relative
      h-14 sm:h-16 md:h-20 lg:h-24   // 🔥 taller
      ${isScrolled ? "w-40 sm:w-48 md:w-60" : "w-48 sm:w-60 md:w-72 lg:w-80"} // 🔥 wider
    `}
  >
    <Image
  src={
    isAboutPage
      ? isScrolled
        ? "/white-logo.png" // About page when scrolled
        : "/Dark-Logo.png"  // About page default
      : "/white-logo.png"   // All other pages
  }
  alt="Surgo Studios Logo"
  fill
  className="object-contain transition-opacity duration-300"
  priority
  sizes="(max-width: 768px) 220px, (max-width: 1024px) 300px, 380px"
/>

  </div>
</Link>


          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <ul
              className={`flex items-center space-x-6 ${textColor} font-medium tracking-wide uppercase transition-all duration-300
                ${isScrolled ? "text-sm lg:text-sm" : "text-base lg:text-base"}
              `}
            >
              {menuItems.map(({ label, href }) => (
                <li key={label} className="relative group cursor-pointer">
                  <a href={href} className="transition hover:text-yellow-400">
                    {label}
                  </a>
                  <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                </li>
              ))}
            </ul>

            {/* Book a Call Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className={`ml-6 bg-yellow-400 text-black font-semibold rounded-full shadow hover:bg-yellow-300 transition-all duration-300
                flex items-center justify-center
                ${
                  isScrolled
                    ? "text-sm px-4 py-1.5"
                    : "text-base px-5 py-2"
                }
              `}
            >
              Book a Call
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`md:hidden ${textColor} focus:outline-none`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8h16M4 16h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="md:hidden mt-3 bg-black/90 rounded-xl p-4 space-y-3 text-white font-medium tracking-wide uppercase text-sm sm:text-base">
            {menuItems.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="block hover:text-yellow-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}

            {/* Mobile Book a Call Button */}
            <li>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsOpen(false);
                }}
                className="w-full bg-yellow-400 text-black font-semibold text-sm px-4 py-2 rounded-full mt-2 hover:bg-yellow-300 transition"
              >
                Book a Call
              </button>
            </li>
          </ul>
        )}
      </nav>

      {/* Modal */}
      <BookCallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
