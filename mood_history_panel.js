// components/MoodHistoryPanel.jsx
import React, { useEffect, useState, useRef } from 'react';
import { format, parseISO, isThisWeek, subDays, eachDayOfInterval } from 'date-fns';

const emojiMap = {
  frustrated: '👟',
  manic: '🛍️',
  overwhelmed: '😶‍🌫️',
  calm: '🌿',
  inspired: '💡',
  down: '☁️'
};

const moodLabels = {
  frustrated: 'Throw-a-shoe',
  manic: 'I want to shop',
  overwhelmed: 'Foggy',
  calm: 'Chill',
  inspired: 'Idea burst',
  down: 'Low energy'
};

const MoodHistoryPanel = () => {
  const [weeklyMoodCounts, setWeeklyMoodCounts] = useState({});
  const [moodCalendar, setMoodCalendar] = useState({});
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem('moodHistory');
    if (!stored) return;

    const parsed = JSON.parse(stored);
    const counts = {};
    const calendar = {};

    const pastWeek = eachDayOfInterval({
      start: subDays(new Date(), 6),
      end: new Date()
    });

    pastWeek.forEach((date) => {
      const key = format(date, 'yyyy-MM-dd');
      calendar[key] = [];
    });

    for (const mood in parsed) {
      parsed[mood].forEach((iso) => {
        const dateKey = format(parseISO(iso), 'yyyy-MM-dd');
        if (calendar[dateKey]) {
          calendar[dateKey].push(mood);
        }
        if (isThisWeek(parseISO(iso))) {
          counts[mood] = (counts[mood] || 0) + 1;
        }
      });
    }

    setWeeklyMoodCounts(counts);
    setMoodCalendar(calendar);
  }, []);

  const resetHistory = () => {
    localStorage.removeItem('moodHistory');
    setWeeklyMoodCounts({});
    setMoodCalendar({});
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition not supported in this browser.');
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript.toLowerCase();
      const match = Object.keys(moodLabels).find((mood) =>
        spoken.includes(moodLabels[mood].toLowerCase())
      );

      if (match) {
        const updated = JSON.parse(localStorage.getItem('moodHistory') || '{}');
        updated[match] = [...(updated[match] || []), new Date().toISOString()];
        localStorage.setItem('moodHistory', JSON.stringify(updated));
        window.location.reload();
      } else {
        alert(`Could not detect a matching mood. Try saying: "I feel chill" or "I'm foggy".`);
      }

      setIsListening(false);
    };

    recognition.onerror = () => {
      alert('Voice recognition error. Please try again.');
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
    setIsListening(true);
    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  return (
    <section className="w-full max-w-xl mt-6 rounded-xl border p-4 bg-white shadow" aria-labelledby="mood-history-title">
      <div className="flex justify-between items-center mb-2">
        <h2 id="mood-history-title" className="text-lg font-semibold text-gray-800">📊 Mood This Week</h2>
        <button
          onClick={resetHistory}
          className="text-xs text-red-600 hover:underline"
          aria-label="Reset mood history"
        >
          Reset
        </button>
      </div>

      {Object.keys(weeklyMoodCounts).length === 0 ? (
        <p className="text-sm text-gray-500 italic" role="status">No mood activity logged this week.</p>
      ) : (
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4" aria-label="Weekly mood summary">
          {Object.entries(weeklyMoodCounts).map(([mood, count]) => (
            <li key={mood}>{emojiMap[mood]} {moodLabels[mood]} — {count} time{count > 1 ? 's' : ''}</li>
          ))}
        </ul>
      )}

      <h3 className="text-sm font-semibold text-gray-600 mb-1" id="daily-view-title">🗓️ Daily View</h3>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-600" aria-labelledby="daily-view-title">
        {Object.entries(moodCalendar).map(([date, moods]) => (
          <div
            key={date}
            className="border p-1 rounded bg-gray-50"
            aria-label={`Mood log for ${format(new Date(date), 'EEEE')}`}
            role="group"
          >
            <div className="font-medium text-[10px] text-gray-500">{format(new Date(date), 'EEE')}</div>
            <div aria-hidden="true">{moods.length === 0 ? '—' : moods.map((m) => emojiMap[m]).join(' ')}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={isListening ? stopListening : startListening}
          className={`text-sm px-3 py-1 rounded-lg shadow border transition ${
            isListening ? 'bg-red-100 border-red-400 text-red-800' : 'bg-blue-100 border-blue-400 text-blue-800'
          }`}
          aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
        >
          {isListening ? '🛑 Stop Listening' : '🎙️ Speak Mood'}
        </button>
        <span className="text-xs text-gray-400">Try: "I feel chill" or "I'm foggy"</span>
      </div>
    </section>
  );
};

export default MoodHistoryPanel;
