// components/TodaysWinsPanel.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useMood } from './MoodCheckin';

const taskBank = [
  { id: 1, label: 'Stand barefoot in the grass', tags: ['grounding', 'low'], moodMatch: ['Low', 'Neutral'] },
  { id: 2, label: 'Skim one article abstract', tags: ['academic', 'low'], moodMatch: ['Neutral', 'Overwhelmed'] },
  { id: 3, label: 'Take clothes to bed', tags: ['practical'], moodMatch: ['Low', 'Neutral'] },
  { id: 4, label: 'Fold shirts/towels', tags: ['practical'], moodMatch: ['Neutral', 'Happy'] },
  { id: 5, label: 'Label one tile', tags: ['executive'], moodMatch: ['Overwhelmed'] },
  { id: 6, label: 'Deep breath – 5 seconds', tags: ['calming'], moodMatch: ['Low', 'Overwhelmed'] }
];

export const TodaysWinsPanel = () => {
  const { mood } = useMood();
  const [task, setTask] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (mood) {
      const filtered = taskBank.filter(t => t.moodMatch.includes(mood));
      const next = filtered[Math.floor(Math.random() * filtered.length)];
      setTask(next);
    }
  }, [mood]);

  const completeTask = async () => {
    if (!task) return;
    await supabase.from('wins_log').insert([{ task_id: task.id, label: task.label, timestamp: new Date() }]);
    setHistory(prev => [...prev, task]);
    const next = taskBank.filter(t => t.moodMatch.includes(mood) && !history.includes(t));
    setTask(next[Math.floor(Math.random() * next.length)] || null);
  };

  return (
    <div className="p-4 mt-6 bg-yellow-50 rounded-xl shadow-lg">
      <h2 className="text-lg font-bold mb-2 text-yellow-800">Today’s Wins 🌱</h2>
      {task ? (
        <div className="space-y-3">
          <p className="text-md text-gray-700">✨ {task.label}</p>
          <button
            onClick={completeTask}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            I did it!
          </button>
        </div>
      ) : (
        <p className="text-gray-500 italic">All wins completed for now. Great work!</p>
      )}
    </div>
  );
};
