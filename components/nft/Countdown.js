import { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = targetDate - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const addLeadingZero = num => {
        return num < 10 ? `0${num}` : num;
    };

    const { days, hours, minutes, seconds } = timeLeft;

    return (
        <div className="flex text-white">
            {days > 0 && (
                <div className="flex flex-col py-2 rounded-md mr-8">
                    <p className="font-medium text-[20px]">
                        {addLeadingZero(days)}
                    </p>
                    days
                </div>
            )}
            <div className="flex flex-col py-2 rounded-md mr-8">
                <p className="font-medium text-[20px]">
                    {addLeadingZero(hours)}
                </p>
                hours
            </div>
            <div className="flex flex-col py-2 rounded-md mr-8">
                <p className="font-medium text-[20px]">
                    {addLeadingZero(minutes)}
                </p>
                minutes
            </div>
            <div className="flex flex-col py-2 rounded-md">
                <p className="font-medium text-[20px]">
                    {addLeadingZero(seconds)}
                </p>
                seconds
            </div>
        </div>
    );
};

export default Countdown;
