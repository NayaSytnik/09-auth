'use client';

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { fetchNotes } from '@/lib/api/api';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';

export default function NotesClient({ tag }: { tag: string }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data } = useQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search,
        tag,
      }),
    placeholderData: (prev) => prev,
  });

  return (
    <main>
      <SearchBox onSearch={handleSearch} />

      <Link href="/notes/action/create">
        <button type="button">
          Create note +
        </button>
      </Link>

      {data?.notes?.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}

      {(data?.totalPages ?? 0) > 1 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={data?.totalPages ?? 0}
        />
      )}
    </main>
  );
}