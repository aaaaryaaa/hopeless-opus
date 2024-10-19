import React, { useState } from 'react';

// Import ingredient images
import ironImage from './iron.png';
import woodImage from './stick.png';
import stringImage from './string.png';
import diamondImage from './diamond.png';
import stoneImage from './stone.png';
import blankImage from './blank.png'; // An empty image representing blank

function App({ gameResult }) {
  // Ingredient options with their respective images
  const ingredients = [
    { name: 'blank', image: blankImage },
    { name: 'iron', image: ironImage },
    { name: 'wood', image: woodImage },
    { name: 'string', image: stringImage },
    { name: 'diamond', image: diamondImage },
    { name: 'stone', image: stoneImage },
  ];

  const weapons = {
    sword: ['blank', 'iron', 'blank', 'blank', 'iron', 'blank', 'blank', 'wood', 'blank'],
    bow: ['wood', 'string', 'blank', 'wood', 'blank', 'string', 'wood', 'string', 'blank'],
    axe: ['blank', 'stone', 'stone', 'blank', 'wood', 'stone', 'blank', 'wood', 'blank'],
    pickaxe: ['iron', 'iron', 'iron', 'blank', 'wood', 'blank', 'blank', 'wood', 'blank'],
    diamondSword: ['blank', 'diamond', 'blank', 'blank', 'diamond', 'blank', 'blank', 'wood', 'blank'],
    kumbh: ['blank', 'stone', 'blank', 'stone', 'diamond', 'stone', 'iron', 'stone', 'iron'],
  };

  const [selectedIngredients, setSelectedIngredients] = useState(Array(9).fill('blank'));
  const [craftedWeapon, setCraftedWeapon] = useState(null); // Track the crafted weapon
  const [selectedIngredient, setSelectedIngredient] = useState('blank'); // Track selected ingredient

  // Handle ingredient placement in grid slots
  const placeIngredientInSlot = (index) => {
    if (!craftedWeapon) { // Only allow placing ingredients if no weapon has been crafted
      const updatedIngredients = [...selectedIngredients];
      updatedIngredients[index] = selectedIngredient;
      setSelectedIngredients(updatedIngredients);
    }
  };

  // Crafting logic
  const craftWeapon = () => {
    if (craftedWeapon) return; // Block crafting if a weapon is already created

    const weapon = Object.keys(weapons).find((key) =>
      weapons[key].join('-') === selectedIngredients.join('-')
    );

    if (weapon) {
      setCraftedWeapon(weapon);
      gameResult(200);
      setSelectedIngredients(Array(9).fill('blank')); // Clear the grid after crafting
    } else {
      alert('Invalid combination!');
    }
  };

  // Reset the game state to allow another crafting session
  const resetCrafting = () => {
    setCraftedWeapon(null);
    setSelectedIngredients(Array(9).fill('blank')); // Clear the grid
  };

  return (
    <div className="min-h-screen bg-gray-800/70 backdrop-blur-md text-white p-10 flex flex-col items-center"
    style={{ background: 'rgba(75, 85, 99, 0.7)', backdropFilter: 'blur(10px)' }}>
      <h1 className="text-4xl font-bold mb-10">Crafting Table</h1>
      <h2 className="text-sm font-bold mb-10">Click on ingredient to place it and blank option to remove it (Hint: Search minecraft Crafting recipes for weapons & tools).</h2>
      

      {/* Crafting Grid */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {selectedIngredients.map((ingredient, idx) => (
          <div
            key={idx}
            className="w-20 h-20 border border-white flex items-center justify-center cursor-pointer"
            onClick={() => placeIngredientInSlot(idx)} // Place ingredient on click
          >
            {ingredient !== 'blank' ? (
              <img src={ingredients.find(i => i.name === ingredient).image} alt={ingredient} className="w-12 h-12" />
            ) : ''}
          </div>
        ))}
      </div>

      {/* Ingredient Selection */}
      <div className="mb-10 flex flex-wrap justify-center">
        {ingredients.map((ingredient) => (
          <button
            key={ingredient.name}
            className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-2 flex items-center justify-center"
            onClick={() => setSelectedIngredient(ingredient.name)} // Set selected ingredient
            disabled={!!craftedWeapon} // Disable ingredient selection if a weapon is crafted
          >
            <img src={ingredient.image} alt={ingredient.name} className="w-8 h-8" />
          </button>
        ))}
      </div>

      {/* Craft Button */}
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-5"
        onClick={craftWeapon}
        disabled={!!craftedWeapon} // Disable crafting button if a weapon is already created
      >
        Craft Weapon
      </button>

      {/* Result */}
      <div className="text-2xl font-semibold mb-5">
        {craftedWeapon ? `You crafted a ${craftedWeapon}!` : 'No weapon crafted yet.'}
      </div>

      {/* Reset Button to allow another crafting */}
      {craftedWeapon && (
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={resetCrafting}
        >
          Reset Crafting
        </button>
      )}
    </div>
  );
}

export default App;
