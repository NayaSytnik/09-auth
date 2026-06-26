'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '@/types/note';
import deleteNote from '@/lib/api/api';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // deleteNote is an axios instance; call its .delete method with the note id
    mutationFn: (id: string) => deleteNote.delete(`/notes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.item}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p>{note.tag}</p>

          <div className={css.actions}>
            <Link href={`/notes/${note.id}`}>View details</Link>

            <button onClick={() => mutation.mutate(note.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}