// src/components/Scoreboard.jsx
import React from 'react';

const Scoreboard = ({ score, currentRound }) => {
    return (
    <div className="flex justify-center mb-4 text-2xl font-semibold">
        <div>Gate: {currentRound}</div>
    </div>
    );
};

export default Scoreboard;
