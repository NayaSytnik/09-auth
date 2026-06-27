import api from './api';

import type { Note, NoteTag } from '@/types/note';
import type { User } from '@/types/user';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

interface AuthData {
  email: string;
  password: string;
}

interface UpdateMeData {
  username: string;
}

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const { data } = await api.get('/notes', {
    params,
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`);

  return data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const { data } = await api.post('/notes', note);

  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete(`/notes/${id}`);

  return data;
};

export const register = async (body: AuthData): Promise<User> => {
  const { data } = await api.post('/auth/register', body);

  return data;
};

export const login = async (body: AuthData): Promise<User> => {
  const { data } = await api.post('/auth/login', body);

  return data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<User | null> => {
  const { data } = await api.get('/auth/session');

  return data ?? null;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get('/users/me');

  return data;
};

export const updateMe = async (
  body: UpdateMeData,
): Promise<User> => {
  const { data } = await api.patch('/users/me', body);

  return data;
};