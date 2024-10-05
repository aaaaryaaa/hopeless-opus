import React from 'react';
import impostor from '../Resources/imposter.jpg';
import { animations, easings } from 'react-animation';

const Animate = () => {
  return (
    <div>
      <img 
        src={impostor} 
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
