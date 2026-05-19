export interface Track {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string[];
  duration_in_seconds: number;
  album: string;
  track_file: string;
  logo: string | null;
}

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
  return tracks.filter(track => track.genre.includes(genre));
};