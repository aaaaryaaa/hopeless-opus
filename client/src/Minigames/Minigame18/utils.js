
const switchCount = 4;

// Generates a random combination for a single gate (switchCount switches)
export const generateRandomCombination = () => {
    return Array.from({ length: switchCount }, () => Math.random() < 0.5);
};

// Generates combinations for multiple gates
export const generateCombinations = (numGates = 5) => {
    return Array.from({ length: numGates }, () => generateRandomCombination());
};

// Export the switchCount in case needed elsewhere
export const getSwitchCount = () => switchCount;
