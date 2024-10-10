import React, { useState } from 'react';
import './ImageHoverEffect.css';
import yourButton from '../Resources/mapicon.png';
import customCursor from '../Resources/56697.png'; // Path to your custom cursor image

const ImageHoverEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false); // State to track image visibility

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { offsetWidth, offsetHeight } = currentTarget;

    // Calculate relative position within the container
    const relX = (clientX / offsetWidth) - 0.5;
    const relY = (clientY / offsetHeight) - 0.5;

    // Adjust the values for movement
    const maxMoveX = (offsetWidth * 0.25); // 25% of the container width
    const maxMoveY = (offsetHeight * 0.25); // 25% of the container height

    const x = -relX * maxMoveX;
    const y = -relY * maxMoveY;

    setPosition({ x, y });
  };

  const imageStyle = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: `transform 1s ease-in-out`, // Smooth transition for image movement
    width: '150%', // Ensure the image is larger than the container
    height: 'auto',
  };

  // Function to toggle image visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      {/* Toggle Button */}
      <button
        className="btn-circle btn-outline btn glass"
        onClick={toggleVisibility}
        style={{
          position: 'absolute',
          top: '8rem',
          left: '2rem',
          zIndex: 998,
          padding: '0px',
          width: '50px',  // Ensure the button has a defined size
          height: '50px', // Ensure the button has a defined size
          borderRadius: '50%',  // Makes the button circular
          overflow: 'hidden',  // Ensures the image doesn't go outside the button
          cursor: 'pointer',
        }}
      >
        <img
          src= "https://res.cloudinary.com/diswj8gya/image/upload/v1728569097/mapicon_ltcjkx.png"
          alt="Button"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',  // Ensures the image covers the entire circular button
          }}
        />
      </button>

      {/* Image Container */}
      {isVisible && (
        <div
          className="image-container"
          onMouseMove={handleMouseMove}
          style={{
            overflow: 'hidden',
            width: '100vw',
            height: '100vh',
            cursor: `url(${customCursor}) 16 16, auto`,  // Custom cursor applied to the map container
          }}
        >
          <img
            src= "https://res.cloudinary.com/diswj8gya/image/upload/v1728569079/map_tacmtr.jpg"
            alt="Hover Effect"
            style={imageStyle}
            className="image-fade-in"
          />
        </div>
      )}
    </div>
  );
};

export default ImageHoverEffect;
