// components/JournalingInput.jsx
import React, { useState, useEffect } from 'react';
import useAutosaveAndTimeout from '../hooks/useAutosaveAndTimeout';

const JournalingInput = ({ initialText = '', onSave }) => {
  const [text, setText] = useState(initialText);

  useAutosaveAndTimeout(text, onSave);

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2 className="font-bold text-lg mb-2">📝 Journal Your Thoughts</h2>
      <textarea
        className="w-full p-3 border rounded h-40 focus:outline-none focus:ring"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start writing..."
      />
    </div>
  );
};

export default JournalingInput;
