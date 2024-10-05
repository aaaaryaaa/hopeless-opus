import React from "react";
import "./Play.css";
import Animate from "../Component/Animate";
import StoryGame from "../StoryGame";

const Play = () => {
  return (
    <div className="play-container h-screen w-screen flex flex-col items-center justify-center bg-black">
      {/* Navigation */}
      <div className="absolute top-5 right-10 flex gap-10">
        {/* <a href="#home" className="text-white font-bold text-lg hover:underline">Home</a>
        <a href="#play" className="text-white font-bold text-lg hover:underline">Play</a> */}
        {/* Drawer Component */}
        {/* <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer-4" className="rounded-full w-10 h-10 bg-purple-500 flex items-center justify-center">
              <span className="text-white">👤</span>
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              <li><a>Sidebar Item 1</a></li>
              <li><a>Sidebar Item 2</a></li>
            </ul>
          </div>
        </div> */}
      </div>

      {/* Animation Component */}
      <Animate />

      {/* Start Button */}
      <div className="flex flex-col items-center">
        <button className="font-stalinist start-button text-4xl font-stalinist-one font-bold text-white py-4 px-10 rounded-full shadow-lg">
          START
        </button>
      </div>

      {/* Blurred Box */}
      <div className="flex items-center justify-center blurred-box mt-10 w-6/12 h-72 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg">
        <h1 className="text-white text-3xl font-mono">
          Follow the Rule!! Or get Fucked.
        </h1>
      </div>

      {/* Story Game Component */}
      <div className="mt-8">
        <StoryGame />
      </div>
    </div>
  );
};

export default Play;
