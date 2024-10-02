import React from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Sign Up</button>
      <Hero />
      <Footer />
    </div>
  );
}
