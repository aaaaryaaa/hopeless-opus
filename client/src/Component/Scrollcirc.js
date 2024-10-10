import React from 'react';
import { useEffect, useState } from 'react';
import "../Scroll.css"

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
        <img src= "https://res.cloudinary.com/diswj8gya/image/upload/v1728568233/goofybg_jbv7lz.svg" alt="Background" className="background-img" />

        <div className={`element left-element ${scrollY > 10 ? 'visible' : ''}`}>
          <img src="https://res.cloudinary.com/diswj8gya/image/upload/v1728568892/image6_xcm4ub.svg" alt="Collect Artifacts" />
          <p>Collect The Artifacts</p>
        </div>
        
        <div className={`element left-element ${scrollY > 30 ? 'visible' : ''}`}>
          <img src="https://res.cloudinary.com/diswj8gya/image/upload/v1728568759/image1_isrte1.svg" alt="Explore Characters" />
          <p>Explore The Characters</p>
        </div>

        <div className={`element right-element ${scrollY > 50 ? 'visible' : ''}`}>
          <img src="https://res.cloudinary.com/diswj8gya/image/upload/v1728568866/image7_ygry5l.svg" alt="Find The Missing Links" />
          <p>Find The Missing Links</p>
        </div>
        
        <div className={`element right-element ${scrollY > 60 ? 'visible' : ''}`}>
          <img src="https://res.cloudinary.com/diswj8gya/image/upload/v1728568900/image8_ptldny.svg" alt="Save The World" />
          <p>Save The World</p>
        </div>
      </div>
    </div>
  );
};

export default Scrollcirc;

