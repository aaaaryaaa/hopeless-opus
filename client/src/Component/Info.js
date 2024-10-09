import React from 'react';
import '../Info.css';
import ima from "../Resources/ima.svg";

const Info = () => {
  const devs = [
    { name: 'Souvik', role: 'President', image: ima},
    { name: 'Roopanshi', role: 'General Secretary', image: ima },
    { name: 'Aarya', role: 'Web-Dev Head', image: ima },
    { name: 'Pranav', role: 'Mancomm WebDev', image: ima },
    { name: 'Mehul', role: 'Mancomm WebDev', image: ima },
    { name: 'Siddhan', role: 'Mancomm WebDev', image: ima },
    { name: 'Tanvi', role: 'Mancomm WebDev', image: ima },
    { name: 'Utkarsh', role: 'Mancomm WebDev', image: ima },
    { name: 'Nikhil', role: 'ManComm WebDev', image: ima },
    { name: 'Vignesh', role: 'Mancomm WebDev' , image: ima},
    { name: 'Name', role: 'Mancomm WebDev', image: ima },
    { name: 'Name', role: 'Mancomm WebDev', image: ima },
    { name: 'Name', role: 'Mancomm WebDev', image: ima },
    { name: 'Name', role: 'Mancomm WebDev', image: ima },
    { name: 'Name', role: 'Mancomm WebDev', image: ima },
  ];

  return (
    <div className="meet-the-devs-container">
      <div className='acumen'>
      <h1 className='acumen-title'>WHAT IS ACUMEN?</h1>
      <p className='acumen-para'>lorem ipsum dummy dummy nigga</p>
      </div>

      <div className='hopeless'>
      <h1 className='hopeless-title'>WHAT IS HOPELESS OPUS?</h1>
      <p className='hopeless-para'>lorem ipsum dummy dummy nigga</p>
      </div>
      
      <h1><span className='meet-the'>Meet The </span><span className="core-team"> Core Team</span></h1>
      <div className="dev-grid">
        {devs.map((dev, index) => (
          <div key={index} className="dev-card">
            <h2 className='dev-name'>{dev.name}</h2>
            <img src= {dev.image} alt={dev.name} className='dev-image' />
            <p className='dev-info'>Dummy Text goes here</p>
            <p className='dev-role'>{dev.role}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;
