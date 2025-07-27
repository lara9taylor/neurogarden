// components/MoodSelector.jsx
import React, { useState, useEffect } from 'react';

const moodOptions = [
  { label: '👟 Throw-a-shoe', value: 'frustrated' },
  { label: '🛍️ I want to shop', value: 'manic' },
  { label: '😶‍🌫️ Foggy', value: 'overwhelmed' },
  { label: '🌿 Chill', value: 'calm' },
  { label: '💡 Idea burst', value: 'inspired' },
  { label: '☁️ Low energy', value: 'down' }
];

const MoodSelector = ({ selectedMood, setSelectedMood }) => {
  const [lastSelected, setLastSelected] = useState(null);
  const [cooldown, setCooldown] = useState({});
  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem('moodHistory');
    return stored ? JSON.parse(stored) : {};
  });

  const handleMoodClick = (mood) => {
    const now = Date.now();
    const last = cooldown[mood] || 0;
    const cooldownMs = 1000 * 60 * 15; // 15 min cooldown per mood

    if (now - last < cooldownMs) return;

    const newHistory = {
      ...history,
      [mood]: [...(history[mood] || []), new Date().toISOString()]
    };

    setCooldown({ ...cooldown, [mood]: now });
    setLastSelected(mood);
    setHistory(newHistory);
    setSelectedMood(mood);
    localStorage.setItem('moodHistory', JSON.stringify(newHistory));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCooldown((prev) => {
        const now = Date.now();
        const updated = {};
        for (const key in prev) {
          if (now - prev[key] < 1000 * 60 * 15) updated[key] = prev[key];
        }
        return updated;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-4 w-full max-w-xl">
      <h3 className="text-md font-medium text-gray-700 mb-2">What’s your vibe right now?</h3>
      <div className="flex gap-2 flex-wrap">
        {moodOptions.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleMoodClick(mood.value)}
            disabled={cooldown[mood.value] && Date.now() - cooldown[mood.value] < 1000 * 60 * 15}
            className={`px-3 py-2 rounded-xl text-sm font-medium border transition ${
              selectedMood === mood.value
                ? 'bg-indigo-100 border-indigo-400 text-indigo-800'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
            } ${
              cooldown[mood.value] && Date.now() - cooldown[mood.value] < 1000 * 60 * 15 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {mood.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
