'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import css from './NoteForm.module.css';

import { createNote } from '@/lib/api/api';
import { useNoteStore } from '@/lib/store/noteStore';

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      clearDraft();

      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });

      router.push('/notes/filter/all');
    },
  });

  const handleSubmit = async (
    formData: FormData,
  ) => {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tag = formData.get('tag') as
      | 'Todo'
      | 'Work'
      | 'Personal'
      | 'Meeting'
      | 'Shopping';

    mutation.mutate({
      title,
      content,
      tag,
    });
  };

  return (
    <form
      action={handleSubmit}
      className={css.form}
    >
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>

        <input
          id="title"
          name="title"
          className={css.input}
          defaultValue={draft.title}
          onChange={(e) =>
            setDraft({
              title: e.target.value,
            })
          }
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">
          Content
        </label>

        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft.content}
          onChange={(e) =>
            setDraft({
              content: e.target.value,
            })
          }
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>

        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
          onChange={(e) =>
            setDraft({
              tag: e.target.value as
                | 'Todo'
                | 'Work'
                | 'Personal'
                | 'Meeting'
                | 'Shopping',
            })
          }
        >
          <option value="Todo">
            Todo
          </option>
          <option value="Work">
            Work
          </option>
          <option value="Personal">
            Personal
          </option>
          <option value="Meeting">
            Meeting
          </option>
          <option value="Shopping">
            Shopping
          </option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={() => router.back()}
          className={css.cancelButton}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending
            ? 'Creating...'
            : 'Create note'}
        </button>
      </div>
    </form>
  );
}