import React, { useState } from 'react';
import './Nav.css'; // Your CSS file
// import Drawer from './Drawer'; // Import the Drawer component
import { Link } from 'react-router-dom';
import image1 from "../Resources/ISTE.jpeg"
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const nav = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  const openHome = () => {
    
    nav('/');
    setIsMobileMenuOpen(false);
    
    
  }

  const openPlay = () => {
    
    nav('/play');
    setIsMobileMenuOpen(false);
    
  }


  return (
    <div>
      {/* Navbar */}
      <nav className={`navbar ${isMobileMenuOpen ? 'menu-open' : ''}`}>
        <div className="nav-logo">
            <div className="istelogo">
            <img src= {image1} alt='istelogo' />
            </div>
          
          <a href ="/">Hopeless Opus</a>
        </div>
        
        <ul className={`nav-links ${isMobileMenuOpen ? 'nav-links-mobile' : ' '}`}>
          <li><button onClick={openHome}>Home</button></li>
          <li><button onClick={openPlay}>Play</button></li>
          
        </ul>
        <ul className={`nav-dash ${isMobileMenuOpen ? 'nav-links-mobile' : ' '}`}>
          <li><Link to ="#dashboard">Dashboard</Link></li>
          
        </ul>
          <div className='mobile-menu-icon' onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <>&#x2715;</> : <>&#9776;</>}
          </div>
        
      </nav>

      
    </div>
  );
};

export default Nav;