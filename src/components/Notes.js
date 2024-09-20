import React, { useState, useEffect } from 'react';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');

  // Load notes from localStorage when the component mounts
  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes)); // Parse the string back into an array
    }
  }, []);

  // Add note and save it to localStorage
  const addNote = () => {
    if (note.trim()) {
      const newNote = {
        text: note,
        id: Date.now(), // Unique identifier using timestamp
        createdAt: new Date().toLocaleString(), // Current date and time
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes)); // Save the notes array as a string in localStorage
      setNote('');
    }
  };

  // Delete a note by its id
  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes)); // Save the updated notes to localStorage
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">My Notes</h2>
      <div className="space-y-4">
        <input
          type="text"
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Add a new note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          onClick={addNote}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add Note
        </button>

        {/* Notes List */}
        <ul className="list-none space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="flex justify-between items-center bg-gray-100 p-4 rounded shadow">
              <div>
                <p className="text-gray-800">{note.text}</p>
                <p className="text-sm text-gray-500">Created at: {note.createdAt}</p>
              </div>
              <button
                onClick={() => deleteNote(note.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notes;
