import WhimsySpinner from '@/app/ui/WhimsySpinner';
import { useEffect, useState } from 'react';

const endMessages = [
    'Wait, where did they go?',
    'You feel a shove from below.',
    'Is that them?...',
    'Are we flying?...',
    'UP UP UP....',
];
export const Loading = () => {
    const [currentMessage, setCurrentMessage] = useState(endMessages[0]);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let messageIndex = 1;
        const cycleMessages = () => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentMessage(endMessages[messageIndex]);
                setIsVisible(true);
                messageIndex = messageIndex + 1;
            }, 1000);
        };

        const intervalId = setInterval(cycleMessages, 3000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex-col items-center justify-center  ">
            <div
                className={`
          text-center
          transition-opacity duration-1000 ease-in-out
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
            >
                {currentMessage}
            </div>
            {!currentMessage && <WhimsySpinner size="lg" />}
        </div>
    );
};