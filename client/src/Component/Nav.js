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

  const Dashboard = () => {
    return (
      <div>
        <div className="drawer">
    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content">
      {/* Page content here */}
      <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Dashboard</label>
    </div>
    <div className="drawer-side">
      <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        {/* Sidebar content here */}
        <li><a>Health</a></li>
        <li><a>Points</a></li>
      </ul>
    </div>
  </div>
      </div>
    )
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
        <div className="drawer drawer-end">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer-4" className="drawer-button btn btn-sm btn-outline btn-info">Dashboard</label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
</div>
          
        </ul>
          <div className='mobile-menu-icon' onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <>&#x2715;</> : <>&#9776;</>}
          </div>
        
      </nav>

      
    </div>
  );
};

export default Nav;