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

  const head1 = `HOPELESS `;
  const head3=`   `
  const head2 = ` OPUS`;

  return (
    <div className='w-full h-screen overflow-hidden'>
        <div
          ref={textContainerRef}
          onMouseMove={handleMouseMove}
          className="relative h-screen cursor-default overflow-hidden rounded-lg"
        >
            {/* Visible layer with radial gradient mask */}
            <div
              className="absolute inset-0"
              style={{
                WebkitMaskImage: `radial-gradient(circle ${bubbleSize}px at ${mousePosition.x}px ${mousePosition.y}px, black 20%, transparent 80%)`,
                maskImage: `radial-gradient(circle ${bubbleSize}px at ${mousePosition.x}px ${mousePosition.y}px, black 20%, transparent 80%)`,
                backdropFilter: 'blur(10px) saturate(70%)',
                transition: 'mask-position 300s ease-out', // Smooth transition effect
                backgroundColor: 'rgba(255, 255, 255, 1)',
              }}
            >
                {/* Text Elements with Hover Handlers */}
                  <div className="flex items-center justify-center no-select text-center tracking-widest pulsate leading-tight lg:text-[10rem] text-[2.5rem] font-extrabold text-black font-spookyman p-40" 
                  >
                <h1
                  className="block lg:inline"
                  onMouseEnter={handleMouseEnter} // Increase bubble size on text hover
                  onMouseLeave={handleMouseLeave} // Reset bubble size when not hovering over text
                >
                  {head1}
                  
                <h1 className="block lg:inLine" 
                onMouseEnter={handleMouseEnter} 
                  onMouseLeave={handleMouseLeave}>
                {head2}
                </h1>
                </h1>
                </div>

            </div>
        </div>

    </div>
  );
}

