import React, { useState, useRef } from 'react';
import './Play.css';
import StoryGame from '../StoryGame';

const Play = () => {
    const [isPlaying, setIsPlaying] = useState(false); // State to track if music is playing
    const audioRef = useRef(null); // Reference to the audio element

    const handleMusicToggle = () => {
        if (isPlaying) {
            audioRef.current.pause(); // Pause the music
        } else {
            audioRef.current.play(); // Play the music
        }
        setIsPlaying(!isPlaying); // Toggle the play/pause state
    };

    return (
        <div className="">
            <button onClick={handleMusicToggle} className="music-button">
                {isPlaying ? 'Pause Music' : 'Play Music'}
            </button>
            <audio ref={audioRef} loop>
                <source src="/homusic.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <StoryGame />
        </div>
    );
};

export default Play;
