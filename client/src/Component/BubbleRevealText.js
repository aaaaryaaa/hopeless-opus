import React, { useState, useRef, useEffect } from 'react';
import './Bubble.css';

export default function BubbleRevealText() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const textContainerRef = useRef(null);
  const [containerPosition, setContainerPosition] = useState({ x: 0, y: 0 });
  const requestRef = useRef(null);
  const currentMousePosition = useRef({ x: 0, y: 0 });
  const [bubbleSize, setBubbleSize] = useState(300); // Initial bubble size

  useEffect(() => {
    if (textContainerRef.current) {
      const rect = textContainerRef.current.getBoundingClientRect();
      setContainerPosition({ x: rect.left, y: rect.top });
    }
  }, []);

  useEffect(() => {
    const updateMousePosition = () => {
      setMousePosition((prevPosition) => {
        const newX = prevPosition.x + (currentMousePosition.current.x - prevPosition.x) * 0.1;
        const newY = prevPosition.y + (currentMousePosition.current.y - prevPosition.y) * 0.1;
        return { x: newX, y: newY };
      });
      requestRef.current = requestAnimationFrame(updateMousePosition);
    };

    requestRef.current = requestAnimationFrame(updateMousePosition);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const handleMouseMove = (e) => {
    currentMousePosition.current = {
      x: e.clientX - containerPosition.x,
      y: e.clientY - containerPosition.y,
    };
  };

  const handleMouseEnter = () => {
    setBubbleSize(300); // Increase bubble size on text hover
  };

  const handleMouseLeave = () => {
    setBubbleSize(300); // Reset bubble size when not hovering over text
  };

  const head1 = `HOPELESS`;
  const head2 = `OPUS`;

  return (
    <div className="w-full">
        <div
          ref={textContainerRef}
          onMouseMove={handleMouseMove}
          className="relative h-screen cursor-default overflow-hidden rounded-lg bg-[#1C2E2F]"
        >
          <div className="flex justify-center items-center absolute inset-0">
            {/* Base layer - invisible text */}
            <h1 className="absolute inset-0 text-lg font-medium leading-relaxed text-transparent">
              {head1}
            </h1>
            <h1 className="absolute inset-0 text-lg font-medium leading-relaxed text-transparent">
              {head2}
            </h1>

            {/* Visible layer with radial gradient mask */}
            <div
              className="flex justify-center items-center absolute inset-0"
              style={{
                WebkitMaskImage: `radial-gradient(circle ${bubbleSize}px at ${mousePosition.x}px ${mousePosition.y}px, black 20%, transparent 80%)`,
                maskImage: `radial-gradient(circle ${bubbleSize}px at ${mousePosition.x}px ${mousePosition.y}px, black 20%, transparent 80%)`,
                backdropFilter: 'blur(10px) saturate(700%)',
                transition: 'mask-position 100s ease-out', // Smooth transition effect
                backgroundColor: 'rgba(139, 0, 0, 5)',
              }}
            >
              <div className="flex flex-col items-center">
                {/* Text Elements with Hover Handlers */}
                <h1
                  className="no-select pulsate text-center text-8xl tracking-widest leading-tight mb-4 font-bold text-white font-spookyman"
                  onMouseEnter={handleMouseEnter} // Increase bubble size on text hover
                  onMouseLeave={handleMouseLeave} // Reset bubble size when not hovering over text
                >
                  {head1}
                </h1>
                <h1
                  className="no-select pulsate text-center text-8xl tracking-widest leading-tight mb-4 font-bold text-white font-spookyman"
                  onMouseEnter={handleMouseEnter} // Increase bubble size on text hover
                  onMouseLeave={handleMouseLeave} // Reset bubble size when not hovering over text
                >
                  {head2}
                </h1>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
