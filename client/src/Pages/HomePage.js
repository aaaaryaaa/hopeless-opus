import React from 'react'
import StoryGame from '../StoryGame'
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Gradient from '../Resources/Gradient.svg';
import ContactForm from "../components/contactform";


import FAQ from '../components/FAQ';


export default function HomePage() {
  return (
<div
  className="min-h-screen w-screen flex flex-col gap-10 items-center justify-center text-center p-4 bg-black text-gray-100 shadow-inner overflow-hidden"
  style={{
    backgroundColor:'' , // Use imported image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: '-1',
  }}
>
      
      <FAQ/>
      <ContactForm/>
      {/* <Hero/> */}
      {/* <Footer/> */}
    </div>
  )
}