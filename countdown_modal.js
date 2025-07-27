// components/CountdownModal.jsx
import React, { useState, useEffect } from 'react';

const CountdownModal = ({ duration = 300, onComplete, isVisible, onCancel }) => {
  const [secondsLeft, setSecondsLeft] = useState(duration);

  useEffect(() => {
    if (!isVisible) return;
    setSecondsLeft(duration);
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isVisible, duration, onComplete]);

  if (!isVisible) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">⏳ Time to Pause</h2>
        <div className="text-5xl font-bold text-indigo-600 mb-2">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
        <p className="text-sm text-gray-500 mb-4">Breathe. Reset. You’re doing okay.</p>
        <button
          onClick={onCancel}
          className="text-sm px-4 py-2 mt-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default CountdownModal;
