// components/MoodPatternNotice.jsx
import React, { useEffect, useState } from 'react';
import { parseISO, format, subDays, isAfter } from 'date-fns';

const emojiMap = {
  frustrated: '👟',
  manic: '🛍️',
  overwhelmed: '😶‍🌫️',
  calm: '🌿',
  inspired: '💡',
  down: '☁️'
};

const moodLabels = {
  frustrated: 'throw-a-shoe',
  manic: 'I want to shop',
  overwhelmed: 'foggy',
  calm: 'chill',
  inspired: 'idea burst',
  down: 'low energy'
};

const MoodPatternNotice = () => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('moodHistory');
    if (!stored) return;
    const parsed = JSON.parse(stored);
    const cutoff = subDays(new Date(), 7);

    const flatLog = [];
    for (const mood in parsed) {
      parsed[mood].forEach((iso) => {
        const date = parseISO(iso);
        if (isAfter(date, cutoff)) {
          flatLog.push({ date, mood });
        }
      });
    }

    const sorted = flatLog.sort((a, b) => b.date - a.date);
    if (sorted.length < 3) return;

    let streak = 1;
    for (let i = 1; i < sorted.length; i++) {
      const todayMood = sorted[i].mood;
      const prevMood = sorted[i - 1].mood;
      if (todayMood === prevMood) streak++;
      else break;
    }

    if (streak >= 3) {
      const mood = sorted[0].mood;
      setMessage(`You’ve had ${streak} days of ${emojiMap[mood]} ${moodLabels[mood]} — something's definitely resonating.`);
    }
  }, []);

  if (!message) return null;

  return (
    <div className="w-full max-w-xl mx-auto p-4 bg-yellow-50 text-yellow-800 rounded-xl shadow text-sm text-center">
      {message}
    </div>
  );
};

export default MoodPatternNotice;
