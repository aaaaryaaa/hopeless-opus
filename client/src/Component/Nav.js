import React, { useState } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Component/Sidebar"; // Updated import

const Nav = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMenu}></div>
      )}

      <nav className={`navbar ${isMobileMenuOpen ? "menu-open" : ""}`}>
        <div className="nav-logo">
          <div className="istelogo">
            <img
              src="https://res.cloudinary.com/diswj8gya/image/upload/v1728568492/hopelesslogo_i8sypv.svg"
              alt="ISTE Logo"
            />
          </div>
          <a href="/" className="hopeless-name">Hopeless Opus</a>
        </div>

        <div className="">
          <ul className={`nav-links ${isMobileMenuOpen ? "nav-links-mobile" : ""}`}>
            <li><button onClick={() => navigate("/")}>Home</button></li>
            <li><button onClick={() => navigate("/play")}>Play</button></li>
            <li><button onClick={() => navigate("/about")}>About</button></li>
            <li><button onClick={() => navigate("/contact")}>Contact</button></li>
            <li><button onClick={() => navigate("/leaderboard")}>Leaderboard</button></li>
            {/* <li><button onClick={() => navigate("/register")}>Register</button></li> */}
            {localStorage.getItem("token")===null && (<li><button onClick={() => navigate("/login")}>Login</button></li>)}
          </ul>
        </div> 


        <div className="lg:w-[5rem] w-full">
        <div className="w-[5rem] ml-auto mr-auto">
          <ul className={`nav-dash ${isMobileMenuOpen ? "nav-dash-mobile" : ""}`}>
            <div className="drawer drawer-end">
              <div className="drawer-content">
                <button onClick={toggleSidebar} className="relative inline-block">
                  <img
                    src="https://res.cloudinary.com/diswj8gya/image/upload/v1728568126/dash_zjkend.svg"
                    alt="Dashboard"
                    className="w-12 h-12 transition-opacity duration-200 hover:opacity-60 rounded-full"
                  />
                </button>
              </div>
            </div>
          </ul>
        </div>
        </div>

        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <>&#x2715;</> : <>&#9776;</>}
        </div>
      </nav>

      {/* Sidebar and Overlay */}

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-[9998] transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </div>
  );
};

export default Nav;
