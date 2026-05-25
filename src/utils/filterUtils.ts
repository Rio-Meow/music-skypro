import { Track } from '@/types/track';

export const extractUniqueAuthors = (tracks: Track[]): string[] => {
  const uniqueAuthors: string[] = [];
  tracks.forEach((track: Track) => {
    if (!uniqueAuthors.includes(track.author)) {
      uniqueAuthors.push(track.author);
    }
  });
  return uniqueAuthors;
};

export const extractUniqueGenres = (tracks: Track[]): string[] => {
  const uniqueGenres: string[] = [];
  tracks.forEach((track: Track) => {
    if (track.genre) {
      if (Array.isArray(track.genre)) {
        track.genre.forEach((g: string) => {
          if (!uniqueGenres.includes(g)) uniqueGenres.push(g);
        });
      } else if (typeof track.genre === 'string') {
        if (!uniqueGenres.includes(track.genre)) uniqueGenres.push(track.genre);
      }
    }
  });
  return uniqueGenres;
};