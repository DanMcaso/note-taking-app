'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NoteForm() {
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      setContent('');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
        className="w-full p-4 border rounded-lg"
        rows={4}
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Save Note
      </button>
    </form>
  );
}