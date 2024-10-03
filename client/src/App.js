import React, { useEffect, useState } from "react";
import StoryGame from "./StoryGame";
import Nav from "./Component/Nav.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Play from "./Pages/Play.js";
import HomePage from "./Pages/HomePage.js";
import NotFoundPage from "./Component/NotFound.js";
import Footer from "./Component/Footer.js";
import Contact from "./Pages/Contact.js";
import About from "./Pages/About.js";
import Login from "./Pages/Login.js";
import Signup from "./Pages/Signup.js";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/")
      .then((res) => res.text())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/play" element={<Play />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
