import { cookies } from 'next/headers';

import api from './api';

import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import type {
  FetchNotesParams,
  FetchNotesResponse,
} from './clientApi';

const getCookieHeader = async () => {
  const cookieStore = await cookies();

  return cookieStore.toString();
};

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const cookie = await getCookieHeader();

  const { data } = await api.get('/notes', {
    params,
    headers: {
      Cookie: cookie,
    },
  });

  return data;
};

export const fetchNoteById = async (
  id: string,
): Promise<Note> => {
  const cookie = await getCookieHeader();

  const { data } = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: cookie,
    },
  });

  return data;
};

export const checkSession = async (): Promise<User | null> => {
  const cookie = await getCookieHeader();

  const { data } = await api.get('/auth/session', {
    headers: {
      Cookie: cookie,
    },
  });

  return data ?? null;
};

export const getMe = async (): Promise<User> => {
  const cookie = await getCookieHeader();

  const { data } = await api.get('/users/me', {
    headers: {
      Cookie: cookie,
    },
  });

  return data;
};