import React from 'react'
import StoryGame from '../StoryGame'
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Gradient from '../Resources/Gradient.svg';


export default function HomePage() {
  return (
<div
  className="min-h-screen w-screen flex flex-col gap-10 items-center justify-center text-center p-4 bg-gradient-to-tr from-gray-800 to-gray-900 text-gray-100 shadow-inner overflow-hidden"
  style={{
    backgroundImage: `url(${Gradient})`,  // Use imported image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: '-1',
  }}
>

      <Hero/>
      {/* <Footer/> */}
    </div>
  )
}