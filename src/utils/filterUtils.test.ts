import { describe, it, expect } from 'vitest';
import { 
  filterBySearch, 
  filterByAuthor, 
  filterByGenre, 
  sortByYear, 
  combineFilters 
} from './filterUtils';
import { Track } from '@/types/track';

const mockTracks: Track[] = [
  {
    _id: 1,
    name: 'Chase',
    author: 'Alexander Nakarada',
    genre: ['Classical'],
    release_date: '2005-06-11',
    duration_in_seconds: 205,
    album: 'Chase',
    track_file: 'url',
    logo: null,
    stared_user: [],
  },
];

describe('filterBySearch', () => {
  it('должен возвращать все треки при пустом поисковом запросе', () => {
    const result = filterBySearch(mockTracks, '');
    expect(result.length).toBe(4);
  });

  it('должен фильтровать треки по названию', () => {
    const result = filterBySearch(mockTracks, 'Chase');
    expect(result.length).toBe(1);
    expect(result[0]?.name).toBe('Chase');
  });
});