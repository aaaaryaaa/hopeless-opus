import React from 'react';
import Switch from './Switch';

const Gate = ({ switches, onToggle }) => {
    return (
        <div className="flex flex-wrap justify-center mb-5">
            {switches.map((isOn, index) => (
                <Switch key={index} isOn={isOn} onToggle={onToggle} index={index} />
            ))}
        </div>
    );
};

export default Gate;