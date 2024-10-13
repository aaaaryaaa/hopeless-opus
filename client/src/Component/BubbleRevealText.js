import React, { useState, useRef, useEffect } from 'react';
import './Bubble.css';

export default function BubbleRevealText() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const textContainerRef = useRef(null);
  const [containerPosition, setContainerPosition] = useState({ x: 0, y: 0 });
  const requestRef = useRef(null);
  const [initialAnimationDone, setInitialAnimationDone] = useState(false);
  const currentMousePosition = useRef({ x: 0, y: 0 });
  const [bubbleSize, setBubbleSize] = useState(300); // Initial bubble size

  // Set container position and initial mouse position to be centered over the text container
  useEffect(() => {
    if (textContainerRef.current) {
      const rect = textContainerRef.current.getBoundingClientRect();
      setContainerPosition({ x: rect.left, y: rect.top });

      // Set the bubble to move from (0, 0) to (rect.width / 2, rect.height / 2)
      currentMousePosition.current = { x: rect.width / 2, y: rect.height / 2 }; // Set the center as the target
      setInitialAnimationDone(true);
    }
  }, []);

  // Adjust bubble size based on screen width for mobile responsiveness
  useEffect(() => {
    const updateBubbleSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) { // Mobile view
        setBubbleSize(150);
      } else if (screenWidth < 1024) { // Tablet view
        setBubbleSize(200);
      } else {
        setBubbleSize(300); // Default for larger screens
      }
    };

    updateBubbleSize(); // Initial call to set bubble size
    window.addEventListener('resize', updateBubbleSize);

    return () => window.removeEventListener('resize', updateBubbleSize);
  }, []);

  // Slower bubble movement that follows the mouse position smoothly
  useEffect(() => {
    const updateMousePosition = () => {
      setMousePosition((prevPosition) => {
        // Adjust the movement speed towards currentMousePosition
        const newX = prevPosition.x + (currentMousePosition.current.x - prevPosition.x) * 0.05;
        const newY = prevPosition.y + (currentMousePosition.current.y - prevPosition.y) * 0.05;
        return { x: newX, y: newY };
      });

      // Request the next animation frame for continuous smooth movement
      requestRef.current = requestAnimationFrame(updateMousePosition);
    };

    requestRef.current = requestAnimationFrame(updateMousePosition);

    // Cleanup function to cancel the animation frame
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Handle mouse movement and update the current mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (initialAnimationDone) {
        currentMousePosition.current = {
          x: e.clientX - containerPosition.x,
          y: e.clientY - containerPosition.y,
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [initialAnimationDone, containerPosition]);

  const head1 = `HOPELESS `;
  const head2 = `OPUS`;

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={textContainerRef}
        className="relative lg:h-[100vh] h-[70vh] cursor-default overflow-hidden"
      >
        {/* Visible layer with radial gradient mask */}
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: `radial-gradient(circle ${bubbleSize}px at ${mousePosition.x}px ${mousePosition.y}px, black 20%, transparent 80%)`,
            maskImage: `radial-gradient(circle ${bubbleSize}px at ${mousePosition.x}px ${mousePosition.y}px, black 20%, transparent 80%)`,
            backdropFilter: 'blur(10px) saturate(700%)',
            transition: 'mask-position 300ms ease-out', // Smooth transition effect
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* Text Elements */}
          <div className="flex items-center justify-center no-select tracking-widest leading-tight lg:text-[8rem] text-[2rem] font-extrabold text-white font-guerrilla lg:pt-5 lg:pb-30 pt-40">
            <h1 className="block lg:inline">{head1}<span className="block lg:inline">{head2}</span></h1>
          </div>
        </div>
      </div>
    </div>
  );
}
