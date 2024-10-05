import React from 'react';
import { useEffect, useState } from 'react';
import "../Scroll.css"
import BackgroundSvg from "../Resources/goofybg.svg";
import Characters from "../Resources/image1.svg"
import Artifacts from "../Resources/image6.svg"
import Links from "../Resources/image7.svg"
import World from "../Resources/image8.svg"


const Scrollcirc = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-container">
      <div className="background-section">
        <img src={BackgroundSvg} alt="Background" className="background-img" />

        <div className={`element left-element ${scrollY > 10 ? 'visible' : ''}`}>
          <img src={Artifacts} alt="Collect Artifacts" />
          <p>Collect The Artifacts</p>
        </div>
        
        <div className={`element left-element ${scrollY > 30 ? 'visible' : ''}`}>
          <img src={Characters} alt="Explore Characters" />
          <p>Explore The Characters</p>
        </div>

        <div className={`element right-element ${scrollY > 50 ? 'visible' : ''}`}>
          <img src={Links} alt="Find The Missing Links" />
          <p>Find The Missing Links</p>
        </div>
        
        <div className={`element right-element ${scrollY > 60 ? 'visible' : ''}`}>
          <img src={World} alt="Save The World" />
          <p>Save The World</p>
        </div>
      </div>
    </div>
  );
};

export default Scrollcirc;

