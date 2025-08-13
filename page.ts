import Auth from '../components/Auth';
import NoteForm from '../components/NoteForm';
import NotesList from '../components/NotesList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Verifiable Note-Taking App</h1>
        <Auth />
        <NoteForm />
        <NotesList />
      </div>
    </main>
  );
}