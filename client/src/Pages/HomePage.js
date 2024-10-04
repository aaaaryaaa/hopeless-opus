import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

import Gradient from "../Resources/Gradient.svg";
import ContactForm from "../components/contactform";
import React from 'react'
import StoryGame from '../StoryGame'
import Footer from "../Component/Footer";
import Hero from "../Component/Hero";
import Gradient from '../Resources/Gradient.svg';
import Nav from '../Component/Nav';

import FAQ from "../components/FAQ";

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
        <div>
<div
      className="min-h-screen w-screen flex flex-col gap-10 items-center justify-center text-center p-4 bg-black text-gray-100 shadow-inner overflow-hidden"
      style={{
        backgroundColor: "", // Use imported image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: "-1",
      }}
    >
      <FAQ />
      <ContactForm />
      {/* <Hero/> */}
      {/* <Footer/> */}
    </div>
    </div>
  )
}
