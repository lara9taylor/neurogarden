// AppDashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usePauseTrigger from '../hooks/usePauseTrigger';
import CountdownModal from './CountdownModal';
import MoodSelector from './MoodSelector';
import TodayWinsPanel from './TodayWinsPanel';
import MoodHistoryPanel from './MoodHistoryPanel';
import JournalVoiceEntry from './JournalVoiceEntry';
import BoardView from './BoardView';
import ReflectionPrompt from './ReflectionPrompt';
import MoodPatternNotice from './MoodPatternNotice';

const AppDashboard = () => {
  const { showPauseModal, acknowledgePause } = usePauseTrigger({ intervalMinutes: 90 });
  const [boardTiles, setBoardTiles] = useState([]);

  const handleAddTileFromWin = (taskText) => {
    const alreadyExists = boardTiles.some(tile => tile.title === taskText);
    if (alreadyExists) return;

    const newTile = {
      id: Date.now(),
      title: taskText,
      tags: ['mood-suggested'],
      annotations: '',
      color: '#fef3c7',
      image: ''
    };
    setBoardTiles((prev) => [...prev, newTile]);
  };

  return (
    $1$2$3
      <MoodPatternNotice />
      <nav className="flex gap-4 mb-6 justify-center text-sm font-medium text-gray-700">
        <Link to="/dashboard" className="hover:underline">🏠 Dashboard</Link>
        <Link to="/mood" className="hover:underline">🎭 Mood</Link>
        <Link to="/wins" className="hover:underline">✅ Wins</Link>
        <Link to="/history" className="hover:underline">📊 History</Link>
        <Link to="/journal" className="hover:underline">📝 Journal</Link>
      </nav>

      <MoodSelector />
      <TodayWinsPanel onPinToBoard={handleAddTileFromWin} />
      <BoardView initialTiles={boardTiles} />
      <MoodHistoryPanel />
      <JournalVoiceEntry />
      <ReflectionPrompt />

      <CountdownModal
        isVisible={showPauseModal}
        duration={300} // 5 min
        onComplete={acknowledgePause}
        onCancel={acknowledgePause}
      />
    </main>
  );
};

export default AppDashboard;
