// src/components/Footer.js
import React from "react";
import { useNavigate } from 'react-router-dom';



const Footer = () => {

  const navigate = useNavigate();
  const openHome = () => {
    navigate('/');
  };
  const openPlay = () => {
    navigate('/about');
  };
  const openContact = () => {
    navigate('/contact');
  };
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <button className="text-white text-lg font-bold">
            ACUMEN
          </button>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <button className="text-gray-400 hover:text-white" onClick={openHome}>
            Home
          </button>
          <button className="text-gray-400 hover:text-white" onClick={openPlay}>
            About
          </button>
          <button className="text-gray-400 hover:text-white" onClick={openContact}>
            Contact
          </button>
          <button className="text-gray-400 hover:text-white" onClick={openHome}>
            Events
          </button>
        </div>
        <div className="text-gray-400 text-sm">
          © {new Date().getFullYear()} ACUMEN. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
