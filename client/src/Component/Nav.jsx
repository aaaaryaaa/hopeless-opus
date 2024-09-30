import React, { useState } from 'react';
import './Nav.css';

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <a href="/">Hopeless Opus</a>
      </div>
      
      <ul className={`nav-links ${isMobileMenuOpen ? 'nav-links-mobile' : ''}`}>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About Event</a></li>
        <li><a href="#services">ISTE</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <>&#x2715;</> : <>&#9776;</>} {/* Hamburger and close icon */}
      </div>
    
    </nav>
  );
};

export default Nav;
