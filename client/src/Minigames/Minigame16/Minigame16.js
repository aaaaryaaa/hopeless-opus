import React, { useState, useRef, useEffect } from 'react';
import './Search.css';

export default function Search() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0});
  const textContainerRef = useRef(null);
  const [containerPosition, setContainerPosition] = useState({ x: 0, y: 0 });
  const requestRef = useRef(null);
  const currentMousePosition = useRef({ x: 0, y: 0 });
  const [bubbleSize, setBubbleSize] = useState(400); // Initial bubble size
  const [score,  setScore] = useState(0); // Initial score


  // Define an array of emojis with mobile phone included
  const emojiArray = [
    '😀', '😂', '🥳', '😍', '😎', '🤖', '🌟', '🔥', '💧', '🍀', 
    '🎉', '🌈', '🐱', '🦄', '🍕', '🍔', '🌍', '🌻', '⚽', '🎮'
  ];
  
  // Define the possible emojis
const emojis = [
    '😀', '😂', '🥳', '😍', '😎', '🤖', '🌟', '🔥', '💧', '🍀', 
    '🎉', '🌈', '🐱', '🦄', '🍕', '🍔', '🌍', '🌻', '⚽', '🎮', 
    '👻', '💖', '🚀', '🎈', '🐶', '🐻', '🍉', '🍦', '🍩', '🎂', 
    '⚡', '💼', '📅', '📚', '🔑', '🖥️', '💻', '📸', '🕶️',
    '🌸', '🌼', '🌺', '🍓', '🍒', '🥑', '🥥', '🍍', '🥭', '🥝', 
    '🍅', '🥬', '🍆', '🥕', '🌽', '🧄', '🧅', '🍄', '🥔', '🌰', 
    '🥜', '🍪', '🧁', '🥧', '🍰', '🎃', '🎊', '🎉', '🎗️', '🏆', 
    '🥇', '🥈', '🥉', '🏅', '🏅', '🎮', '🎲', '🃏', '🎴', '🧩', 
    '♟️', '🧗‍♂️', '🏋️‍♂️', '🏌️‍♂️', '🏄‍♂️', '🚴‍♂️', '🤸‍♂️', 
    '🤼‍♂️', '🤺', '🧘‍♂️', '🎿', '⛷️', '🏊‍♂️', '🦸‍♂️', 
    '🦸‍♀️', '🤴', '👸', '🤴', '🧙‍♂️', '🧙‍♀️', '🧝‍♂️', 
    '🧝‍♀️', '🧚‍♂️', '🧚‍♀️', '🐉', '🦄', '🐲', '🦇', '🕊️', 
    '🐦', '🐧', '🦩', '🦚', '🐍', '🐢', '🦎', '🐠', '🐟', '🐡', 
    '🦈', '🐬', '🐳', '🐋', '🐊', '🦏', '🐘', '🦙', '🐪', 
    '🦒', '🐅', '🐆', '🦓', '🦌', '🐎', '🐖', '🐐', '🐑', 
    '🐏', '🦙', '🐫', '🦔', '🦇', '🦉', '🦋', '🐌', '🐜', 
    '🐞', '🐢', '🐍', '🦎', '🐠', '🐟', '🦈', '🐋', '🌍', 
    '🌎', '🌏', '🌐', '🌌', '🌠', '🌃', '🏙️', '🌆', '🌉', 
    '🌁', '🏞️', '🏖️', '🏝️', '🏜️', '🏔️', '🗻', '🏰', 
    '🏯', '🏟️', '🏛️', '🏗️', '🏘️', '🏡', '🏠', '🏬', 
    '🏪', '🏫', '🏭', '🏢', '🏣', '🏤', '🚗', '🚕', '🚙', 
    '🚌', '🚎', '🏍️', '🚲', '🛴', '🛵', '🚄', '🚅', 
    '🚆', '🚇', '🚊', '🚉', '✈️', '🛩️', '🛫', '🛬', 
    '🛳️', '🚢', '⚓', '🛰', '🚀', '🛸', '🚁', '🚂', 
    '🚃', '🚄', '🚅', '🚋', '🚈', '🚌', '🚍', '🚎', 
    '🚏', '🏙️', '🌆', '🏖️', '🌉', '🌁', '🏞️', '🏔️', 
    '🏰', '🏯', '🏟️', '🏛️', '🏗️', '🏘️', '🏡', '🏠', 
    '🏬', '🏪', '🏫', '🏭', '🏢', '🏣', '🏤', '🚗', 
    '🚕', '🚙', '🚌', '🚎', '🚏', '🚍', '🚉', '🚌', 
    '🚖', '🚘', '🚓', '🚑', '🚐', '🚨', '🚍', '🚌', 
    '🚎', '🚏', '🛴', '🛵', '🚴‍♂️', '🏍️', '🚲', 
    '🏍️', '🛵', '🚗', '🚕', '🚙', '🚖', '🚘', '🚌', 
    '🚍', '🚎', '🚏', '🚌', '🚐', '🚑', '🚒', '🚓', 
    '🚨', '🦸‍♂️', '🦸‍♀️', '🤴', '👸', '🤴', '🧙‍♂️', 
    '🧙‍♀️', '🧝‍♂️', '🧝‍♀️', '🧚‍♂️', '🧚‍♀️', '🐉', 
    '🦄', '🐲', '🦇', '🕊️', '🐦', '🐧', '🦩', '🦚', 
    '🐍', '🐢', '🦎', '🐠', '🐟', '🐡', '🦈', '🐬', 
    '🐳', '🐋'
];

// Function to create a random 2D matrix of emojis with one phone emoji

const createMatrixWithPhone = (rows, cols) => {
    const matrix = Array.from({ length: rows }, () => Array(cols).fill(null));
    const phoneRow = Math.floor(Math.random() * rows);
    const phoneCol = Math.floor(Math.random() * cols);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (r === phoneRow && c === phoneCol) {
                matrix[r][c] = '📱'; // Place the phone emoji
            } else {
                matrix[r][c] = emojis[Math.floor(Math.random() * emojis.length)];
            }
        }
    }

    return matrix;
};

const EmojiGame = () => {
    // Step 1: **Create a state to store the matrices**
    const [matrices, setMatrices] = useState([]);

    useEffect(() => {
        // Step 2: **Create and store matrices only once**
        const newMatrices = [];
        for (let i = 0; i < 50; i++) {
            newMatrices.push(createMatrixWithPhone(30, 30)); // Generate a new matrix
        }
        setMatrices(newMatrices); // Save the generated matrices in the state
    }, []); // Empty dependency array to run only once on mount

    // const handleEmojiClick = (emoji) => {
    //     console.log('Clicked emoji:', emoji);
    //     // Your emoji click handling logic here
    // };
   return matrices;
};



useEffect(() => {
  const updateBubbleSize = () => {
    const screenWidth = window.innerWidth;
    
    // Calculate the bubble size based on screen width
    const minSize = 300; // Minimum size for larger screens
    const maxSize = 150; // Maximum size for mobile view
    const sizeRange = maxSize - minSize;

    // Proportional calculation of bubble size
    const newBubbleSize = Math.max(
      minSize,
      Math.min(maxSize, minSize + (sizeRange * (screenWidth / 640)))
    );

    setBubbleSize(newBubbleSize);
  };

  updateBubbleSize(); // Initial call to set bubble size
  window.addEventListener('resize', updateBubbleSize);

  return () => {
    window.removeEventListener('resize', updateBubbleSize);
  };
}, []);

  // useEffect(() => {
  //   if (textContainerRef.current) {
  //     const rect = textContainerRef.current.getBoundingClientRect();
  //     setContainerPosition({ x: rect.left, y: rect.top });
  //   }
  // }, []);

  useEffect(() => {
    const updateMousePosition = () => {
      // Adjust this part to maintain slower movement
      setMousePosition((prevPosition) => {
        const newX = prevPosition.x + (currentMousePosition.current.x - prevPosition.x) * 1; // Slower movement
        const newY = prevPosition.y + (currentMousePosition.current.y - prevPosition.y) * 1; // Slower movement
        return { x: newX, y: newY };
      });
      //requestRef.current = requestAnimationFrame(updateMousePosition);
    };

    //requestRef.current = requestAnimationFrame(updateMousePosition);

    // Cleanup function to cancel the animation frame
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Update mouse position
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  // Handle emoji click
  const handleEmojiClick = (emoji) => {
    if (emoji === '🐉') {
      console.log('You found the mobile phone!');
      setScore(200);
    }
  };

  return (
    <div className="w-full overflow-hidden bg-black">
      <div
        ref={textContainerRef}
        className="relative lg:h-[100vh] h-[100vh] cursor-default overflow-hidden"
      >
        {/* Visible layer with radial gradient mask */}
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: `radial-gradient(circle ${bubbleSize}px at ${mousePosition.x}px ${mousePosition.y}px, black 20%, transparent 80%)`,
            maskImage: `radial-gradient(circle ${bubbleSize}px at ${mousePosition.x}px ${mousePosition.y}px, black 20%, transparent 80%)`,
            backdropFilter: 'blur(10px) saturate(700%)',
            transition: 'mask-position 120ms ease-out', // Smooth transition effect
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* Emoji Matrix */}
          {/* <div className="grid grid-cols-20 gap-0 h-full">
            {emojiMatrix.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((emoji, emojiIndex) => (
                  <div 
                    key={emojiIndex} 
                    className="text-[2rem] p-1 cursor-pointer"
                    onClick={() => handleEmojiClick(emoji)} // Click handler for each emoji
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            ))}
          </div> */}
          {EmojiGame().map((row, rowIndex) => (
          <div key={rowIndex} className="flex w-full">
            {row.map((emoji, colIndex) => (
              <div
                key={colIndex}
                className="emoji-item"
                onClick={() => handleEmojiClick(emoji)}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 'calc(100% / 30)',
                  width: 'calc(100% / 30)', // Adjust for 20 emojis per row
                  textAlign: 'center',
                  fontSize: 'calc(2vw+ 1vh)',
                   // Adjust emoji size based on bubbleSize
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};
