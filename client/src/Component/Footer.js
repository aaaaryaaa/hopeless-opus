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
    <footer
      className="text-white w-full"
      style={{
        backgroundImage: `url(https://res.cloudinary.com/diswj8gya/image/upload/v1728568149/Earth2_hyfg6q.jpg)`, // Correctly use the image
        backgroundSize: 'cover', // Ensures the image covers the entire footer
        backgroundPosition: 'center', // Positions the image at the center
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
        // padding: '2rem 0', // Adds vertical padding
        display: 'flex', // Use flexbox for better alignment
        flexDirection: 'column', // Stacks content vertically
        justifyContent: 'flex-end', // Vertically center the content
        alignItems: 'center', // Horizontally center the content
        height: '400px',
      }}
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        style={{ zIndex: '-1' }} // Ensure the overlay is behind content
      ></div>
      <div
        className="container text-center"
        style={{
          display: 'flex', // Flexbox for centering
          flexDirection: 'column', // Stack content
          alignItems: 'center', // Center horizontally
        }}
      >
        <div className="mb-5">
          <button className="text-white text-3xl font-bold">
            ACUMEN
          </button>
        </div>
        <div
          className="flex justify-center mb-4"
          style={{
            display: 'flex', // Flex for link buttons
            gap: '', // Gap between buttons
          }}
        >
          <button
            className="text-gray-200 text-xl hover:text-white p-2"
            onClick={openHome}
            style={{ transition: 'color 0.3s ease' }} // Smooth transition on hover
          >
            Home
          </button>
          <button
            className="text-gray-200 text-xl hover:text-white p-2"
            onClick={openPlay}
            style={{ transition: 'color 0.3s ease' }}
          >
            About
          </button>
          <button
            className="text-gray-200 text-xl hover:text-white p-2"
            onClick={openContact}
            style={{ transition: 'color 0.3s ease' }}
          >
            Contact
          </button>
          <button
            className="text-gray-200 text-xl hover:text-white p-2"
            onClick={openHome}
            style={{ transition: 'color 0.3s ease' }}
          >
            Events
          </button>
        </div>
        <div
          className="text-gray-300 pb-4"
          style={{
            color: '#FFF',
            textAlign: 'center',
            fontFamily: 'Roboto Serif',
            fontSize: '15px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '26.99px',
            marginTop: '1rem'
          }}
        >
          © {new Date().getFullYear()} ACUMEN. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
