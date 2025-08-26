"use client";

import Link from "next/link";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black/90 text-gray-300 pt-12 pb-6 px-6 sm:px-12 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-10">
        {/* Logo & Tagline */}
        <div>
          <h1 className="text-white text-xl sm:text-2xl font-bold tracking-wider uppercase mb-3">Surgo Studios</h1>
          <p className="text-sm text-gray-400">
            Crafting cinematic visual experiences that move, inspire, and leave a lasting impact.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-white font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="#services" className="hover:text-yellow-400 transition">Services</Link></li>
            <li><Link href="#portfolio" className="hover:text-yellow-400 transition">Portfolio</Link></li>
            <li><Link href="#blog" className="hover:text-yellow-400 transition">Blog</Link></li>
            <li><Link href="#contact" className="hover:text-yellow-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-white font-semibold mb-3">Contact</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: <a href="mailto:hello@surgostudios.com" className="hover:text-yellow-400 transition">hello@surgostudios.com</a></li>
            <li>Phone: <a href="tel:+11234567890" className="hover:text-yellow-400 transition">+1 (123) 456-7890</a></li>
            <li>Location: Toronto, Canada</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-white font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-yellow-400 transition" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-400 transition" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="#" className="hover:text-yellow-400 transition" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Surgo Studios. All rights reserved.
      </div>
    </footer>
  );
}
