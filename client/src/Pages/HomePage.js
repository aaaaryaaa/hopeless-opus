import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Countdown from "../Component/Countdown.js";
import CardSlider from "../Component/CardSlider.js";
import FAQ from "../Component/FAQ";
import ContactForm from "../Component/contactform";
import GallerySection from "../GallerySection.js";
import Scroll from "../Component/Scrollcirc.js";
import BubbleRevealText from "../Component/BubbleRevealText.js";
import CaptionHp from "../Component/HomeCaption.js";
import Footer from "../Component/Footer";
import Minigame13 from "../Minigames/Minigame13/Minigame13.js";

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
    > <div  className="w-full items-center justify-center bg-custom-bg bg-no-repeat ">
      <BubbleRevealText />
      <div className="flex items-center align-middle">
      <p className="pb-20 pr-40 pl-40 pt-20 ">
      <CaptionHp />
      </p>
      </div>
      </div>
      <Countdown />
      <Scroll />
      <CardSlider />
      <FAQ />
      <GallerySection />
      <ContactForm />
      <Footer />
      {/* Hero and Footer can be added here if needed */}
    </div>
  );
}
