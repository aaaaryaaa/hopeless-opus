import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Countdown from "../Component/Countdown.js";
import CardSlider from "../Component/CardSlider.js";
import FAQ from "../Component/FAQ";
import ContactForm from "../Component/contactform";
import GallerySection from "../GallerySection.js";
import Scroll from "../Component/Scrollcirc.js";

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col gap-10 items-center justify-center text-center p-4 bg-black text-gray-100 shadow-inner overflow-hidden"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: "-1",
      }}
    >
      <Countdown />
      <Scroll />
      <CardSlider />
      <FAQ />
      <GallerySection />
      <ContactForm />
      {/* Hero and Footer can be added here if needed */}
    </div>
  );
}
