// components/MoodInput.jsx
import React, { useState } from 'react';
import useAutosaveAndTimeout from '../hooks/useAutosaveAndTimeout';

const MoodInput = ({ initialMood = '', onSave }) => {
  const [mood, setMood] = useState(initialMood);

  useAutosaveAndTimeout(mood, onSave);

  return (
    <div className="p-4 border rounded bg-white">
      <h2 className="font-bold mb-2">🌤️ How are you feeling?</h2>
      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Mood</option>
        <option value="happy">😊 Happy</option>
        <option value="sad">😢 Sad</option>
        <option value="angry">😠 Angry</option>
        <option value="anxious">😰 Anxious</option>
        <option value="excited">🤩 Excited</option>
        <option value="foggy">🌫️ Foggy</option>
      </select>
    </div>
  );
};

export default MoodInput;
