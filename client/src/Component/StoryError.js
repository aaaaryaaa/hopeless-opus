import React from 'react';

const StoryError = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl text-red-400 font-serif-bold mb-4">OOPS !</h1>
        <p className="text-xl mb-6 font-serif">You need to Login to Play.</p>
        <a 
          href="/login" 
          className="inline-block px-6 py-3 text-lg font-semibold text-black bg-white rounded-lg hover:bg-gray-300 transition">
          Go to Login
        </a>
      </div>
    </div>
  );
};

export default StoryError;
