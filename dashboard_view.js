// views/DashboardView.jsx
import React, { useState } from 'react';
import TodayWinsPanel from '../components/TodayWinsPanel';
import MoodTrackingOverlay from '../components/MoodTrackingOverlay';
import PauseCountdownOverlay from '../components/PauseCountdownOverlay';

const DashboardView = () => {
  const [moodLog, setMoodLog] = useState([]);
  const [pauseActive, setPauseActive] = useState(false);

  const handleLogMood = (mood) => {
    setMoodLog((prev) => [...prev, { mood, timestamp: Date.now() }]);
  };

  const triggerPause = () => {
    setPauseActive(true);
  };

  return (
    <main className="space-y-6 p-4">
      <section className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">🌱 NeuroGarden Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={() => handleLogMood('energy')}
            className="text-sm bg-yellow-100 text-yellow-900 px-3 py-1 rounded"
          >⚡ Energy</button>
          <button
            onClick={() => handleLogMood('manic')}
            className="text-sm bg-pink-100 text-pink-900 px-3 py-1 rounded"
          >🛍️ I want to shop</button>
          <button
            onClick={triggerPause}
            className="text-sm bg-blue-100 text-blue-900 px-3 py-1 rounded"
          >⏸️ Take 5</button>
        </div>
      </section>

      <MoodTrackingOverlay moodLog={moodLog} />
      <TodayWinsPanel onPinToBoard={(taskText) => console.log('Pinned:', taskText)} />
      <PauseCountdownOverlay active={pauseActive} onComplete={() => setPauseActive(false)} />
    </main>
  );
};

export default DashboardView;
