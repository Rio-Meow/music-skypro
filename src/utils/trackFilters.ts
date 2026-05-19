import { Track } from '@/types/track';

export const filterTracksByAuthor = (tracks: Track[], author: string | null): Track[] => {
  if (!author) return tracks;
  return tracks.filter(track => track.author === author);
};

export const filterTracksByGenre = (tracks: Track[], genre: string | null): Track[] => {
  if (!genre) return tracks;
  return tracks.filter(track => {
    if (Array.isArray(track.genre)) {
      return track.genre.includes(genre);
    }
    return track.genre === genre;
  });
};

export const sortTracksByYear = (tracks: Track[], sort: 'newest' | 'oldest' | null): Track[] => {
  if (!sort) return tracks;
  const sorted = [...tracks];
  if (sort === 'newest') {
    sorted.sort((a, b) => {
      const yearA = parseInt(a.release_date?.split('-')[0] || '0');
      const yearB = parseInt(b.release_date?.split('-')[0] || '0');
      return yearB - yearA;
    });
  } else if (sort === 'oldest') {
    sorted.sort((a, b) => {
      const yearA = parseInt(a.release_date?.split('-')[0] || '0');
      const yearB = parseInt(b.release_date?.split('-')[0] || '0');
      return yearA - yearB;
    });
  }
  return sorted;
};