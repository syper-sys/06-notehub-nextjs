import axios from 'axios';
import type { Note, CreateNote } from '@/types/note';

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] =
  `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string}`;

export const fetchNotes = async (params: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search = '' } = params;

  const { data } = await axios.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search,
    },
  });
  return data;
};

export const fetchNoteById = async (noteId: Note['id']): Promise<Note> => {
  const { data } = await axios.get<Note>(`/notes/${noteId}`);
  return data;
};

export const createNote = async (payload: CreateNote): Promise<Note> => {
  const { data } = await axios.post<Note>('/notes', payload);
  return data;
};

export const deleteNote = async (noteId: Note['id']): Promise<Note> => {
  const { data } = await axios.delete<Note>(`/notes/${noteId}`);
  return data;
};
