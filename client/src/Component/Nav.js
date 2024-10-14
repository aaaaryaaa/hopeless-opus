import React, { useState } from 'react'
import './Nav.css'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const openHome = () => {
    navigate('/')
    closeMenu()
  }

  const openPlay = () => {
    navigate('/play')
    closeMenu()
  }

  const openAbout = () => {
    navigate('/about')
    closeMenu()
  }
  const openLeaderboard = () => {
    navigate('/leaderboard')
    closeMenu()
  }

  const openContact = () => {
    navigate('/contact')
    closeMenu()
  }
  const openSignup = () => {
    navigate('/register')
    closeMenu()
  }
  const openLogin = () => {
    navigate('/login')
    closeMenu()
  }

  return (
    <div>
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMenu}></div>
      )}

      <nav className={`navbar ${isMobileMenuOpen ? 'menu-open' : ''}`}>
        <div className="nav-logo">
          <div className="istelogo">
            <img
              src="https://res.cloudinary.com/diswj8gya/image/upload/v1728568492/hopelesslogo_i8sypv.svg"
              alt="ISTE Logo"
            />
          </div>
          <a href="/" className="hopeless-name">
            Hopeless Opus
          </a>
        </div>

        <ul
          className={`nav-links ${isMobileMenuOpen ? 'nav-links-mobile' : ''}`}
        >
          <li>
            <button onClick={openHome}>Home</button>
          </li>
          <li>
            <button onClick={openPlay}>Play</button>
          </li>
          <li>
            <button onClick={openAbout}>About</button>
          </li>
          <li>
            <button onClick={openContact}>Contact</button>
          </li>
          <li>
            <button onClick={openLeaderboard}>Leaderboard</button>
          </li>
          <li>
            <button onClick={openSignup}>Register</button>
          </li>
          <li>
            <button onClick={openLogin}>Login</button>
          </li>
        </ul>

        <ul className={`nav-dash ${isMobileMenuOpen ? 'nav-dash-mobile' : ''}`}>
          <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label
                htmlFor="my-drawer-4"
                className="drawer-button relative inline-block"
              >
                <img
                  src="https://res.cloudinary.com/diswj8gya/image/upload/v1728568126/dash_zjkend.svg"
                  alt="Dashboard"
                  className="w-12 h-12 transition-opacity duration-200 hover:opacity-60 rounded-full"
                />
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-black text-white min-h-full w-80 p-6 space-y-4">
                <li className="text-lg font-semibold border-b border-blue-600 pb-2">
                  Names:
                </li>
                <li className="text-lg font-semibold border-b border-blue-600 pb-2">
                  Class:
                </li>
                <li className="text-lg font-semibold border-b border-blue-600 pb-2">
                  Team Number:
                </li>
                <li className="text-lg font-semibold">Progress:</li>
              </ul>
            </div>
          </div>
        </ul>

        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <>&#x2715;</> : <>&#9776;</>}
        </div>
      </nav>
    </div>
  )
}

export default Nav
