import { cookies } from 'next/headers';

import api from './api';

import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import type {
  FetchNotesParams,
  FetchNotesResponse,
} from './clientApi';

async function getHeaders() {
  const cookieStore = await cookies();

  return {
    Cookie: cookieStore.toString(),
  };
}

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params,
    headers: await getHeaders(),
  });

  return data;
};

export const fetchNoteById = async (
  id: string,
): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: await getHeaders(),
  });

  return data;
};

export const checkSession = async (): Promise<User | null> => {
  const { data } = await api.get<User | null>('/auth/session', {
    headers: await getHeaders(),
  });

  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/users/me', {
    headers: await getHeaders(),
  });

  return data;
};