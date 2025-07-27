// components/LiveTile.jsx
import React, { useState } from 'react';

const AnnotationModal = ({ tile, onClose }) => {
  const [annotations, setAnnotations] = useState(tile.annotations || '');

  const saveAnnotation = () => {
    // Placeholder save logic – replace with Supabase or local state management
    console.log('Saving annotation:', annotations);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-xl">
        <h2 className="text-lg font-bold mb-4">📝 Annotate: {tile.title}</h2>
        <textarea
          value={annotations}
          onChange={(e) => setAnnotations(e.target.value)}
          rows={6}
          className="w-full border rounded p-2 text-sm"
          placeholder="Write highlights, reactions, thoughts here..."
        ></textarea>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-3 py-1 rounded bg-gray-300 text-gray-800">Cancel</button>
          <button onClick={saveAnnotation} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Save</button>
        </div>
      </div>
    </div>
  );
};

const LiveTile = ({ tile, onClick }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="w-64 h-48 p-4 m-2 rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-gray-300 bg-white"
        style={{ backgroundColor: tile.color || '#FFFFFF' }}
      >
        {tile.image && (
          <img src={tile.image} alt={tile.title} className="w-full h-24 object-cover rounded-md mb-2" />
        )}
        <h3 className="text-sm font-bold text-gray-800 truncate">{tile.title}</h3>
        <p className="text-xs text-gray-500">{tile.tags?.join(', ')}</p>
      </div>

      {open && <AnnotationModal tile={tile} onClose={() => setOpen(false)} />}
    </>
  );
};

export default LiveTile;
