import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../Resources/image2.svg' // Ensure this path is correct

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  // This effect will make the image appear after scrolling a bit
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handlePlayClick = () => {
    navigate('/play')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background bubbles */}
      <div className="absolute inset-0 flex justify-center items-center -z-10">
        <div className="h-96 w-96 bg-teal-600 rounded-full blur-3xl opacity-20 absolute top-10 right-20"></div>
        <div className="h-80 w-80 bg-teal-700 rounded-full blur-3xl opacity-25 absolute bottom-10 left-10"></div>
        <div className="h-40 w-40 bg-teal-800 rounded-full blur-2xl opacity-30 absolute top-1/4 right-1/4"></div>
      </div>

      {/* Logo */}
      <div className="absolute top-5 left-5 flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-10 w-10" />
        <span
          style={{
            color: 'white',
            fontSize: '22px',
            fontFamily: 'Monoton',
            fontWeight: '400',
            lineHeight: '22px',
          }}
        >
          Hopeless Opus
        </span>
      </div>

      {/* Title */}
      <div className="text-center">
        <h1
          className="text-white font-bold"
          style={{
            fontFamily: "'Protest Guerrilla', 'sans-serif'",
            fontSize: '100.4px',
            lineHeight: '203px',
            letterSpacing: '6.5px',
            fontWeight: '400',
          }}
        >
          HOPELESS OPUS
        </h1>

        {/* Description */}
        <p
          className="mt-5 max-w-3xl mx-auto"
          style={{
            color: '#9E9E9E',
            fontSize: '20px',
            fontFamily: 'Poppins',
            fontWeight: '400',
            lineHeight: '44.6px',
          }}
        >
          A good design is not only aesthetically pleasing, but also functional.
          It should solve the problem. A good design is not only aesthetically
          pleasing, but also functional. It should solve the problem.
        </p>

        {/* Play Button */}
        <button
          onClick={handlePlayClick}
          className="mt-8 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        >
          Play
        </button>
      </div>

      {/* Image appearing after scroll */}
      <div
        className={`mt-20 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          src="path/to/your/image.png" // Replace with your image path
          alt="Scroll Image"
          className="w-64 h-auto mx-auto"
        />
      </div>
    </div>
  )
}

export default Hero
