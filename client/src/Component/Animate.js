import React from 'react';
import { animations, easings } from 'react-animation';

const Animate = () => {
  return (
    <div>
      <img 
        src= "https://res.cloudinary.com/diswj8gya/image/upload/v1728569013/imposter_upbcqh.jpg" 
        alt="Description of image" 
        className="w-full h-auto" 
        style={{
          animation: `fadeIn 5s ${easings.easeInCubic}, ${animations.popIn} 20s`
        }}
      />
    </div>
  );
}

export default Animate;
