// components/BoardView.jsx
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import LiveTile from './LiveTile';

const BoardView = ({ initialTiles }) => {
  const [tiles, setTiles] = useState(initialTiles);
  const [viewMode, setViewMode] = useState('tiles');

  useEffect(() => {
    const fetchPadletData = async () => {
      // Example: fetch data from a Padlet export endpoint or static file
      try {
        const response = await fetch('/padlet.json'); // Replace with actual endpoint if dynamic
        if (!response.ok) return;
        const json = await response.json();

        const transformedTiles = json.map((item, index) => ({
          id: item.id || index,
          title: item.title || `Untitled ${index + 1}`,
          image: item.image || '',
          tags: item.tags || [],
          color: item.color || '#fef3c7',
          annotations: item.notes || '',
        }));

        setTiles((prevTiles) => [...prevTiles, ...transformedTiles]);
      } catch (error) {
        console.error('Failed to auto-import Padlet data:', error);
      }
    };

    fetchPadletData();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(tiles);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setTiles(reordered);
  };

  const handlePadletImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text);

      const importedTiles = json.map((item, index) => ({
        id: item.id || index,
        title: item.title || `Untitled ${index + 1}`,
        image: item.image || '',
        tags: item.tags || [],
        color: item.color || '#fef3c7',
        annotations: item.notes || '',
      }));

      setTiles([...tiles, ...importedTiles]);
    } catch (error) {
      console.error('Error importing Padlet data:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">📌 My Project Board</h1>
        <div className="flex items-center gap-4">
          <label className="bg-purple-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-purple-700">
            Import Padlet JSON
            <input type="file" accept=".json" onChange={handlePadletImport} className="hidden" />
          </label>
          <button
            onClick={() => setViewMode(viewMode === 'tiles' ? 'table' : 'tiles')}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded"
          >
            Switch to {viewMode === 'tiles' ? 'Smart Table' : 'Tile View'}
          </button>
        </div>
      </div>

      {viewMode === 'tiles' ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tiles" direction="horizontal">
            {(provided) => (
              <div
                className="flex flex-wrap gap-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tiles.map((tile, index) => (
                  <Draggable key={tile.id || index} draggableId={(tile.id || index).toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <LiveTile tile={tile} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-green-100 text-gray-700">
                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Tags</th>
                <th className="p-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {tiles.map((tile, idx) => (
                <tr key={idx} style={{ backgroundColor: tile.color || '#fff' }}>
                  <td className="p-2 font-medium">{tile.title}</td>
                  <td className="p-2">{tile.tags.join(', ')}</td>
                  <td className="p-2 text-sm text-gray-600">{tile.annotations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BoardView;
