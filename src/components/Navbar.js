"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BookCallModal from "../components/BookCallModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Services", href: "/services" },
    { label: "Industries", href: "#industries" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Podcast", href: "#podcast" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
    { label: "About Us", href: "#about" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
          ${isScrolled
            ? "top-3 left-1/2 w-[94%] max-w-6xl transform -translate-x-1/2 bg-black/70 backdrop-blur-lg shadow-lg rounded-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3"
            : "bg-transparent px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-5"}
        `}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`text-white font-extrabold tracking-wider uppercase cursor-pointer transition-all duration-300 ease-in-out
              ${isScrolled
                ? "text-sm sm:text-base md:text-lg"
                : "text-base sm:text-lg md:text-xl lg:text-2xl"}
            `}
          >
            Surgo Studios
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-5">
            <ul
              className={`flex space-x-5 text-white font-light tracking-wide uppercase transition-all duration-300
                ${isScrolled
                  ? "text-xs sm:text-sm md:text-base"
                  : "text-sm sm:text-base md:text-lg"}
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
              className={`ml-4 bg-yellow-400 text-black font-semibold rounded-full shadow hover:bg-yellow-300 transition-all duration-300
                ${isScrolled
                  ? "text-xs sm:text-sm md:text-base px-3 py-1.5 sm:px-4 sm:py-2"
                  : "text-sm sm:text-base md:text-lg px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3"}
              `}
            >
              Book a Call
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="md:hidden mt-3 bg-black/90 rounded-xl p-4 space-y-3 text-white font-light tracking-wide uppercase text-sm sm:text-base">
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
                className="w-full bg-yellow-400 text-black font-semibold text-sm sm:text-base px-4 py-2 rounded-full mt-2 hover:bg-yellow-300 transition"
              >
                Book a Call
              </button>
            </li>
          </ul>
        )}
      </nav>

      {/* Modal */}
      <BookCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
