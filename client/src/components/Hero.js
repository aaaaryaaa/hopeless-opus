import React from "react";
import yourImage from '../Resources/image_2.svg'; // Update with your actual image path

const globalStyles = {
  body: {
    margin: 0,
    padding: 0,
  },
  html: {
    height: "100%",
  },
};

function Hero() {
  return (
    <div 
      style={globalStyles} 
      className="min-h-screen w-screen flex flex-col gap-10 items-center justify-center text-center text-gray-100 shadow-inner overflow-hidden"
    >
      {/* Add the image with w-full to stretch it */}
      <img 
        src={yourImage} 
        alt="Description of image" 
        className="w-full h-auto" 
      />
      
      {/* Blurred Box */}
      <div 
        className="flex items-center justify-center blurred-box mt-10 w-11/12 sm:w-10/12 md:w-8/12 lg:w-7/12 lg:h-80 xl:w-6/12 xl:h-96 h-auto p-6 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg"
      >
        <h1 
          className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug" 
          style={{ fontFamily: 'Rationale, sans-serif' }}
        >
          The sun dipped below the horizon, casting a warm, golden glow across the tranquil landscape. A gentle breeze rustled the leaves of the tall oak trees, creating a soothing symphony twinkle into view.
        </h1>
      </div>

      {/* Play Now Button */}
      <button
        className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-2 border-[#7F1F8F] text-white cursor-pointer transition-all ease-in-out duration-300"
        style={{ backgroundColor: '#7F1F8F', fontFamily: 'Rationale, sans-serif' }}
      >
        Play Now
      </button>
    </div>
  );
}
export default Hero;