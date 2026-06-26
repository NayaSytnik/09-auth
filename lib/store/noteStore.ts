import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { NoteTag } from '@/types/note';

export const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo' as NoteTag,
};

interface NoteStore {
  draft: {
    title: string;
    content: string;
    tag: NoteTag;
  };
  setDraft: (
    note: Partial<{
      title: string;
      content: string;
      tag: NoteTag;
    }>,
  ) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (note) =>
        set((state) => ({
          draft: {
            ...state.draft,
            ...note,
          },
        })),

      clearDraft: () =>
        set({
          draft: initialDraft,
        }),
    }),
    {
      name: 'note-draft',
      partialize: (state) => ({
        draft: state.draft,
      }),
    },
  ),
);