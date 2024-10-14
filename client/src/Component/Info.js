import React from 'react';
import '../Info.css';
import ima from "../Resources/ima.svg";

const Info = () => {
  const devs = [
    { name: 'Souvik', role: 'CORE COMMITTEE', image: 'https://res.cloudinary.com/diswj8gya/image/upload/v1728827520/Souvik_ggobkq.jpg', stats: "96% Design"},
    { name: 'Nikhilesh', role: 'CORE COMMITTEE', image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728827526/Nikhilesh_gn1hzy.jpg", stats: "69% Anime" },
    { name: 'Roopanshi', role: 'CORE COMMITTEE', image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728827527/Roopesh_rhduuk.jpg", stats: "99% Home" },
    { name: 'Aarya', role: 'CORE COMMITTEE', image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728827512/Aarya_tbbamn.jpg", stats: "50% Biking" },
    { name: 'Kavish', role: 'CORE COMMITTEE', image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728844761/Kavish_ljwbh4.jpg", stats: "52% Snacks" },
    { name: 'Shivansh', role: 'CORE COMMITTEE', image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728827519/Shivansh_fneolr.jpg", stats: "100% Episodes"},
    { name: 'Haripriya', role: 'CORE COMMITTEE', image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728844443/Haripriya_hjpfsu.jpg", stats: "66% Netflix" },
    { name: 'Ranveer', role: 'CORE COMMITTEE', image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728845623/Ranveer_tarnbg.jpg", stats: "99% Pajji" },
    { name: 'Pranav', role: 'OC-WEBDEV', image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728845624/Pranav_ri0ny6.jpg", stats: "100% Coke" },
    { name: 'Mehul', role: 'OC-WEBDEV', image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728827515/Mehul_xdmrt6.jpg", stats: "150% Chatgpt"},
    { name: 'Siddhan', role: 'OC-WEBDEV', image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728827520/Siddhan_ekxgn4.jpg", stats: "77% Music" },
    { name: 'Tanvi', role: 'OC-WEBDEV', image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728827522/Tanvi_yev0hs.jpg", stats: "75% Debugging" },
    { name: 'Utkarsh', role: 'OC-WEBDEV', image: ima, stats: "33% Popcorn" },
    { name: 'Nikhil', role: 'OC-WEBDEV', image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728827513/Nikhil_l8mnl0.jpg", stats: "99% Fifa" },
    { name: 'Vignesh', role: 'OC-WEBDEV', image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728829011/Vignesh_fhjadz.jpg", stats: "200% Hopeless" },
    { name: 'Aditya', role: 'OC-STORY', image: ima, stats: "99% Beard" },
    { name: 'Arkadeep', role: 'OC-STORY', image: ima, stats: "50% Laughing"},
    { name: 'Saksham', role: 'OC-STORY', image: ima, stats: "66% Hindi"},
    { name: 'Shivam', role: 'OC-STORY', image: ima, stats: "100% Veg" },
    { name: 'Sara', role: 'OC-STORY', image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728827515/Sara_sat2pl.jpg" , stats: "40% Chart"},    
    { name: 'Yosha', role: 'OC-DESIGN', image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728849765/Yosha_byho0t.jpg", stats: "55% Oranges" },
    { name: 'Riddhi', role: 'OC-DESIGN', image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728827521/Riddhi_crba0c.jpg", stats: "100% Riddhi"  },
    { name: 'Vidhi', role: 'OC-DESIGN', image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728827522/Vidhi_boxfyu.jpg", stats: "88% Missing" },
    { name: 'Urja', role: 'OC-DESIGN', image: "https://res.cloudinary.com/diswj8gya/image/upload/v1728844443/Urja_k6mlww.jpg" , stats: "90% Hardworker" }
    
  ];

  return (
    <div className="meet-the-devs-container">
      <div className='acumen'>
      <h1 className='acumen-title'>WHAT IS <span className='text-red-700'>ACUMEN</span> ?</h1>
      <p className='acumen-para'>Techtatva 2024
Acumen  Where Strategy, Puzzles, and Possibilities Unite!

Step into Techtatva 2024’s most exhilarating challenge: Acumen. A clash of intellect and strategy, featuring two thrilling journeys— Tesseract and Hopeless Opus. From mind-bending puzzles to choices that shape your destiny, Acumen is not just a test—it’s an adventure you won’t forget. Try your hand at the prize pool of a whopping Rs. 24,000!!</p>
      </div>

      <div className='hopeless'>
      <h1 className='hopeless-title'>WHAT IS <span className='text-red-700'>HOPELESS OPUS</span> ?</h1>
      <p className='hopeless-para'>Hopeless Opus  is back and more thrilling than ever!
Step into an immersive online experience where every decision shapes your story! In this interactive storytelling event, your choices hold the power to unlock new paths and outcomes as you tackle mini games at step. The fate of the narrative is in your hands—choose wisely, and watch as your unique journey unfolds in real-time. Be ready for twists, turns, and unexpected revelations, where every choice you make matters!
17th-18th October, 2024  </p>
      </div>
      
      <h1><span className='meet-the'>Meet The </span><span className="core-team"> Core Team</span></h1>
      <div className="dev-grid">
        {devs.map((dev, index) => (
          <div key={index} className="dev-card">
            <h2 className='dev-name mb-40'>{dev.name}</h2>
            <img src= {dev.image} alt={dev.name} className='dev-image mt-4' />
            <p className='dev-info mt-12 mb-16'>{dev.stats}</p>
            <p className='dev-role'>{dev.role}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;
