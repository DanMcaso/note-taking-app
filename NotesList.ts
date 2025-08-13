'use client';

import { useEffect, useState } from 'react';

interface Note {
  id: number;
  content: string;
  timestamp: number;
  notarization_id: string | null;
}

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      const res = await fetch('/api/notes');
      const data = await res.json();
      setNotes(data);
    }
    fetchNotes();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Your Notes</h2>
      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="p-4 bg-white rounded-lg shadow">
              <p>{note.content}</p>
              <p className="text-sm text-gray-500">
                {new Date(note.timestamp).toLocaleString()} | Notarization ID:{' '}
                {note.notarization_id || 'Pending'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}