import React, { useState } from 'react';
import './Nav.css';
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

  const openAbout = () => {
    navigate('/about');
    closeMenu();
  };

  const openContact = () => {
    navigate('/contact');
    closeMenu();
  };
  const openSignup = () => {
    navigate('/signup');
    closeMenu();
  };
  const openLogin = () => {
    navigate('/login');
    closeMenu();
  };

  return (
    <div>
      {isMobileMenuOpen && <div className="mobile-overlay" onClick={closeMenu}></div>}
      
      <nav className={`navbar ${isMobileMenuOpen ? 'menu-open' : ''}`}>
        <div className="nav-logo">
          <div className="istelogo">
            <img src={image1} alt="ISTE Logo" />
          </div>
          <a href="/">Hopeless Opus</a>
        </div>

          <ul className={`nav-links ${isMobileMenuOpen? 'nav-links-mobile' : ''}`}>
            <li><button onClick={openHome}>Home</button></li>
            <li><button onClick={openPlay}>Play</button></li>
            <li><button onClick={openAbout}>About</button></li>
            <li><button onClick={openContact}>Contact</button></li>
            <li><button onClick={openSignup}>Signup</button></li>
            <li><button onClick={openLogin}>Login</button></li>
            
          </ul>

        <ul className={`nav-dash ${isMobileMenuOpen ? 'nav-dash-mobile' : ''}`}>
          <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer-4" className="drawer-button relative inline-block">
                <img
                  src={dash}
                  alt="Dashboard"
                  className="w-20 h-20 transition-opacity duration-200 hover:opacity-80 rounded-full"
                />
              </label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu bg-black text-base-content min-h-full w-80 p-4">
                 <li>Names :</li>
                 <li>Class :  </li>
                <li>Team Number : </li>
                <li>Progress : </li>
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