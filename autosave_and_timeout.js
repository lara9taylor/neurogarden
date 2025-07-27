// hooks/useAutosaveAndTimeout.js
import { useEffect, useRef } from 'react';

const useAutosaveAndTimeout = (data, saveCallback, timeoutDuration = 900000) => {
  const timeoutRef = useRef(null);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveCallback(data);
    }, 30000);
    return () => clearInterval(interval);
  }, [data, saveCallback]);

  // Timeout logout
  useEffect(() => {
    const resetTimeout = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        window.location.href = '/logout';
      }, timeoutDuration);
    };

    const activityEvents = ['click', 'keydown', 'mousemove', 'scroll'];
    activityEvents.forEach(event => window.addEventListener(event, resetTimeout));
    resetTimeout();

    return () => activityEvents.forEach(event => window.removeEventListener(event, resetTimeout));
  }, [timeoutDuration]);
};

export default useAutosaveAndTimeout;
