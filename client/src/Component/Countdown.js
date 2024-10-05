import React, { useState, useEffect } from 'react';
import './countdown.css';

const CountdownTimer = () => {
    const [time, setTime] = useState(0); // initial time in milliseconds
    const [targetDate, setTargetDate] = useState(new Date('2024-10-17T12:00:00.000Z')); // set target date and time

    useEffect(() => {
        const updateTimer = () => {
            const currentTime = new Date().getTime();
            const targetTime = targetDate.getTime();
            const timeDiff = targetTime - currentTime;
            setTime(Math.max(timeDiff, 0)); // ensure timeDiff is not negative
        };

        updateTimer(); // Update timer immediately on load

        const interval = setInterval(updateTimer, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [targetDate]);

    const formatTime = (time) => {
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        return {
            days,
            hours,
            minutes,
            seconds,
        };
    };

    const { days, hours, minutes, seconds } = formatTime(time);

    return (
        <div className="countdown-timer">
            <div className="timer-container">
                <span className="timer">
                    <div className="timer-time">{days.toString().padStart(2, '0')}</div>
                    <div className="timer-label">Days</div>
                </span>
                <span className="timer">
                    <div className="timer-time">{hours.toString().padStart(2, '0')}</div>
                    <div className="timer-label">Hours</div>
                </span>
                <span className="timer">
                    <div className="timer-time">{minutes.toString().padStart(2, '0')}</div>
                    <div className="timer-label">Minutes</div>
                </span>
                <span className="timer">
                    <div className="timer-time">{seconds.toString().padStart(2, '0')}</div>
                    <div className="timer-label">Seconds</div>
                </span>
            </div>
        </div>
    );
};

export default CountdownTimer;
