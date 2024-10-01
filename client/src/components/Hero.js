import React from "react";

function Hero() {
  return (
    <div className="min-h-screen w-screen flex flex-col gap-10 items-center justify-center text-center p-4 bg-gradient-to-tr from-gray-800 to-gray-900 text-gray-100 shadow-inner overflow-hidden">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-medium">Welcome to</p>
        <h1 className="uppercase font-bold text-6xl tracking-widest">
          Hopeless<span className="text-sky-400"> Opus</span>
        </h1>
      </div>
      <button className="px-8 py-4 rounded-lg border-2 border-sky-400 bg-white/10 text-gray-100 cursor-pointer transition-all ease-in-out duration-300 backdrop-blur-md hover:bg-sky-400 hover:text-gray-900 hover:shadow-[0_0_25px_rgba(56,189,248,0.7)] hover:scale-105">
        Accept & Begin
      </button>
    </div>
  );
}

export default Hero;