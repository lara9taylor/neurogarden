// hooks/usePauseTrigger.js
import { useEffect, useState } from 'react';

const usePauseTrigger = ({ intervalMinutes = 90 }) => {
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [lastPause, setLastPause] = useState(() => {
    const saved = localStorage.getItem('lastPauseTime');
    return saved ? new Date(saved) : new Date();
  });

  useEffect(() => {
    const checkPauseNeeded = () => {
      const now = new Date();
      const diff = (now - lastPause) / 1000 / 60;
      if (diff >= intervalMinutes) {
        setShowPauseModal(true);
        setLastPause(now);
        localStorage.setItem('lastPauseTime', now.toISOString());
      }
    };

    const interval = setInterval(checkPauseNeeded, 60 * 1000); // check every minute
    return () => clearInterval(interval);
  }, [lastPause, intervalMinutes]);

  const acknowledgePause = () => {
    setShowPauseModal(false);
    const now = new Date();
    setLastPause(now);
    localStorage.setItem('lastPauseTime', now.toISOString());
  };

  return { showPauseModal, acknowledgePause };
};

export default usePauseTrigger;
