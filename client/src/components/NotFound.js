import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-red-500 animate-bounce">404</h1>
      <p className="text-xl mt-4 text-gray-700 animate-fade-in">
        Oops! The page you're looking for doesn't exist.
      </p>
    </div>
  );
};

export default NotFound;
