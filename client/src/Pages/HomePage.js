import React from "react";
import StoryGame from "../StoryGame";
import Footer from "../Component/Footer.js";
import Hero from "../Component/Hero";
import Gradient from "../Resources/Gradient.svg";
import ContactForm from "../Component/contactform";
import Countdown from "../Component/Countdown.js";
import CardSlider from "../Component/CardSlider.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FAQ from "../Component/FAQ";

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
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
      <Countdown></Countdown>
      <CardSlider></CardSlider>
      <FAQ />
      <ContactForm />
      {/* <Hero/> */}
      {/* <Footer/> */}
    </div>
  );
}
