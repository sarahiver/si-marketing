import { useState, useEffect, useCallback } from 'react';

// LAUNCH DATE: 1. Oktober 2026, 00:00 Uhr
const TARGET_DATE = new Date('2026-10-01T00:00:00').getTime();

export const useCountdown = () => {
  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const difference = TARGET_DATE - now;
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isComplete: false,
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Sofort aktualisieren
    setTimeLeft(calculateTimeLeft());
    
    // Dann jede Sekunde
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return timeLeft;
};

export const formatNumber = (num) => String(num).padStart(2, '0');
export default useCountdown;
