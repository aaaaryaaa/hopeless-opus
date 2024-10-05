// src/components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <a href="/" className="text-white text-lg font-bold">
            ACUMEN
          </a>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="/" className="text-gray-400 hover:text-white">
            Home
          </a>
          <a href="/about" className="text-gray-400 hover:text-white">
            About
          </a>
          <a href="/contact" className="text-gray-400 hover:text-white">
            Contact
          </a>
          <a href="/events" className="text-gray-400 hover:text-white">
            Events
          </a>
        </div>
        <div className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Your Personal Pookie. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;