// components/MoodCheckin.jsx
import React, { useState, useEffect, useContext, createContext } from 'react';
import { supabase } from '../utils/supabaseClient';

const MoodContext = createContext();

export const useMood = () => useContext(MoodContext);

export const MoodProvider = ({ children }) => {
  const [mood, setMood] = useState(null);

  const saveMood = async (newMood) => {
    setMood(newMood);
    await supabase.from('mood_logs').insert([{ mood: newMood, timestamp: new Date() }]);
  };

  return (
    <MoodContext.Provider value={{ mood, saveMood }}>
      {children}
    </MoodContext.Provider>
  );
};

const emojiOptions = [
  { emoji: '😃', label: 'Happy' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😞', label: 'Low' },
  { emoji: '😵‍💫', label: 'Overwhelmed' },
  { emoji: '🤩', label: 'Excited' }
];

export const MoodCheckin = () => {
  const { mood, saveMood } = useMood();
  const [selected, setSelected] = useState(mood);

  const handleSelect = (m) => {
    setSelected(m);
    saveMood(m);
  };

  return (
    <div className="p-4 rounded-xl shadow-md bg-white dark:bg-zinc-800">
      <h2 className="text-xl font-semibold mb-2 text-purple-700">How do you feel today?</h2>
      <div className="flex gap-4">
        {emojiOptions.map(({ emoji, label }) => (
          <button
            key={label}
            onClick={() => handleSelect(label)}
            className={`text-3xl p-2 rounded-full transition-transform hover:scale-110 ${
              selected === label ? 'bg-purple-200' : ''
            }`}
            aria-label={label}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};
