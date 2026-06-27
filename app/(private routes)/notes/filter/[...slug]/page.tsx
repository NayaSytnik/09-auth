import type { Metadata } from 'next';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const currentTag = slug?.[0] ?? 'all';

  return {
    title: `${currentTag} notes | NoteHub`,
    description: `Browse notes filtered by ${currentTag}.`,
    openGraph: {
      title: `${currentTag} notes | NoteHub`,
      description: `Browse notes filtered by ${currentTag}.`,
      url: `https://notehub.com/notes/filter/${currentTag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub',
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const tag = slug?.[0] === 'all' ? '' : slug?.[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: '',
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}