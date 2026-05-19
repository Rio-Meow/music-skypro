import { Track } from '@/types/track';

export const extractUniqueAuthors = (tracks: Track[]): string[] => {
  const uniqueAuthors: string[] = [];
  tracks.forEach(track => {
    if (!uniqueAuthors.includes(track.author)) {
      uniqueAuthors.push(track.author);
    }
  });
  return uniqueAuthors;
};

export const extractUniqueGenres = (tracks: Track[]): string[] => {
  const uniqueGenres: string[] = [];
  tracks.forEach(track => {
    if (track.genre) {
      if (Array.isArray(track.genre)) {
        track.genre.forEach(g => {
          if (!uniqueGenres.includes(g)) uniqueGenres.push(g);
        });
      } else if (typeof track.genre === 'string') {
        if (!uniqueGenres.includes(track.genre)) uniqueGenres.push(track.genre);
      }
    }
  });
  return uniqueGenres;
};

export const filterBySearch = (tracks: Track[], query: string): Track[] => {
  if (!query.trim()) return tracks;
  const searchLower = query.toLowerCase();
  return tracks.filter(track => 
    track.name.toLowerCase().includes(searchLower) || 
    track.author.toLowerCase().includes(searchLower)
  );
};

export const filterByAuthor = (tracks: Track[], author: string | null): Track[] => {
  if (!author) return tracks;
  return tracks.filter(track => track.author === author);
};

export const filterByGenre = (tracks: Track[], genre: string | null): Track[] => {
  if (!genre) return tracks;
  return tracks.filter(track => {
    if (Array.isArray(track.genre)) {
      return track.genre.includes(genre);
    }
    return track.genre === genre;
  });
};

export const sortByYear = (tracks: Track[], sort: 'newest' | 'oldest' | null): Track[] => {
  if (!sort) return tracks;
  const sorted = [...tracks];
  if (sort === 'newest') {
    sorted.sort((a, b) => {
      const yearA = parseInt(a.release_date?.split('-')[0]) || 0;
      const yearB = parseInt(b.release_date?.split('-')[0]) || 0;
      return yearB - yearA;
    });
  } else if (sort === 'oldest') {
    sorted.sort((a, b) => {
      const yearA = parseInt(a.release_date?.split('-')[0]) || 0;
      const yearB = parseInt(b.release_date?.split('-')[0]) || 0;
      return yearA - yearB;
    });
  }
  return sorted;
};

export const combineFilters = (
  tracks: Track[],
  searchQuery: string,
  selectedAuthor: string | null,
  selectedGenre: string | null,
  yearSort: 'newest' | 'oldest' | null
): Track[] => {
  let result = filterBySearch(tracks, searchQuery);
  result = filterByAuthor(result, selectedAuthor);
  result = filterByGenre(result, selectedGenre);
  result = sortByYear(result, yearSort);
  return result;
};