import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CountdownTimer.css';

const CountdownTimer = ({ eventDate, eventTime }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: false
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            // Combine date and time into a single Date object
            const eventDateTime = new Date(`${eventDate}T${eventTime}`);
            const now = new Date();
            const difference = eventDateTime - now;

            if (difference <= 0) {
                return {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    isExpired: true
                };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
                isExpired: false
            };
        };

        // Initial calculation
        setTimeLeft(calculateTimeLeft());

        // Update every second
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(timer);
    }, [eventDate, eventTime]);

    if (timeLeft.isExpired) {
        return (
            <div className="countdown-timer expired">
                <span className="expired-text">🎉 Event has started!</span>
            </div>
        );
    }

    return (
        <div className="countdown-timer">
            <div className="countdown-label">Event starts in:</div>
            <div className="countdown-display">
                <div className="countdown-unit">
                    <div className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</div>
                    <div className="countdown-text">Days</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-unit">
                    <div className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="countdown-text">Hours</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-unit">
                    <div className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="countdown-text">Minutes</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-unit">
                    <div className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    <div className="countdown-text">Seconds</div>
                </div>
            </div>
        </div>
    );
};

CountdownTimer.propTypes = {
    eventDate: PropTypes.string.isRequired,
    eventTime: PropTypes.string.isRequired
};

export default CountdownTimer;
