// components/PauseCountdownOverlay.jsx
import React, { useEffect, useState } from 'react';

const PauseCountdownOverlay = ({ duration = 300, onComplete, active }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!active) return;
    setTimeLeft(duration);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [active, duration, onComplete]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="text-center bg-white rounded-xl p-8 shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">⏳ Time to Pause</h2>
        <p className="text-4xl font-bold text-indigo-600">{formatTime(timeLeft)}</p>
      </div>
    </div>
  );
};

export default PauseCountdownOverlay;
