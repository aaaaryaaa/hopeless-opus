import React, { useState } from 'react';
import './Nav.css'; // Your CSS file
import { useNavigate } from 'react-router-dom';
import image1 from "../Resources/ISTE.jpeg";
import dash from '../Resources/dash.jpeg';

const Nav = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openHome = () => {
    navigate('/');
    closeMenu();
  };

  const openPlay = () => {
    navigate('/play');
    closeMenu();
  };

  return (
    <div>
      {/* Mobile Menu Background Blur Overlay */}
      {isMobileMenuOpen && <div className="mobile-overlay" onClick={closeMenu}></div>}
      
      {/* Navbar */}
      <nav className={`navbar ${isMobileMenuOpen ? 'menu-open' : ''}`}>
        <div className="nav-logo">
          <div className="istelogo">
            <img src={image1} alt="ISTE Logo" />
          </div>
          <a href="/">Hopeless Opus</a>
        </div>

          <ul className={`nav-links ${isMobileMenuOpen ? 'nav-links-mobile' : ''}`}>
            <li><button onClick={openHome}>Home</button></li>
            <li><button onClick={openPlay}>Play</button></li>
          </ul>
     

        <ul className={`nav-dash ${isMobileMenuOpen ? 'nav-dash-mobile' : ''}`}>
          <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer-4" className="drawer-button relative inline-block">
                <img
                  src={dash}
                  alt="Dashboard"
                  className="w-16 h-16 transition-opacity duration-200 hover:opacity-80 rounded-full"
                />
              </label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <li><a>Team Number :</a></li>
                <li><a>Progress :</a></li>
              </ul>
            </div>
          </div>
        </ul>

        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <>&#x2715;</> : <>&#9776;</>}
        </div>
      </nav>
    </div>
  );
};

export default Nav;