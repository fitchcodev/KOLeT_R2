import { useState, useEffect, useRef } from 'react';

interface CountdownOptions {
  initialSeconds?: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

export const useCountdown = ({
  initialSeconds = 30,
  onComplete = () => {},
  autoStart = true,
}: CountdownOptions = {}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(autoStart);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start the timer
  const start = () => {
    setIsActive(true);
    setIsComplete(false);
    setSeconds(initialSeconds);
  };

  // Pause the timer
  const pause = () => {
    setIsActive(false);
  };

  // Resume the timer
  const resume = () => {
    setIsActive(true);
  };

  // Reset the timer
  const reset = () => {
    setSeconds(initialSeconds);
    setIsComplete(false);
  };

  // Restart the timer
  const restart = () => {
    reset();
    setIsActive(true);
  };

  // Format the time as MM:SS
  const formattedTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isActive && seconds > 0) {
      timerRef.current = setTimeout(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    } else if (isActive && seconds === 0) {
      setIsActive(false);
      setIsComplete(true);
      onComplete();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isActive, seconds, onComplete]);

  return {
    seconds,
    isActive,
    isComplete,
    start,
    pause,
    resume,
    reset,
    restart,
    formattedTime,
  };
};
