// components/TodayWinsPanel.jsx
import React, { useState } from 'react';
import { addEventToCalendar, signInWithGoogle } from '../utils/GoogleCalendarUtils';

const defaultTagColors = {
  energy: 'bg-yellow-100 text-yellow-800',
  creativity: 'bg-purple-100 text-purple-800',
  focus: 'bg-blue-100 text-blue-800',
  calm: 'bg-green-100 text-green-800',
};

const TodayWinsPanel = ({ onPinToBoard }) => {
  const [todayTasks, setTodayTasks] = useState([
    { text: 'Go for a 5-minute walk', tag: 'energy' },
    { text: 'Drink a glass of water', tag: 'focus' },
    { text: 'Send a thank-you text', tag: 'calm' },
    { text: 'Organize one folder', tag: 'creativity' }
  ]);
  const [customTags, setCustomTags] = useState([]);

  const allTags = [...Object.keys(defaultTagColors), ...customTags];

  const getTagColor = (tag) => defaultTagColors[tag] || 'bg-gray-100 text-gray-800';

  const handleChangeTag = (index, newTag) => {
    const updated = [...todayTasks];
    updated[index].tag = newTag;
    setTodayTasks(updated);
  };

  const handleAddCustomTag = (e) => {
    e.preventDefault();
    const newTag = e.target.elements.customTag.value.trim();
    if (newTag && !allTags.includes(newTag.toLowerCase()) && newTag.toLowerCase() !== 'brown') {
      setCustomTags((prev) => [...prev, newTag]);
    }
    e.target.reset();
  };

  const handleAddToCalendar = async (taskText) => {
    try {
      await signInWithGoogle();
      await addEventToCalendar(taskText, new Date());
      alert('Added to your Google Calendar!');
    } catch (err) {
      alert('Unable to add to calendar');
    }
  };

  const handleZoteroExport = (taskText) => {
    const bib = `@misc{task${new Date().toISOString().slice(0,10).replace(/-/g, '')},\n  author = {User},\n  title = {${taskText}},\n  year = {${new Date().getFullYear()}},\n  note = {Logged from NeuroGarden}\n}`;

    const blob = new Blob([bib], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `task_${Date.now()}.bib`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBatchZoteroExport = () => {
    const entries = todayTasks.map((task) => {
      return `@misc{task${Date.now()},\n  author = {User},\n  title = {${task.text}},\n  year = {${new Date().getFullYear()}},\n  note = {Logged from NeuroGarden}\n}`;
    }).join('\n\n');

    const blob = new Blob([entries], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `neurogarden_tasks_${Date.now()}.bib`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEmailTask = (taskText) => {
    const subject = encodeURIComponent("Today's Win");
    const body = encodeURIComponent(`Here's a task from my NeuroGarden journal:\n\n${taskText}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleImportPadletJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const importedTasks = data.items
          .map((item) => item.content?.text?.trim() || '')
          .filter((text) => text && !todayTasks.some((t) => t.text === text))
          .map((text) => ({ text, tag: 'focus' }));
        if (importedTasks.length > 0) {
          setTodayTasks((prev) => [...prev, ...importedTasks]);
          alert(`Imported ${importedTasks.length} tasks from Padlet.`);
        } else {
          alert('No new tasks found in Padlet data.');
        }
      } catch (err) {
        alert('Invalid Padlet JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">✅ Today’s Wins</h2>
        <div className="flex gap-2">
          <button
            onClick={handleBatchZoteroExport}
            className="text-xs px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded"
          >
            📚 Export All to Zotero
          </button>
          <label className="text-xs px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded cursor-pointer">
            📥 Import from Padlet
            <input type="file" accept="application/json" onChange={handleImportPadletJSON} className="hidden" />
          </label>
        </div>
      </div>

      <form onSubmit={handleAddCustomTag} className="flex gap-2">
        <input
          type="text"
          name="customTag"
          placeholder="Add custom tag"
          className="text-xs px-2 py-1 border rounded w-48"
        />
        <button
          type="submit"
          className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
        >
          ➕ Add Tag
        </button>
      </form>

      {todayTasks.map((task, index) => (
        <div
          key={index}
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 border rounded-xl bg-white shadow-sm ${getTagColor(task.tag)}`}
        >
          <span className="text-sm">{task.text}</span>
          <div className="flex items-center gap-2">
            <select
              className="text-xs px-2 py-1 border rounded text-gray-700"
              value={task.tag}
              onChange={(e) => handleChangeTag(index, e.target.value)}
            >
              {allTags.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <button
              onClick={() => onPinToBoard(task.text)}
              className="text-xs px-2 py-1 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded"
            >
              Pin
            </button>
            <div className="relative group">
              <button className="text-gray-500 hover:text-gray-700">⋮</button>
              <div className="absolute right-0 hidden group-hover:block mt-1 w-40 bg-white border rounded shadow-md z-10">
                <button
                  onClick={() => handleAddToCalendar(task.text)}
                  className="block w-full px-3 py-2 text-sm text-left hover:bg-gray-100"
                >
                  🗓️ Google Calendar
                </button>
                <button
                  onClick={() => handleZoteroExport(task.text)}
                  className="block w-full px-3 py-2 text-sm text-left hover:bg-gray-100"
                >
                  📚 Export to Zotero
                </button>
                <button
                  onClick={() => handleEmailTask(task.text)}
                  className="block w-full px-3 py-2 text-sm text-left hover:bg-gray-100"
                >
                  ✉️ Send via Email
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TodayWinsPanel;
