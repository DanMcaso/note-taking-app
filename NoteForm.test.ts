import { render, screen, fireEvent } from '@testing-library/react';
import NoteForm from '../components/NoteForm';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('NoteForm', () => {
  it('submits a note successfully', async () => {
    const mockPush = jest.fn();
    const mockRefresh = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush, refresh: mockRefresh });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    render(<NoteForm />);
    const textarea = screen.getByPlaceholderText('Write your note here...');
    const button = screen.getByText('Save Note');

    fireEvent.change(textarea, { target: { value: 'Test note' } });
    fireEvent.click(button);

    expect(fetch).toHaveBeenCalledWith('/api/notes', expect.any(Object));
    expect(mockRefresh).toHaveBeenCalled();
  });
});