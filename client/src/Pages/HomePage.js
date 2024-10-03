import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <div>
      { user===null ? (<button onClick={() => navigate("/login")}>Login</button>) : (<button onClick={handleLogout}>Logout</button>)}
      <button onClick={() => navigate("/register")}>Sign Up</button>
      <Hero />
      <Footer />
    </div>
  );
}
