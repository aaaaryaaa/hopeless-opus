import React from 'react';

const Switch = ({ isOn, onToggle, index }) => {
    return (
        <div className="flex items-center">
            <input 
                type="checkbox" 
                className="toggle mx-2" 
                checked={isOn} // Managed by the isOn prop
                onChange={() => onToggle(index)} 
            />
            
            <button
                className={`w-16 h-8 m-2 rounded-full font-bold transition ${
                    isOn ? 'bg-green-500' : 'bg-red-500'
                } text-white`}
                onClick={() => onToggle(index)}
            >
                {isOn ? 'ON' : 'OFF'}
            </button>
        </div>
    );
};

export default Switch;
