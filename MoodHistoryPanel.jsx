// components/MoodHistoryPanel.jsx
import React, { useEffect, useState, useRef } from 'react';
import { format, parseISO, isThisWeek, subDays, eachDayOfInterval } from 'date-fns';
import jsPDF from 'jspdf';

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

const formatAsZoteroCard = (entry) => {
  const date = new Date(entry.date);
  const formattedDate = date.toISOString().split('T')[0];
  return `@entry{journal_${formattedDate}_${entry.date.slice(-5)},\n  title = {Voice Journal Reflection},\n  author = {NeuroGarden},\n  date = {${formattedDate}},\n  note = {${entry.text.replace(/\n/g, ' ')}},\n}`;
};

const MoodHistoryPanel = () => {
  // ... [existing state and effect logic stays unchanged]

  const downloadZoteroExport = () => {
    const journal = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    if (!journal.length) return alert('No journal entries to export.');

    const bib = journal.map(formatAsZoteroCard).join('\n\n');
    const blob = new Blob([bib], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'journal.zotero.bib';
    link.click();
  };

  // ... [existing component return stays unchanged, plus insert below buttons:]
  // Inside the button bar section:
  // <button
  //   onClick={downloadZoteroExport}
  //   className="text-xs text-blue-600 hover:underline"
  //   aria-label="Download Zotero-style reference card"
  // >
  //   Export Zotero
  // </button>

  return (
    <section className="w-full max-w-xl mt-6 rounded-xl border p-4 bg-white shadow" aria-labelledby="mood-history-title">
      <div className="flex justify-between items-center mb-2">
        <h2 id="mood-history-title" className="text-lg font-semibold text-gray-800">📊 Mood This Week</h2>
        <div className="flex gap-2 items-center">
          <button
            onClick={resetHistory}
            className="text-xs text-red-600 hover:underline"
            aria-label="Reset mood history"
          >
            Reset
          </button>
          <button
            onClick={downloadSnapshot}
            className="text-xs text-indigo-600 hover:underline"
            aria-label="Download weekly mood snapshot"
          >
            Download PDF
          </button>
          <button
            onClick={downloadZoteroExport}
            className="text-xs text-blue-600 hover:underline"
            aria-label="Download Zotero-style reference card"
          >
            Export Zotero
          </button>
        </div>
      </div>

      {/* ... rest of JSX remains unchanged */}
    </section>
  );
};

export default MoodHistoryPanel;
